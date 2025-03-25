package com.example.backend.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {
    private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256); // May still be supported
    private final long expirationTime = 86400000; // 24 hours

    // Method to generate the token
    public String generateToken(String email) {
        return Jwts.builder()
                .subject(email) // Set the subject to the email
                .issuedAt(new Date()) // Set the issue date
                .expiration(new Date(System.currentTimeMillis() + expirationTime)) // Set the expiration date
                .signWith(key) // Sign the token with the key
                .compact(); // Generate the compact token
    }

    // Method to extract the email from the token
    public String getEmailFromToken(String token) {
        return Jwts.parser()
                .setSigningKey(key) // Set the signing key
                .build()
                .parseClaimsJws(token) // Parse the token and extract the claims
                .getBody() // Get the body of the claims
                .getSubject(); // Extract the subject (email)
    }

    // Method to validate the token
    public boolean validateToken(String token) {
        try {
            // Check if the token is expired
            Jwts.parser()
                    .setSigningKey(key) // Set the signing key
                    .build()
                    .parseClaimsJws(token); // Parse the token to check if it's valid

            return true; // Token is valid if no exception was thrown
        } catch (ExpiredJwtException e) {
            // Token has expired
            System.out.println("Token expired: " + e.getMessage());
        } catch (JwtException e) {
            // Invalid token
            System.out.println("Invalid token: " + e.getMessage());
        }
        return false; // Return false if the token is invalid or expired
    }
}

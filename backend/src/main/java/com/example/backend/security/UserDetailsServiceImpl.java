package com.example.backend.security;

import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.Collection;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.backend.models.Utente;
import com.example.backend.repositories.UtenteRepository;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UtenteRepository utenteRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        // Check if user exists 
        Utente utente = utenteRepository.findByUsername(email);
        if (utente != null) {
            return buildUserDetails(utente.getEmail(), utente.getPassword(), utente.getRuolo().name());
        }
        
        throw new UsernameNotFoundException("User not found with email: " + email);
    }
    
    private UserDetails buildUserDetails(String email, String password, String role) {
        Collection<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(role));
        
        return new User(email, password, authorities);
    }
}

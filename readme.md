
# VisualizeUrSelf - Tracker di Abitudini e Task

**VisualizeUrSelf** è un'applicazione di tracking di abitudini e task, progettata per aiutare gli utenti a monitorare i propri progressi su obiettivi giornalieri e attività quotidiane. L'app offre anche funzionalità per l'amministrazione, come la gestione delle attività giornaliere per gli utenti e il login sicuro.

## Tecnologie Utilizzate

- **Frontend**: Angular (per la gestione delle interfacce utente e la comunicazione con il backend)
- **Backend**: Spring Boot (per la gestione delle logiche di business, l'autenticazione e la persistenza dei dati)
- **Database**: MySQL (per il salvataggio dei dati degli utenti, task e altre informazioni)
- **Sicurezza**: Spring Security (per il login sicuro degli utenti e la gestione dei permessi)
- **JWT**: JSON Web Tokens (per la gestione dell'autenticazione degli utenti)

## Funzionalità

1. **Login Utente**
   - Gli utenti possono registrarsi e fare login nell'applicazione.
   - L'accesso è protetto tramite autenticazione sicura (password criptate).
   
2. **Dashboard Utente**
   - Visualizzazione di task giornalieri e delle attività.
   - Ogni utente può vedere e completare le attività assegnate.

3. **Aggiunta Task Giornalieri** (Admin)
   - Gli amministratori possono aggiungere task giornalieri per tutti gli utenti.
   - Ogni task può essere classificato come "mentale" o "fisico".

4. **Gestione Task**
   - Gli utenti possono marcare le attività come completate.
   - Le attività sono organizzate in base a una data di inizio e fine.

5. **Statistiche**
   - Visualizzazione delle statistiche dell'utente, come il peso e le misurazioni BMI.

6. **Gestione Profili Utenti**
   - Gli amministratori possono accedere alle informazioni degli utenti e aggiornare i loro dati.

## Come Eseguire l'Applicazione in Locale

### 1. Prerequisiti

- **Node.js** (per eseguire il frontend con Angular)
- **Java 17 o superiore** (per eseguire il backend con Spring Boot)
- **Maven** (per la gestione delle dipendenze di Spring Boot)
- **MySQL** (o un altro database relazionale compatibile)

### 2. Backend - Spring Boot

1. Clona questo repository:
   ```bash
   git clone https://github.com/NotSoupCarry/VisualizeUrSelf
   ```
   
2. Naviga nella cartella del backend:
   ```bash
   cd backend
   ```

3. Configura le credenziali del database in `application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/visualizeurself
   spring.datasource.username=root
   spring.datasource.password=your_password
   ```

4. Esegui l'applicazione Spring Boot:
   ```bash
   ./mvnw spring-boot:run
   ```

### 3. Frontend - Angular

1. Naviga nella cartella del frontend:
   ```bash
   cd frontend
   ```

2. Installa le dipendenze Node:
   ```bash
   npm install
   ```

3. Avvia il server di sviluppo Angular:
   ```bash
   ng serve
   ```

   L'app sarà disponibile su `http://localhost:4200`.

## Endpoints API

- **POST** `/api/auth/register` - Registrazione utente
- **POST** `/api/auth/login` - Login utente
- **GET** `/api/tasks` - Recupera le task per un utente
- **POST** `/api/tasks` - Aggiungi una nuova task giornaliera (admin)
- **PUT** `/api/tasks/{id}/complete` - Segna un task come completato

## Contribuire

Se desideri contribuire al progetto, segui questi passaggi:

1. Fork il repository
2. Crea un branch per la tua feature:
   ```bash
   git checkout -b feature-nome-feature
   ```
3. Commit i tuoi cambiamenti:
   ```bash
   git commit -m "Aggiunta di una nuova feature"
   ```
4. Push il tuo branch:
   ```bash
   git push origin feature-nome-feature
   ```
5. Crea una pull request.

## Licenza

Distribuito sotto la Licenza MIT. Vedi il file [LICENSE](LICENSE) per ulteriori dettagli.

## Contatti

- Email: tuo-email@example.com
- Sito Web: https://tuo-sito-web.com

# BookApp

BookApp är en fullstackapplikation för att hantera böcker och favoritcitat. Varje användare har ett eget konto och kan bara se och ändra sina egna böcker och citat.

## Funktioner

- Registrering och inloggning
- JWT-baserad autentisering med HttpOnly-cookie
- Skapa, visa, redigera och radera böcker
- Skapa, visa, redigera och radera citat
- Separat data per användare
- Ljust och mörkt tema
- Responsivt Angular-gränssnitt

## Teknik

- Frontend: Angular 20, TypeScript, Bootstrap och Font Awesome
- Backend: ASP.NET Core .NET 9 Web API
- ORM: Entity Framework Core
- Lokal databas på `master`: SQLite
- Deploydatabas på `render-postgres`: PostgreSQL via Supabase
- Hosting: Netlify för frontend och Render för backend

## Projektstruktur

```text
BookApp/
├── backend/       .NET 9 Web API
└── frontend/      Angular-applikation
```

## Kom igång lokalt

### Förkrav

- .NET 9 SDK
- Node.js och npm
- Git

### Backend

Från repo-roten:

```powershell
cd backend
dotnet restore
dotnet run
```

Det lokala API:t körs normalt på:

```text
http://localhost:5062
```

Den lokala SQLite-databasen skapas som `backend/app.db`. Databasfilerna ska inte committas.

### Frontend

Öppna en ny terminal:

```powershell
cd frontend
npm install
npm start
```

Öppna sedan:

```text
http://localhost:4200
```

Frontendens lokala API-adress finns i:

```text
frontend/src/environments/environment.ts
```

## Brancher

### `master`

Projektets lokala SQLite-baslinje. Den lämnas orörd när deployversionen testas.

### `render-postgres`

Deploybranch för Render och Supabase. Den använder PostgreSQL och har egen deploykonfiguration. Ändringar i denna branch deployas till Render och Netlify när automatisk deploy är aktiverad.

## Produktion

Produktionsarkitekturen är:

```text
Angular på Netlify
        ↓
.NET 9 API på Render
        ↓
PostgreSQL på Supabase
```

### Render

Render-servicen ska använda:

```text
Branch: render-postgres
Runtime: Docker
Dockerfile: backend/Dockerfile
Docker build context: backend
```

Viktiga environment variables:

```text
ASPNETCORE_ENVIRONMENT=Production
Jwt__Secret=<lång slumpmässig secret>
Jwt__Issuer=BookAppApi
Jwt__Audience=BookAppClient
AuthCookie__Secure=true
AuthCookie__SameSite=None
Cors__AllowedOrigins__0=https://din-netlify-adress.netlify.app
ConnectionStrings__DefaultConnection=<Supabase-anslutning>
```

Connection stringen ska vara på en rad och använda ADO.NET-format, exempelvis:

```text
Host=...;Port=5432;Database=postgres;Username=...;Password=...;SSL Mode=Require;Trust Server Certificate=true
```

Lägg aldrig riktiga secrets, databaslösenord eller JWT-nycklar i Git.

### Netlify

Netlify ska bygga från branchen `render-postgres` med:

```text
Base directory: lämnas tom
Build command: cd frontend && npm ci && npm run build
Publish directory: frontend/dist/frontend/browser
Functions directory: lämnas tom
```

SPA-routing hanteras av `frontend/public/_redirects`.

## Databas

På Render/Supabase skapar backendens startup-initiering tabellerna:

- `Users`
- `Books`
- `Quotes`

Seed-data läggs endast till om motsvarande ID saknas. Render Free använder ett temporärt filsystem, men applikationsdata ska ligga i Supabase och påverkas därför inte av Render-dvala.

## Säkerhet

- Använd en ny, lång och slumpmässig `Jwt__Secret` i produktion.
- Återanvänd inte utvecklings- eller gamla secrets.
- Committa aldrig `.env`, databasfiler, tokens eller connection strings med lösenord.
- Begränsa CORS till den faktiska Netlify-adressen.
- Använd inte `*` tillsammans med credentials/cookies.

## Tester före release

- Registrera en ny användare.
- Logga in och logga ut.
- Skapa, redigera och radera en bok.
- Skapa, redigera och radera ett citat.
- Kontrollera att två användare inte ser varandras data.
- Kontrollera att data finns kvar efter omstart och Render-dvala.
- Testa sidan efter en direktladdning på en Angular-route.

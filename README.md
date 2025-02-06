Usage:
```bash
git clone git@github.com:LucasOpoka/transcendence.git
```
Ensure you have docker installed
```bash
cd transcendence
docker compose up --build
```

Access the site at https://127.0.0.1:8042/

Move paddles with arrow up/down and W/S

Press enter to pause

To access postgrs database:
```
docker exec -it postgres_container  psql --username=pong_db_user --dbname=pong_db
```

Add data to Django's test_model through:
https://127.0.0.1:8042/admin

Check the added data here:
https://127.0.0.1:8042/test_model


## Points:
```
- Major module: Use a Framework as backend (Django)
- Major module: Standard user management, authentication, users across
tournaments (normal login)
- Major module: Multiplayers (more than 2 in the same game).
- Major module: Add Another Game with User History and Matchmaking.
- Major module: Implement Two-Factor Authentication (2FA) and JWT.

- Minor module: Use a front-end framework or toolkit.
- Minor module: Use a database for the backend.
- Minor module: Game Customization Options.
- Minor module: Expanding Browser Compatibility.
- Minor module: Multiple language supports.
- Minor module: Add accessibility for Visually Impaired Users.
```

Timeline: asp

Meeting: weekly meetings, every monday at 13:00-15:00

## Schedules: 
- simos:
  8:30 - 14:30 / 16:30
- lucas:
  wed/thu (evening teams call) else free
  other days are fine
- lumi:
  mon / thu can come to school during working hours
- aarni:
  flexible
- vilja:
  flexible

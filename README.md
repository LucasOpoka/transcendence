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

Admin site:
https://127.0.0.1:8042/admin


## Points:
```
1. WEB
- Major module: Use a Framework as backend (Django)
- Minor module: Use a front-end framework or toolkit.
- Minor module: Use a database for the backend.

2. USER MANAGEMENT
- Major module: Standard user management, authentication, users across
tournaments (normal login)
  ◦ Users can subscribe to the website in a secure way.
  ◦ Registered users can log in in a secure way.
  ◦ Users can select a unique display name to play the tournaments.
  ◦ Users can update their information.
  ◦ Users can upload an avatar, with a default option if none is provided.
  ◦ Users can add others as friends and view their online status.
  ◦ User profiles display stats, such as wins and losses.
  ◦ Each user has a Match History including 1v1 games, dates, and relevant
  details, accessible to logged-in users.

3. GAMEPLAY AND USER EXPERIENCE
- Major module: Multiplayers (more than 2 in the same game).
  It is possible to have more than two players. Each player needs a live control (so
  the previous “Distant players” module is highly recommanded). It’s up to you to
  define how the game could be played with 3, 4, 5, 6 ... players. Along with the
  regular 2 players game, you can choose a single number of players, greater than
  2, for this multiplayer module. Ex: 4 players can play on a squarred board, each
  player owns one unique side of the square.

- Major module: Implement a chat system.
  You have to create a chat for your users in this module:
  ◦ The user should be able to send direct messages to other users.
  ◦ The user should be able to block other users. This way, they will see no more
  messages from the account they blocked.
  ◦ The user should be able to invite other users to play a Pong game through the
  chat interface.
  ◦ The tournament system should be able to warn users expected for the next
  game.
  ◦ The user should be able to access other players profiles through the chat in-
  terface.

- Major module: Add Another Game with User History and Matchmaking.
  In this major module, the objective is to introduce a new game, distinct from Pong,
  and incorporate features such as user history tracking and matchmaking. Key
  features and goals include:
  ◦ Develop a new, engaging game to diversify the platform’s offerings and enter-
  tain users.
  ◦ Implement user history tracking to record and display individual user’s game-
  play statistics.
  ◦ Create a matchmaking system to allow users to find opponents and participate
  in fair and balanced matches.
  ◦ Ensure that user game history and matchmaking data are stored securely and
  remain up-to-date.
  ◦ Optimize the performance and responsiveness of the new game to provide an
  enjoyable user experience. Regularly update and maintain the game to fix
  bugs, add new features, and enhance gameplay.
  This major module aims to expand your platform by introducing a new game,
  enhancing user engagement with gameplay history, and facilitating matchmaking
  for an enjoyable gaming experience.
- Major module: Implement Two-Factor Authentication (2FA) and JWT.

- Minor module: Game Customization Options.
  In this minor module, the goal is to provide customization options for all available
  games on the platform. Key features and objectives include:
  ◦ Offer customization features, such as power-ups, attacks, or different maps,
  that enhance the gameplay experience.
  ◦ Allow users to choose a default version of the game with basic features if they
  prefer a simpler experience.
  ◦ Ensure that customization options are available and applicable to all games
  offered on the platform.
  ◦ Implement user-friendly settings menus or interfaces for adjusting game pa-
  rameters.
  ◦ Maintain consistency in customization features across all games to provide a
  unified user experience.
  This module aims to give users the flexibility to tailor their gaming experience
  across all available games by providing a variety of customization options while
  also offering a default version for those who prefer a straightforward gameplay
  experience.

4. ACCESSIBILITY
- Minor module: Support on all devices.
  In this module, the main focus is to ensure that your website works seamlessly on
  all types of devices. Key features and objectives include:
  ◦ Make sure the website is responsive, adapting to different screen sizes and ori-
  entations, ensuring a consistent user experience on desktops, laptops, tablets,
  and smartphones.
◦ Ensure that users can easily navigate and interact with the website using
differentinput methods, such as 
- Minor module: Expanding Browser Compatibility.
  In this minor module, the objective is to enhance the compatibility of the web
  application by adding support for an additional web browser. Key features and
  objectives include:
  ◦ Extend browser support to include an additional web browser, ensuring that
  users can access and use the application seamlessly.
  ◦ Conduct thorough testing and optimization to ensure that the web application
  functions correctly and displays correctly in the newly supported browser.
  ◦ Address any compatibility issues or rendering discrepancies that may arise in
  the added web browser.
  ◦ Ensure a consistent user experience across all supported browsers, maintaining
  usability and functionality.
  This minor module aims to broaden the accessibility of the web application by
  supporting an additional web browser, providing users with more choices for their
  browsing experience.
- Minor module: Multiple language supports.
  In this minor module, the objective is to ensure that your website supports multiple
  languages to cater to a diverse user base. Key features and goals include:
  ◦ Implement support for a minimum of three languages on the website to ac-
  commodate a broad audience.
  Provide a language switcher or selector that allows users to easily change the
  website’s language based on their preferences.
  ◦ Translate essential website content, such as navigation menus, headings, and
  key information, into the supported languages.
  ◦ Ensure that users can navigate and interact with the website seamlessly, re-
  gardless of the selected language.
  ◦ Consider using language packs or localization libraries to simplify the transla-
  tion process and maintain consistency across different languages.
  ◦ Allow users to set their preferred language as a default choice for subsequent
  visits to the website.
  This minor module aims to enhance the accessibility and inclusivity of your website
  by offering content in multiple languages, making it more user-friendly for a diverse
  international audience.

- Minor module: Add accessibility for Visually Impaired Users.
  In this minor module, the goal is to make your website more accessible for visually
impaired users. Key features include:
◦ Support for screen readers and assistive technologies.
◦ Clear and descriptive alt text for images.
◦ High-contrast color scheme for readability.
◦ Keyboard navigation and focus management.
◦ Options for adjusting text size.
◦ Regular updates to meet accessibility standards.
This module aims to improve the website’s usability for individuals with visual
impairments and ensure compliance with accessibility standards.
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

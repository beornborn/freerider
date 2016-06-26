# test scenarios

1. Games list

in a game:
- user see his current game with button 'Back to game' in the top
- user is unable to enter other games,
- user dont see animation on hover on other games
- user can click round floating button to leave game
- user cant open dialog for creation new game

not in a game:
- user see list of games with animation onhover where he can connect
- user can open dialog for game creation and create a game

2. Create game

- creator must be redirected to game page and see `awaiting others` state
- others must see animation with new game appearead in games list

3. Enter game

- user redirected to game
- other users see update for this game in games list
- players see update in the game
- if game is full game starts for all players

4. Leave game

game state: waiting for start
- user redirected to dashboard and is not anymore in a game
- players see update in the game
- users see update for this game in games list

game state: in progress
- user redirected to games list and disconnected from the game and can't return to game
- players see that user disconnected

game state: finished
- user redirected to games list and disconnected from the game and can't return to game

5. Game

game state: waiting for start
- user see all connected players and waiting slots for rest.
- game starts automaticaly when game is full

game state: in progress
- every new round starts with fresh timer value
- if timer finished and not all players made decision, new round begins
- user can press 'ride free' or 'buy ticket'
- players see that user disconnected

game state: finished
- user redirected to games list and disconnected from the game and can't return to game

6. Making decision('ride free' or 'buy ticket')

- user can push one of theses buttons only once per round
- after push user see appropriate status and all players see animation that user made decision
- if user makes decision last, then new round begins or game is finished



















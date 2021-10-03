'use strict';

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
  [
  'Neuer',
  'Pavard',
  'Martinez',
  'Alaba',
  'Davies',
  'Kimmich',
  'Goretzka',
  'Coman',
  'Muller',
  'Gnarby',
  'Lewandowski',
  ],
  [
  'Burki',
  'Schulz',
  'Hummels',
  'Akanji',
  'Hakimi',
  'Weigl',
  'Witsel',
  'Hazard',
  'Brandt',
  'Sancho',
  'Gotze',
  ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski',
  'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
  team1: 1.33,
  x: 3.25,
  team2: 6.5,
  },
  };

  const [players1, players2] = game.players;
  
  const [gk1, ...fieldPlayers1] = players1;
  
  const allPlayers = [...players1, ...players2];

  const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic']; 

  const {team1, x:draw, team2} = game.odds;

  const printGoals = function(...playerNames) {
      for(let i = 0; i < playerNames.length; i++) {
        console.log(`Goal: ${playerNames[i]}!`);
      }
      console.log(`Number of goals scored: ${playerNames.length}`);
  }

printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');

team1 < draw && team1 < team2 && console.log(`The team most likely to win is ${game.team1}!`);

team2 < draw && team2 < team1 && console.log(`The team most likely to win is ${game.team2}!`);

draw <= team1 && draw <= team2 && console.log(`The game will most likely end in a draw!`);
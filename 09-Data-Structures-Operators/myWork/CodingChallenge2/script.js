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

  for (let i = 0; i < game.scored.length; i++) {
      console.log(`Goal ${i + 1}: ${game.scored[i]}`);
  }

  let sumOdds = 0;
  const odds = Object.values(game.odds);
  for(const odd of odds) {
    sumOdds += odd;
  }
  const avgOdd = (sumOdds * 1.0) / odds.length;
  
  console.log(avgOdd);

  const oddEntries = Object.entries(game.odds);

  for(const oddEntry of oddEntries) {
    const teamName = oddEntry[0];
    const teamOdd = oddEntry[1];

    if (teamName === 'x') {
      console.log(`Odd of draw: ${teamOdd}`);
    
    } else {
      console.log(`Odd of victory ${game[teamName]}: ${teamOdd}`)
    }
  }

const scorers = {};

for (const scorer of game.scored) {
  if (scorers[scorer]) {
    const scoredSoFar = scorers[scorer];
    scorers[scorer] = scoredSoFar + 1;
  
  } else {
    scorers[scorer] = 1;
  }
}

console.log(scorers);
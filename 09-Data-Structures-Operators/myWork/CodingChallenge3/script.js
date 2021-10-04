'use strict';

const gameEvents = new Map([
  [17, '⚽ GOAL'],
  [36, '� Substitution'],
  [47, '⚽ GOAL'],
  [61, '� Substitution'],
  [64, '� Yellow card'],
  [69, '� Red card'],
  [70, '� Substitution'],
  [72, '� Substitution'],
  [76, '⚽ GOAL'],
  [80, '⚽ GOAL'],
  [92, '� Yellow card'],
  ]);

  const events = [...(new Set(gameEvents.values()))];

  console.log(events);

  gameEvents.delete(64);

  console.log(gameEvents);

  const minutesPerEvent = 90.0 / gameEvents.size;

  console.log(`An event happened, on average, every ${minutesPerEvent} minutes`)

  for (const gameEvent of gameEvents) {
    // console.log(gameEvent);
    const [minute, event] = gameEvent;

    let halfString;

    if (minute <= 45) {
      halfString = `[FIRST HALF] `;
    } else {
      halfString = `[SECOND HALF] `;
    }

    const elementString = halfString + `${minute}: ${event}`;
    console.log(elementString);

  }
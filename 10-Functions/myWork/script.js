'use strict';

const greet = greeting => name => console.log(`${greeting} ${name}`);
    
const greeterHey = greet('Hey');
greeterHey('Jonas');
greeterHey('Steven');

greet('Hello')('Jonas');
'use strict';

const greet = greeting => name => console.log(`${greeting} ${name}`);
    
const greeterHey = greet('Hey');
greeterHey('Jonas');
greeterHey('Steven');

greet('Hello')('Jonas');


const addTAX = function (rate) {
    return function (value) {
        return value + (value * rate);
    }
} 

const addVAT = addTAX(0.23);
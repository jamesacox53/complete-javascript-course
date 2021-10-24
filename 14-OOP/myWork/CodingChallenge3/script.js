'use strict';


const Car = function (make, speed) {
    
    this.make = make;
    this.speed = speed;
};

Car.prototype.accelerate = function () {
    
    this.speed += 10;
    console.log(this.speed);
};

Car.prototype.brake = function () {
    
    this.speed -= 5;
    console.log(this.speed);
};

// 1.

const EV = function (make, speed, charge) {
    
    Car.call(this, make, speed);
    this.charge = charge;
}

EV.prototype = Object.create(Car.prototype);
EV.prototype.constructor = EV;

// 2.

EV.prototype.chargeBattery = function (chargeTo) {

    this.charge = chargeTo;
}

// 3.

EV.prototype.accelerate = function () {
    this.speed += 20;
    this.charge--;
    console.log(`${this.make} going at ${this.speed}km/h with a charge of ${this.charge}%`);
}


const electricCar = new EV('Tesla', 120, 23);

// 4.
// Electric Car 
console.log('Electric Car');
electricCar.accelerate();
electricCar.accelerate();
electricCar.chargeBattery(90);
electricCar.accelerate();
electricCar.brake();
electricCar.brake();
electricCar.brake();
electricCar.brake();
electricCar.brake();
electricCar.accelerate();
console.log(electricCar);
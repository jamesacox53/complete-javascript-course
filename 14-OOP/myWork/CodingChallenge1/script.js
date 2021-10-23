'use strict';

// 1.

const Car = function (make, speed) {
    
    this.make = make;
    this.speed = speed;
};

// 2.

Car.prototype.accelerate = function () {
    
    this.speed += 10;
    console.log(this.speed);
};

// 3.

Car.prototype.brake = function () {
    
    this.speed -= 5;
    console.log(this.speed);
};

// 4.

const car1 = new Car('BMW', 120);
const car2 = new Car('Mercedes', 95);

// Car 1
console.log('Car 1');
car1.accelerate();
car1.accelerate();
car1.brake();
car1.brake();
car1.brake();
car1.brake();
car1.brake();
car1.accelerate();

// Car 2
console.log('Car 2');
car2.accelerate();
car2.accelerate();
car2.accelerate();
car2.accelerate();
car2.brake();
car2.brake();
car2.accelerate();
car2.accelerate();
car2.accelerate();
car2.accelerate();

// Car 1 and 2
console.log('Cars 1 & 2');
car1.accelerate();
car2.accelerate();
car2.accelerate();
car1.brake();
car1.brake();
car2.brake();
car1.accelerate();
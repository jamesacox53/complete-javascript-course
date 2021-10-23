'use strict';

// 1.

class CarCl {
    
    constructor(make, speed) {
    
    this.make = make;
    this.speed = speed;
    }

    accelerate () {
        
        this.speed += 10;
        console.log(this.speed);
    }

    brake () {
        
        this.speed -= 5;
        console.log(this.speed);
    }

    // 2.
    get speedUS () {
        return this.speed / 1.6;
    }

    // 3.
    set speedUS (speed) {
        this.speed = speed * 1.6;
    }
}

const car1 = new CarCl('Ford', 120);

// Car 1
console.log('Car 1');
console.log(car1.speedUS);
car1.accelerate();
console.log(car1.speedUS);
car1.accelerate();
console.log(car1.speedUS);
car1.brake();
console.log(car1.speedUS);

console.log('US Speed 50');
car1.speedUS = 50;
console.log(car1.speed);
car1.brake();
console.log(car1.speedUS);
car1.brake();
console.log(car1.speedUS);
car1.brake();
console.log(car1.speedUS);
car1.brake();
console.log(car1.speedUS);
car1.accelerate();
console.log(car1.speedUS);

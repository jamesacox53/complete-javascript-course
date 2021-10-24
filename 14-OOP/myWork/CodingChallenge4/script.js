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
        return this;
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

// 1.
class EVCl extends CarCl {

    // 2.
    #charge;

    constructor(make, speed, charge) {
        
        super(make, speed);
        this.#charge = charge;
    }

    // 3.

    chargeBattery (chargeTo) {

        this.#charge = chargeTo;
        return this;
    }

    accelerate () {
        this.speed += 20;
        this.#charge--;
        console.log(`${this.make} going at ${this.speed}km/h with a charge of ${this.#charge}%`);

        return this;
    }

}


const electricCar = new EVCl('Rivian', 120, 23);

// Electric Car 
console.log('Electric Car');
electricCar.accelerate().accelerate().chargeBattery(90).accelerate().brake().brake().brake().brake().brake().accelerate();
console.log(electricCar);
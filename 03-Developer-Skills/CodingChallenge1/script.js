// Remember, we're gonna use strict mode in all scripts now!
'use strict';

const printForecast = function (arr) {
    let output = '';
    for(let i = 0; i < arr.length; i++) {
        let dayOrDays = 'days';
        let start = ' ';
        if (i === 0) {
            dayOrDays = 'day';
            start = '... ';
        }

        output = output.concat(`${start}${arr[i]}ºC in ${i + 1} ${dayOrDays} ...`);
        
    }
    console.log(output);
}

const testData1 = [17, 21, 23];
const testData2 = [12, 5, -5, 0, 4];

printForecast(testData1);
printForecast(testData2);
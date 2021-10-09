'use strict';

const poll = {
    question: 'What is your favourite programming language?',
    options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
    // This generates [0, 0, 0, 0]. More in the next section 😃
    answers: new Array(4).fill(0),
    registerNewAnswer: function () {
        const successfullyExecuted = displayQuestionAndOptionsPrompt(this.question, this.options,this.answers);

        if (successfullyExecuted) {
            this.displayResultsPoll('string');
        }
    },
    displayResultsPoll: function (type='array') {
        displayResults(this.answers, type);
    } 
};

const displayQuestionAndOptionsPrompt = function(question, options, answers) {
    const promptQuestion = getQuestionAndOptionsAsString(question, options);

    const answer = getAnswerFromPromptAsNumber (promptQuestion, options);

    if (answer === null) {
        return false;
    }

    answers[answer]++;
    return true;
}


const getAnswerFromPromptAsNumber = function (promptQuestion, options) {
    
    let input = -1;
    let recievedValidInput = false;
    let askedPromptQuestion = promptQuestion;

    while (!recievedValidInput) {
        const promptInput = prompt(askedPromptQuestion);
        
        if (promptInput === null) {
            return null;
        }

        input = parseInt(promptInput, 10);

        if (Number.isNaN(input) || input < 0 || input >= options.length) {
            askedPromptQuestion = promptQuestion + `\nPlease input a number between 0 and ${options.length - 1}.`;
        
        } else {
            recievedValidInput = true;
        }
    }
    return input;
}

const getQuestionAndOptionsAsString = function(question, options) {
    let retString = question + "\n";
    
    for(let i = 0; i < options.length; i++) {    
        
        retString += options[i] + "\n";
    }

    retString += "(Write option number)";
    
    return retString;
} 

const displayResults = function (answers, type='array') {
    if (type === 'string') {
        
        const results = answers.join(', ');
        console.log(`Poll results are ${results}`);
    
    } else if (type === 'array') {
        console.log(answers);

    }
}

const answerPollButton = document.querySelector('.poll');

answerPollButton.addEventListener('click', poll.registerNewAnswer.bind(poll));

displayResults([5, 2, 3], 'string');
displayResults([1, 5, 3, 9, 6, 1], 'array');
displayResults([1, 5, 3, 9, 6, 1]);

poll.displayResultsPoll.call({answers: [5, 2, 3]}, 'string');
poll.displayResultsPoll.call({answers: [1, 5, 3, 9, 6, 1]}, 'array');
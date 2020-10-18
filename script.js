const Stack = require('./Stack.js');
const prompt = require('prompt-sync')();
// ------------------------------
// Initialization
// ------------------------------
const backPages = new Stack();
const nextPages = new Stack();
let currentPage = "Home";
// ------------------------------
// Helper Functions
// ------------------------------
const showCurrentPage = (action) => {
  console.log(`The action is ${action}`);
  console.log(`The current page is ${currentPage}`);
  console.log(`The previous page is ${backPages.peek()}`);
  console.log(`The next page is ${nextPages.peek()}`);
}
const newPage = (page) => {
  backPages.push(currentPage);
  currentPage = page;
  while(!nextPages.isEmpty()) {
    nextPages.pop();
  }
  showCurrentPage();
}
const backPage = () => {
  nextPages.push(currentPage);
  currentPage = backPages.pop();
  showCurrentPage();
}

const nextPage = () => {
  backPages.push(currentPage);
  currentPage = nextPages.pop();
  showCurrentPage();

}

/*
 * The following strings are used to prompt the user
 */
const baseInfo = '\nEnter a url';
const backInfo = 'B|b for back page';
const nextInfo = 'N|n for next page';
const quitInfo = 'Q|q for quit';
const question = 'Where would you like to go today? '

// ------------------------------
// User Interface Part 1
// ------------------------------
let finish = false;
let showBack = false;
let showNext = false;

showCurrentPage('Start');
while(!finish) {
  let instructions = baseInfo;
  if(!backPages.isEmpty()) {
    showBack = true;
    instructions += ", " + backInfo;
  } else {
    showBack = false;
  }
  if(!nextPages.isEmpty()) {
    showNext = true;
    instructions += ', ' + nextInfo;
  } else {
    showBack = false;
  }
  instructions += ', ' + quitInfo;
  console.log(instructions);


  // ------------------------------
  // User Interface Part 2
  // ------------------------------
  const answer = prompt(question)
  const lowerCaseAnswer = answer.toLowerCase();
  if(lowerCaseAnswer !== 'b' && lowerCaseAnswer !== 'q' && lowerCaseAnswer !== 'n') {
    newPage(answer)
  } else if (lowerCaseAnswer === 'b') {
    if (showBack === true) {
      backPage();
      } else {
        console.log("No previous page")
      }
  } else if (lowerCaseAnswer === 'n') {
    if (showNext === true) {
      nextPage();
    } else {
      console.log("No next page")
    }
    
  } else if (lowerCaseAnswer === 'q') {
    finish = true;
  }
}
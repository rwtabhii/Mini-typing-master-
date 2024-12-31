//   //Complete the given scaffold to implement all the functionalities mentioned in the problem Statement.
//   const sentences = 
//     `The quick brown fox jumps over the lazy dog.
//     Sphinx of black quartz, judge my vow.
//     Pack my box with five dozen liquor jugs.
//     How vexingly quick daft zebras jump!`
//   ;



//   let timer;
//   let startTime;
//   function setTime(getinput){
//     let seconds = 30;
//     timer = setInterval(()=>{
  
//     const timerPara = document.querySelector("#timer");
//     if(seconds >= 10){
//       timerPara.innerHTML = `00:${seconds}`;
//     }
//     else if(seconds > 0){
//       timerPara.innerHTML = `00:0${seconds}`;
//     }
//     else{
//       timerPara.innerHTML = `00:00`;
//       clearInterval(timer);
//       endQuiz(getinput);
//       showResult();
//     }
//     seconds--;
//     },1000)
//   }


//   function displayText(){
//     const getStartElem = document.querySelector("#start-btn");
//   getStartElem.addEventListener("click",()=>{
//     const getinput = document.querySelector("input");
//     getinput.disabled = false;
//     const showPara = document.querySelector("#sentence");
//     showPara.textContent = sentences;
//     const getstartBtn = document.querySelector("#start-btn");
//     getstartBtn.disabled = true;
//     setTime(getinput);
//     getinput.value = "";
//     getinput.focus();
//     startTime = new Date();

//   })
//   }

//   function endQuiz(getinput) {
//     const firstTypeText = getinput.value.trim();
    
//     // Split the original sentence into characters and filter out spaces
//     const originalChars = sentences.split('').filter(char => char !== ' ');
    
//     // Split the user's typed input into characters and filter out spaces
//     const typedChars = firstTypeText.split('').filter(char => char !== ' ');
  
//     let correctCharactersCount = 0;
    
//     // Compare the characters typed with the original sentence
//     for (let i = 0; i < typedChars.length && i < originalChars.length; i++) {
//       if (typedChars[i] === originalChars[i]) {
//          correctCharactersCount++;
//       }
//     }
//     const timeTaken = (new Date() - startTime) / 1000;
//   const wpm = Math.round((correctCharactersCount / timeTaken) * 60);
//   const totalCharacters = sentences.trim().length; 
//   const accuracy = (correctCharactersCount / totalCharacters) * 100; 
//   const getwpm = document.querySelector("#speed");
//   const getaccuracy = document.querySelector("#accuracy");
//   console.log(correctCharactersCount);
//   getwpm.textContent = wpm;
//   getaccuracy.textContent = accuracy.toFixed(2); 
//   getinput.disabled = true;


//   }

//   function showResult(){
//     const getResult = document.querySelector("#result");
//     getResult.style.display = "block";
//     const getstartBtn = document.querySelector("#start-btn");
//     getstartBtn.disabled = true;

    

//   }

//   const getretryBtn = document.querySelector("#retry-btn");
//   getretryBtn.addEventListener("click",()=>{
//     const getResult = document.querySelector("#result");
//     getResult.style.display = "none";
//     const timerPara = document.querySelector("#timer");
//     timerPara.innerHTML = `00:30`;
//     const getstartBtn = document.querySelector("#start-btn");
//     getstartBtn.disabled = false;
//     const getinput = document.querySelector("input");
//     getinput.disabled = true;
//     getinput.value = "";
    
//   })
//   displayText();
const sentences = 
  `The quick brown fox jumps over the lazy dog . Sphinx of black quartz, judge my vow . Pack my box with five dozen liquor jugs . How vexingly quick daft zebras jump !`
;

let currentSentenceIndex = 0;
let startTime, endTime;
let timerInterval;

const sentenceElement = document.getElementById("sentence");
const inputElement = document.getElementById("input");
const startButton = document.getElementById("start-btn");
const timerElement = document.getElementById("timer");
const speedElement = document.getElementById("speed");
const accuracyElement = document.getElementById("accuracy");
const resultElement = document.getElementById("result");
const retryButton = document.getElementById("retry-btn");


function startTest() {
  sentenceElement.innerHTML = sentences;
  inputElement.value = "";
  inputElement.disabled = false;
  inputElement.focus();
  startButton.disabled = true;
  startTime = new Date();
  timerInterval = setInterval(updateTimer, 1000);
  setTimeout(endTest, 30000); // End the test after 30 seconds
}




function updateTimer() {
  const currentTime = new Date();
  const elapsedTime = Math.floor((currentTime - startTime) / 1000);
  const remainingTime = 30 - elapsedTime;
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  timerElement.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}




function endTest() {
  clearInterval(timerInterval);
  endTime = new Date();
  const elapsedTime = Math.floor((endTime - startTime) / 1000);
  const typedSentence = inputElement.value.trim();
  const correctSentence = sentenceElement.textContent.trim();
  
  let speed = 0;
  let typedWords = [];
  if(typedSentence != ""){
    typedWords = typedSentence.split(" ");
  }
  
  const correctWords = correctSentence.split(" ");
  console.log(correctWords);
  let correctCount = 0;
  let ind =0;
  typedWords.forEach((word, index) => {
    if (word === correctWords[index]) {
      correctCount++;
      ind =index;
    }
  });
  if(typedSentence != ""){
    speed = Math.floor(((correctCount) / 30) * 60);
  }
  const accuracy = (correctCount / correctWords.length  ) * 100;
  speedElement.textContent = speed;
  accuracyElement.textContent = accuracy.toFixed(2);
  resultElement.style.display = "block";
  retryButton.focus();
}




startButton.addEventListener("click", startTest);



retryButton.addEventListener("click", () => {
  resultElement.style.display = "none";
  startButton.disabled = false;
  inputElement.value = "";
});
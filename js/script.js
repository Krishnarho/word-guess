let word, maxGuess, noOfLetters, timer, incorrectLetters=[], correctLetters=[];

const inputs = document.querySelector('.inputs'),
      typingInputs = document.querySelector('.typing-input'),
      hintText = document.querySelector('.hint span'),
      guessText = document.querySelector('.guess-left span'),
      wrongLetter = document.querySelector('.wrong-letter span'),
      timeLeft = document.querySelector('.time-left span'),
      resetBtn = document.querySelector('.reset-btn')  

const initTimer = maxTime => {
    clearInterval(timer);
    timer = setInterval(()=>{
        if(maxTime > 0){
            maxTime--;
            return timeLeft.innerHTML = maxTime;
        }
        clearInterval(timer);  
        if(maxTime == 0){
            alert(`Times Up`);
            for(let i = 0; i < noOfLetters; i++){
                inputs.querySelectorAll('input')[i].value = word[i];
            }
        }
    },1000);
}

function randomWord(){
    initTimer(30);
    incorrectLetters=[], correctLetters=[];
    let ranObj = wordList[Math.floor(Math.random() * wordList.length)];
    word = ranObj.word;
    let hint = ranObj.hint;
    noOfLetters = word.length;    
    maxGuess = noOfLetters < 5 ? 6:8;
    
    let html = "";
    for(let i = 0; i < noOfLetters; i++){
        html += `<input type="text" disable />`;
    }
    inputs.innerHTML = html;
    hintText.innerHTML = hint;
    guessText.innerHTML = maxGuess;
    wrongLetter.innerHTML = incorrectLetters;
    timeLeft.innerHTML = timer;
}
randomWord();

const initGame = (event) =>{
    let key = event.target.value;
        if(key.match(/^[A-Za-z]+$/) && !incorrectLetters.includes(key) && !correctLetters.includes(key)){
            if(word.includes(key)){
                for(let i = 0; i < noOfLetters; i++){
                    if(word[i] === key){
                        correctLetters += key;
                        inputs.querySelectorAll('input')[i].value = key;
                    }
                }     
            }
            else {
                    maxGuess--;
                    incorrectLetters.push(key);
            }
            wrongLetter.innerHTML = incorrectLetters;
            guessText.innerHTML = maxGuess;
        }
        typingInputs.value = "";
    setTimeout(()=>{
        if(correctLetters.length === word.length){
            alert(`Congrats! You found the word ${word.toUpperCase()}`);
            return randomWord();
        }
        else if(maxGuess < 1){
            alert(`Opps! You have no remaing guesses`);
            for(let i = 0; i < noOfLetters; i++){
                    inputs.querySelectorAll('input')[i].value = word[i];
            }
        }
    },100);
}

resetBtn.addEventListener('click', randomWord);
typingInputs.addEventListener('input',initGame);
inputs.addEventListener('click',() => typingInputs.focus());
document.addEventListener('keydown',() => typingInputs.focus());
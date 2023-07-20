let word = "", incorrectLetters=[], correctLetters = [], guess = 0;

const inputs = document.querySelector('.inputs'),
    typingInput = document.querySelector('.typing-input'), 
    hintText = document.querySelector('.hint span'),
    guessText = document.querySelector('.guess-left span'),
    wrongText = document.querySelector('.wrong-letter span'),
    reset = document.querySelector('.reset-btn')

    function randomWord(){
        let html = '';
        let ranObj = wordList[Math.floor(Math.random() * wordList.length)];
        word = ranObj.word;
        guess = word.length >= 5 ? 8 : 6;
        incorrectLetters=[], correctLetters = [];
        for(let i = 0; i < word.length; i++){
            html += `<input type="text" disable />`
        }
        inputs.innerHTML = html;
        hintText.innerHTML = ranObj.hint;
        guessText.innerHTML = guess;
        wrongText.innerHTML = incorrectLetters;
        //console.log(word);
    }
    randomWord();
    
    function initGame(e){ 
        let key = e.target.value.toLowerCase();
        if(key.match(/^[A-Za-z]$/) && !incorrectLetters.includes(key) && !correctLetters.includes(key)) {
            if(word.includes(key)){
               for(let i = 0; i < word.length; i++){
                if(word[i] === key){
                    correctLetters += key;
                    inputs.querySelectorAll('input')[i].value = key;
                }
               } 
            } else {
                guess--;
                incorrectLetters.push(` ${key}`);
            }
            wrongText.innerHTML = incorrectLetters;
            guessText.innerHTML = guess;            
        }
        typingInput.value = "";

        setTimeout(() => {
            if(correctLetters.length === word.length){
                alert(`Word found ${word.toUpperCase()}`);
                return randomWord();
            } else if (guess < 1){
                alert("Oops! your guess limit is over")
                for(let i = 0; i < word.length; i++){
                    inputs.querySelectorAll('input')[i].value = word[i];
                }
            }
     }  ,100);
    }
    reset.addEventListener('click', randomWord)
    typingInput.addEventListener('input', initGame);
    inputs.addEventListener('click', () => typingInput.focus());
    document.addEventListener('keydown', () => typingInput.focus());
    
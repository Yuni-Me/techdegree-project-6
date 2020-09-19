document.addEventListener('DOMContentLoaded', () => {
    // Variables
    const qwerty = document.getElementById('qwerty');
    const phrase = document.querySelector('#phrase');
    const start = document.querySelector('.start');
    const ul = document.querySelector('#phrase ul');
    const scoreboard = document.querySelector('#scoreboard');
    const overlay = document.getElementById('overlay');
    let missed = 0;

    // Phrases
    const phrases = [
        'A diamond in the rough',
        'Pennies from heaven',
        'Preaching to the choir',
        'Let them eat cake',
        'Not my cup of tea',
        'The quick and the dead',
        'Much ado about Nothing',
        'New kid on the block',
        'Look before you leap',
        'My way or the highway'
    ];

    // =================================================
    //      Functions
    // =================================================
    function getRandomPhraseAsArray(arr) {
        const randomNum = Math.floor(Math.random() * 10);
        let phraseArray = arr[randomNum].split("");
        return phraseArray;
    }

    function addPhraseToDisplay(arr) {
        const sentence = [];
        for (let i = 0; i < arr.length; i++) {
            const li = document.createElement('li');
            if (arr[i] === ' ') {
                li.className = 'space';
            } else {
                li.className = 'letter';
                li.textContent = arr[i];
            }
            ul.appendChild(li);
        }
    }
    
    const phraseArray = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(phraseArray);

    function checkLetter(element) {
        const letter = element.textContent;
        let letterCounter = 0;
        for (let i = 0; i < ul.children.length; i++) {
            const li = ul.children[i];
            if (li.textContent.toLowerCase() === letter) {
                li.classList.add('show');
                letterCounter++;
            } 
        }
        if (letterCounter === 0) {
            return null;
        } else {
            return letter;
        }
    } 

    function checkWin() {
        const letterResult = ul.getElementsByClassName('letter');
        const showResult = ul.getElementsByClassName('show');
        const h1 = document.createElement('h1');
        if (letterResult.length === showResult.length) {  
            displayResult('win'); 
        } else if (missed >= 5) {
            ul.innerHTML = '';
            displayResult('lose');   
        }
    }

    function displayResult(elementToDisplay) {
        const banner = (elementToDisplay === 'win') ? 'Congratulations, You WIN!' : 'Sorry, You LOSE!';
        overlay.style.display = 'flex';
        overlay.className = elementToDisplay;
        overlay.querySelector('h2').textContent = banner;
        overlay.getElementsByTagName('A').textContent = 'Try Again';
    }

    function resetGame() {
        ul.innerHTML = '';
        const keyboard = document.querySelectorAll('.keyrow button');
        for (let i = 0; i < keyboard.length; i++) {
            keyboard[i].className = '';
            keyboard[i].disabled = false;
        }
        missed = 0;
        for (let i = 0; i < 5; i++) {
            scoreboard.children[0].children[i].children[0].src = "images/liveHeart.png";
        }
        const phraseArray = getRandomPhraseAsArray(phrases);
        addPhraseToDisplay(phraseArray);
    }
    // =================================================
    //      Event Listeners
    // =================================================
    start.addEventListener('click', (e) => {
        if (e.target.className === 'btn__reset') {
            overlay.style.display = 'none';
        }
    });

    qwerty.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const button = e.target;
            button.classList.add('chosen');
            button.disabled = true;
            const letterFound = checkLetter(button);
            if (letterFound === null) {
                missed++;
                button.classList.add('lose');
                scoreboard.children[0].children[missed - 1].children[0].src = "images/lostHeart.png";
            }
        }
        checkWin();
    });

    overlay.addEventListener('click', (e) => {
        if(e.target.className === 'btn__reset') {
            resetGame();
            overlay.style.display = 'none';
        }
    });
});
const startButton = document.querySelector('.start-btn');
const guessInput = document.getElementById('guess');
const submitButton = document.querySelector('.submit-btn');
const hintForm = document.querySelector('.hint-form');
const currentTurn = document.querySelector('.turn');
const beforeNumber = document.querySelector('.before-number');
const hintText = document.querySelector('.hint-text');

const generateAnswer = () => {
    return Math.floor(Math.random() * 100) + 1;
}

const validateNumber = (number) => {
    if (number == '') {
        alert('숫자를 입력해주세요.');
        return false;
    } else if (number < 1 || number > 100) {
        alert('숫자는 1부터 100사이여야 합니다.');
        return false;
    }
    return true;
}

const restartGame = () => {
    let isRestart = confirm('다시 시작하시겠습니까?');
    if (isRestart) {
        submitButton.disabled = false;
        currentTurn.textContent = 1;
        beforeNumber.textContent = '';
        hintText.textContent = '';
        playGame(1);
    } else {
        return;
    }
}

const playGame = (turn) => {
    const answer = generateAnswer();
    console.log(answer);
    let number = beforeNumber.textContent;

    submitButton.addEventListener('click', () => {
        let submitNumber = guessInput.value;
        let isValidNumber = validateNumber(submitNumber);
        if (isValidNumber) {
            number = submitNumber;

            if (submitNumber == answer) {
                alert('축하합니다 정답입니다!!!');
                hintText.textContent = '정답입니다.';
                submitButton.disabled = true;

                restartGame();
            } else {
                if (submitNumber > answer) {
                    hintText.textContent = '플레이어의 숫자가 너무 높습니다.';
                } else {
                    hintText.textContent = '플레이어의 숫자가 너무 낮습니다.';
                }
    
                turn += 1;
                number = submitNumber;
                
                if (turn == 11) {
                    alert('게임이 끝났습니다!');
                    turn = 1;
                    submitButton.disabled = true;

                    restartGame();
                }

                currentTurn.textContent = turn;
                beforeNumber.textContent = number;
            }   
        }
    })
}

const startGame = () => {
    alert('게임을 시작합니다!');
    startButton.classList.add('hidden');
    hintForm.classList.remove('hidden');

    let turn = 1;

    playGame(turn);
}

startButton.addEventListener('click', startGame);

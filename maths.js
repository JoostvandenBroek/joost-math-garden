var answer;
var score = 0;
var backgroundImages = [];
var questionType = 0;

document.getElementById('additionButton').addEventListener('click', function () {
    const addMessage = confirm('You will stop growing this garden and start\na new garden based on Additions!');
    if (addMessage == true) {
        questionType = 0;
        score = 0;
        backgroundImages = [];
        document.body.style.backgroundImage = backgroundImages;
        nextQuestion();
    } else {
        
    }
            
  });

document.getElementById('subtractionButton').addEventListener('click', function () {
    const subMessage = confirm('You will stop growing this garden and start\na new garden based on Subtractions!');
    if (subMessage == true) {
        questionType = 1;
        score = 0;
        backgroundImages = [];
        document.body.style.backgroundImage = backgroundImages;
        nextQuestion();
    } else {
        
    }
       
  });

function nextQuestion() {
    if (questionType == 0) {
        console.log('This is an addition');
        document.getElementById('operator').innerHTML = '+'
        const n1 = Math.floor(Math.random() * 10);
        document.getElementById('n1').innerHTML = n1;
        const n2 = Math.floor(Math.random() * (10 - n1));
        document.getElementById('n2').innerHTML = n2;
        answer = n1 + n2;
    } else {
        console.log('This is a subtraction');
        document.getElementById('operator').innerHTML = '-'
        const n1 = Math.floor(Math.random() * 10);
        document.getElementById('n1').innerHTML = n1;
        const n2 = Math.floor(Math.random() * (n1 + 1));
        document.getElementById('n2').innerHTML = n2;
        answer = n1 - n2;
    }

}

// function nextQuestion() {
//     const operatorSign = Math.floor(Math.random() * 2);
//     if (operatorSign == 0) {
//         console.log('This is an addition');
//         document.getElementById('operator').innerHTML = '+'
//         const n1 = Math.floor(Math.random() * 5);
//         document.getElementById('n1').innerHTML = n1;
//         const n2 = Math.floor(Math.random() * 6);
//         document.getElementById('n2').innerHTML = n2;
//         answer = n1 + n2;
//     } else {
//         console.log('This is a subtraction');
//         document.getElementById('operator').innerHTML = '-'
//         const n1 = 9 - Math.floor(Math.random() * 5);
//         document.getElementById('n1').innerHTML = n1;
//         const n2 = Math.floor(Math.random() * 6);
//         document.getElementById('n2').innerHTML = n2;
//         answer = n1 - n2;
//     }

// }

// function nextAddQuestion() {
//     document.getElementById('operator').innerHTML = '+'
//     const n1 = Math.floor(Math.random() * 5);
//     document.getElementById('n1').innerHTML = n1;
//     const n2 = Math.floor(Math.random() * 6);
//     document.getElementById('n2').innerHTML = n2;
//     answer = n1 + n2;
// }

// function nextSubQuestion() {
//     console.log('This is a subtraction');
//     document.getElementById('operator').innerHTML = '-'
//     const n1 = 9 - Math.floor(Math.random() * 5);
//     document.getElementById('n1').innerHTML = n1;
//     const n2 = Math.floor(Math.random() * 6);
//     document.getElementById('n2').innerHTML = n2;
//     answer = n1 - n2;
// }

function checkAnswer() {
    const prediction = predictImage();
    console.log(`answer: ${answer}, prediction: ${prediction}`);

    if (prediction == answer) {
        score++;
        console.log(`Correct. Score ${score}`);
        if (score <= 6) {
            backgroundImages.push(`url('images/background${score}.svg')`);
            document.body.style.backgroundImage = backgroundImages;
        } else {
            alert('Well done! Your math garden is in full bloom! Want to start again?');
            score = 0;
            backgroundImages = [];
            document.body.style.backgroundImage = backgroundImages;
        }

    } else {
        if (score != 0) { score--; }
        console.log(`Wrong. Score ${score}`);
        alert('Oops! Check your calculations and try writing the number neater next time');
        setTimeout(function () {
            backgroundImages.pop();
            document.body.style.backgroundImage = backgroundImages;
        }, 1000);
    }
}
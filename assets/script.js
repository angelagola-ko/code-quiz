// AS A coding boot camp student
// I WANT to take a timed quiz on JavaScript fundamentals that stores high scores
// SO THAT I can gauge my progress compared to my peers
// GIVEN I am taking a code quiz
// WHEN I click the start button
// THEN a timer starts and I am presented with a question
// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and score
//test
//  1 Quiz Questions
//  a. Create a series of questions.
//  b. Make the answers clickable
//     ba. Mark Correct/Wrong
//  d. present another question.
//     da. Mark Correct/Wrong
//
//  2 Timer
//  a. Start timer when Start button is clicked.
//   aa. Also, present a question.
//  b. When question is wrong -> time subtracted from time clock.
//  c. Time ends -> Game over. 
//    ab. Create if statement for 2 seconds, 1 second, 0 seconds.
//
//  3 Stored Data
//  a. Store highscores in browser.
//  b. Grab highscores and present to people.
let score=0;
let highScore=0;// I dont think I need this. 
let qI = 0;
let clockId;
let time = 30;
let banner = document.querySelector('.banner');
document.querySelector('#start').addEventListener('click',handleStart);

function handleStart() {
    clockId = setInterval(handleClock,1000);
    handleQuestions();
};

function handleQuestions() {
    if(qI<questions.length){
        let taskInfoE1 = document.createElement("div");
        const { Q,A,C } = questions[qI];
        qI++; 
        banner.innerHTML = `<h2>${Q}</h2>`;
        A.forEach(ans => {
            let btn = document.createElement('button');
            btn.innerText = ans;
            btn.addEventListener('click', (e) => {
                if(C == e.target.innerText){
                    taskInfoE1.className = "markit";
                    taskInfoE1.innerHTML = "<p>" + "Correct" + "</p>";
                    score +=1;
                } else {
                    time -= 10;
                    taskInfoE1.className = "markit";
                    taskInfoE1.innerHTML = "<p>" + "Incorrect" + "</p>";
                };
                setTimeout(handleQuestions,1000);
            })
            banner.appendChild(btn);
            banner.appendChild(taskInfoE1);
        }); 
    };

    if (qI === questions.length) {
        banner.innerHTML = `<h1>All Done!</h1>
                            <p>Your final score is ${score}.</p>
                            <p>Enter initials: <input id='initials'></input></p>
                            <button onclick='handleSubmit()'>Submit</button>`;
    }
}

function handleSubmit() {
    if(localStorage.scores == undefined) localStorage.scores = '[]';
    let initials = document.getElementById('initials').value;
    let store = eval(localStorage.scores);

    console.log('store: ',store);
    store.push({[initials]:score});

    banner.innerHTML = '<h1>High scores</h1><ol>';

    store.forEach(item => {
        Object.entries(item).forEach(([key,val])=>{
            banner.innerHTML += `<li>${key}: ${val}</li>`
        });
    });

    localStorage.scores = JSON.stringify(store);

    banner.innerHTML += `</ol><p><button onclick="parent.location='index.html'">Go Back</button><button>Clear high scores</button></p>`
};


//Create function that stores score
if (score > parseInt(localStorage.getItem("highscore"))) {
    localStorage.setItem("highscore", score);

    };

//Create a function that goes to next page "All Done"
//Your final score is:
//Enter intials//
//Submit

function handleClock() {
    time--;

    if(time < 1) {
        clearInterval(clockId);
        time = 0;
    };

    document.querySelector('#time').innerHTML = time;
};
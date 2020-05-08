const holes = document.querySelectorAll(".hole");
const score = document.querySelector(".score");
const mole = document.querySelectorAll(".mole-img");
const timer = document.querySelector(".time");
const startGameBtn = document.querySelector(".startBtn");
const soundOffBtn = document.querySelector(".aBtn");
const soundOnBtn = document.querySelector(".bBtn");



const gamePlayerName = localStorage.getItem("gamePlayerName");
const bgSound = new Audio();
const popSound = new Audio();
const successSound = new Audio();
const failSound = new Audio();
failSound.src = "sounds/failSound1.mp3";
successSound.src = "sounds/succesSound.mp3";
bgSound.src = "sounds/bg1.mp3";
popSound.src = "sounds/pop1.mp3";





let lastHole;
let number = 0;
let timeUp = false;
let idx;
let hole;
let timeOut;
let timeInterval;
let timerTime;


soundOnBtn.addEventListener("click", () => {
    if (!timeUp) {
        bgSound.play();

    }
})
soundOffBtn.addEventListener("click", () => {
    bgSound.pause();
})

////////////////////////////  MOLE CLICK   //////////////////////
mole.forEach(function (item) {
    item.addEventListener("click", (e) => {
        hole.classList.remove("up");
        clearTimeout(timeOut);


        if (!timeUp) {
            number++
            score.innerHTML = number;

            peep();
        }

    })
})

///////////////////////  RANDOM POP TIME  //////////////////////

function randomTime(min, max) {
    return Math.ceil(Math.random() * (max - min) + min);
}

////////////////////////////  RANDOM HOLE //////////////////////
function randomHole() {

    idx = Math.floor(Math.random() * 6);

    if (idx === lastHole) {
        if (idx === 5) {
            idx--;
        } else {
            idx++;
        }
    }

    lastHole = idx;
    return idx;
}

//////////////////////////// virusis pop //////////////////////

function peep() {
    const time = randomTime(1000, 2000);
    hole = holes[randomHole()];
    hole.classList.add("up");
    popSound.play();

    timeOut = setTimeout(() => {
        // bolo virusi ro chavides tavisit

        if (timeUp) {
            setTimeout(() => {
                hole.classList.remove("up");
                updateLeaderboard();


            }, 500);
        } else {
            hole.classList.remove("up");

        }


        // tu dro araa amowuruli ,rekursa
        if (!timeUp) {
            peep();
        }
    }, time);
}

////////////////////////////  GAME START //////////////////////
startGameBtn.addEventListener("click", startGame);
function startGame() {
    startGameBtn.removeEventListener("click", startGame);
    startGameBtn.classList.remove("startBtnActive");
    timerTime = 30;
    timer.innerHTML = timerTime;

    timeInterval = setInterval(() => {
        timerTime--;
        timer.innerHTML = timerTime;

    }, 500);


    bgSound.play();
    score.innerHTML = 0;
    number = 0;
    timeUp = false;
    peep();

    // game duration
    setTimeout(() => {
        hole.classList.remove("up");

        timeUp = true;
        bgSound.pause();
        bgSound.load();

        clearInterval(timeInterval);
        if (score.innerHTML != 0) {
            successSound.play();


            Swal.fire(
                'Good job!',
                `გილოცავ, შენ მოკალი ${score.innerHTML}  ვირუსი! ფაქტობრივად კაცობრიობა იხსენი დაღუპვისაგან! `,
                'success'
            )


        } else {
            failSound.play();
            Swal.fire({
                icon: 'error',
                title: 'დებილი ხარ რა, ვერცერთი ვერ მოკალი!',
                text: 'ახლა შენს გამო  ხალხი დაიხოცება!',

            })

        }




        startGameBtn.addEventListener("click", startGame);
        startGameBtn.classList.add("startBtnActive");



    }, 15000);
}
////////////////////////////  RESTART //////////////////////
function restartGame() {
    location.reload(true);
}





/****************************************************************************/
/****************************************************************************/
/****************************************************************************/
/****************************************************************************/
/****************************************************************************/
/****************************************************************************/
/****************************************************************************/
/****************************************************************************/
/****************************************************************************/
/****************************************************************************/
/*                          leaderboard thing                                */




//////////////////////////////  RULE BUTTONS  ////////////////////////////
/* rules */

const rules = document.querySelector(".rules");
const showRules = document.querySelector(".rules-btn");
const closeBtn = document.querySelector(".close-btn");

showRules.addEventListener("click", () => {
    rules.classList.add("change");

})

closeBtn.addEventListener("click", () => {
    rules.classList.remove("change");
    //rules.classList = ("rules");

})
/* **************************************** LeaderBouard ***************/
const leaderBtn = document.querySelector(".leader-btn");
const leaderBoard = document.querySelector(".leader-list");
const closeLeader = document.querySelector(".leader-close");


leaderBtn.addEventListener("click", () => {
    leaderBoard.classList.add("ch");


})
closeLeader.addEventListener("click", () => {
    leaderBoard.classList.remove("ch");


})


/************************ LEADER BOARD MAIN JAVASCRITP  ***************************/
/******************************************************************************** */
/******************************************************************************** */
/******************************************************************************** */
/******************************************************************************** */
/******************************************************************************** */
/******************************************************************************** */
/******************************************************************************** */
/******************************************************************************** */


const tableScores = document.querySelectorAll(".leaderboardScore");
const tableNames = document.querySelectorAll(".nick");
const tableDates = document.querySelectorAll(".date");

if (typeof localStorage.getItem("stringArray") != "object") {
    // console.log("shemovida pirvel if shi");
    // console.log(typeof localStorage.getItem("stringArray"));

    let startArray = JSON.parse(localStorage.getItem("stringArray"));

    // console.log(startArray);

    for (let i = 0; i < 10; i++) {
        if (typeof startArray[i] !== "undefined") {

            tableScores[i].textContent = startArray[i].score;
            tableNames[i].textContent = startArray[i].name;
            tableDates[i].textContent = startArray[i].date;


        } else {
            break;
        }
    }
    var array = [...startArray];
} else {
    var array = []; // var imito minda ro garetac chandes  elsedan da  click shic 
    // console.log("shemovida ELSE SHI ");
}


let stringArray;
let localStorageArray = [];



let array2 = [];

let Person = {};


function updateLeaderboard() {





    let date = new Date();
    //  wlebi
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();

    //saatebi 
    let hours = date.getHours();
    let minutes = date.getMinutes();

    // saboloo tarigis sheqmna/\\\\\\\\\\\\\
    let myDate = `${day}/${month + 1}/${year}, ${hours}:${minutes}`;


    // SCORE\\\\\\\\\\\\
    let leaderboardScore = score.innerHTML;


    // name\\\\\\\\\\\\\
    let name = gamePlayerName;

    person = {
        name: name,
        date: myDate,
        score: leaderboardScore,

    }

    array.push(person);

    // console.log("array :", array);

    function compare(a, b) {
        let scoreA = a.score;
        let scoreB = b.score;

        return scoreB - scoreA;


    }
    array2 = [...array].sort(compare);

    // console.log("array2 :", array2);

    /****************aqamde yvelaferi kargad aris  *****************/


    for (let i = 0; i < 10; i++) {
        if (typeof array2[i] !== "undefined") {
            localStorageArray[i] = array2[i];

        } else {
            break;
        }
    }
    /* let stringArray = JSON.stringify(localStorageArray);
    console.log("stringArray:", stringArray);



    localStorage.setItem("stringArray", stringArray); */



    for (let i = 0; i < 10; i++) {
        if (typeof localStorageArray[i] !== "undefined") {

            tableScores[i].textContent = localStorageArray[i].score;
            tableNames[i].textContent = localStorageArray[i].name;
            tableDates[i].textContent = localStorageArray[i].date;

        } else {
            break;
        }
    }
    stringArray = JSON.stringify(localStorageArray);
    // console.log("stringArray:", stringArray);
    // console.log("-------------------------------------------");
    localStorage.setItem("stringArray", stringArray);




}



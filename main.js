const slides = document.querySelectorAll(".slide");
const next = document.querySelector("#next");
const prev = document.querySelector("#prev");

const auto = true;
const intervalTime = 5000;
let slideInterval;



/* 
setInterval(() => {
    nextSlide();
}, intervalTime); */







// prev.onclick=() =>...
const nextSlide = () => {
    const current = document.querySelector(".current");
    current.classList.remove("current");

    //check for next slide 
    if (current.nextElementSibling) {
        //add current to next sibling 
        current.nextElementSibling.classList.add("current");
    } else {
        // go to first div 
        slides[0].classList.add("current");
    }

    setTimeout(() => current.classList.add("current111"), 3000);


}

//prev.onclick=()=> ...
const prevSlide = () => {
    const current = document.querySelector(".current");

    current.classList.remove("current");

    //check for next slide 
    if (current.previousElementSibling) {
        //add current to next sibling 
        current.previousElementSibling.classList.add("current");
    } else {
        // go to first div 
        slides[5].classList.add("current");
    }


}

//button events 

next.addEventListener("click", () => {
    nextSlide();

    if (auto) {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, intervalTime);
    }

})
prev.addEventListener("click", () => {
    prevSlide();
    if (auto) {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, intervalTime);
    }
})


if (auto) {
    slideInterval = setInterval(nextSlide, intervalTime);
}


// ******************** IVENTEBI *************//
const leftBtn = document.querySelector(".left-button>button");
const rightBtn = document.querySelector(".right-button>button");
const leftInfo = document.querySelector(".game-info");
const rightInfo = document.querySelector(".about");


leftBtn.addEventListener("click", () => {
    console.log(2);
    rightInfo.classList.remove("currentRight");

    leftInfo.classList.toggle("currentLeft");
})
rightBtn.addEventListener("click", () => {
    leftInfo.classList.remove("currentLeft");

    rightInfo.classList.toggle("currentRight");

})


///////////// saxelze wvdoma //////////////
const nickname = document.querySelector(".nick");
const nickBtn = document.querySelector(".nickBtn");


let playerName;
nickBtn.addEventListener("click", (e) => {
    if (nickname.value === "") {
        nickname.style.border = "2px solid red";
        e.preventDefault();

    } else {
        playerName = nickname.value;
        // e.preventDefault();

        localStorage.setItem("gamePlayerName", playerName);
    }

})

const windowHi = document.querySelector(".modal-rules")
const usernameIn = document.querySelector("#username")
const startBtn = document.querySelector(".btn-start")

// main content
const usernameMain = document.querySelector("#username-block")
const timer = document.querySelector("#timer-count")
const gasoline = document.querySelector(".gasoline-number")

const player = document.querySelector("#player")
const back1 = document.querySelector("#b1")
const back2 = document.querySelector("#b2")


let walls = document.querySelectorAll(".wall")

let hiMenu = startBtn.addEventListener("click", () => {
    console.log(usernameIn.value)
    let username = usernameIn.value
    if (username.trim() != ""){
        startGame(username, windowHi)
    }
})
startGame("dsa", windowHi)





function startGame(username, window){
    window.classList.add("close")
    window.classList.remove("modal")

    usernameMain.innerText = username

    player.style.left = "13%"
    player.style.top = "50%"

    back1.style.left = "0%"
    back2.style.left = "100%"


    
    let left = 1024
    for (let i = 0; i < walls.length; i++) {
        let wall = walls[i];
        changeWall(wall)
        wall.style.left = left+i*300 + "px"
        console.log("cahnge")

    }

    function randomIntFromInterval(min, max) { // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    var randHeight
    function randPos(){
        randHeight = randomIntFromInterval(100, 500)
        randpos = randomIntFromInterval(1, 2)
        return [randHeight, randpos]
    }


    let sec = 0
    let min = 0


    var timerInterval
    function startTimer() {
        timerInterval = setInterval(mainInterval, 1000);
    }
    function stopTimer(){
        clearInterval(timerInterval)
    }

    function mainInterval() {
        sec+=1
        min = Math.floor(sec/60)
        if (sec>60) {
            sec = 1
        }
        timerAll = String(min).padStart(2, "0") + ':' + (String(sec).padStart(2, "0"))
        timer.innerHTML = timerAll
    }

    function keyCheck(e) {
        code = e.keyCode
        if (code == 87 && parseInt(player.style.top) >= 4) {
            player.style.top = parseFloat(player.style.top) - 1 + "%";
        }
        if (code == 83 && parseInt(player.style.top) <= 82){
            player.style.top = parseFloat(player.style.top) + 1 + "%";
        }
        // pouse
        if (code == 27){
            pouse()
        }
    }

    function pouse() {
        stopTimer()
        stopBack()
        stopWall()
        document.removeEventListener("keydown", keyCheck)
        document.addEventListener("keydown", resEv)
    }
    
    
    
    function resEv(e) {
        if (e.keyCode == 27) {
            document.removeEventListener("keydown", resEv)
            document.addEventListener("keydown", keyCheck)
            startTimer()
            startBack()
            startWall(walls)
            console.log("Resume")
        }
    }
    
    var backgroundInterval
    function startBack() {
        // background
        backgroundInterval = setInterval(backAnimation, 10)
    }

    function stopBack() {
        // background
        clearInterval(backgroundInterval)
    }

    function backAnimation() {
        back1.style.left = parseFloat(back1.style.left) - 0.2 + "%";
        back2.style.left = parseFloat(back2.style.left) - 0.2 + "%";
        if (parseFloat(back1.style.left) <= -100) {
            back1.style.left = "100%"
        }
        if (parseFloat(back2.style.left) <= -100) {
            back2.style.left = "100%"
        }
    }


    var wallInterval
    function startWall() {
        // wall animation 
        wallInterval = setInterval(wallAnimation, 10)
    }

    function stopWall() {
        // wall animation
        clearInterval(wallInterval)
    }
    function changeWall(wall){
        wall.style.left = parseInt(wall.style.left) + 1200 + 'px'
        let = [wallHeight, pos] = randPos()
        wall.style.height = wallHeight + "px"
        console.log(pos, wallHeight)
        if (pos == 1) {
            wall.style.top = "0px"
            wall.style.bottom = null
        }
        if (pos == 2) {
            wall.style.bottom = "0px"
            wall.style.top = null
        }
        
    }
    let listBl = []
    function wallAnimation() {
        for (let i = 0; i < walls.length; i++) {
            let wall = walls[i];
            wall.style.left = parseFloat(wall.style.left) - 2.1 + "px";
            if (parseFloat(wall.style.left) <= 46) {          
                changeWall(wall)
            }
        }
    }



    document.addEventListener("keydown", keyCheck)
    startTimer()
    startBack()
    startWall(walls)

}
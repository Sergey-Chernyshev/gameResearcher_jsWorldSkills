const windowHi = document.querySelector(".modal-rules")
const usernameIn = document.querySelector("#username")
const startBtn = document.querySelector(".btn-start")

// main content
const usernameMain = document.querySelector(".username-block")
const timer = document.querySelector("#timer-count")
const gasoline = document.querySelector(".gasoline-number")

const player = document.querySelector("#player")

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

    player.style.left = "13%"
    player.style.top = "50%"

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
        document.removeEventListener("keydown", keyCheck)
        document.addEventListener("keydown", resEv)
    }
    
    
    
    function resEv(e) {
        if (e.keyCode == 27) {
            document.removeEventListener("keydown", resEv)
            document.addEventListener("keydown", keyCheck)
            startTimer()
            console.log("Resume")
        }
    }
    
    var backgroundInterval
    function startBack() {
        // background
        backgroundInterval = setInterval(backAnimation, 10)
    }

    function backAnimation() {
        
    }



    document.addEventListener("keydown", keyCheck)
    startTimer()
    backAnimation()
    

    
}
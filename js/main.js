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
const battery = document.querySelector(".battery")
const battaryMain = document.querySelector(".gasoline-number")
const battaryVal = document.querySelector(".gasoline-value")

// ранговое окно
const windowRang = document.querySelector(".modal-raking")
const flexRow = document.querySelector(".stroka")
const reloadBtn = document.querySelector(".btn-reload")
const table = document.querySelector(".rent")


// loose window
const windowLoose = document.querySelector(".modal-lose")
const restartBtn = windowLoose.querySelector(".btn-reload")

let rang = []
const left = 1024


var username
let walls = document.querySelectorAll(".wall")
let hiMenu = startBtn.addEventListener("click", () => {
    console.log(usernameIn.value)
    username = usernameIn.value
    if (username.trim() != ""){
        startGame(username)
    }
})

// проигрыш
function End(username) {
    console.log("username")
    windowLoose.classList.remove("close")

    // кнопка начала игры заново
    restartBtn.addEventListener("click", startNew)
    function startNew(){
        startGame(username)
        restartBtn.removeEventListener("click", startNew)
    }
}

// остановка игры из-за конца заряда
function gameEnd(sec, min, username) {
    windowRang.classList.remove("modal-raking")

    // окно результатов и их вывод
    rang.push([username, timer.innerHTML, sec+min*60])  
    // сортировка
    sorted_array = rang.sort(function(a, b) {
        return a[2] - b[2];
    });
    // добавление класса new для строк, чтобы можно было удалить все, кроме 1й
    for (let i = 1; i < allColumnsdel.length; i++) {
        table.removeChild(allColumnsdel[i])
    }

    // заполнение таблицы
    for (let i = 0; i < sorted_array.length; i++) {
        let flexRowAdd = flexRow.cloneNode(true);
        let allColumns = flexRowAdd.querySelectorAll(".column")
        allColumns[0].innerText = i+1
        allColumns[1].innerText = sorted_array[i][0]
        allColumns[2].innerText = sorted_array[i][1]    
        document.querySelector(".rent").appendChild(flexRowAdd);
    }

    // кнопка начала игры заново
    reloadBtn.addEventListener("click", reload)
    function reload(){
        startGame(username)
        reloadBtn.removeEventListener("click", reload)
    }
}





function startGame(username){

    

    // сброс всех параметров к изначальным настройкам
    windowHi.classList.add("close")
    windowHi.classList.remove("modal")
    windowRang.classList.add("modal-raking")
    windowLoose.classList.add("close")
    usernameMain.innerText = username

    player.style.left = "13%"
    player.style.top = "50%"

    back1.style.left = "0%"
    back2.style.left = "100%"

    battaryMain.innerHTML = 100
    battaryVal.style.width == "100%"
    
    timer.innerText = "00:00"

    let allBat = document.querySelectorAll(".battery")
    let game = document.querySelector("#game")

    // удаление всех батареек, кроме 1й
    for (let i = 1; i < allBat.length; i++) {
        game.removeChild(allBat[i])
        
    }


    // перемещение всех стен за полезрение
    for (let i = 0; i < walls.length; i++) {
        let wall = walls[i];
        changeWall(wall, left+i*300 + "px")
    }

    // рандом от и до числа
    function randomIntFromInterval(min, max) { 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    // рандом для стены (верх или низ, и высота)
    var randHeight
    function randPos(){
        randHeight = randomIntFromInterval(100, 500)
        randpos = randomIntFromInterval(1, 2)
        return [randHeight, randpos]
    }


    

    // главный таймер времени

    let sec = 0
    let min = 0
    var timerInterval
    function startTimer() {
        timerInterval = setInterval(mainInterval, 1000);
    }
    function stopTimer(){
        clearInterval(timerInterval)
    }

    // время и отображение батарейки
    function mainInterval() {
        sec+=1
        min = Math.floor(sec/60)
        if (sec>60) {
            sec = 1
        }
        timerAll = String(min).padStart(2, "0") + ':' + (String(sec).padStart(2, "0"))
        timer.innerHTML = timerAll

        battaryMain.innerHTML = battaryMain.innerHTML - 1
        battaryVal.style.width = battaryMain.innerHTML +"%"
        if (battaryMain.innerHTML == 0){
            stopGame()
            gameEnd(sec, min, username)
        }
    }

    // во время основной игры проверка нажатий по клавиатуре
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

    // пауса ESCAPE
    function pouse() {
        stopTimer()
        stopBack()
        stopWall()
        document.removeEventListener("keydown", keyCheck)
        document.addEventListener("keydown", resEv)
    }
    
    // Проигрыш(остановка основных циклов)
    function stopGame() {
        stopTimer()
        stopBack()
        stopWall()
        document.removeEventListener("keydown", keyCheck)
    }
    
    function resEv(e) {
        if (e.keyCode == 27) {
            document.removeEventListener("keydown", resEv)
            document.addEventListener("keydown", keyCheck)
            startTimer()
            startBack()
            startWall(walls)
        }
    }
    
    // обработка и анимация фона
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
        // проверка выхода из полезрения 
        if (parseFloat(back1.style.left) <= -100) {
            back1.style.left = "100%"
        }
        if (parseFloat(back2.style.left) <= -100) {
            back2.style.left = "100%"
        }
    }

    // Обработка стен и батареек и изменение их параметров
    var wallInterval
    function startWall() {
        // wall animation 
        wallInterval = setInterval(wallAnimation, 10)
    }

    function stopWall() {
        // wall animation
        clearInterval(wallInterval)
    }
    
    function changeWall(wall , px){
        if (!px) {
            wall.style.left = parseInt(wall.style.left) + 1200 + 'px'
        }
        wall.style.left = px

    
        let [wallHeight, pos] = randPos()
        wall.style.height = wallHeight + "px"
        if (pos == 1) {
            wall.style.top = "0px"
            wall.style.bottom = null
        }
        if (pos == 2) {
            wall.style.bottom = "0px"
            wall.style.top = null
        }

        // battery
        if(randomIntFromInterval(0, 1)){
            let battery1 = battery.cloneNode(true);
            battery.after(battery1);
            battery1.style.top = null
            battery1.style.bottom = null
            // обработка расположения батарейки
            if(wall.style.top == "0px"){
                battery1.style.top = parseInt(wall.style.height) - randomIntFromInterval(-510, parseInt(wall.style.height)/2) + "px"
            }
            if(wall.style.bottom == "0px"){
                battery1.style.bottom = parseInt(wall.style.height) - randomIntFromInterval(-510, parseInt(wall.style.height)/2) + "px"
            }
            battery1.style.left = parseInt(wall.style.left) + 150 + 'px'
        }    
    }

    // анимация стены и батарейки
    function wallAnimation() {

        // движение и столкновение СТЕН 
        const playerRect = player.getBoundingClientRect();
        for (let i = 0; i < walls.length; i++) {
            let wall = walls[i];
            wall.style.left = parseFloat(wall.style.left) - 2.1 + "px"; 
            
            const wallRect = wall.getBoundingClientRect();

            if (playerRect.left < wallRect.right && playerRect.right > wallRect.left &&
                playerRect.top < wallRect.bottom && playerRect.bottom > wallRect.top) {
                    stopGame()
                    End(username)
            } 
            if (parseFloat(wall.style.left) <= 46) {          
                changeWall(wall)
            }
        }


        // движение и столкновение БАТАРЕЙКИ
        all_b =  document.querySelectorAll(".battery")
        for (let i = 0; i < all_b.length; i++) {
            let batter = all_b[i];
            batter.style.left = parseFloat(batter.style.left) - 2.1 + "px"; 

            // проверка косания батарейки и игрока
            const batterRect = batter.getBoundingClientRect();
            if (playerRect.left < batterRect.right && playerRect.right > batterRect.left &&
                playerRect.top < batterRect.bottom && playerRect.bottom > batterRect.top) {
                    document.querySelector("#game").removeChild(batter)
                    // battaryMain.innerHTML = parseInt(battaryMain.innerHTML) + 5
                    if (parseInt(battaryMain.innerHTML) + 5 <= 100) {
                        battaryMain.innerHTML = parseInt(battaryMain.innerHTML) + 5;
                    }else{
                        battaryMain.innerHTML = 100
                    }
                    battaryVal.style.width = battaryMain.innerHTML +"%"
            } 

            // Удаление батарейки при уходе за поле
            if (parseFloat(batter.style.left) <= 46) {          
                document.querySelector("#game").removeChild(batter)
            }
        }
    }

    document.addEventListener("keydown", keyCheck)
    startTimer()
    startBack()
    startWall(walls)
}

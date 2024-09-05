// *** Global Variables ***
const gameBoxNode = document.querySelector("#game-box");

const ballNode = document.createElement("div"); // se crea la pelotita
ballNode.id = "ball"; // se asigna un id a la pelotita (para CSS)
gameBoxNode.append(ballNode); // se añade la pelotita a la caja de juego

const paddleNode = document.createElement("div"); // se crea la paleta
paddleNode.id = "paddle"; // se asigna un id a la paleta (para CSS)
gameBoxNode.append(paddleNode); // se añade la pelotita a la caja de juego


const ball = {
  x: 30,
  y: 30,
  w: 20,
  h: 20,
  radio: 10,
  speed: 1.8,
  isMovingRight: true,
  isMovingDown: true
}

const paddle = {
  x: 200,
  y: 550,
  w: 100,
  h: 20,
  speed: 25
}

// *** Game Functions ***
function gameLoop() {
  //la función que se ejecuta 60 veces por segundo
  ballMovement()
  detectBallColisionWall()
  detectColisionBallPaddle()

}

function ballMovement() {

  if (ball.isMovingRight) {
    ball.x += ball.speed
    ballNode.style.left = `${ball.x}px`
  } else {
    ball.x -= ball.speed
    ballNode.style.left = `${ball.x}px`
  }

  if (ball.isMovingDown) {
    ball.y += ball.speed
    ballNode.style.top = `${ball.y}px`
  } else {
    ball.y -= ball.speed
    ballNode.style.top = `${ball.y}px`
  }

}

function detectBallColisionWall() {

  //gameBoxNode.offsetWidth es el valor numerico del ancho del nodo (game box)


  if (ball.x >= (gameBoxNode.offsetWidth - ball.w)) {
    //console.log("chocando")
    ball.isMovingRight = false //cambia el momvimiento normal de la pelota que depende de esta variable
  }

  if (ball.y >= (gameBoxNode.offsetHeight - ball.h)) {
    //console.log("chocando")
    ball.isMovingDown = false //cambia el momvimiento normal de la pelota que depende de esta variable
    gameOver()
  }

  if (ball.x <= 0) {
    //console.log("chocando")
    ball.isMovingRight = true //cambia el momvimiento normal de la pelota que depende de esta variable
  }

  if (ball.y <= 0) {
    //console.log("chocando")
    ball.isMovingDown = true //cambia el momvimiento normal de la pelota que depende de esta variable
  }

}

function gameOver() {
  alert("Perdiste el juego")
  clearInterval(gameIntervalId)
}

function paddleMovement(direction) {

  if (direction === "right") {
    paddle.x += paddle.speed
    paddleNode.style.left = `${paddle.x}px`
  } else if (direction === "left") {
    paddle.x -= paddle.speed
    paddleNode.style.left = `${paddle.x}px`
  }
}

function detectColisionBallPaddle() {

  if ((ball.y + ball.h) >= paddle.y && ball.x >= paddle.x && ball.x <= (paddle.x + paddle.w) ){
    ball.isMovingDown  = false
  }

}

// *** Game Loop Interval ***

let gameIntervalId = setInterval(() => {
  //console.log("juego andando")

  gameLoop()

}, 1000 / 60) // 60 fps- por cada segundo se refresca 60 veces




// *** Event Listeners ***

window.addEventListener("keydown", (event) => {
  //console.log("presionando")
  if (event.key === "ArrowRight") {
    //console.log("mov dcha")
    paddleMovement("right")
  } else if (event.key === "ArrowLeft") {
    //console.log("mov izq")
    paddleMovement("left")
  }
})


//BONUS

/* 

- la pelota cambiar de color al colisionar con la paleta
- la pelota cambia de velocidad al colisionar con la paleta o cuando pasado cierto tiempo
- que la pelota se haga mas pequeña
- que aparezca otra pelota
- añadir score que aumenta
- limitar el movimimento de la paleta ( en la linea 129 que verfique tambien que no haya salido del canvas la paleta)
*/
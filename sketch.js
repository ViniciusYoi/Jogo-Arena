//instruções
var texto = ('Mova-se com as setinhas do teclado, fuja da bola pelo máximo de tempo possível, você também pode pular nas plataformas.')

//jogador
var xPlayer = 350;
var yPlayer = 250;
var alturaPlayer = 50;
var larguraPlayer = 20;

//bola
var xbola = 300;
var ybola = 200;
var dbola = 30; //diâmetro da bowla
var rbola = dbola / 2; //raio da bola

//velocidade da bola
var velxbola = 10;
var velybola = -10;

//mundo
var x1Plat = 100;
var y1Plat = 300;
var altura1Plat = 20;
var largura1Plat = 100;

//gravidade
var pulo = false;
var direcao = 1; //força da gravidade vertical
var velocidade = 10; //velocidade do player
var forcaPulo = 14; //força que o player pula
var velocidadeQueda = 6; //igual a velocidade
var alturaMinima = 400 //altura do chão
var alturaMaxima = 62; //altura do céu
var contaPulo = 0; //pra contar os pulos

//sons
function preload() {
  trilha = loadSound("time flux.ogg");
  bate = loadSound("bate.mp3");
  dano = loadSound("dano.mp3");
}

function setup() {
  createCanvas(700, 500);
  frameRate(60);
  trilha.loop();
  rectMode(CENTER);
  textAlign(CENTER);
}

function draw() {
  background(0);
  movimento(); //movimento do player ué
  jogo(); //mundo e outros
  gravidade();
  fill(255,255,255);
  textSize(13);
  text(texto, 105, 530, 200, 200);
  textSize(18);
  text(frameCount, width / 2,50);
  fill(255,25,25);
  circle(xbola, ybola, dbola);
  xbola += velxbola;
  ybola += velybola;
  bola();
}

function movimento() {
  if (keyIsDown(LEFT_ARROW)) {
    xPlayer -= 4;
  }

  if (keyIsDown(RIGHT_ARROW)) {
    xPlayer += 4;
  }

  if (keyIsDown(UP_ARROW)) {
    pulo = true;
    console.log('pulaste')
  }
  else{
    pulo = false;
  }
  if (xbola - rbola < xPlayer + larguraPlayer && ybola - rbola < yPlayer + alturaPlayer && ybola + rbola > yPlayer && xbola - rbola > xPlayer){
    velxbola *= -1;
    frameCount = 0;
    dano.play();
    
  }
}

function jogo(){
//chão e paredes
  noStroke();
  fill(100, 100, 100);
  rect(width/2, 475,width, 100);
  rect(width - 10, height/2, 25, 700);
  rect(width - 690, height/2, 25, 700);
  rect(width/2, -20,width, 100);
  rect(x1Plat,y1Plat, largura1Plat, altura1Plat);
  rect(x1Plat + 150, y1Plat -75, largura1Plat, altura1Plat)
  rect(x1Plat + 325, y1Plat -75, largura1Plat, altura1Plat)
//jogador
  noStroke();
  fill(50,50,255);
  rect(xPlayer, yPlayer, larguraPlayer, alturaPlayer, 5)
//colisões
  if(xPlayer >= x1Plat - largura1Plat/2 && xPlayer <= x1Plat + largura1Plat/2 && yPlayer + alturaPlayer -20 >= y1Plat - altura1Plat/2 && yPlayer + alturaPlayer - 20 <= y1Plat + altura1Plat/2 && pulo == false || xPlayer >= x1Plat + 150 - largura1Plat/2 && xPlayer <= x1Plat +150 + largura1Plat/2 && yPlayer + alturaPlayer -20 >= y1Plat -75 - altura1Plat/2 && yPlayer + alturaPlayer - 20 <= y1Plat -75 + altura1Plat/2 && pulo == false || xPlayer >= x1Plat + 325 - largura1Plat/2 && xPlayer <= x1Plat +325 + largura1Plat/2 && yPlayer + alturaPlayer -20 >= y1Plat -75 - altura1Plat/2 && yPlayer + alturaPlayer - 20 <= y1Plat -75 + altura1Plat/2 && pulo == false){
    yPlayer = yPlayer;
    velocidade = 0;
    contaPulo = 0;
  }
}

function gravidade(){
  if (yPlayer >= alturaMinima && pulo == false){ //se não tiver o pulo = false, buga e ele não pula
    yPlayer = yPlayer + 0;
    contaPulo = 0; //pra resetar o contador
  }
  else{
    yPlayer = yPlayer + (direcao*velocidade); // se o jogador estiver no chão, PARE ELE, se não, pode cair!
  }

  if (pulo == true){
    if (yPlayer <= alturaMaxima || contaPulo >= forcaPulo){ //contapulo ta aí pra limitar
      if (yPlayer >= alturaMinima){
        yPlayer = alturaMinima;
      }
      else{
        velocidade = velocidadeQueda;
      }
   }
  else{
    velocidade = - forcaPulo; //se tu esqueceu, aqui y negativo é pra cima em vez de ser pra baixo, por isso o -
    contaPulo = contaPulo + 1; //add 1 pro pulo
  }
}
  else{
    velocidade = velocidadeQueda;
  }
}
 

function bola(){
  if (xbola + rbola > width || xbola - rbola < 0) {
    velxbola *= -1;
    bate.play();
  }
  if (ybola + rbola > height || ybola - rbola < 0) {
    velybola *= -1;
    bate.play();
  }
}

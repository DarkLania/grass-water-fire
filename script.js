//Global variables.
let playerScore=0;
let computerScore=0;
let eventCounter=0;
let c="new";
//Atach buttons for player choice.
const grass=document.querySelector('#grass');
const water=document.querySelector('#water');
const fire=document.querySelector('#fire');
//Atach scores for manipulation.
const pScore=document.querySelector('#playerScore');
const cScore=document.querySelector('#enemyScore');
//Atach narration div for manipulation.
const narration=document.querySelector('#narration');
//Trigger round with selected choice.
grass.addEventListener('click',wholeRound);
water.addEventListener('click',wholeRound);
fire.addEventListener('click',wholeRound);
//Function for enemyTurn and randomize.
function computerPlay(){
    let r=randomInt();
    if (r===1) return("grass");
    else if (r===2) return("water");
    else return("fire");
}
function randomInt() {
    return Math.floor(Math.random() * (3 - 1 + 1) ) + 1;
  }
//Function to compare choices and set a winner.
function playRound(playerSelection,computerSelection){
  if (playerSelection=="grass")
    if(computerSelection=="grass") return("tie");
    else if(computerSelection=="water") return("win");
    else return("loss");
  else if(playerSelection=="water")
    if(computerSelection=="grass") return("loss");
    else if(computerSelection=="water") return("tie");
    else return("win");
  else
    if(computerSelection=="grass") return("win");
    else if(computerSelection=="water") return("loss");
    else return("tie");
  }
//Function for setting global scores.
function scoreSet(state){
  if(state=="win"){
    playerScore++;
    pScore.textContent=`Light Mages: ${playerScore}`;
  }
  else if(state=="loss"){
    computerScore++;
    cScore.textContent=`Dark Mages: ${computerScore}`;
  }
}
//Function for reporting narration.
function roundReport(state, playerSelection, computerSelection){
  let p=document.createElement('p');
  p.classList.add('outcome');
  let pNodes=document.querySelectorAll('.outcome');
  if(state=="win"){
    p.classList.add('winP');
    p.textContent=`You attack with a ${playerSelection} spell,
    enemy answers with a ${computerSelection} spell. After the dust disipates
    you notice the enemy got hurt. You won this round!.`;
  }
  else if(state=="loss"){
    p.classList.add('lossP');
    p.textContent=`You attack with a ${playerSelection} spell,
    enemy answers with a ${computerSelection} spell. Before the dust disipates
    you begin to ache. You lost this round!.`;
  }
  else{
    p.classList.add('tieP');
    p.textContent=`You attack with a ${playerSelection} spell,
    enemy answers with a ${computerSelection} spell. Both parties wait for someone
    to fade out. Weirdly enough... nothing happens.`;
  }
  if(pNodes.length===0) narration.appendChild(p);
  else narration.insertBefore(p,pNodes[0]);
}
//Function for having a whole game round.
function wholeRound(e){
  if(c==='stale') return;
  let playerSelection=e.target.alt;
  let computerSelection=computerPlay();
  let state=playRound(playerSelection,computerSelection);
  scoreSet(state);
  roundReport(state,playerSelection,computerSelection);
  eventCounter++;
  if(eventCounter===5) endGame();
}
//Function for presenting end game dialog.
function endGame(){
  c="stale";
  let p=document.createElement('p');
  p.classList.add('outcome');
  let pNodes=document.querySelectorAll('.outcome');
  if(playerScore>computerScore){
    p.classList.add('finalPW');
    p.textContent=`After hours of engaging battle there are
    no more enemies in sight. Finally you can rest your hands.
    The Light Mages won the Elemental War.`
  }
  else if(playerScore<computerScore){
    p.classList.add('finalPL');
    p.textContent=`Suddenly you begin to loose conciusness.
    Before fading away, you notice you are the last one of
    the Light Mages. - Evil times are coming - you thought, as
    one of the Dark Mages inflicts the final blow.`
  }
  else{
    p.classList.add('finalPT');
    p.textContent=`After ages of battle both groups decide to
    retire, training the next generation of Light and Dark mages
    to settle at last wich one is going to take over the world.
    The endless war is not over yet.`
  }
  narration.insertBefore(p,pNodes[0]);
  let resetBtn=document.createElement('button');
  resetBtn.textContent='PLAY AGAIN?';
  resetBtn.classList.add('outcome');
  pNodes=document.querySelectorAll('.outcome');
  narration.insertBefore(resetBtn,pNodes[0]);
  resetBtn.addEventListener('click',reset);
}
//Reseting scores and narration for new game.
function reset(){
  let pNodes=document.querySelectorAll('.outcome');
  pNodes.forEach(pNode => {
    narration.removeChild(pNode);
  });
  playerScore=0;
  computerScore=0;
  pScore.textContent='Light Mages: 0';
  cScore.textContent='Dark Mages: 0';
  eventCounter=0;
  c='new';
}
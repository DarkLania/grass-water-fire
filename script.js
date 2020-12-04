let playerScore=0;
let computerScore=0;
let c="yes";
while(c=="yes"){
    game();
    playerScore=0;
    computerScore=0;
    c=(prompt("Do you wish to play again? (yes/no): "));
}

function computerPlay(){
    let r=randomInt();
    if (r===1) return("grass");
    else if (r===2) return("water");
    else return("fire");
}

function randomInt() {
    return Math.floor(Math.random() * (3 - 1 + 1) ) + 1;
  }

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

  function scoreSet(state){
    if(state=="win") playerScore++;
    else if(state=="loss") computerScore++;
  }

  function roundReport(state){
    if(state=="win") return(console.log("Fuck Yeah! You won this round."));
    else if(state=="loss") return(console.log("Oh no! The dark avatars won this round."));
    else return(console.log("Both parties throw an attack, weirdly enough no one was hurt this round."));
  }

  function wholeRound(){
    let playerSelection=prompt("Write grass, water or fire: ");
    let computerSelection=computerPlay();
    let state=playRound(playerSelection,computerSelection);
    scoreSet(state);
    roundReport(state);
  }

  function game(){
      wholeRound();
      wholeRound();
      wholeRound();
      wholeRound();
      wholeRound();
      if(playerScore>computerScore) console.log("You beat the dark avatars, you're awesome!");
      else if(playerScore<computerScore) console.log("Your party was obliterated by the dark avatars, yikes!");
      else console.log("Both groups got exhausted and went home, that's life :v");
  }
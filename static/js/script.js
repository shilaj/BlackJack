var blackJackGame = {
    'you':{'scoreSpan':'#your-score','div':'#your-box','score':0},
    'dealer':{'scoreSpan':'#dealer-score','div':'#dealer-box','score':0},
    'cards':['2','3','4','5','6','7','8','9','10','J','Q','K','A'],
    'cardsMap':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'J':10,'Q':10,'K':10,'A':[1,11]}
}
const YOU = blackJackGame['you'];
const DEALER = blackJackGame['dealer'];

const hitAudio = new Audio('static/sounds/swish.m4a');

document.querySelector('#hitButton').addEventListener('click',blackJackHit);
document.querySelector('#standButton').addEventListener('click',blackJackStand);
document.querySelector('#resetButton').addEventListener('click',resetBox);
function blackJackHit(){
   showCard(randomCardGenerator(),YOU); 
}
function blackJackStand(){
    showCard(DEALER);
}

function showCard(card,activePlayer){
    var cardImage = document.createElement('img');
    cardImage.src = `static/images/${card}.png`;
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitAudio.play();
}

function resetBox(){
    var selectImage = document.querySelector('.flex-box-container-row1').querySelectorAll('img');
    for (i=0;i < selectImage.length;i++){
        selectImage[i].remove();
    }

}
function randomCardGenerator(){
    var randomNUmber = Math.floor(Math.random()*13);
    fuckYouBitch = blackJackGame['cards'][randomNUmber];
    return fuckYouBitch;
}
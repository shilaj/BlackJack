var blackJackGame = {
    'you':{'scoreSpan':'#your-score','div':'#your-box','score':0},
    'dealer':{'scoreSpan':'#dealer-score','div':'#dealer-box','score':0},
    'cards':['2','3','4','5','6','7','8','9','10','J','Q','K','A'],
    'cardsMap':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'J':10,'Q':10,'K':10,'A':[1,11]}
}
const YOU = blackJackGame['you'];
const DEALER = blackJackGame['dealer'];
const YOURSCORE = YOU['scoreSpan'];
const hitAudio = new Audio('static/sounds/swish.m4a');
const winSound = new Audio('static/sounds/cash.mp3');
const loseSound = new Audio('static/sounds/aww.mp3');

let wins = 0;
let loses = 0;
let draws = 0;

document.querySelector('#hitButton').addEventListener('click',blackJackHit);
document.querySelector('#standButton').addEventListener('click',dealerBoxAutoGenerate);
document.querySelector('#resetButton').addEventListener('click',resetBox);


function blackJackHit(){
    document.querySelector('#message-flex-box').textContent = "Game in progress !"
    var cardValue = randomCardGenerator();
    showCard(cardValue,YOU); 
    updateScore(cardValue,YOU);
    showScore(YOU);
    
   
}

function showCard(card,activePlayer){
    if (activePlayer['score'] <= 21)
        {
            var cardImage = document.createElement('img');
            cardImage.src = `static/images/${card}.png`;
            document.querySelector(activePlayer['div']).appendChild(cardImage);
            hitAudio.play();
        }
}


function resetBox(){
    var selectImage = document.querySelector('.flex-box-container-row1').querySelectorAll('img');
    for (i=0;i < selectImage.length;i++){
        selectImage[i].remove();
    }
    YOU['score'] = 0;
    DEALER['score'] = 0;
    document.querySelector(YOU['scoreSpan']).textContent = 0;
    document.querySelector(DEALER['scoreSpan']).textContent = 0;
    document.querySelector(YOU['scoreSpan']).style.color = 'white';
    document.querySelector(DEALER['scoreSpan']).style.color = 'white';
    document.querySelector('#message-flex-box').textContent = "Let's play buddy !"
    document.querySelector('#message-flex-box').style.color = 'black'
    document.querySelector('#total-wins').textContent = wins;
    document.querySelector('#total-losses').textContent = loses;
    document.querySelector('#total-draws').textContent = draws;
    
}


function randomCardGenerator(){
    var randomNUmber = Math.floor(Math.random()*13);
    fuckYouBitch = blackJackGame['cards'][randomNUmber];
    return fuckYouBitch;
}


function updateScore(card,activePlayer){
if (activePlayer['score'] <= 21 ){
    if (card === 'A'){
        if ((activePlayer['score'] + blackJackGame['cardsMap'][card][1]) <= 21){
            activePlayer['score'] += blackJackGame['cardsMap'][card][1];
        }
        else{
            activePlayer['score'] += blackJackGame['cardsMap'][card][0];
        }
    }
    else{
    activePlayer['score'] += blackJackGame['cardsMap'][card];
    }
}
}


function showScore(activePlayer){
    if (activePlayer['score'] > 21){
        document.querySelector(activePlayer['scoreSpan']).textContent = `(${activePlayer['score']})Wasted !!`;
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    }
    else{
    document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
}

async function dealerBoxAutoGenerate(){
    if (YOU['score'] > 0){
    while (DEALER['score'] < 16 ){
        var cardValue = randomCardGenerator();
        showCard(cardValue,DEALER);
        updateScore(cardValue,DEALER);
        showScore(DEALER);
        await sleep(500);
    }
    determineWinner();
}
else {
    document.querySelector('#message-flex-box').textContent = "Oops! you hit stand,hit hit buddy ! "
}
}

function determineWinner(){
    if (YOU['score'] <= 21)
    {
        if (YOU['score'] > DEALER['score'] || DEALER['score'] > 21)
        {
            document.querySelector('#message-flex-box').textContent = 'You Won !'
            document.querySelector('#message-flex-box').style.color = 'green'
            winSound.play();
            wins ++;
        }
        else if (YOU['score'] < DEALER['score'])
        {
            document.querySelector('#message-flex-box').textContent = 'You Lost !';
            document.querySelector('#message-flex-box').style.color = 'red';
            loseSound.play();
            loses ++;

        }
       else if (YOU['score'] === DEALER['score'])
        {
            document.querySelector('#message-flex-box').textContent = 'This is a Draw !';
            draws ++;
            
        }
    }
    else if (YOU['score'] > 21 && DEALER['score'] >21)
    {
        document.querySelector('#message-flex-box').textContent = "Fools' Game !"
    }
    else
    {
        document.querySelector('#message-flex-box').textContent = 'You Lost !'
        document.querySelector('#message-flex-box').style.color = 'red'
        loseSound.play();
        loses ++
    }
}
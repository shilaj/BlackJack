var images = {
    1:'./static/images/A.png',
    2:'./static/images/2.png',
    3:'./static/images/3.png',
    4:'./static/images/4.png',
    5:'./static/images/5.png',
    6:'./static/images/6.png',
    7:'./static/images/7.png',
    8:'./static/images/8.png',
    9:'./static/images/9.png',
    10:'./static/images/10.png',
    // 11:'./static/images/J.png',
    // 12:'./static/images/Q.png',
    // 13:'./static/images/K.png'

}
document.querySelector('#hit').addEventListener('click',blackJackHit);
function blackJackHit(){
    var randomNumber = Math.floor(Math.random()*10+1);
    var image = document.createElement('img');
    image.setAttribute('src',images[randomNumber]);
    image.setAttribute('height',150);
    image.setAttribute('width',100);
    document.getElementById('your-box').appendChild(image);

}
// function dealerBox() {
//         count = 0;
//         while (count <= 21){

//         }
// }

score = 0;
cross = true;
audio = new Audio('gameSound.mp3');
over_audio = new Audio('game_over.wav');
setTimeout(() => {
    audio.play();
}, 1000);
document.onkeydown = function(e)
{
    console.log("Key code is: ",e.keyCode);
    if (e.keyCode==38)
    {
        player = document.querySelector('.player');
        player.classList.add('animatePlayer');
        setTimeout(() => {
            player.classList.remove('animatePlayer')
        }, 700);
    }
    if (e.keyCode==39) 
    {
        player = document.querySelector('.player');
        player_X = parseInt(window.getComputedStyle(player,null).getPropertyValue('left'));
        player.style.left = player_X +  190 + "px";   
    }
    if (e.keyCode==37) 
    {
        player = document.querySelector('.player');
        player_X = parseInt(window.getComputedStyle(player,null).getPropertyValue('left'));
        player.style.left = player_X -  170 + "px";   
    }
}
setInterval(() => {
    player = document.querySelector('.player');
    gameOver = document.querySelector('.gameOver');
    car = document.querySelector('.car');
    over = document.querySelector('.over');

    player_X = parseInt(window.getComputedStyle(player,null).getPropertyValue('left'));
    player_Y = parseInt(window.getComputedStyle(player,null).getPropertyValue('top'));

    car_X = parseInt(window.getComputedStyle(car,null).getPropertyValue('left'));
    car_Y = parseInt(window.getComputedStyle(car,null).getPropertyValue('top'));

    offset_X = Math.abs(player_X-car_X);
    offset_Y = Math.abs(player_Y-car_Y);

    //console.log(offset_X,offset_Y);
    if (offset_X <100 && offset_Y<100)
    {
        gameOver.innerHTML ="GAME OVER";
        car.classList.remove('animateCar');
        cross=false;
        //score-=1;
        if (score<0) {
            Score(0);
        }
        else
        {
            Score(score);
        }
        player.style.left = player_X+190+"px";
        player.classList.remove('player');
        over.classList.add('died');
        player.style.visibility = 'hidden';
        setTimeout(() => {
            over_audio.play();
            audio.pause();
        }, 1000);
    }
    else if(offset_X<100&&cross)
    {
        score+=1;
        Score(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);

        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(car,null).getPropertyValue('animation-duration'));
            newDur = aniDur-0.1;
            car.style.animationDuration = newDur+"s";
            console.log('New Animation Duration: ',newDur);
        }, 500);
    }
}, 100);

function Score(score)
{
    scoreContainer.innerHTML = "YOUR SCORE: "+ score; 
}
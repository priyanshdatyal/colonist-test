gameCanvas = document.getElementById("canvas");
gameContext = gameCanvas.getContext("2d");


ball={
    id:"ball",
    x:app.width/2,
    y:app.height/2,
    radius:15,
    color:"RED",
    speedX:6,
    speedY:3,
    speed:3,
}

image = new Image()
image.src="../image/ppg.jpg"

bg = new Image()
bg.src="../image/bg.gif"

//Music


bgAudio = new Audio('../themeMusic/bg_song_theme.mp3')
bgAudio.volume=0.25
winPoint = new Audio('../audio/winPoint.mp3')
ballHit = new Audio('../audio/ballHit.mp3')
ballHit.volume=1
paddleShot = new Audio('../audio/paddleHit.mp3')

leftPlayer={
    id:"leftPlayer",
    x:5,
    y:(app.height-app.height/7.5)/2,
    direction:0,
    width: app.width/70,
    height:app.height/7.5,
    color:"WHITE",
    score:0,
    speed:5,
    moving:{
        up:false,
        down:false
    }
}

rightPlayer={
    id:"rightPlayer",
    x:app.width-app.width/75-5,
    y:(app.height-app.height/7.5)/2,
    direction:0,
    width: app.width/70,
    height:app.height/7.5,
    color:"WHITE",
    score:0,
    speed:5,
    moving:{
        up:false,
        down:false
    }
}

score={
    id:"text",
    size:50,
    color:"WHITE",
    x:document.body.offsetWidth/3,
    y:document.body.offsetHeight/6,

}

gameState = false

app.onInit= function(){
    gameCanvas.width=app.width
    gameCanvas.height=app.height

    // bg.resize(app.width,app.he)
    bg.width=app.width
    bg.height=app.height

    this.nodes.push(leftPlayer)
    
    this.nodes.push(rightPlayer)

    this.nodes.push(ball)
    app.drawText("Press 'Space' to Start,Pause or Resume the game",app.width/4,app.height/5,50,"YELLOW")
    app.drawText("Controls Player 1",3*app.width/7,1.125*app.height/4,35,"WHITE")
    app.drawText("W : Up",2.325*app.width/5,app.height/3,25,"WHITE")
    app.drawText("S : Down",2.325*app.width/5,1.125*app.height/3,25,"WHITE")

    
    app.drawText("Controls Player 2",3*app.width/7,app.height/2,35,"WHITE")
    app.drawText("⬆ : Up",2.325*app.width/5,1.25*app.height/2,25,"WHITE")
    app.drawText("⬇ : Down",2.325*app.width/5,1.5*app.height/2,25,"WHITE")

    document.addEventListener("keydown",(event)=>{

        if(event.key=="w"){
            leftPlayer.moving.up=true
        }
    
        if(event.key=="s"){
            leftPlayer.moving.down=true
        }
    
    
        if(event.key=="ArrowUp"){
            rightPlayer.moving.up=true
        }
    
        if(event.key=="ArrowDown"){
            rightPlayer.moving.down=true
        }

        if(event.keyCode==32){
            app.pause();
        }
    
        if(event.key=="r"){
            app.reset();
        }
    })
    
    
    document.addEventListener("keyup",(event)=>{

        if(event.key=="w"){
            leftPlayer.moving.up=false
        }
    
        else if(event.key=="s"){
            leftPlayer.moving.down=false
        }
    
    
        if(event.key=="ArrowUp"){
            rightPlayer.moving.up=false
        }
    
        if(event.key=="ArrowDown"){
            rightPlayer.moving.down=false
        }
    
    })

}

app.onUpdate=function(){
    
    // gameContext.drawImage(bg,0,0,app.width,app.height)
    if(gameState){
        bgAudio.play()
        if((ball.y+ball.radius)>=document.body.offsetHeight   ||  (ball.y-ball.radius)<=0){
            ballHit.play();
            bounceBack();
        }

        currentPlayer= ball.x>document.body.offsetWidth?rightPlayer:leftPlayer

        if(ball.x<0){
            rightPlayer.score++; 
            resetBall();
        }
        else if(ball.x+ball.radius>app.width){
            leftPlayer.score++;
            resetBall();
        }

        if(paddleHit(leftPlayer) || paddleHit(rightPlayer)){
            paddleShot.play()
            paddleCoillision(currentPlayer);
        }

        app.drawText(rightPlayer.score,4*app.width/5,app.height/5,100,"WHITE")
        app.drawText(leftPlayer.score,app.width/5,app.height/5,100,"WHITE")
        
        move(leftPlayer)
        move(rightPlayer)
        moveBall()
    }
    else{
        bgAudio.pause();
        gameContext.drawImage(image,app.width/2-230,app.height/2-107)

        app.drawText("Press 'Space' to Start,Pause or Resume the game",app.width/4,app.height/5,50,"YELLOW")

        app.drawText("Controls Player 1",3*app.width/7,1.125*app.height/4,35,"WHITE")
        app.drawText("W : Up",2.325*app.width/5,app.height/3,25,"WHITE")
        app.drawText("S : Down",2.325*app.width/5,1.125*app.height/3,25,"WHITE")
        
        app.drawText("Controls Player 2",3*app.width/7,1.125*app.height/1.65,35,"WHITE")
        app.drawText("⬆ : Up",2.325*app.width/5,1.25*app.height/1.65,25,"WHITE")
        app.drawText("⬇ : Down",2.325*app.width/5,1.35*app.height/1.65,25,"WHITE")

        app.drawText("Press 'R' to Restart the game",1.5*app.width/4,3.5*app.height/4,40,"YELLOW")
    }
}

app.draText = function(text,x,y){
    gameContext.fillStyle="WHITE"
    gameContext.font="100px apple"
    gameContext.fillText(text,x,y)
}

function bounceBack(){
    ball.speedY=-ball.speedY
}

app.pause = function(){
    gameState=!gameState
    // if(gameState){
    //     bgAudio.play()
    // }
    // else{
        
    //     bgAudio.pause()
    // }
}

app.reset=function(){
    app.pause();
    leftPlayer.x=0
    rightPlayer.x=app.width-app.width/75-5
    leftPlayer.y=rightPlayer.y=app.height/2
    leftPlayer.score=rightPlayer.score=0
    ball.speedX=6
    ball.speedY=3
    ball.speed=3
}

app.drawText = function(text,x,y,fontSize,fontColor){    
		gameContext.fillStyle=fontColor
		gameContext.font=fontSize+"px apple"
		gameContext.fillText(text,x,y)
}

function move(player){
    if(player.moving.up && player.y>=0){
        player.y=player.y-player.speed
    }
    if(player.moving.down && (player.y+player.height)<document.body.offsetHeight){
        player.y=player.y+player.speed
    }
}

function resetBall(){
    winPoint.play()
    ball.x=app.width/2
    ball.y=app.height/2
    ball.speedX=-ball.speedX
}

function paddleCoillision(){
    
        pointOfImpact = (ball.y- (currentPlayer.x+currentPlayer.height/2))/(currentPlayer.height/2)

        angleforReflection = pointOfImpact*Math.PI*4

        direction = (ball.x<canvas.width/2)?1:-1

        ball.speedX = 1.5* direction * ball.speed* Math.cos(angleforReflection)
        ball.speedY = 1 * ball.speed* Math.sin(angleforReflection)

        if(ball.speedY==0){ballspeedY=5}

        ball.speed+=(ball.speed<=10)?2:0
        leftPlayer.speed+=.25
        rightPlayer.speed+=.25
        
}

function paddleHit(player){
    ball.top=ball.y-ball.radius;
    ball.bottom=ball.y+ball.radius;
    ball.left=ball.x-ball.radius;
    ball.right=ball.x+ball.radius;

    player.top=player.y;
    player.bottom=player.y+player.height
    player.left=player.x;
    player.right=player.x+player.width

    return ball.left<player.right && ball.right > player.left && ball.bottom>player.top  && ball.top<player.bottom
    
}

function moveBall(){
    // ball.y = ball.y+Math.sin(ball.speed*Math.PI/4)
    ball.y = ball.y-ball.speedY
    ball.x = ball.x+ball.speedX
}

function adjustDimensions(){
    leftPlayer.height=rightPlayer.height=app.height/7.5
    leftPlayer.width=rightPlayer.width=app.width/75

    leftPlayer.y=app.height/2-leftPlayer.height
    rightPlayer.y=app.height/2-rightPlayer.height

    leftPlayer.x=5;
    rightPlayer.x=app.width-app.width/75-5
}

function adjustBall(){
    ball.x=app.width/2
    ball.y=app.height/2
}

window.addEventListener("resize",()=>{
    app.height=document.body.offsetHeight
    app.width=document.body.offsetWidth
    gameCanvas.width=app.width
    gameCanvas.height=app.height
    bg.width=app.height
    bg.height=app.height
    
    adjustBall()
    adjustDimensions();

})
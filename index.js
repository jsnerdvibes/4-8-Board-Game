canvas = document.querySelector('canvas')
ctx = canvas.getContext('2d')


class Game{

    constructor(canvas,ctx){
        this.canvas=canvas
        this.ctx=ctx
        this.dice = undefined
        this.blocks = []

        this.canvasDims = document.querySelector('.middle').offsetHeight < document.querySelector('.middle').offsetWidth ? document.querySelector('.middle').offsetHeight : document.querySelector('.middle').offsetWidth

        this.canvas.height = this.canvasDims
        this.canvas.width = this.canvasDims

        this.numberOfPlayers = 4
        this.numberOfWinners = 0

        this.turn = 1
        this.playerList = {}
        this.winner = 2
        this.img = new Image()
        this.img.src = 'Final board.png'

        this.playersPosition = {
            '1':{
                x:2,
                y:4
            },
            '2':{
                x:this.numberOfPlayers===2?2:4,
                y:this.numberOfPlayers===2?0:2
            },
            '3':{
                x:this.numberOfPlayers===(3||4)?2:null,
                y:this.numberOfPlayers===(3||4)?0:null
            },
            '4':{
                x:this.numberOfPlayers===4?0:null,
                y:this.numberOfPlayers===4?2:null
            },
        }

    }


    

    start(){

       

        boardMap.forEach((arr,i)=>{
            arr.forEach((item,j)=>{
               const block = new CreateBlocks(this.canvas,this.ctx,i,j,item) 
               this.blocks.push(block)

            })
        })


        this.blocks.forEach((item)=>{
            item.draw()
        })

        

        this.img.onload = () => {
            ctx.drawImage(this.img, 0, 0, canvas.width, canvas.height); // Draw image to fit the canvas

            this.createPlayer()
        };


        


        window.addEventListener('resize',()=>{
            this.canvasDims = document.querySelector('.middle').offsetHeight < document.querySelector('.middle').offsetWidth ? document.querySelector('.middle').offsetHeight : document.querySelector('.middle').offsetWidth

            this.canvas.height = this.canvasDims
            this.canvas.width = this.canvasDims

            for(let i=1;i<=this.numberOfPlayers;i++){
                this.playerList[`${i}`].tileDim = this.canvasDims
            }

            this.updateGame()
        })
    }

    createPlayer(){

        // (canvas,ctx,startX,startY,innerX,innerY,color,moveTo,winningPositionX,winningPositionY)


        this.playerList['1'] = new Player(this.canvas,this.ctx,2,4,1,4,'green','x',2,3)
        this.playerList['1'].draw()

        if(this.numberOfPlayers===2){
            
            this.playerList['2'] = new Player(this.canvas,this.ctx,2,0,3,0,'gray','-x',2,1)
        this.playerList['2'].draw()

        }else{
            this.playerList['2'] = new Player(this.canvas,this.ctx,4,2,4,3,'black','-y',3,2)
            this.playerList['2'].draw()
        }

       if(this.numberOfPlayers===3||this.numberOfPlayers===4){
        this.playerList['3'] = new Player(this.canvas,this.ctx,2,0,3,0,'yellow','-x',2,1)
        this.playerList['3'].draw()
       }  

       if(this.numberOfPlayers===4){
        this.playerList['4'] = new Player(this.canvas,this.ctx,0,2,0,1,'purple','y',1,2)
        this.playerList['4'].draw()
       }

        
    }


    // function to create random number and check if player is eligible to move or not

    rollDice(){

        document.querySelector('#dice').disabled = true

        const randomNum = Math.floor(Math.random()*6)+1

        this.dice = randomNum

        console.log('Player',this.turn,'rolled',this.dice)



        const isEligibleToMove = this.playerPositionCheckForWinning(this.turn,this.dice,this.numberOfPlayers)


        if(isEligibleToMove.isEligible===false){

            this.playerList[`${this.turn}`].CheckCurrentX = this.playerList[`${this.turn}`].currentX
            this.playerList[`${this.turn}`].CheckCurrentY = this.playerList[`${this.turn}`].currentY
            this.playerList[`${this.turn}`].checkMoveTo = this.playerList[`${this.turn}`].moveTo

            console.log('you need',isEligibleToMove.need,'to move')

            this.turn++

            this.turn>this.numberOfPlayers?this.turn=1:null

            if(this.playerList[`${this.turn}`].playerWonTheGame)this.turn++

            this.turn>this.numberOfPlayers?this.turn=1:null
            


        }else{
            console.log('Player',this.turn,'position changed')
            this.playersPosition[`${this.turn}`].x = this.playerList[`${this.turn}`].CheckCurrentX
            this.playersPosition[`${this.turn}`].y = this.playerList[`${this.turn}`].CheckCurrentY

            this.updateTheGameIfPlayerIsEligibleToMove(this.numberOfPlayers,this.turn,this.dice)
        

            this.turn++

            this.turn>this.numberOfPlayers?this.turn=1:null

            if(this.playerList[`${this.turn}`].playerWonTheGame)this.turn++

            this.turn>this.numberOfPlayers?this.turn=1:null

           

        }
            
    }

    // redraw game after every move 

    updateGame(){
        
        boardMap.forEach((arr,i)=>{
            arr.forEach((item,j)=>{
               const block = new CreateBlocks(this.canvas,this.ctx,i,j,item) 
               this.blocks.push(block)

            })
        })


        this.blocks.forEach((item)=>{
            item.draw()
            
        })

        ctx.drawImage(this.img, 0, 0, canvas.width, canvas.height);


        for(let i=1;i<=this.numberOfPlayers;i++){
            this.playerList[`${i}`].draw()
        }

    }

    //Check for winner 

    checkForWinner(){
        
        if(this.playerList[`${this.turn}`].currentX===this.winner  && this.playerList[`${this.turn}`].currentY===this.winner){
            console.log(`Player ${this.turn} in the House`)
            this.playerList[`${this.turn}`].playerWonTheGame = true
            this.numberOfWinners++

            if(this.numberOfWinners===this.numberOfPlayers-1){
                console.log('Game Over')
            }
            
        }
        

    }




    // check if player is eligible to move or not or if he killed some player or not

    playerPositionCheckForWinning(turn,dice,numberOfPlayers){

        let tempPlayer = this.playerList[`${turn}`]
        let count = 1


        for(let i=1;i<=dice;i++){
            

            if(tempPlayer.CheckCurrentX===tempPlayer.winningPositionX && tempPlayer.CheckCurrentY===tempPlayer.winningPositionY){
                if(dice-i>=1){
                    console.log('you are not eligible to move')
                    return {isEligible:false,need:count}
                }
            }

            trackMovement()

            updateTempPostion()

            count++


        }

        function trackMovement(){
            if(tempPlayer.CheckCurrentX===4&&tempPlayer.CheckCurrentY===4 || 
                tempPlayer.CheckCurrentX===1&&tempPlayer.CheckCurrentY===3 || 
                turn===1&&tempPlayer.CheckCurrentX===tempPlayer.innerX&&tempPlayer.CheckCurrentY===tempPlayer.innerY||
                turn===1&&tempPlayer.CheckCurrentX===tempPlayer.winningPositionX&&tempPlayer.CheckCurrentY===tempPlayer.winningPositionY
            ){
                tempPlayer.checkMoveTo = '-y'
    
            }else if(tempPlayer.CheckCurrentX===0&&tempPlayer.CheckCurrentY===0||
                tempPlayer.CheckCurrentX===3&&tempPlayer.CheckCurrentY===1||
                turn===3&&tempPlayer.CheckCurrentX===tempPlayer.innerX&&tempPlayer.CheckCurrentY===tempPlayer.innerY||
                turn===3&&tempPlayer.CheckCurrentX===tempPlayer.winningPositionX&&tempPlayer.CheckCurrentY===tempPlayer.winningPositionY||
                turn===2&&tempPlayer.CheckCurrentX===tempPlayer.innerX&&tempPlayer.CheckCurrentY===tempPlayer.innerY&&numberOfPlayers===2||
                turn===3&&tempPlayer.CheckCurrentX===tempPlayer.winningPositionX&&tempPlayer.CheckCurrentY===tempPlayer.winningPositionY&&numberOfPlayers===2
            ){
                tempPlayer.checkMoveTo = 'y'
    
            }else if(tempPlayer.CheckCurrentX===4&&tempPlayer.CheckCurrentY===0||
                tempPlayer.CheckCurrentX===3&&tempPlayer.CheckCurrentY===3||
                turn===2&&tempPlayer.CheckCurrentX===tempPlayer.innerX&&tempPlayer.CheckCurrentY===tempPlayer.innerY||
                turn===2&&tempPlayer.CheckCurrentX===tempPlayer.winningPositionX&&tempPlayer.CheckCurrentY===tempPlayer.winningPositionY
            ){
            
                tempPlayer.checkMoveTo = '-x'
                
            }else if(tempPlayer.CheckCurrentX===0&&tempPlayer.CheckCurrentY===4||
                tempPlayer.CheckCurrentX===1&&tempPlayer.CheckCurrentY===1||
                turn===4&&tempPlayer.CheckCurrentX===tempPlayer.innerX&&tempPlayer.CheckCurrentY===tempPlayer.innerY||
                turn===4&&tempPlayer.CheckCurrentX===tempPlayer.winningPositionX&&tempPlayer.CheckCurrentY===tempPlayer.winningPositionY
            ){
    
                tempPlayer.checkMoveTo = 'x'
    
            }
        }

        function updateTempPostion(){
            
            if(tempPlayer.checkMoveTo==='x'){
                tempPlayer.CheckCurrentX++; 
            }else if(tempPlayer.checkMoveTo==='-x'){
                tempPlayer.CheckCurrentX--;   
            }else if(tempPlayer.checkMoveTo==='y'){
                tempPlayer.CheckCurrentY++; 
            }else if(tempPlayer.checkMoveTo==='-y'){
                tempPlayer.CheckCurrentY--;   
            }
            
        }

        return {isEligible:true}

    }

    //Updating player position based on its eligiblity

    updateTheGameIfPlayerIsEligibleToMove(numberOfPlayers,turn,dice, stepCount = 0,win=false){

        console.log('win at initial',win)

        let tempPlayer = this.playerList[`${turn}`]

        if (stepCount >= dice){

            this.checkToKillOrShare(turn)

            this.updateGame();

            if(win){

                console.log('win at final',win)

                tempPlayer.playerWonTheGame=true

                this.numberOfWinners++

                if(this.numberOfWinners===this.numberOfPlayers-1)this.gameOver()
            }

            document.querySelector('#dice').disabled = false

            return ;  // Stop when all steps are taken  
        }

        
    
        setTimeout(() => {

            

            finalTrackMovement(numberOfPlayers)

            const winUpdate = updatePostion()

            
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clear canvas
            this.updateGame(); // Redraw game (including player)
    
            this.updateTheGameIfPlayerIsEligibleToMove(numberOfPlayers,turn, dice, stepCount + 1,winUpdate); // Call next step

            

        }, 500);
        

        function  updatePostion(){
            if(tempPlayer.moveTo==='x'){
                tempPlayer.currentX++; 
            }else if(tempPlayer.moveTo==='-x'){
                tempPlayer.currentX--;   
            }else if(tempPlayer.moveTo==='y'){
                tempPlayer.currentY++; 
            }else if(tempPlayer.moveTo==='-y'){
                tempPlayer.currentY--;   
            }

            if(tempPlayer.currentX===2&&tempPlayer.currentY===2){
               console.log('Player',turn,'won the game')
                win = true
               return true
            }

            return false
        }


        function finalTrackMovement(numberOfPlayers){
    
            if(tempPlayer.currentX===4&&tempPlayer.currentY===4 || 
                tempPlayer.currentX===1&&tempPlayer.currentY===3 || 
                turn===1&&tempPlayer.currentX===tempPlayer.innerX&&tempPlayer.currentY===tempPlayer.innerY||
                turn===1&&tempPlayer.currentX===tempPlayer.winningPositionX&&tempPlayer.currentY===tempPlayer.winningPositionY
            ){
                tempPlayer.moveTo = '-y'
                
    
            }else if(tempPlayer.currentX===0&&tempPlayer.currentY===0||
                tempPlayer.currentX===3&&tempPlayer.currentY===1||
                turn===3&&tempPlayer.currentX===tempPlayer.innerX&&tempPlayer.currentY===tempPlayer.innerY||
                turn===3&&tempPlayer.currentX===tempPlayer.winningPositionX&&tempPlayer.currentY===tempPlayer.winningPositionY||
                turn===2&&tempPlayer.currentX===tempPlayer.innerX&&tempPlayer.currentY===tempPlayer.innerY && numberOfPlayers===2||
                turn===2&&tempPlayer.currentX===tempPlayer.winningPositionX&&tempPlayer.currentY===tempPlayer.winningPositionY && numberOfPlayers===2
                ){
    
                tempPlayer.moveTo = 'y'
                
    
            }else if(tempPlayer.currentX===4&&tempPlayer.currentY===0||
                tempPlayer.currentX===3&&tempPlayer.currentY===3||
                turn===2&&tempPlayer.currentX===tempPlayer.innerX&&tempPlayer.currentY===tempPlayer.innerY||
                turn===2&&tempPlayer.currentX===tempPlayer.winningPositionX&&tempPlayer.currentY===tempPlayer.winningPositionY
            
            ){
            
                tempPlayer.moveTo = '-x'
                
                
            }else if(tempPlayer.currentX===0&&tempPlayer.currentY===4||
                tempPlayer.currentX===1&&tempPlayer.currentY===1||
                turn===4&&tempPlayer.currentX===tempPlayer.innerX&&tempPlayer.currentY===tempPlayer.innerY||
                turn===4&&tempPlayer.currentX===tempPlayer.winningPositionX&&tempPlayer.currentY===tempPlayer.winningPositionY
            ){
    
                tempPlayer.moveTo = 'x'
                
    
            }
        }

    }

    
   // check player position for sharing and killing

    checkToKillOrShare(turn){

        let tempPlayer = this.playerList[`${turn}`]

        for(let i=1;i<=this.numberOfPlayers;i++){

            if(this.playersPosition[`${i}`].x===tempPlayer.currentX&&
                this.playersPosition[`${i}`].y===tempPlayer.currentY&&
                i!==turn){

                    if((tempPlayer.currentX===2&&
                        tempPlayer.currentY===4&&
                        i!==turn) ||
                        (tempPlayer.currentX===4&&
                        tempPlayer.currentY===2&&
                        i!==turn) ||
                        (tempPlayer.currentX===2&&
                        tempPlayer.currentY===0&&
                        i!==turn) ||
                        (tempPlayer.currentX===0&&
                        tempPlayer.currentY===2&&
                        i!==turn) ||
                        (tempPlayer.currentX===2&&
                        tempPlayer.currentY===2&&
                        i!==turn)
                    
                    ){
                        
                        share(i,turn)
                
                        break;  
                    }else{
                        console.log(this.playerList)
                        const updateKillPosition = kill(i,turn,this.playerList)
                        this.playerList = updateKillPosition
                        console.log(this.playerList)
                    }

            }


        }

        //Function to kill

        function kill(killed,killedBy,playerList){

            console.log('Player',killedBy,'killed Player',killed)

            console.log(playerList[killed])

            playerList[killed].currentX = playerList[killed].startX
            playerList[killed].currentY = playerList[killed].startY
            playerList[killed].CheckCurrentX = playerList[killed].startX
            playerList[killed].CheckCurrentY = playerList[killed].startY
            playerList[killed].moveTo = playerList[killed].startMoveTo
            playerList[killed].checkMoveTo = playerList[killed].startMoveTo

            return playerList

        }


        //function to share

        function share(shared,sharedBy){

            console.log('Player',sharedBy,'shared position with Player',shared)

        }

    }



    gameOver(){

        console.log('game Over')

        for(let i=1;i<=this.numberOfPlayers;i++){

            if(!this.playerList[`${i}`].playerWonTheGame){
                console.log('Player',i," Lost the game")
            }
            

        }

    }



    }//game class ends here







//Creating blocks 

class CreateBlocks{

    constructor(canvas,ctx,x,y,pos){
        this.canvas = canvas
        this.ctx= ctx
        this.x=x
        this.y=y
        this.pos = pos
        this.dimension = this.canvas.height/5
    }

    draw(){
        
        if(this.pos===1){

            this.ctx.fillStyle = 'blue'
            this.ctx.fillRect(this.x*this.dimension,this.y*this.dimension,this.dimension,this.dimension)
        }else if(this.pos===2){
            this.ctx.fillStyle = 'green'
            this.ctx.fillRect(this.x*this.dimension,this.y*this.dimension,this.dimension,this.dimension)
        }else{
            this.ctx.fillStyle = 'red'
            this.ctx.fillRect(this.x*this.dimension,this.y*this.dimension,this.dimension,this.dimension)
        }


    }

}




//Creating players

class Player{

    constructor(canvas,ctx,startX,startY,innerX,innerY,color,moveTo,winningPositionX,winningPositionY){
        this.canvas = canvas
        this.ctx= ctx
        this.startX = startX
        this.startY = startY
        this.startMoveTo = moveTo
        this.currentX = startX
        this.currentY = startY
        this.CheckCurrentX = this.currentX
        this.CheckCurrentY = this.currentY
        this.innerX= innerX
        this.innerY = innerY 
        this.color = color
        this.moveTo = moveTo
        this.checkMoveTo = moveTo
        this.winningPositionX = winningPositionX
        this.winningPositionY = winningPositionY
        this.tileDim = this.canvas.height / 5;
        this.playerPos = this.tileDim / 2.5;
        this.playerWonTheGame = this.color==='purple'?true:false
    }


    draw(){
        this.ctx.fillStyle = this.color
        this.ctx.fillRect(this.currentX*this.tileDim+this.playerPos,this.currentY*this.tileDim+this.playerPos,this.tileDim/5 ,this.tileDim/5)
    }

}





let gameInialize = new Game(canvas,ctx)
gameInialize.start()

function rollDice(){
    gameInialize.rollDice()
}

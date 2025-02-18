canvas = document.querySelector('canvas')
ctx = canvas.getContext('2d')


class Game{

    constructor(canvas,ctx){
        this.canvas=canvas
        this.ctx=ctx
        this.dice = undefined
        this.blocks = []
        this.canvas.height = document.querySelector('.middle').offsetHeight
        this.canvas.width = document.querySelector('.middle').offsetWidth
        this.numberOfPlayers = 2
        this.turn = 1
        this.playerList = {}
        this.winner = 2

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

        this.createPlayer()


    }

    createPlayer(){
        this.playerList['1'] = new Player(this.canvas,this.ctx,2,4,1,4,'yellow','x',2,3)
        this.playerList['1'].draw()

        this.playerList['2'] = new Player(this.canvas,this.ctx,2,0,3,0,'black','-x',2,1)
        this.playerList['2'].draw()
    }


    // function to create random number and check if player is eligible to move or not

    rollDice(){

        const randomNum = Math.floor(Math.random()*6)+1

        this.dice = randomNum

        console.log('Player',this.turn,'rolled',this.dice)

        const isEligibleToMove = this.playerPositionCheckForWinningAndKilling(this.turn,this.dice)

        console.log(isEligibleToMove)


        if(isEligibleToMove.isEligible===false){

            this.playerList[`${this.turn}`].CheckCurrentX = this.playerList[`${this.turn}`].currentX
            this.playerList[`${this.turn}`].CheckCurrentY = this.playerList[`${this.turn}`].currentY
            this.playerList[`${this.turn}`].checkMoveTo = this.playerList[`${this.turn}`].moveTo

            console.log('you need',isEligibleToMove.need,'to move')
            this.turn++
            this.turn>this.numberOfPlayers?this.turn=1:null


        }else{
            this.updateTheGameIfPlayerIsEligibleToMove(this.turn,this.dice)
            this.turn++
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

        for(let i=1;i<=this.numberOfPlayers;i++){
            this.playerList[`${i}`].draw()
        }

    }

    //Check for winner 

    checkForWinner(){
        
        if(this.playerList[`${this.turn}`].currentX===this.winner  && this.playerList[`${this.turn}`].currentY===this.winner){
            console.log(`Player ${this.turn} won the game`)
        }
        

    }




    // check if player is eligible to move or not or if he killed some player or not

    playerPositionCheckForWinningAndKilling(turn,dice){

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
                turn===2&&tempPlayer.CheckCurrentX===tempPlayer.innerX&&tempPlayer.CheckCurrentY===tempPlayer.innerY||
                turn===2&&tempPlayer.CheckCurrentX===tempPlayer.winningPositionX&&tempPlayer.CheckCurrentY===tempPlayer.winningPositionY
            ){
                tempPlayer.checkMoveTo = 'y'
    
            }else if(tempPlayer.CheckCurrentX===4&&tempPlayer.CheckCurrentY===0||
                tempPlayer.CheckCurrentX===3&&tempPlayer.CheckCurrentY===3){
            
                tempPlayer.checkMoveTo = '-x'
                
            }else if(tempPlayer.CheckCurrentX===0&&tempPlayer.CheckCurrentY===4||
                tempPlayer.CheckCurrentX===1&&tempPlayer.CheckCurrentY===1){
    
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

    updateTheGameIfPlayerIsEligibleToMove(turn,dice, stepCount = 0){

        let tempPlayer = this.playerList[`${turn}`]

        if(this.playerList[`${this.turn}`].currentX===this.winner  && this.playerList[`${this.turn}`].currentY===this.winner){
            console.log(`Player ${this.turn} won the game`)
        }

        if (stepCount >= dice) return; // Stop when all steps are taken
    
        setTimeout(() => {

            

            finalTrackMovement()
            updatePostion()

            
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clear canvas
            this.updateGame(); // Redraw game (including player)
    
            this.updateTheGameIfPlayerIsEligibleToMove(turn, dice, stepCount + 1); // Call next step
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
            }
        }


        function finalTrackMovement(){
    
            if(tempPlayer.currentX===4&&tempPlayer.currentY===4 || 
                tempPlayer.currentX===1&&tempPlayer.currentY===3 || 
                turn===1&&tempPlayer.currentX===tempPlayer.innerX&&tempPlayer.currentY===tempPlayer.innerY||
                turn===1&&tempPlayer.currentX===tempPlayer.winningPositionX&&tempPlayer.currentY===tempPlayer.winningPositionY
            ){
                tempPlayer.moveTo = '-y'
                
    
            }else if(tempPlayer.currentX===0&&tempPlayer.currentY===0||
                tempPlayer.currentX===3&&tempPlayer.currentY===1||
                turn===2&&tempPlayer.currentX===tempPlayer.innerX&&tempPlayer.currentY===tempPlayer.innerY||
                turn===2&&tempPlayer.currentX===tempPlayer.winningPositionX&&tempPlayer.currentY===tempPlayer.winningPositionY
            ){
    
                tempPlayer.moveTo = 'y'
                
    
            }else if(tempPlayer.currentX===4&&tempPlayer.currentY===0||
                tempPlayer.currentX===3&&tempPlayer.currentY===3){
            
                tempPlayer.moveTo = '-x'
                
                
            }else if(tempPlayer.currentX===0&&tempPlayer.currentY===4||
                tempPlayer.currentX===1&&tempPlayer.currentY===1){
    
                tempPlayer.moveTo = 'x'
                
    
            }
        }

    }

    
   

    



    }







//Creating blocks 

class CreateBlocks{

    constructor(canvas,ctx,x,y,pos){
        this.canvas = canvas
        this.ctx= ctx
        this.x=x
        this.y=y
        this.pos = pos
    }

    draw(){
        
        if(this.pos===1){

            this.ctx.fillStyle = 'blue'
            this.ctx.fillRect(this.x*50,this.y*50,50,50)
        }else if(this.pos===2){
            this.ctx.fillStyle = 'green'
            this.ctx.fillRect(this.x*50,this.y*50,50,50)
        }else{
            this.ctx.fillStyle = 'red'
            this.ctx.fillRect(this.x*50,this.y*50,50,50)
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
    }


    draw(){
        this.ctx.fillStyle = this.color
        this.ctx.fillRect(this.currentX*50+15,this.currentY*50+15,20,20)
    }

}







let gameInialize = new Game(canvas,ctx)
gameInialize.start()

function rollDice(){
    gameInialize.rollDice()
}

var ball;
var database;
var ballPositionRef;
var boxPosition; 

function setup(){
    createCanvas(500,500);

    //create a database inside the 'database' variable --> firebase.database()
    database = firebase.database()

    //refer to the database using the ballPositionRef for the position --> database.ref('what to refer')
    ballPositionRef = database.ref('box/position');

    //create a listener for the ballPositionRef --> variableName.on("value",function)
    ballPositionRef.on("value",readPosition);

    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
    //refer to the database set the values of the x and y position of the box in the database
    database.ref('box/position').set({
        'x':boxPosition.x + x,
        'y':boxPosition.y + y
    })


}

function readPosition(data){
//store the listened information inside the boxPosition variable
boxPosition = data.val();

//make the ball's x and y position equal to the box's x and y position
ball.x = boxPosition.x;
ball.y = boxPosition.y;
}

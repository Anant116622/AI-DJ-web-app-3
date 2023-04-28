song = ""
scoreLeftWrist = 0
leftWristY = 0
leftWristX = 0
rightWristY = 0
rightWristX = 0

function setup()
{
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    pose = ml5.poseNet(video,modelLoaded)
   pose.on('pose',Gotposes)
}
function draw()
{
    image(video, 0, 0, 600 ,500);
    if(scoreLeftWrist > 0.2)
    {
        fill("black")
        srtoke("red")
        circle(leftWristX,leftWristY,20);
        InNumberleftwristX = number(leftWristY);
        remove_decimal = floor(InNumberleftwristX);
        volume = remove_decimal/500;
        document.getElementById("volume").innerHTML = "Volume = "+ volume ;
        song.setVolume(volume);
    }
}
function preload()
{
    song = loadSound("music.mp3")
}
function play()
{
    song.play()
    song.setVolume(1);
    song.rate(1);
}
function modelLoaded()
{
    console.log('PoseNet Is Initialized!')
}
function Gotposes(results)
{
    if(results.length > 0)
    {

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log('ScoreLeftWrist = ' + scoreLeftWrist);

        console.log(results)
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log('leftWristX = '+ leftWristX + 'leftWristY' + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log('rightWristX ='+ rightWristX + 'rightWristY = ' + rightWristY );
    }
}


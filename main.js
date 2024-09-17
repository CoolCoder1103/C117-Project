function preload() {
    mustacheImg = loadImage('mustache.png');
}

function setup() {
    canvas = createCanvas(300, 300);
    canvas.center();
}

function draw() {
}

function save_snapshot(){
  save('myFilterImage.png')
}


function take_snapshot(){
      Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality:90
    
});

    camera = document.getElementById("camera");

Webcam.attach( "#camera" );


function preload() {
    mustacheImg = loadImage('mustache.png');
}

function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.size(300, 300);
  video.hide();

  poseNet = ml5.poseNet(video, modeLoaded);
  poseNet.on('pose', gotPoses);
  }
  
  
  function draw() {
    push();
    translate(width, 0);
    scale(-1, 1);
    image(video, 0, 0, width, height);
  
    drawMustache();
    pop();
    image(video, 0, 0, 300, 300);
    image(clown_nose, noseX, noseY, 30, 30);
  }
  
  function mouseClicked() {
    freeze = !freeze;
  }
  
  function drawMustache() {
    for (let i = 0; i < poses.length; i++) {
      let pose = poses[i].pose;
  
      let nosePoint = pose.keypoints[0];
      let leftMouthPoint = pose.keypoints[10]; // Left mouth corner
      let rightMouthPoint = pose.keypoints[9]; // Right mouth corner
  
      let noseX, noseY, leftMouthX, leftMouthY, rightMouthX, rightMouthY;
  
      if (nosePoint.score > 0.2) {
        noseX = nosePoint.position.x;
        noseY = nosePoint.position.y;
      }
  
      if (leftMouthPoint.score > 0.2) {
        leftMouthX = leftMouthPoint.position.x;
        leftMouthY = leftMouthPoint.position.y;
      }
  
      if (rightMouthPoint.score > 0.2) {
        rightMouthX = rightMouthPoint.position.x;
        rightMouthY = rightMouthPoint.position.y;
      }
  
      if (leftMouthX != null && leftMouthY != null && rightMouthX != null && rightMouthY != null && noseX != null && noseY != null) {
        // Calculate the position for the mustache
        let mustacheX = (leftMouthX + rightMouthX) / 2;
        let mustacheY = (leftMouthY + rightMouthY) / 2;
  
        // Calculate the size of the mustache based on the width between the mouth corners
        let mouthWidth = dist(leftMouthX, leftMouthY, rightMouthX, rightMouthY);
        let mustacheScale = mouthWidth / mustacheWidth;
  
        // Draw the mustache
        imageMode(CENTER);
        push();
        translate(mustacheX, mustacheY);
        scale(mustacheScale);
        image(mustacheImg, 0, 0);
        pop();
      }
    }
  }


function modelLoaded() {
    console.log('PoseNet is Initialized');
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("nose x = " + noseX);
        console.log("nose y = " + noseY);
        console.log("nose x = " + results[0].pose.nose.x);
        console.log("nose y = " + results[0].pose.nose.y);
    }
}

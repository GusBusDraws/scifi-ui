let background_hex = "#010703";
let low_green_hex = "#0E361B";
let med_green_hex = "#23783F";
let hi_green_hex = "#4BF37C";
let hi_white_hex = "#C6E6CF";
let layer3d;
let layer2d;
let frameNum = 0;
let fps = 30;
let nSeconds = 5;
let cursorChar = "█";

function setup() {
  createCanvas(600, 800);
  layer3d = createGraphics(600, 800, WEBGL);
  layer2d = createGraphics(600, 800);
  frameRate(fps);
  // saveGif("creatives-club-waves.gif", nSeconds);
}

function draw2d() {
  layer2d.clear();
  let margin = 25;
  drawBorder(
    x=margin,
    y=margin,
    w=width-2*margin,
    h=height-2*margin,
    cornerRadius=margin,
  );
  drawBorder(
    x=2*margin,
    y=2*margin,
    w=width/2-2*margin,
    h=height/2-2*margin,
    cornerRadius=margin/2,
  );
  drawWaveform(
    xMin=2*margin,
    xMax=width/2,
    yMin=height*0.1,
    yMax=height/2-margin,
    nWaves=4,
    nCycles=5,
  );
  let blinkColor = getBlinkColor(
    onColor=hi_white_hex,
    offColor=low_green_hex,
    onDuration=1,
    offDuration=0.5,
  );
  drawText(
    lines=[
      "Hello,",
      "world.",
    ],
    font="Roboto Mono",
    fontSize=25,
    fontColor=blinkColor,
    x=width*0.75,
    y=height*0.25,
    lineSize=50,
    centered=true,
  );
  drawBorder(
    x=2*margin,
    y=height/2+margin,
    w=width-4*margin,
    h=height/4,
    cornerRadius=margin/2,
  );
  drawWaveform(
    xMin=2*margin,
    xMax=width-2*margin,
    yMin=height/2+2*margin,
    yMax=height*0.75,
    nWaves=1,
    nCycles=2,
  )
  typeText(
    textString="Wherever you go, there you are.",
    characterDuration=0.1,
    font="Roboto Mono",
    fontSize=25,
    fontColor=hi_white_hex,
    x=width*0.5,
    y=height*0.875,
    lineSize=40,
    centered=true,
  )
}

function draw3d() {
  drawSphere(
    xTranslate=0,
    yTranslate=0,
    zTranslate=0,
    xAngle=0,
    yAngle="spin",
    zAngle=0,
  )
}

function draw() {
  background(background_hex);

  draw2d();
  // draw3d();

  image(layer2d, 0, 0)
  image(layer3d, 0, 0)
  filter(BLUR, 5);
  image(layer2d, 0, 0);
  image(layer3d, 0, 0);
  // if (frameCount < fps * nSeconds) {
}

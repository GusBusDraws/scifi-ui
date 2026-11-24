// @ts-nocheck
/// <reference path="./node_modules/@types/p5/global.d.ts" />
let background_hex = "#010703";
let low_green_hex = "#0E361B";
let med_green_hex = "#23783F";
let hi_green_hex = "#4BF37C";
let hi_white_hex = "#C6E6CF"
let layer3d;
let layer2d;
let font;
let frameNum = 0;
let fps = 30;
let nSeconds = 5;
let margins = 25;
let cursor = "█";

function setup() {
  createCanvas(600, 800);
  layer3d = createGraphics(600, 800, WEBGL);
  layer2d = createGraphics(600, 800);
  frameRate(fps);
  // saveGif("creative-code-denver.gif", nSeconds);
}

function draw2d() {
  layer2d.clear()
  drawBorder();
  drawText(
    lines=[
      "CREATIVE CODE",
      "DENVER",
    ],
    font="Orbitron",
    fontSize=50,
    fontColor=hi_white_hex,
    x=width/2,
    y=85,
    lineSize=55,
    centered=true,
  );
  drawScrollingBanner(
    banner="////////////////////////////",
    y=200,
    bStates=1,
    chracterColor=low_green_hex,
  );
  drawScrollingBanner(
    banner=" //  //  //  //  //  //  // ",
    y=200,
    bStates=4,
    chracterColor=hi_green_hex,
  );
  drawScrollingBanner(
    banner="////////////////////////////",
    y=240,
    bStates=1,
    chracterColor=low_green_hex,
  );
  drawScrollingBanner(
    banner="//  //  //  //  //  //  //  ",
    y=240,
    bStates=4,
    chracterColor=hi_green_hex,
  );
  drawText(
    lines=[
      "> Monday, December 14th",
      "> 6 to 8 pm",
    ],
    font="Roboto Mono",
    fontSize=30,
    fontColor=hi_white_hex,
    x=2*margins,
    y=300,
    lineSize=50,
    centered=false,
  );
  drawGrid();
  drawWaveform();
  drawText(
    lines=[
      "> The Company",
      "> 2101 W 29th Ave",
      "> Denver, CO 80211",
    ],
    font="Roboto Mono",
    fontSize=30,
    fontColor=hi_white_hex,
    x=2*margins,
    y=height-125,
    lineSize=50,
    centered=true,
  );
  drawProgressBar();
}

function drawSphere() {
  layer3d.clear()
  layer3d.push()
  layer3d.translate(width*0.15, height*0.1)
  // Rotate the sphere down a bit, same rotation every time
  layer3d.rotateX(-PI/6);
  // Rotate the sphere by an amount that increases with every frame
  layer3d.rotateY(
    (frameCount-1) * (PI/2)/(fps*nSeconds)
  );
  // Make the shape hollow/wireframe
  layer3d.noFill();
  layer3d.stroke(hi_green_hex);
  layer3d.strokeWeight(2);
  // Draw a sphere
  layer3d.sphere(145, 16, 8);
  layer3d.pop()
}

function draw() {
  background(background_hex);

  draw2d();
  drawSphere();

  image(layer2d, 0, 0)
  image(layer3d, 0, 0)
  filter(BLUR, 5);
  image(layer2d, 0, 0);
  image(layer3d, 0, 0);
  // if (frameCount < fps * nSeconds) {
}

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

function drawBorder() {
  layer2d.noFill();
  layer2d.stroke(hi_green_hex);
  layer2d.strokeWeight(2);
  layer2d.rect(margins, margins, width-50, height-50, 50);
  // layer2d.rect(25, 25, 0, 0, 50);
}

function drawTitleText() {
  let lines = [
    "CREATIVE CODE",
    "DENVER",
  ]
  layer2d.textFont("Orbitron");
  layer2d.fill(hi_white_hex);
  layer2d.textSize(50);
  layer2d.textAlign(CENTER, CENTER);
  layer2d.text(lines[0], width/2, 85)
  layer2d.text(lines[1], width/2, 140)
}

function drawScrollingBanner(banner, y, nStates) {
  let duration = 1;  // in seconds

  layer2d.textFont("Roboto Mono");
  layer2d.fill(hi_green_hex);
  layer2d.textSize(30);
  layer2d.textAlign(CENTER, CENTER);

  let startIndex = Math.floor(
    (frameCount-1) % (fps * duration)
    / (fps * duration / nStates)
  );
  banner = banner.slice(startIndex) + banner.slice(0, startIndex);
  layer2d.text(banner, width/2, y)
}

function drawSubText() {
  let lines = [
    "> Monday, December 14th",
    "> 6 to 8 pm",
  ]
  layer2d.textFont("Roboto Mono");
  layer2d.fill(hi_white_hex);
  layer2d.textSize(30);
  layer2d.textAlign(LEFT, CENTER);
  layer2d.text(lines[0], 2*margins, 300)
  layer2d.text(lines[1], 2*margins, 350)
}

function drawGrid() {
  let xStart = 50;
  let xEnd = 220;
  let yStart = 390;
  let yEnd = 590;
  let nxLines = 8;
  let nyLines = 10;
  let xSpacing = (xEnd - xStart) / (nxLines - 1);
  let ySpacing = (yEnd - yStart) / (nyLines - 1);

  layer2d.stroke(low_green_hex);
  // layer2d.stroke(med_green_hex);
  layer2d.noFill();

  for (let i = 0; i < nxLines; i++) {
    layer2d.line(
      xStart + i*xSpacing, yStart,
      xStart + i*xSpacing, yEnd,
    )
  }
  for (let i = 0; i < nyLines; i++) {
    layer2d.line(
      xStart, yStart + i*ySpacing,
      xEnd, yStart + i*ySpacing,
    )
  }
}

function drawWaveform() {
  let a = 80;
  let w = PI/24;
  let step = 1;
  let xMax = 170;
  let nCycles = 3;
  let phase = 2*PI * nCycles * (frameCount - 1) / (fps * nSeconds);

  layer2d.push()
  layer2d.translate(50, 490)
  layer2d.stroke(hi_green_hex);
  for (let x = 0; x < xMax; x+=step) {
    layer2d.line(
      x, a*sin(w*x + phase),
      (x+step), a*sin(w*(x+step) + phase),
    )
  }
  layer2d.pop()
}

function drawAddressText() {
  let lines = [
    "> The Company",
    "> 2101 W 29th Ave",
    "> Denver, CO 80211",
  ]
  layer2d.textFont("Roboto Mono");
  layer2d.fill(hi_white_hex);
  layer2d.textSize(30);
  layer2d.textAlign(LEFT, CENTER);
  layer2d.text(lines[0], 2*margins, height-175)
  layer2d.text(lines[1], 2*margins, height-125)
  layer2d.text(lines[2], 2*margins, height-75)
}

function drawProgressBar() {
  let nRects = 10;
  let xStart = 400;
  let xEnd = 535;
  let yStart = 666;
  let yEnd = 735;
  let spacing = 5;
  let rectWidth = (
    (xEnd - xStart) - (nRects-1)*spacing
  ) / nRects;
  let rectHeight = yEnd - yStart;
  for (let i = 0; i < nRects; i++) {
    if ((frameCount-1) % (fps * nSeconds) < (i + 1)*(fps * nSeconds / (nRects + 1)) ) {
      layer2d.stroke(med_green_hex);
      layer2d.fill(low_green_hex);
    } else {
      layer2d.stroke(hi_green_hex);
      layer2d.fill(med_green_hex);
    }
    layer2d.rect(
      xStart + i*(rectWidth + spacing), yStart,
      rectWidth, rectHeight
    );
  }
}

function draw2d() {
  layer2d.clear()
  drawBorder();
  drawTitleText();
  drawScrollingBanner(
    " //  //  //  //  //  //  // ", 200, 4
  );
  drawScrollingBanner(
    "//  //  //  //  //  //  //  ", 240, 4
  );
  drawSubText();
  drawGrid();
  drawWaveform();
  drawAddressText();
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

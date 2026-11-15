// @ts-nocheck
/// <reference path="./node_modules/@types/p5/global.d.ts" />
let background_hex = "#010703";
let low_green_hex = "#0E361B";
let mid_green_hex = "#23783F";
let hi_green_hex = "#4BF37C";
let hi_white_hex = "#C6E6CF"
let layer3d;
let layer2d;
let font;
let frameNum = 0;
let fps = 30;
let margins = 25;
let cursor = "█";

function setup() {
  createCanvas(600, 800);
  layer3d = createGraphics(600, 800, WEBGL);
  layer2d = createGraphics(600, 800);
  frameRate(fps);
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

function drawSeparator() {
  let states = [
    "  /  /  /  /  /  /  /  /  / ",
    " /  /  /  /  /  /  /  /  /  ",
    "/  /  /  /  /  /  /  /  /  /",
  ]
  layer2d.textFont("Roboto Mono");
  layer2d.fill(hi_green_hex);
  layer2d.textSize(30);
  layer2d.textAlign(CENTER, CENTER);
  let separator = states[0];
  if (frameCount % 15 < 5) {
    separator = states[1];
  } else if (frameCount % 15 < 10) {
    separator = states[2];
  }
  layer2d.text(separator, width/2, 225)
}

function drawSubText() {
  let lines = [
    "> Monday, December 21st",
    "> 6 to 8 pm",
  ]
  layer2d.textFont("Roboto Mono");
  layer2d.fill(hi_white_hex);
  layer2d.textSize(30);
  layer2d.textAlign(LEFT, CENTER);
  layer2d.text(lines[0], 2*margins, 300)
  layer2d.text(lines[1], 2*margins, 350)
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

function draw2d() {
  layer2d.clear()
  drawBorder();
  drawTitleText();
  drawSeparator();
  drawSubText();
  drawAddressText();
}

function drawSphere() {
  layer3d.clear()
  layer3d.push()
  layer3d.translate(width*0.15, height*0.1)
  // Rotate the sphere down a bit, same rotation every time
  layer3d.rotateX(-PI/6);
  // Rotate the sphere by an amount that increases with every frame
  layer3d.rotateY(frameCount * 0.01);
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
  frameNum = frameCount % 10;
}

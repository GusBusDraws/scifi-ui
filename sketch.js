// @ts-nocheck
/// <reference path="./node_modules/@types/p5/global.d.ts" />
let background_hex = "#010703";
let low_green_hex = "#0E361B";
let mid_green_hex = "#23783F";
let hi_green_hex = "#4BF37C";
let whitish_hex = "#C6E6CF"
let layer3d;
let layer2d;
let font;
let frameNum = 0;
let fps = 30;

function setup() {
  createCanvas(600, 800, WEBGL);
  layer3d = createFramebuffer();
  layer2d = createGraphics(600, 800);
  frameRate(fps)
}

function drawBorder() {
  layer2d.noFill();
  layer2d.stroke(hi_green_hex);
  layer2d.strokeWeight(2);
  layer2d.rect(25, 25, width-50, height-50, 50);
}

function drawText() {
  // layer2d.background(0, 0);
  layer2d.textFont("Orbitron");
  layer2d.fill(hi_green_hex);
  layer2d.textSize(50);
  let lines = [
    "Creative Code",
    "Denver",
  ]
  layer2d.textFont("Roboto Mono");
  layer2d.text(lines[0], 50, 100)
  layer2d.text(frameNum, 50, 200)
  layer2d.fill(255);
  layer2d.textFont("Orbitron");
  layer2d.text(lines[0], 20, 40);
}

function draw2d() {
  layer2d.clear()
  drawBorder();
  drawText();
  image(layer2d, -width / 2, -height / 2, width, height);
}

function drawSphere() {
  translate(width*0.1, height*0.2)
  // Rotate the sphere down a bit, same rotation every time
  rotateX(-PI/6);
  // Rotate the sphere by an amount that increases with every frame
  rotateY(frameCount * 0.01);
  // Make the shape hollow/wireframe
  noFill();
  stroke(hi_green_hex);
  strokeWeight(2);
  // Draw a sphere
  sphere(150, 16, 8);
}

function draw() {
  background(background_hex);

  // Draw geometry to a framebuffer that can be layered. See tutorial:
  // https://p5js.org/tutorials/layered-rendering-with-framebuffers/
  layer3d.begin();
  // Clear pixels from previous framebuffer to prevent a feedback effect
  clear();
  draw2d();
  drawSphere();
  layer3d.end();

  image(layer3d, -width/2, -height/2);
  filter(BLUR, 5);
  image(layer3d, -width/2, -height/2);
  frameNum = frameCount % 10;
}

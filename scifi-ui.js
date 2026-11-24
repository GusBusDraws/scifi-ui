// @ts-nocheck
/// <reference path="./node_modules/@types/p5/global.d.ts" />

function drawBorder() {
  layer2d.noFill();
  layer2d.stroke(hi_green_hex);
  layer2d.strokeWeight(2);
  layer2d.rect(margins, margins, width-50, height-50, 50);
  // layer2d.rect(25, 25, 0, 0, 50);
}

function drawText(lines, font, fontSize, fontColor, x, y, lineSize, centered) {
  layer2d.textFont(font);
  layer2d.noStroke();
  layer2d.fill(fontColor);
  layer2d.textSize(fontSize);
  if (centered == true) {
    layer2d.textAlign(CENTER, CENTER);
  } else {
    layer2d.textAlign(LEFT, CENTER);
  }
  for (let i=0; i<lines.length; i++) {
    layer2d.text(lines[i], x, y + i*lineSize)
  }
}

function drawScrollingBanner(banner, y, nStates, characterColor) {
  if (frameCount == 1){
    console.log(characterColor)
  }
  let duration = 1;  // in seconds

  layer2d.textFont("Roboto Mono");
  layer2d.noStroke();
  layer2d.fill(characterColor);
  layer2d.textSize(30);
  layer2d.textAlign(CENTER, CENTER);

  let startIndex = Math.floor(
    (frameCount-1) % (fps * duration)
    / (fps * duration / nStates)
  );
  banner = banner.slice(startIndex) + banner.slice(0, startIndex);
  layer2d.text(banner, width/2, y)
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
      layer2d.stroke(low_green_hex);
      layer2d.noFill();
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

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
let cursorChar = "█";

function setup() {
  createCanvas(600, 800);
  layer3d = createGraphics(600, 800, WEBGL);
  layer2d = createGraphics(600, 800);
  frameRate(fps);
  // saveGif("creatives-club-waves.gif", nSeconds);
}

function drawBorder(x, y, w, h, cornerRadius) {
  layer2d.noFill();
  layer2d.stroke(hi_green_hex);
  layer2d.strokeWeight(2);
  layer2d.rect(x, y, w, h, cornerRadius);
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
  layer2d.clear();
  let margin = 25;
  let borderBottom = 550
  drawBorder(
    x=margin,
    y=margin,
    w=width-2*margin,
    h=borderBottom-2*margin,
    cornerRadius=margin,
  );
  let margin2 = margin + 10;
  drawBorder(
    x=margin2,
    y=margin2,
    w=width-2*margin2,
    h=borderBottom-2*margin2,
    cornerRadius=margin-(margin2-margin),
  );
  drawText(
    lines=[
      "CREATIVES CLUB",
      "BOULDER",
    ],
    font="Orbitron",
    fontSize=45,
    fontColor=hi_white_hex,
    x=width/2,
    y=85,
    lineSize=50,
    centered=true,
  );
  drawWaveform(
    xMin=50,
    xMax=width-50,
    yMin=200,
    yMax=250,
    nWaves=2,
    nCycles=3,
  );
  drawText(
    lines=[
      "Thursday, November 19th",
      "6 to 9 pm",
    ],
    font="Roboto Mono",
    fontSize=25,
    fontColor=hi_white_hex,
    x=75,
    y=300,
    lineSize=50,
    centered=false,
  );
  let blinkColor = low_green_hex
  let blinkDuration = 0.5;
  let frameType = Math.floor(
    (frameCount-1) % (fps * blinkDuration)
    / (fps * blinkDuration / 2)
  )
  if (frameType == 1) {
    blinkColor = hi_green_hex
  }
  drawText(
    lines=[
      ">                             <",
    ],
    font="Roboto Mono",
    fontSize=25,
    fontColor=blinkColor,
    x=width/2,
    y=410,
    lineSize=50,
    centered=true,
  );
  drawText(
    lines=[
      "   Bring a project to work on!   ",
    ],
    font="Roboto Mono",
    fontSize=25,
    fontColor=hi_white_hex,
    x=width/2,
    y=410,
    lineSize=50,
    centered=true,
  );
  drawText(
    lines=[
      "VisionQuest Brewery",
    ],
    font="Roboto Mono",
    fontSize=30,
    fontColor=hi_white_hex,
    x=width/2,
    y=475,
    lineSize=50,
    centered=true,
  );
  drawVerticalProgressBar(
    xMin=75,
    xMax=25,
    yMin=borderBottom,
    yMax=borderBottom+100,
    nRects=10,
    spacing=5,
    directionSign=-1,
  );
  drawVerticalProgressBar(
    xMin=width-75,
    xMax=width-25,
    yMin=borderBottom,
    yMax=borderBottom+100,
    nRects=10,
    spacing=5,
    directionSign=1,
  );
}

function drawSphere() {
  layer3d.clear()
  layer3d.push()
  // Rotate the sphere down a bit, same rotation every time
  layer3d.rotateX(-PI/2);
  layer3d.translate(0, 0, height*0.5)
  layer3d.rotateZ(-PI/2);
  // Rotate the sphere by an amount that increases with every frame
  layer3d.rotateY(
    (frameCount-1) * (-PI/2)/(fps*nSeconds)
  );
  // Make the shape hollow/wireframe
  layer3d.noFill();
  layer3d.stroke(hi_green_hex);
  layer3d.strokeWeight(2);
  // Draw a sphere
  layer3d.sphere(250, 16, 8);
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

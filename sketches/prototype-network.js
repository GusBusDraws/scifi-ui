let background_hex = "#010703";
let low_green_hex = "#0E361B";
let med_green_hex = "#23783F";
let hi_green_hex = "#4BF37C";
let hi_white_hex = "#C6E6CF";
let layer3d;
let layer2d;
let frameNum = 0;
let fps = 30;
let nSeconds = 9;
let cursorChar = "█";
let margin = 25;
let nodes, edges;
let xMin, xMax, yMin, yMax;
let moveDiameters, moveDirections;

function setup() {
  createCanvas(600, 800);
  layer3d = createGraphics(600, 800, WEBGL);
  layer2d = createGraphics(600, 800);
  frameRate(fps);
  let nNodes = 10;
  xMin = 2*margin;
  xMax = width-2*margin;
  yMin = 0.2*height;
  yMax = 0.8*height;
  [nodes, edges] = make2DNetwork(
    nNodes=nNodes,
    xMin=xMin+2*margin,
    xMax=xMax-2*margin,
    yMin=yMin+2*margin,
    yMax=yMax-2*margin,
  )
  moveDiameters = getMoveDiameters(nNodes, 10, 50)
  moveDirections = getMoveDirections(nNodes)
  // saveGif("prototype-network.gif", nSeconds);
}

function draw2d() {
  xMin = 2*margin;
  xMax = width-2*margin;
  yMin = 0.2*height;
  yMax = 0.8*height;
  layer2d.clear();
  drawText(
    lines=["W A R N I N G"],
    font="Orbitron",
    fontSize=50,
    fontColor=hi_white_hex,
    x=width/2,
    y=0.125*height,
    lineSize=25,
    centered=true,
  )
  drawBorder(
    x=margin,
    y=margin,
    w=width-2*margin,
    h=height-2*margin,
    cornerRadius=margin,
  );
  drawBorder(
    x=xMin,
    y=yMin,
    w=xMax-xMin,
    h=yMax-yMin,
    cornerRadius=margin/2,
  );
  nodes = moveNodesInLoop(
    nodes,
    nSeconds=nSeconds,
    moveDiameters=moveDiameters,
    moveDirections=moveDirections,
    xMin=xMin,
    xMax=xMax,
    yMin=yMin,
    yMax=yMax,
    clipOutOfBounds=false,
  )
  draw2DNetwork(
    nodes=nodes,
    edges=edges,
    nodeDiameter=10,
    edgeWidth=2,
    nodeColor=hi_green_hex,
    edgeColor=med_green_hex,
  )
  typeText(
    textString="Your attention is in motion.",
    typingDuration=nSeconds/3,
    startPauseDuration=nSeconds/3,
    endPauseDuration=nSeconds/3,
    font="Roboto Mono",
    fontSize=20,
    fontColor=hi_green_hex,
    x=margin*3,
    y=0.75*height,
    lineSize=25,
    centered=false,
    cursorBlinkDuration=1,
    startCursorBlink=true,
    endCursorBlink=true,
  )
  drawWaveform(
    xMin=2*margin,
    xMax=width-2*margin,
    yMin=0.8*height+margin,
    yMax=height-2*margin,
    nWaves=1,
    nCycles=1,
  )
}

function draw3d() {
  let shape = null;
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

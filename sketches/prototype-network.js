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
let margin = 25;
let nodes, edges;
let xMin, xMax, yMin, yMax;

function setup() {
  createCanvas(600, 800);
  layer3d = createGraphics(600, 800, WEBGL);
  layer2d = createGraphics(600, 800);
  frameRate(fps);
  // saveGif("creatives-club-waves.gif", nSeconds);
  xMin = 3*margin;
  xMax = width-3*margin;
  yMin = 3*margin;
  yMax = height-3*margin;
  [nodes, edges] = make2DNetwork(
    nNodes=10,
    xMin=xMin,
    xMax=xMax,
    yMin=yMin,
    yMax=yMax,
  )
}

function draw2d() {
  layer2d.clear();
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
    w=width-4*margin,
    h=height-4*margin,
    cornerRadius=margin/2,
  );
  nodes = moveNodesInLoop(
    nodes,
    nSeconds=5,
    xMin=xMin,
    xMax=xMax,
    yMin=yMin,
    yMax=yMax,
    maxMoveDiameter=100,
  )
  draw2DNetwork(
    nodes=nodes,
    edges=edges,
    nodeDiameter=10,
    edgeWidth=2,
    nodeColor=hi_green_hex,
    edgeColor=med_green_hex,
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

// @ts-nocheck
/// <reference path="./node_modules/@types/p5/global.d.ts" />

function drawBorder(x, y, w, h, cornerRadius) {
  layer2d.noFill();
  layer2d.stroke(hi_green_hex);
  layer2d.strokeWeight(2);
  layer2d.rect(x, y, w, h, cornerRadius);
  // layer2d.rect(25, 25, 0, 0, 50);
}

function drawText(
  lines,
  font,
  fontSize,
  fontColor,
  x,
  y,
  lineSize,
  centered=true,
) {
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

function typeText(
  textString,
  typingDuration,
  startPauseDuration,
  endPauseDuration,
  font,
  fontSize,
  fontColor,
  x,
  y,
  lineSize,
  centered=false,
  cursorBlinkDuration=1,
  startCursorBlink=true,
  endCursorBlink=true,
) {
  let cycleFrameCount = fps * (
    startPauseDuration + typingDuration + endPauseDuration
  );
  let framePosition = (frameCount-1) % cycleFrameCount;
  let textToType = "";
  if (framePosition < fps * startPauseDuration) {
    if (
      startCursorBlink == true &&
      Math.floor((frameCount-1) % (fps * cursorBlinkDuration)) /
      (fps * cursorBlinkDuration / 2) < 1
    ) {
      textToType = "█"
    } else {
      textToType = ""
    }
  } else if (
    framePosition < fps * ( startPauseDuration + typingDuration)
  ) {
    let textIndex = Math.floor(
      (framePosition  - fps * startPauseDuration) /
      (fps * typingDuration / (textString.length + 1))
    )
    textToType = textString.slice(0, textIndex) + "█"
  } else {
    if (
      endCursorBlink == true &&
      Math.floor((frameCount-1) % (fps * cursorBlinkDuration)) /
      (fps * cursorBlinkDuration / 2) < 1
    ) {
      textToType = textString + "█"
    }
    else {
      textToType = textString + " "
    }
  }

  // let cycleFrameCount = fps * (onDuration + offDuration);
  // let framePosition = (frameCount-1) % cycleFrameCount;
  // if (framePosition < fps * onDuration) {
  //   blinkColor = onColor;

  drawText(
    lines=[textToType],
    font=font,
    fontSize=fontSize,
    fontColor=fontColor,
    x=x,
    y=y,
    lineSize=lineSize,
    centered=centered,
  )
}

function getIndexOfNLowest(arr, n) {
  let minVal = [...arr].sort((a, b) => a - b)[n];
  return arr.indexOf(minVal);
}

function containsEdge(edges, edge) {
  return edges.some(
    subArr => (
      subArr.length === edge.length
      && edge.every(val => subArr.includes(val))
    )
  );
}

function getNextLowestUnusedIndex(nodes, edges, i, startN) {
  let minIndex = getIndexOfNLowest(nodes[i].distances, startN);
  if (
    startN == nodes[i].distances.length - 2
    || !containsEdge(edges, [i, minIndex])
  ) {
    return minIndex
  }
  return getNextLowestUnusedIndex(nodes, edges, i, startN+1)
}

function make2DNetwork(nNodes, xMin, xMax, yMin, yMax) {
  let nodes = [];
  let edges = [];
  let distances = {};
  for (let i=0; i<nNodes; i++) {
    let x = random(xMin, xMax);
    let y = random(yMin, yMax);
    nodes.push(
      {
        "x": x, "y": y, "distances": [], "angle": random(0, 2*PI),
        "startX": x, "startY": y,
      }
    );
  }
  for (let i=0; i<nodes.length; i++) {
    for (let j=0; j<nodes.length; j++) {
      if (i != j) {
        let distance = dist(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y)
        // The distances are pushed to the array in order, meaning that
        // nodes[0].distance[1] would be the distance of nodes[0] to nodes[1]
        nodes[i].distances.push(distance)
      } else {
        // Used to mark the index being compared, meaning that
        // nodes[0].distance[0] = -1. This can be sorted out later!
        nodes[i].distances.push(-1)
      }
    }
    // Find the next lowest min distance that's not currently an edge, starting
    // with n=1 to exclude the -1 placeholder
    let nextMinIndex = getNextLowestUnusedIndex(nodes, edges, i, 1)
    console.log(edges.includes([nextMinIndex, i]))
    edges.push([i, nextMinIndex])
  }
  return [nodes, edges]
}

function moveNodes(
  nodes,
  xMin,
  xMax,
  yMin,
  yMax,
  moveRange=1,
  chanceDirChange=0.1,
  dirChangeRange=PI/12,
) {
  for (let node of nodes) {
    if (random(1) < chanceDirChange) {
      node.angle += random(-1*dirChangeRange, dirChangeRange)
    }
    let move = random(moveRange)
    node.x += move * cos(node.angle)
    node.y += move * sin(node.angle)
    if (node.x < xMin) {
      node.x = xMin
      node.angle += PI
    } else if (node.x > xMax) {
      node.x = xMax
      node.angle += PI
    }
    if (node.y < yMin) {
      node.y = yMin
      node.angle += PI
    } else if (node.y > yMax) {
      node.y = yMax
      node.angle += PI
    }
  }
  return nodes
}

function getMoveDiameters(nNodes, minDiamter, maxDiameter) {
  let moveDiameters = []
  for (let i=0; i<nNodes; i++) {
    moveDiameters.push(random(minDiamter, maxDiameter))
  }
  return moveDiameters
}

function getMoveDirections(nNodes) {
  let moveDirections = []
  for (let i=0; i<nNodes; i++) {
    moveDirections.push(random([-1, 1]))
  }
  return moveDirections
}

function moveNodesInLoop(
  nodes,
  nSeconds,
  moveDiameters,
  moveDirections,
  xMin,
  xMax,
  yMin,
  yMax,
  clipOutOfBounds=false,
) {
  let angle = ((frameCount-1) % (fps * nSeconds)) / (fps * nSeconds) * 2*PI
  for (let i=0; i<nodes.length; i++) {
    let node = nodes[i];
    let moveDiameter = moveDiameters[i];
    let moveDirection = moveDirections[i];
    node.x = node.startX + moveDiameter * cos(node.angle + moveDirection*angle)
    node.y = node.startY + moveDiameter * sin(node.angle + moveDirection*angle)
    if (clipOutOfBounds == true) {
      if (node.x < xMin) {
        node.x = xMin
      } else if (node.x > xMax) {
        node.x = xMax
      }
      if (node.y < yMin) {
        node.y = yMin
      } else if (node.y > yMax) {
        node.y = yMax
      }
    }
  }
  return nodes
}

function draw2DNetwork(
  nodes,
  edges,
  nodeDiameter,
  edgeWidth,
  nodeColor,
  edgeColor,
) {
  layer2d.noFill();
  layer2d.strokeWeight(edgeWidth);
  layer2d.stroke(edgeColor);
  for (let i=0; i<edges.length; i++) {
    layer2d.line(
      nodes[edges[i][0]].x, nodes[edges[i][0]].y,
      nodes[edges[i][1]].x, nodes[edges[i][1]].y,
    )
  }
  for (let i=0; i<nodes.length; i++) {
    layer2d.noStroke();
    layer2d.fill(nodeColor);
    layer2d.circle(nodes[i].x, nodes[i].y, nodeDiameter)
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

function drawWaveform(xMin, xMax, yMin, yMax, nWaves, nCycles) {
  let a = (yMax - yMin) / 2;
  let w = 2*PI * nWaves / (xMax-xMin);
  let phase = 2*PI * nCycles * (frameCount - 1) / (fps * nSeconds);
  let xStep = 1;

  layer2d.push()
  layer2d.translate(xMin, yMax - a)
  layer2d.stroke(hi_green_hex);
  for (let x = 0; x < xMax-xMin; x+=xStep) {
    layer2d.line(
      x, a*sin(w*x + phase),
      (x+xStep), a*sin(w*(x+xStep) + phase),
    )
  }
  layer2d.pop()
}

function drawFlower() {
  let a = 80;
  let w = PI/24;
  let xStep = 1;
  let xMax = 170;
  let nCycles = 3;
  let phase = 2*PI * nCycles * (frameCount - 1) / (fps * nSeconds);

  layer2d.push()
  layer2d.translate(50, 490)
  layer2d.stroke(hi_green_hex);
  for (let x = 0; x < xMax; x+=xStep) {
    layer2d.line(
      x, 0,
      x, a*sin(w*x + phase),
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

function drawVerticalProgressBar(xMin, xMax, yMin, yMax, nRects, spacing, directionSign=1) {
  let reverseOffset = 0;
  if (directionSign == -1) {
    reverseOffset = -1*(yMax - yMin)
  }
  let rectHeight = (
    (yMax - yMin) - (nRects-1)*spacing
  ) / nRects;
  let rectWidth = xMax - xMin;
  for (let i = 0; i < nRects; i++) {
    if ((frameCount-1) % (fps * nSeconds) < (i + 1)*(fps * nSeconds / (nRects + 1)) ) {
      layer2d.stroke(low_green_hex);
      layer2d.noFill();
    } else {
      layer2d.stroke(hi_green_hex);
      layer2d.fill(med_green_hex);
    }
    layer2d.rect(
      xMin, yMin + i*directionSign*(rectHeight + spacing) - reverseOffset,
      rectWidth, rectHeight
    );
  }
}

  //////////////////
 // 3D Functions //
//////////////////

function drawSphere(
  xTranslate=0,
  yTranslate=0,
  zTranslate=0,
  xAngle=-Pi/2,
  yAngle="spin",
  zAngle=-Pi/2,
) {
  layer3d.clear()
  layer3d.push()
  // Rotate the sphere down a bit, same rotation every time
  layer3d.rotateX(xAngle);
  layer3d.translate(
    xTranslate,
    yTranslate,
    zTranslate,
  );
  layer3d.rotateZ(zAngle);
  // Rotate the sphere by an amount that increases with every frame
  if (yAngle == "spin") {
    layer3d.rotateY(
      (frameCount-1) * (-PI/2)/(fps*nSeconds)
    );
  } else {
    layer3d.rotateY(yAngle);
  }
  // Make the shape hollow/wireframe
  layer3d.noFill();
  layer3d.stroke(hi_green_hex);
  layer3d.strokeWeight(2);
  // Draw a sphere
  layer3d.sphere(250, 16, 8);
  layer3d.pop()
}

  ///////////////////////
 // Utility Functions //
///////////////////////

function getBlinkColor(
  onColor=hi_green_hex,
  offColor=low_green_hex,
  onDuration=0.5,
  offDuration=0.5,
) {
  let blinkColor = offColor;
  let cycleFrameCount = fps * (onDuration + offDuration);
  let framePosition = (frameCount-1) % cycleFrameCount;
  if (framePosition < fps * onDuration) {
    blinkColor = onColor;
  }
  return blinkColor;
}

// Global Variables
let cols, rows;
let size = 20;
const grid = [];
let current;
let player;
let playerPos;

const stack = [];

// function setup() {}
function setup() {
  createCanvas(400, 400);
  cols = floor(width / size);
  rows = floor(height / size);
  // frameRate(200);

  // push an array of cells
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const cell = new Cell(i, j);
      grid.push(cell);
    }
  }
  // starting cell
  const rand = floor(random(grid.length));
  current = grid[0];

  // starting player
  player = new Player(0, 0);
}

function draw() {
  background(51);
  // draw each cell from grid array
  for (let i = 0; i < grid.length; i++) {
    grid[i].show();
  }

  // the current one is already visited
  // current.highlight();
  // check neighbours visited

  if (!player.exist) {
    console.log("player dont exist");

    current.visited = true;

    current.highlight();

    // STEP 1
    let next = current.checkNeighbours();
    if (next) {
      next.visited = true;
      // STEP 2
      stack.push(current);

      // STEP 3
      removeWalls(current, next);

      // STEP 4
      current = next;
    } else if (stack.length > 0) {
      current = stack.pop();
    }
    if (stack.length === 0) {
      player.exist = true;
      console.log(player);
    }
  } else {
    // if (keyPressed(LEFT_ARROW)) {
    if (!current.walls[0] && keyIsDown(UP_ARROW)) {
      current = player.move("up");
    }
    if (!current.walls[1] && keyIsDown(RIGHT_ARROW)) {
      current = player.move("right");
    }
    if (!current.walls[2] && keyIsDown(DOWN_ARROW)) {
      current = player.move("down");
    }
    if (!current.walls[3] && keyIsDown(LEFT_ARROW)) {
      current = player.move("left");
    }
    player.highlight();
    grid[grid.length - 1].goal();
  }
}

function Player(i, j) {
  this.i = i;
  this.j = j;
  this.exist = false;

  this.checkPosition = function() {
    // check cell position and the walls, where can move
  };
  this.highlight = function() {
    let x = this.i * size;
    let y = this.j * size;
    noStroke();
    // if (!this.blink) {
    //   console.log('not blink')
    fill(50, 50, 240, 220);
    // this.blink = true;
    // }
    // else {
    //   console.log('blink')
    //   fill(255, 0, 200, 100);
    //   this.blink = false;
    // }
    // rect(x, y, size, size);
    ellipse(x + size / 2, y + size / 2, size - 2, size - 2);
  };

  this.move = function(direction) {
    console.log(direction);
    if (direction === "up") {
      this.j -= 1;
    }
    if (direction === "right") {
      this.i += 1;
    }
    if (direction === "down") {
      this.j += 1;
    }
    if (direction === "left") {
      this.i -= 1;
    }
    return grid[index(this.i, this.j)];
  };
}

function index(i, j) {
  if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
    return -1;
  }
  return i + j * cols;
}

function Cell(i, j) {
  this.i = i;
  this.j = j;
  this.walls = [true, true, true, true];
  this.visited = false;

  this.checkNeighbours = function() {
    const neighbours = [];

    const top = grid[index(i, j - 1)];
    const right = grid[index(i + 1, j)];
    const bottom = grid[index(i, j + 1)];
    const left = grid[index(i - 1, j)];

    if (top && !top.visited) {
      neighbours.push(top);
    }
    if (right && !right.visited) {
      neighbours.push(right);
    }
    if (bottom && !bottom.visited) {
      neighbours.push(bottom);
    }
    if (left && !left.visited) {
      neighbours.push(left);
    }

    if (neighbours.length > 0) {
      let rand = floor(random(0, neighbours.length));
      return neighbours[rand];
    } else {
      return undefined;
    }
  };

  this.highlight = function() {
    let x = this.i * size;
    let y = this.j * size;
    noStroke();
    fill(20, 20, 200, 100);
    rect(x, y, size, size);
  };

  this.goal = function() {
    let x = this.i * size;
    let y = this.j * size;
    noStroke();
    fill(255, 255, 126, 200);
    rect(x, y, size, size);
  };

  this.show = function() {
    let x = this.i * size;
    let y = this.j * size;
    // let x = random(size, 400 - size);
    // let y = random(size, 400 - size);
    stroke(200);

    // top border
    if (this.walls[0]) {
      line(x, y, x + size, y);
    }
    // right border
    if (this.walls[1]) {
      line(x + size, y, x + size, y + size);
    }
    // bottom border
    if (this.walls[2]) {
      line(x + size, y + size, x, y + size);
    }
    // left border
    if (this.walls[3]) {
      line(x, y + size, x, y);
    }

    if (this.visited) {
      noStroke();
      fill(255, 0, 200, 100);
      rect(x, y, size, size);
    }
  };
}

function removeWalls(a, b) {
  const x = a.i - b.i;
  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  const y = a.j - b.j;
  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}

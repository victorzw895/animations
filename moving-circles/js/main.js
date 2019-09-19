// jquery ////////////////////////////////////////////////////
// const $canvas = $("canvas");
// $canvas.width(width);
// $canvas.height(innerHeight);

// const c = $canvas[0].getContext("2d");

// jcanvas ////////////////////////////////////////////////////////
// const $c = $("#my-canvas");

// $c.drawRect({
//   fillStyle: "steelblue",
//   strokeStyle: "blue",
//   strokeWidth: 4,
//   x: 150,
//   y: 100,
//   fromCenter: false,
//   width: 200,
//   height: 100
// });

// DOM ///////////////////////////////////////////////////////
const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext("2d");

// rectangles ///////////////////////////////////////////////////////
// c.fillStyle = "rgba(255,0,0,0.5)";
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = "rgba(0,0,255,0.5)";
// c.fillRect(400, 100, 100, 100);
// c.fillStyle = "rgba(0,255,0,0.5)";
// c.fillRect(300, 300, 100, 100);

// line ///////////////////////////////////////////////////////
// c.beginPath();
// c.moveTo(50, 300); // starting point: c.moveTo(x, y);
// c.lineTo(300, 100); // end point: c.lineTo(x, y);
// c.lineTo(400, 300);
// c.strokeStyle = "#fa34a3";
// c.stroke();

// arc / circle ///////////////////////////////////////////////
// c.beginPath();
// // c.context.arc(x, y, radius, Math.PI / 180 * startAngle, Math.PI / 180 * endAngle, anticlockwise); // Math.PI radians = 180 degrees -> Math.PI radians / 180 = 1 degree
// c.arc(300, 300, 30, 0, Math.PI * 2, false);
// c.strokeStyle = "blue";
// c.stroke();

// multiple arcs //////////////////////////////////////////////
// for (let i = 0; i < 377; i++) {
//   const randX = Math.random() * window.innerWidth;
//   const randY = Math.random() * window.innerHeight;
//   c.beginPath();
//   c.arc(randX, randY, Math.random() * 50, Math.PI * 2, false);
//   c.strokeStyle = `rgba(0,0,${Math.random() * 255 + 170}, ${Math.random()})`;
//   c.fillStyle = `rgba(0,0,${Math.random() * 255 + 170}, ${Math.random()})`;
//   c.fill();
//   c.stroke();
// }

// Create random starting x, y values, random dx, dy speed values ////////////////
// let x = Math.random() * (innerWidth - 30) + 30;
// let dx = Math.random() - 0.5; // dx is velocity?
// if (dx < 0) {
//   dx -= 4;
// } else {
//   dx += 4;
// }
// let y = Math.random() * (innerHeight - 30) + 30;
// let dy = Math.random() - 0.5;
// if (dy < 0) {
//   dy -= 5;
// } else {
//   dy += 5;
// }
// let radius = 30;

// // // animate circle with requestAnimationFrame //////////////////////////////////////
// animate = () => {
//   requestAnimationFrame(animate);
//   c.clearRect(0, 0, innerWidth, innerHeight);

//   c.beginPath();
//   c.arc((x += dx), (y += dy), radius, 0, Math.PI * 2, false);
//   c.strokeStyle = "blue";
//   c.stroke();
//   //   x += dx;
//   //   y += dy;

//   if (x + radius > innerWidth || x - radius < 0) {
//     dx = -dx;
//   }
//   if (y + radius > innerHeight || y - radius < 0) {
//     dy = -dy;
//   }
// };

// animate();

// const Circle object /////////////////////////////////////////////
// const Circle = {
//   x: 50,
//   y: 50,
//   dx: 5,
//   dy: 4,
//   radius: 30,
//   new: function(x, y, dx, dy, radius) {
//     this.x = x;
//     this.y = y;
//     this.radius = radius;
//     this.dx = dx;
//     this.dy = dy;
//     this.draw();
//   },
//   draw: function() {
//     c.beginPath();
//     c.arc(
//       (this.x += this.dx),
//       (this.y += this.dy),
//       this.radius,
//       0,
//       Math.PI * 2,
//       false
//     );
//     c.strokeStyle = "blue";
//     c.stroke();
//   },
//   update: function() {
//     if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
//       this.dx = -this.dx;
//     }
//     if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
//       this.dy = -this.dy;
//     }
//     this.draw();
//   }
// };

// Circle.new(200, 300, -4, 6, 40);

// animate = () => {
//   requestAnimationFrame(animate);
//   c.clearRect(0, 0, innerWidth, innerHeight);

//   Circle.update();
// };

// animate();

// EVENT LISTENER //////////////////////////////////////////////////////
const mouse = {
  x: undefined,
  y: undefined
};
window.addEventListener("mousemove", event => {
  mouse.x = event.x;
  mouse.y = event.y;
  console.log(mouse);
});
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  init();
});

const maxRadius = 45;
const minRadius = 2;

const colorArray = [
  "rgba(129, 207, 224, 1)",
  "rgba(1, 50, 67, 1)",
  "rgba(44, 62, 80, 1)",
  "rgba(44, 130, 201, 1)",
  "rgba(34, 49, 63, 1)"
];

// function Circle object //////////////////////////////////////////////
function Circle(x, y, dx, dy, radius, style) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  this.stroke = colorArray[Math.floor(Math.random() * colorArray.length)];
  this.fill = colorArray[Math.floor(Math.random() * colorArray.length)];

  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.strokeStyle = this.stroke;
    c.fillStyle = this.fill;
    c.fill();
    c.stroke();
  };

  this.update = function() {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    // interactivity with mouse
    if (
      mouse.x - 45 < this.x &&
      mouse.x + 45 > this.x &&
      mouse.y - 45 < this.y &&
      mouse.y + 45 > this.y
    ) {
      if (this.radius < maxRadius) {
        this.radius += 1;
      }
    } else if (this.radius > this.minRadius) {
      this.radius -= 2;
    }

    this.draw();
  };
}

function animateCircles(num) {
  if (num <= 0) {
    return;
  }
  circles[num - 1].update();
  animateCircles(num - 1);
}

let circles = [];

function init() {
  circles = [];
  for (let i = 0; i < 300; i++) {
    // 987
    const radius = Math.random() * 5 + 2;
    let x = Math.floor(Math.random() * (innerWidth - radius * 2) + radius);
    //   if (x - radius <= 0) {
    //     x += radius;
    //   }
    let dx = Math.random() - 0.5; // dx is velocity?
    if (dx < 0) {
      dx -= 0.2;
    } else {
      dx += 0.2;
    }
    let y = Math.floor(Math.random() * (innerHeight - radius * 2) + radius);
    //   if (y - radius <= 0) {
    //     y += radius;
    //   }
    let dy = Math.random() - 0.5;
    if (dy < 0) {
      dy -= 0.2;
    } else {
      dy += 0.2;
    }
    let style = `rgba(0,0,${Math.random() * 255 + 170}, ${Math.random()})`;
    circles.push(new Circle(x, y, dx, dy, radius, style));
  }
}

animate = () => {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  animateCircles(circles.length);

  // for (let i = 0; i < circles.length; i++) {
  //   circles[i].update();
  // }
};

init();

animate();

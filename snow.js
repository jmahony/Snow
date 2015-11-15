function Snow(el, options) {
  var canvas = document.createElement('canvas');

  canvas.height = el.clientHeight;
  canvas.width = el.clientWidth;

  el.appendChild(canvas);

  var ctx = canvas.getContext('2d');
  
  var smallCount = 1000; 

  var yPos = 0,
      xPos = 0;

  var snowFlakes = [];

  var movements = [
    { x: 0.5, y: 1 },
    { x: 1, y: 1.5 },
    { x: 1.5, y: 2 }
  ];

  var sizes = [ 10, 20, 30 ];

  var gradients = [];

  for (var i = 0; i < sizes.length; i++) {
    gradients.push(createGradient(sizes[i]));
  }

  function createGradient(size) {
    var XgradientSize = size/2;
    var YgradientSize = size/2;
    var gradient = ctx.createRadialGradient(XgradientSize, YgradientSize, size/2, XgradientSize, YgradientSize, 0);

    gradient.addColorStop(0, 'transparent');
    gradient.addColorStop(1, 'white');
   
    return gradient;
  }

  for (var i = 0; i < smallCount; i++) {
    snowFlakes.push(new SnowFlake(
      getRandomInt(0, canvas.width),
      getRandomInt(0, canvas.height),
      getRandomInt(0, 2)
    ));
  }

  requestAnimationFrame(draw);

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    snowFlakes.forEach(function(snowflake) {
      snowflake.draw();
    });

    requestAnimationFrame(draw);
  }
  
  function createSnowflake(x, y, size) {
    var XgradientSize = x + size/2;
    var YgradientSize = y + size/2;
    var gradient = ctx.createRadialGradient(XgradientSize, YgradientSize, size/2, XgradientSize, YgradientSize, 0);
    gradient.addColorStop(0, 'transparent');
    gradient.addColorStop(1, 'white');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(x, y, size, size);
  }

  function SnowFlake(x, y, size, movement) {
    this.draw = function() {
      if (x > canvas.width) { x = -sizes[size]; }

      if (y > canvas.height) { y = -sizes[size]; }

      createSnowflake(x += movements[size].x, y += movements[size].y, sizes[size]);
    }

    return this;
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

var body = document.querySelector('body');

var snow = new Snow(body);


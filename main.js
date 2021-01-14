const CANVAS_SIZE =
{
	X: 800,
	Y: 800
};

const SCALE = 100;
const SCALE_TIME = 10;
const PARTICLE_COUNT = 2500;

class Point
{
	constructor()
	{
		this.position = 
		{
			x: Math.random() * CANVAS_SIZE.X,
			y: Math.random() * CANVAS_SIZE.Y
		};

		this.movement =
		{
			x: Math.random() * 10 - 5,
			y: Math.random() * 10 - 5
		};

		this.velocity = Math.random() * 9 + 1;
	}

	recalculateMovement()
	{
		let n = noise(this.position.x / SCALE, this.position.y / SCALE, (new Date()).getTime() / 1000 / SCALE_TIME) * 4 * Math.PI;

		this.movement.x = Math.cos(n) * Math.random() * this.velocity;
		this.movement.y = Math.sin(n) * Math.random() * this.velocity;
	}
}

let points = [];
let colour = 0;

function setup()
{
	for (let i = 0; i < PARTICLE_COUNT; i++)
	{
		points.push(new Point());
	}

	createCanvas(CANVAS_SIZE.X, CANVAS_SIZE.Y);
	select('#canvas').elt.append(select('canvas').elt);

	background(0);

	noStroke();
	fill(255, 255, 255);
}

function draw() {
	background(0, 0, 0, 8);
	fill(`hsl(${Math.floor(colour)}, 100%, 50%)`);

	for (let point of points)
	{
		circle(point.position.x, point.position.y, 1);

		if (point.position.x < 0 || point.position.x > CANVAS_SIZE.X || point.position.y < 0 || point.position.y > CANVAS_SIZE.Y)
		{
			point.position.y = Math.random() * CANVAS_SIZE.Y;
			point.position.x = Math.random() * CANVAS_SIZE.X;
		}

		point.position.x += point.movement.x;
		point.position.y += point.movement.y;
	}

	for (let point of points)
	{
		point.recalculateMovement();
	}

	colour += 0.025;
	if (colour > 360)
		colour -= 360;
}
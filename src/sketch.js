// Developed by Arash Sal Moslehian
// @ArashSM79
// Charged particale in a magnetic field normal to the velocity vector

let charges = [];
let magneticField;

let canvasWidth = 800;
let canvasHeight = 600;

let fieldSlider;
let velSlider;
let massSlider;
let chargeSlider;

let fieldNumber;
let velNumber;
let massNumber;
let chargeNumber;

let radiusText;
let freqText;

let running = true;

function setup() {
  createCanvas(canvasWidth, canvasHeight);

  background(0);
  
  setupDOMElements();


  magneticField = createVector(0, 0, 2);
  charges.push(new Charge(canvasWidth/2,canvasHeight/2, 0.0005,0.05, createVector(2, 0, 0)));

  

}

function draw() {
  background(0);
  fill(255);
  
  velNumber = text("V = " + velSlider.value() + " m/s",10,30);
  massNumber = text("m = " + massSlider.value() + " kg",10,50);
  chargeNumber = text("q = " + chargeSlider.value() + " C",10,70);
  fieldNumber = text("B = " + fieldSlider.value()/2 + " T",10,90);


  for(charge of charges)
  {

    charge.applyFieldForce(magneticField);
    charge.update();
    charge.show();
    
    if(!charge.computed)
    {

      charge.r = ( charge.mass * charge.vel.mag() ) / (abs(charge.charge) * magneticField.mag());
      charge.f =  charge.vel.mag() / (2 * PI * charge.r);
      charge.computed = true;
    }

    fill(255);

    radiusText = text("Radius: " + nf(charge.r,0, 2) + " m", 10, canvasHeight - 30);
    freqText = text("Frequency: " + nf(charge.f, 0, 6) + " Hz", 10, canvasHeight - 10);
  }
}

function setupDOMElements()
{
  let velocityText = createElement('h2', 'Velocity: ');
  velocityText.position(10, canvasHeight + 10);
  velocityText.size(AUTO, 50);

  let massText = createElement('h2', 'Mass: ');
  massText.position(10, velocityText.y + velocityText.height);
  massText.size(AUTO, 50);
  
  let chargeText = createElement('h2', 'Charge: ');
  chargeText.position(10, massText.y + massText.height);
  chargeText.size(AUTO, 50);

  let fieldText = createElement('h2', 'Field: ');
  fieldText.position(10, chargeText.y + chargeText.height);
  fieldText.size(AUTO, 50);
  
  velSlider = createSlider(0, 5, 2, 0.1);
  velSlider.position(velocityText.x  + 200, velocityText.y + 20);

  massSlider = createSlider(0, 0.5, 0.05, 0.001);
  massSlider.position(massText.x  + 200, massText.y + 20);

  chargeSlider = createSlider(-0.001, 0.001, 0.0005, 0.00001);
  chargeSlider.position(chargeText.x  + 200, chargeText.y + 20);

  fieldSlider = createSlider(0, 10, 2, 0.1);
  fieldSlider.position(fieldText.x  + 200, fieldText.y + 20);


  let shootButton = createButton('Shoot!');
  shootButton.position(chargeSlider.x + chargeSlider.width + 70, chargeText.y);
  shootButton.mousePressed(resetSketch);

  let stopButton = createButton('Stop');
  stopButton.position(shootButton.x + shootButton.width + 70, shootButton.y);
  stopButton.mousePressed(() => {
    if(running)
    {
      noLoop();
      running = false;
    }else
    {
      loop();
      running = true;
    }
    });
    
  
  
}



function resetSketch()
{
  charges.pop();
  charges.push(new Charge(canvasWidth/2, canvasHeight/2 ,chargeSlider.value(), massSlider.value(), createVector(velSlider.value(), 0)));
  magneticField = createVector(0, 0, fieldSlider.value());
}
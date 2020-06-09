class Charge {
    constructor(x, y, charge, mass, vel)
    {
        this.charge = charge;
        this.mass = mass;
        this.pos = createVector(x, y);
        this.vel = vel;
        this.acc = createVector(0, 0);
      
        this.computed = false;
        this.f = 0;
        this.r = 0;
        this.trails = [];
    }

    applyForce(force) 
    {
        let f = p5.Vector.div(force, this.mass);
        this.acc.add(f);
    }

    applyFieldForce(magneticField)
    {
        let f = p5.Vector.cross(this.vel, magneticField).mult(this.charge);
        this.applyForce(f);
        
        
    }
    
    update()
    {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.drawArrow(this.pos, this.acc, color(255,127,80), "F");
        this.acc.set(0, 0);
        
        let limit = 50;
        if(this.computed)
        {
            limit = this.r;
        }
        if(this.trails.length > limit)
        {
            this.trails.shift();
        }
        this.trails.push(this.pos.copy());
    }

    show() 
    {
        stroke(57, 255, 20);
        strokeWeight(2);
        fill(57, 255, 20);
        ellipse(this.pos.x, this.pos.y, 10);
        this.drawArrow(this.pos, this.vel, color(220, 200, 220), "v");

        let i = 0;
        for(let trail of this.trails)
        {
            noStroke();
            fill(57, 255, 20, i);
            ellipse(trail.x, trail.y, 10);
            i += 1;
        }
    }

    drawArrow(base, inVec, myColor, str) {
        push();
        let lineSize = this.vel.mag() * 10;
        lineSize = constrain(lineSize, 10, 30);
        let vec = inVec.copy().normalize().mult(lineSize);
        fill(myColor);
        noStroke();
        textSize(lineSize/2);
        text(str, base.x + vec.x/2, base.y + vec.y/2);
        
        stroke(myColor);
        strokeWeight(3);
        fill(myColor);
        translate(base.x, base.y);
        line(0, 0, vec.x, vec.y);
        rotate(vec.heading());
        let arrowSize = lineSize/10;
        translate(vec.mag() - arrowSize, 0);
        triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
        pop();
      }
}

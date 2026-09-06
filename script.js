const canvas=document.getElementById('canvas');
const ctx=canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height= canvas.height=window.innerHeight;

function randomRange(max, min){
    return Math.random()*(max-min)+min;
}

let mouseX=-1000;
let mouseY=-1000;

canvas.addEventListener("mousemove", (event)=>{
  mouseX = event.clientX;
  mouseY = event.clientY;
});

class Star {

  constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;

      this.radius = Math.random() * 1 + 0.3;

      this.baseOpacity =
          Math.random() * 0.6 + 0.3;

      this.opacity = this.baseOpacity;

      this.twinkle = Math.random() * Math.PI * 2;
  }

  update() {

      this.twinkle += 0.02;

      this.opacity =
          this.baseOpacity +
          Math.sin(this.twinkle) * 0.1;
  }

  draw() {

      ctx.beginPath();

      ctx.arc(
          this.x,
          this.y,
          this.radius,
          0,
          Math.PI * 2
      );

      ctx.fillStyle =
          `rgba(255,255,255,${this.opacity})`;

      ctx.fill();
  }
}

class snowflakes{
    constructor(){
      this.reset(true);
    }
    reset(initial=false){
      this.radius=randomRange(3, 1);

      this.x=randomRange(width-this.radius, this.radius);
      if (initial){
        this.y=randomRange(height-this.radius, this.radius);}
      else{
        this.y=-Math.random()*50;
      }
      this.speedX=randomRange(0.4, -0.4);
      this.speedY=randomRange(3,1);

      if (this.speedX==0 || this.speedY==0){
          this.speedX=this.speedY=1;
      }
      this.opacity= randomRange(0.9, 0.2);
    }

    draw() {

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2* Math.PI);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
        ctx.closePath();
    }

    update(){
        this.x+=this.speedX;
        this.y+=this.speedY;
        if (this.y-this.radius > height){
          this.reset();
        }

        if (this.x<-10){
          this.x=width+10;
        }
        if (this.x>width+10){
          this.x=-10;
        }

    }
}

class AuroraWave {
  constructor(baseY, amplitude, frequency, speed, colorStops) {
    this.baseY = baseY;           
    this.amplitude = amplitude;   
    this.frequency = frequency;   
    this.speed = speed;          
    this.colorStops = colorStops; 
    this.timeOffset = Math.random() * 100;
  }

  update() {
    this.timeOffset += this.speed;
  }

  draw() {
    ctx.save();
    
    ctx.globalCompositeOperation = 'screen';
    ctx.globalAlpha = 0.95; 

    ctx.beginPath();
    ctx.moveTo(0, height); 

    
    for (let x = 0; x <= width; x += 10) {
      
      const y = this.baseY + 
                Math.sin(x * this.frequency + this.timeOffset) * this.amplitude+
                Math.cos(x * 0.005 - this.timeOffset) * (this.amplitude * 0.3);
                
      ctx.lineTo(x, y);
    }

    ctx.lineTo(width, height); 
    ctx.closePath();

    const gradient = ctx.createLinearGradient(0, this.baseY - this.amplitude * 1.5, 0, height);
    gradient.addColorStop(0, this.colorStops[0]); 
    gradient.addColorStop(0.4, this.colorStops[1]); 
    gradient.addColorStop(0.8, this.colorStops[2]); 
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');   

    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.restore();
  }
}


const auroraLayers = [
  new AuroraWave(height * 0.25, 70, 0.003, 0.008, ['rgba(0, 255, 150, 1)', 'rgba(0, 190, 255, 0.8)', 'rgba(150, 0, 255, 0)']),
  new AuroraWave(height * 0.35, 30, 0.003, 0.005, ['rgba(0, 220, 255, 1)', 'rgba(255, 255, 255, 0.9)', 'rgba(120, 0, 255, 0.7)', 'rgba(50, 0, 100, 0)']),
  new AuroraWave(height * 0.55, 100, 0.0015, 0.002, ['rgba(180, 0, 255, 0.9)', 'rgba(0, 255, 200, 0.6)', 'rgba(0, 0, 0, 0)'])
];

const snow = new snowflakes();

const snowArray = [];

for (let i = 0; i < 200; i++) {
  snowArray.push(new snowflakes());
}

const star = new Star();

const starsArray = [];

for (let i = 0; i < 1000; i++) {
  starsArray.push(new Star());
}

function animate() {
  ctx.clearRect(0, 0, width, height);

  snowArray.forEach(snowArray => {
    snowArray.draw();
    snowArray.update();
  });

  auroraLayers.forEach(layer =>{
    layer.update();
    layer.draw();
  });

  starsArray.forEach(starsArray => {
    starsArray.draw();
    starsArray.update();
  });


  requestAnimationFrame(animate);
}


animate();


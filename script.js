const canvas=document.getElementById('canvas');
const ctx=canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height= canvas.height=window.innerHeight;

function randomRange(max, min){
    return Math.random()*(max-min)+min;
}

class ball{
    constructor(){
        this.radius=randomRange(20, 10);

        this.x=randomRange(width-this.radius, this.radius);
        this.y=randomRange(width-this.radius, this.radius);
        this.speedX=randomRange(-1, 1);
        this.speedY=randomRange(-1, 1);

        if (this.speedX==0 || this.speedY==0){
            this.speedX=this.speedY=1;
        }
        this.color=`hsl(${Math.random()*360}, 50%, 50%)`;
    }

    draw() {

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2* Math.PI);
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        ctx.lineWidth = 5; 
        ctx.strokeStyle = '#41e0f5';
        ctx.stroke();
        ctx.closePath();
    }

    update(){
        this.x+=this.speedX;
        this.y+=this.speedY;
        if (this.x+this.radius>=width || this.x-this.radius<=0){
            this.speedX=-this.speedX;
        }
        if (this.y+this.radius>=height || this.y-this.radius<=0){
            this.speedY=-this.speedY;
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
    ctx.globalAlpha = 0.25; 

    ctx.beginPath();
    ctx.moveTo(0, height); 

    
    for (let x = 0; x <= width; x += 10) {
      
      const y = this.baseY + 
                Math.sin(x * this.frequency + this.timeOffset) * this.amplitude +
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
  new AuroraWave(height * 0.25, 90, 0.002, 0.003, ['rgba(0, 255, 150, 1)', 'rgba(0, 190, 255, 0.8)', 'rgba(150, 0, 255, 0)']),
  new AuroraWave(height * 0.35, 70, 0.003, 0.005, ['rgba(0, 220, 255, 1)', 'rgba(120, 0, 255, 0.7)', 'rgba(50, 0, 100, 0)']),
  new AuroraWave(height * 0.20, 110, 0.0015, 0.002, ['rgba(180, 0, 255, 0.9)', 'rgba(0, 255, 200, 0.6)', 'rgba(0, 0, 0, 0)'])
];

const Ball = new ball();

const ballsArray = [];
const numberOfBalls = 50; 

for (let i = 0; i < numberOfBalls; i++) {
  ballsArray.push(new ball());
}

function animate() {
  ctx.clearRect(0, 0, width, height);

  ballsArray.forEach(ball => {
    ball.draw();
    ball.update();
  });

  auroraLayers.forEach(layer =>{
    layer.update();
    layer.draw();
  });

  Ball.draw();        
  Ball.update();  

  
  requestAnimationFrame(animate);
}


animate();


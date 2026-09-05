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
        if (this.y+this.radius>=height || this.y-this.radius<0){
            this.speedY=-this.speedY;
        }

    }
}

const Ball = new ball();

function animate() {
  ctx.clearRect(0, 0, width, height);

  Ball.draw();        
  Ball.update();  

  
  requestAnimationFrame(animate);
}


animate();


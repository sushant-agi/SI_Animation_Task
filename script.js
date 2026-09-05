const canvas=document.getElementById('canvas');
const ctx=canvas.getContext('2d');
const radius = 50;
const width= canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;
const x=Math.random()*(canvas.width-radius*2)+radius;
const y=Math.random()*(canvas.height-radius*2)+radius;


ctx.beginPath();

ctx.arc(x, y, radius, 0, 2* Math.PI);
ctx.fillStyle = '#ffffff';
ctx.fill();

ctx.lineWidth = 5; 
ctx.strokeStyle = '#41e0f5';
ctx.stroke();
const canvas = document.getElementById('canvas');
const faceColor = document.getElementById('face-color');
const borderColor = document.getElementById('border-color');
const lineColor = document.getElementById('line-color');
const largeHandColor = document.getElementById('large-hand-color');
const secondHandColor = document.getElementById('second-hand-color');

if(localStorage.getItem('faceColor')){
  faceColor.value = localStorage.getItem('faceColor')
}
if(localStorage.getItem('borderColor')){
  borderColor.value = localStorage.getItem('borderColor')
}
if(localStorage.getItem('lineColor')){
  lineColor.value = localStorage.getItem('lineColor')
}
if(localStorage.getItem('largeHandColor')){
  largeHandColor.value = localStorage.getItem('largeHandColor')
}
if(localStorage.getItem('secondHandColor')){
  secondHandColor.value = localStorage.getItem('secondHandColor')
}

function clock(){
  const now = new Date();
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  localStorage.setItem('faceColor',faceColor.value);
  localStorage.setItem('borderColor',borderColor.value);
  localStorage.setItem('lineColor',lineColor.value);
  localStorage.setItem('largeHandColor',largeHandColor.value);
  localStorage.setItem('secondHandColor',secondHandColor.value);

  //Setup canvas
  ctx.save(); //save the default state
  ctx.clearRect(0, 0, 500, 500);
  ctx.translate(250, 250); //Put 0, 0 in the middle
  ctx.rotate(-Math.PI / 2) //Rotate clock -90 degrees

// Set default styles
ctx.strokeStyle = '#000000';
ctx.fillStyle = '#f4f4f4';
ctx.lineWidth = 5;
ctx.lineCap = 'round';

// Draw clock face/ border
ctx.save();
ctx.beginPath();
ctx.lineWidth = 14;
ctx.strokeStyle = localStorage.getItem('borderColor');
ctx.fillStyle = localStorage.getItem('faceColor');
ctx.arc(0,0, 142, 0, 2*Math.PI, true);
ctx.stroke();
ctx.fill();
ctx.restore();

// Draw hour lines
ctx.save();
ctx.strokeStyle = localStorage.getItem('lineColor');
for(let i= 0; i < 12; i++){
  ctx.beginPath();
  ctx.rotate(Math.PI / 6);
  ctx.moveTo(100,0);
  ctx.lineTo(120,0);
  ctx.stroke();
}
ctx.restore();

// Draw minute lines
ctx.save();
ctx.strokeStyle = localStorage.getItem('lineColor');
ctx.lineWidth = 4;
for(let i= 0; i < 60; i++){
  if(i  % 5 !== 0 ){
    ctx.beginPath();
    ctx.moveTo(117,0);
    ctx.lineTo(120,0);
    ctx.stroke();
  }
  ctx.rotate(Math.PI / 30);
}
ctx.restore();

// Get current time
const hr = now.getHours() % 12 ;
const min = now.getMinutes();
const sec = now.getSeconds();

// console.log(`${hr}: ${min}: ${sec}`)

// Draw hour hand
ctx.save();
ctx.rotate((Math.PI / 6) * hr + (Math.PI / 360) * min + (Math.PI / 21600)*sec);
ctx.strokeStyle = localStorage.getItem('largeHandColor');
ctx.lineWidth = 14;
ctx.beginPath();
ctx.moveTo(-20, 0);
ctx.lineTo(80, 0);
ctx.stroke();
ctx.restore();

// Draw minute hand
ctx.save();
ctx.rotate( (Math.PI / 30) * min + (Math.PI / 1800)*sec);
ctx.strokeStyle = localStorage.getItem('largeHandColor');
ctx.lineWidth = 10;
ctx.beginPath();
ctx.moveTo(-28, 0);
ctx.lineTo(112, 0);
ctx.stroke();
ctx.restore();

// Draw second hand
ctx.save();
ctx.rotate( (Math.PI / 30)*sec);
ctx.strokeStyle = localStorage.getItem('secondHandColor');
ctx.fillStyle = localStorage.getItem('secondHandColor');
ctx.lineWidth = 6;
ctx.beginPath();
ctx.moveTo(-30, 0);
ctx.lineTo(100, 0);
ctx.stroke();
ctx.beginPath();
ctx.arc(0,0,10, 0,Math.PI * 2, true);
ctx.fill();
ctx.restore();


  ctx.restore(); //Restore default state

  requestAnimationFrame(clock);
}


requestAnimationFrame(clock);

document.getElementById('save-btn').addEventListener('click', ()=>{
  const dataURL = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = 'clock.png';
  link.href = dataURL;
  link.click();
})
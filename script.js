function clock(){
  const now = new Date();
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  //Setup canvas
  ctx.save(); //save the default state
  ctx.clearRect(0, 0, 500, 500);
  ctx.translate(250, 250); //Put 0, 0 in the middle
  ctx.rotate(-Math.pi / 2) //Rotate clock -90 degrees

// Set default styles
ctx.strokeStyle = '#0000000';
ctx.fillStyle = '#f4f4f4';
ctx.lineWidth = 5;
ctx.lineCap = 'round';

// Draw clock face/ border
ctx.save();

  ctx.restore(); //Restore default state
}

clock();
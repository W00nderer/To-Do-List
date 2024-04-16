//STICKY BALLS ANIMATION

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
ctx.fillStyle = 'pink';

class Ball {
  constructor(effect){
    this.effect = effect;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random()*60 + 20;
    this.speedX = Math.random() - 0.5;
    this.speedY = Math.random() - 0.5;
  }
  update(){
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.speedX = -this.speedX;
    }
    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.speedY = -this.speedY;
    }
    this.x += this.speedX;
    this.y += this.speedY;
  }
  draw(context){
    context.beginPath();
    context.arc(this.x,this.y,this.radius,0,Math.PI*2);
    context.fill();
  }
  reset(){
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
  }
}
class MetaballEffect{
  constructor(width, height){
    this.width = width;
    this.height = height;
    this.metaballsArray = [];
  }
  init(numberOfBalls){
    for( let i=0; i < numberOfBalls; i++){
      this.metaballsArray.push(new Ball(this));
    }
  }
  update(){
    this.metaballsArray.forEach(metaball => metaball.update());
  }
  draw(context){
    this.metaballsArray.forEach(metaball => metaball.draw(context));
  }
  reset(newWidth, newHeight){
    this.width = newWidth;
    this.height = newHeight;
    this.metaballsArray.forEach(metaball => metaball.reset());
  }
}

const effect = new MetaballEffect(canvas.width, canvas.height);
effect.init(50);
console.log(effect);

function animate(){
  ctx.clearRect(0,0,canvas.width, canvas.height);
  effect.update();
  effect.draw(ctx);
  requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', function(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.fillStyle = 'pink';
  effect.reset(canvas.width,canvas.height);
})


//MOVING SECTION

const movingSection = document.getElementById("intro-section");
const h1 = document.getElementById("h1");
let checkpoint1 = 0;

window.addEventListener('scroll', moveSection);


function moveSection(){
  let scrollPosition = window.scrollY;
  if(scrollPosition>=200){
    movingSection.style.animation = "change .2s ease-in-out forwards";
    checkpoint1=1;
    h1.style.animation = "h1-change .2s ease-in-out forwards"
  }
  if(scrollPosition<=20 && checkpoint1===1){
    movingSection.style.animation = "change-back .2s ease-in-out forwards";
    h1.style.animation = "h1-change-back .2s ease-in-out forwards"
    checkpoint1=0;
  }
}

//NEW TASK BAR (IN WORK)

const addNewBar = document.getElementById("add-new");
const plusIcon = document.getElementById("plus-icon");

function addNewTransform() {
  addNewBar.style.width = '80%';
  addNewBar.style.height = '80px';
  addNewBar.style.borderRadius = '10px';
  plusIcon.style.transform = 'translateX(-450px) rotate(45deg)';
}


// MEDIA QUERIES


addNewBar.addEventListener('click', addNewTransform);

const mediaQuery = [
  window.matchMedia('(max-width: 700px)'),
  window.matchMedia('(max-width: 900px)')
];


function handleViewportChange(mediaQuery) {
  if (mediaQuery[0].matches) {
    addNewBar.removeEventListener('click', addNewTransform);
    addNewBar.addEventListener('click', function() {
      addNewBar.style.width = '80%';
      addNewBar.style.height = '80px';
      addNewBar.style.borderRadius = '10px';
      plusIcon.style.transform = 'translateX(-100px) rotate(45deg)';
    });
  } else if (mediaQuery[1].matches){
    addNewBar.removeEventListener('click', addNewTransform);
    addNewBar.addEventListener('click', function() {
      addNewBar.style.width = '80%';
      addNewBar.style.height = '80px';
      addNewBar.style.borderRadius = '10px';
      plusIcon.style.transform = 'translateX(-150px) rotate(45deg)';
    });
  }
   else {
    addNewBar.removeEventListener('click', addNewTransform);
    addNewBar.addEventListener('click', addNewTransform);
  }
}

handleViewportChange(mediaQuery);

mediaQuery.addListener(handleViewportChange);


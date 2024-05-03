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
effect.init(60);
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
const taskBar = document.getElementById("task");
const addNewText = document.getElementById('add-new-text');
const addIcon = document.getElementById('add-icon');
let activated = 0;
const taskList = document.getElementById("task-list");

const placeholderList=['Buy an island...','Hike mountain Everest...','Get a gold medal...','Travel around the world...','Write a song...','Win a competition...','Go to space...','Help a friend...','Make a new friend...','Start a business...','Drink water...','Have a party...','Buy snacks...'];

function placeholderChoose(){
  taskBar.placeholder = placeholderList[Math.floor(Math.random() * placeholderList.length)];
}
placeholderChoose();

//ADDING TASK FUNCTIONS

let taskCount=0;

function addTask(){
  taskCount++;
  const div=document.createElement('div');
  div.className='new-task '+ taskCount;
  const paragraph=document.createElement('p');
  paragraph.innerText=taskBar.value;

  const checkboxIcon = document.createElement('i');
  checkboxIcon.className='fa-regular fa-square '+ taskCount;

  const trashBin = document.createElement('i');
  trashBin.className='fa-solid fa-trash fa-2xs ' + taskCount;
  trashBin.onclick = (function(count) {
    return function() {
        deleteTask(count);
    };
  })(taskCount);


  taskList.appendChild(div);
  div.appendChild(checkboxIcon);
  div.appendChild(paragraph);
  div.appendChild(trashBin);

  paragraph.style.animation = "task-slide-in .4s ease-in-out forwards";
  checkboxIcon.style.animation = "task-slide-in .4s ease-in-out forwards";
  trashBin.style.animation = "task-slide-in .4s ease-in-out forwards";
  taskBar.value='';
  placeholderChoose();
  addIcon.style.display='none';
}

addIcon.addEventListener('click',addTask);

taskBar.addEventListener("keypress", function(event) {
  if (event.keyCode === 13) {
    addTask();
  }
});

//DELETE TASK

function deleteTask(x){
  let deletingElement = document.getElementsByClassName(x)[0];
  if(deletingElement){
    deletingElement.parentNode.removeChild(deletingElement);
  }
}

//BUTTON TRANSFORM FUNCTIONS

const viewportWidth = window.innerWidth;

function addNewTransform(){
  activated=1;
  addNewBar.style.width = '80%';
  addNewBar.style.height = '80px';
  addNewBar.style.borderRadius = '10px';
  plusIcon.style.transform = 'translateX(-400px) rotate(45deg)';
  addNewText.style.opacity=0;
  taskBar.style.opacity = 1;
  taskBar.style.zIndex = 1;
  plusIcon.removeEventListener('click', addNewTransform);
  plusIcon.addEventListener('click', backToAdd);
  placeholderChoose();
}

function backToAdd(){
  activated=0;
  addNewBar.style.width = '300px';
  addNewBar.style.height = '100px';
  addNewBar.style.borderRadius = '100px';
  plusIcon.style.transform = 'translateX(0px) rotate(90deg)';
  addNewText.style.opacity=1;
  taskBar.style.opacity = 0;
  taskBar.style.zIndex = -1;
  addIcon.style.display='none';
  plusIcon.removeEventListener('click', backToAdd);
  plusIcon.addEventListener('click', addNewTransform);
  taskBar.value='';
  placeholderChoose();

}


plusIcon.addEventListener('click', addNewTransform);
addNewText.addEventListener('click', addNewTransform);



taskBar.addEventListener('input', function() {
  if (taskBar.value.trim() !== '') {
      addIcon.style.display='block';
  }
});

addNewBar.addEventListener('mouseover', function() {
  addNewBar.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
}); 

addNewBar.addEventListener('mouseout', function() {
  if(activated===0){
    addNewBar.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
  }else{
    addNewBar.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
  }
});


// MEDIA QUERIES


const mediaQuery = [
  window.matchMedia('(max-width: 600px)'),
  window.matchMedia('(max-width: 900px)')
];


function handleViewportChange(mediaQuery) {
  if (mediaQuery[0].matches) {
    function addNewTransform700(){
      activated=1;
      addNewBar.style.width = '80%';
      addNewBar.style.height = '80px';
      addNewBar.style.borderRadius = '10px';
      plusIcon.style.transform = 'translateX(-80px) rotate(45deg)';
      taskBar.style.width='70%';
      addNewText.style.opacity=0;
      taskBar.style.opacity = 1;
      taskBar.style.zIndex = 1;
      plusIcon.removeEventListener('click', addNewTransform700);
      plusIcon.addEventListener('click', backToAdd);
    }
    addNewText.removeEventListener('click', addNewTransform);
    addNewText.addEventListener('click', addNewTransform700);
    plusIcon.removeEventListener('click', addNewTransform);
    plusIcon.addEventListener('click', addNewTransform700);
  } else if (mediaQuery[1].matches){
    function addNewTransform900(){
      activated=1;
      addNewBar.style.width = '80%';
      addNewBar.style.height = '80px';
      addNewBar.style.borderRadius = '10px';
      plusIcon.style.transform = 'translateX(-130px) rotate(45deg)';
      taskBar.style.width='70%';
      addNewText.style.opacity=0;
      taskBar.style.opacity = 1;
      taskBar.style.zIndex = 1;
      plusIcon.style.marginLeft='-15px';
      plusIcon.removeEventListener('click', addNewTransform900);
      plusIcon.addEventListener('click', backToAdd);
    }
    addNewText.removeEventListener('click', addNewTransform);
    addNewText.addEventListener('click', addNewTransform900);
    plusIcon.removeEventListener('click', addNewTransform);
    plusIcon.addEventListener('click', addNewTransform900);
  }
   else {
    addNewText.addEventListener('click', addNewTransform);
    plusIcon.addEventListener('click', addNewTransform);
  }
}

handleViewportChange(mediaQuery);

mediaQuery.addListener(handleViewportChange);

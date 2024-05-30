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

//NEW TASK BAR
let viewportWidth = window.innerWidth;

const addNewBar = document.getElementById("add-new");
const plusIcon = document.getElementById("plus-icon");
const taskBar = document.getElementById("task");
const addNewText = document.getElementById('add-new-text');
const addIcon = document.getElementById('add-icon');
let activated = 0;
const taskList = document.getElementById("task-list");

// MAXIMUM LENGTH OF TASK

function adjustMaxLength() {
  const maxChar = Math.floor((viewportWidth / 100) * 4 - 3);
  if (maxChar < 1) {
    taskBar.setAttribute('maxlength', 1);
  } else {
    taskBar.setAttribute('maxlength', maxChar);
  }
  console.log(maxChar);
}

adjustMaxLength();
window.addEventListener('resize', function() {
  viewportWidth = window.innerWidth;
  adjustMaxLength();
  handleInputOverflow();
});

function handleInputOverflow() {
  const maxLength = parseInt(taskBar.getAttribute('maxlength'));
  if (taskBar.value.length > maxLength) {
    taskBar.value = taskBar.value.slice(0, maxLength);
  }
}


const placeholderList=['Buy an island...','Hike mountain Everest...','Get a gold medal...','Travel around the world...','Write a song...','Win a competition...','Go to space...','Help a friend...','Make a new friend...','Start a business...','Drink water...','Have a party...','Buy snacks...'];

function placeholderChoose(){
  taskBar.placeholder = placeholderList[Math.floor(Math.random() * placeholderList.length)];
}
placeholderChoose();

//ADDING TASK FUNCTIONS

let taskCount=0;

let taskArr = [];

window.onload = () => {
  if (localStorage) {
    if (localStorage.getItem('SavedTasks')) {
      taskArr = (JSON.parse(localStorage.getItem('SavedTasks')));

      taskArr.forEach(createTaskElement);
    }
  }
}

function createTaskElement(task){
  taskCount = task.id;
  const div = document.createElement('div');
  div.className = 'new-task ' + task.id;
  div.setAttribute('id', 'div' + task.id);

  const paragraph = document.createElement('p');
  paragraph.innerText = task.task;
  paragraph.className = 'task-text ' + task.id;
  paragraph.setAttribute('id', 'p' + task.id);

  const checkedBoxIcon = document.createElement('i');
  checkedBoxIcon.className = 'fa-regular fa-square-check ' + task.id;
  checkedBoxIcon.setAttribute('id', 'square-check' + task.id);

  const boxIcon = document.createElement('i');
  boxIcon.className = 'fa-regular fa-square ' + task.id;
  boxIcon.setAttribute('id', 'square' + task.id);
  boxIcon.addEventListener('click', () => completeTask(task.id));

  const trashBin = document.createElement('i');
  trashBin.className = 'fa-solid fa-trash fa-2xs ' + task.id;
  trashBin.addEventListener('click', () => deleteTask(task.id));

  div.appendChild(checkedBoxIcon);
  div.appendChild(boxIcon);
  div.appendChild(paragraph);
  div.appendChild(trashBin);
  taskList.appendChild(div);

  if (task.status) {
    div.style.animation = "completed-task-slide-in .4s ease-in-out forwards";
    paragraph.style.textDecoration = 'line-through';
    checkedBoxIcon.style.color = 'rgba(255, 255, 255, 0.349)';
    checkedBoxIcon.style.transform = 'rotate(360deg)';
    boxIcon.style.color = 'transparent';
  } else {
    div.style.animation = "task-slide-in .4s ease-in-out forwards";
  }
}

function addTask(){
  taskCount++;
  const task = { id: taskCount, task: taskBar.value, status: 0 };
  taskArr.push(task);
  localStorage.setItem('SavedTasks', JSON.stringify(taskArr));
  createTaskElement(task);
  taskBar.value = '';
  placeholderChoose();
  addIcon.style.display = 'none';
}

addIcon.addEventListener('click',addTask);

taskBar.addEventListener("keypress", function(event) {
  if (event.keyCode === 13) {
    addTask();
  }
});


//COMPLETE TASK

function completeTask(x){
  const completedTaskDiv = document.getElementById('div'+ x);
  const completedTaskText = document.getElementById('p' + x);
  const checkBox = document.getElementById('square-check' + x);
  const justBox = document.getElementById('square' + x);
  if(completedTaskDiv){
    completedTaskDiv.style.animation= "complete .4s ease-in-out forwards";
    completedTaskText.style.textDecoration = 'line-through';
    checkBox.style.animation = "check-appear .4s ease-in-out forwards";
    justBox.style.animation = "box-disappear .4s ease-in-out forwards";
    console.log('Complete Task Function Called');
  }
  let list = (JSON.parse(localStorage.getItem('SavedTasks')));
  for (let item of list) {
    if (item.id === x) {
        item.status = 1;
        break;
    }
  }
  localStorage.setItem('SavedTasks', JSON.stringify(list));
}

//DELETE TASK

function deleteTask(x){
  let deletingElement = document.getElementsByClassName(x)[0];
  if (deletingElement) {
    deletingElement.parentNode.removeChild(deletingElement);
  }
  let list = JSON.parse(localStorage.getItem('SavedTasks'));
  const index = list.findIndex(item => item.id === x);
  if (index !== -1) {
    console.log(list);
    list.splice(index, 1);
    localStorage.setItem('SavedTasks', JSON.stringify(list));
  }
}

//BUTTON TRANSFORM FUNCTIONS

console.log(viewportWidth);

function addNewTransform(){
  activated=1;
  addNewBar.style.width = '80%';
  addNewBar.style.height = '80px';
  addNewBar.style.borderRadius = '10px';
  let distance = (60+(Math.floor((window.innerWidth-500)*0.37)))*(-1);
  let movePlusIcon = distance + 'px';
  plusIcon.style.transform = 'translateX(' + movePlusIcon + ') rotate(45deg)';
  addNewText.style.opacity=0;
  taskBar.style.opacity = 1;
  taskBar.style.zIndex = 1;
  plusIcon.removeEventListener('click', addNewTransform);
  plusIcon.addEventListener('click', backToAdd);
  placeholderChoose();
  window.addEventListener('resize', function() {
    viewportWidth = window.innerWidth;
    let distance = (60 + (Math.floor((window.innerWidth - 500) * 0.37))) * (-1);
    let movePlusIcon = distance + 'px';
    plusIcon.style.transform = 'translateX(' + movePlusIcon + ') rotate(45deg)';
  });
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
  window.addEventListener('resize', function() {
    viewportWidth = window.innerWidth;
    plusIcon.style.transform = 'translateX(0px) rotate(90deg)';
  });
}


plusIcon.addEventListener('click', addNewTransform);
addNewText.addEventListener('click', addNewTransform);



taskBar.addEventListener('input', function() {
  if (taskBar.value.trim() !== '') {
    addIcon.style.display='block';
  }else{
    addIcon.style.display='none';
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


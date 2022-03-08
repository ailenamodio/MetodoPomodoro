const task = []; //aca guarda cada una de las tareas que se van mandando por teclado
let time = 0; //hace la cuenta regresiva
let timer = null;
let timerBreak= null;
let current = null;

const bAdd = document.querySelector('#bAdd'); //querySelector hace referencia a los elementos html (?)
const itTask = document.querySelector('#itTask');
const form = document.querySelector('#form');
const taskName = document.querySelector('#time #taskName');

renderTime();
renderTasks();

form.addEventListener('submit',e =>{

    e.preventDefault(); //saca el funcionamiento por defecto

    if(itTask.value !=  ''){ //si itTask.value no es igual a vacio, ejecuta la funcion createTask
        createTask(itTask.value);
        itTask.value ='';
        renderTasks();
    }

});

function createTask(value){ //crea una nueva tarea
    const newTask = { //objeto
        id: (Math.random()*100).toString(36).slice(3),
        title: value,
        completed: false
    };

    task.unshift(newTask); //arregla la tarea nueva a un arreglo.
}

function renderTasks(){ //toma cada uno de los elementos de las tareas y genera un html
    const html = task.map(task =>{
        return `
        <div class="task">
        <div class="completed">${
          task.completed
            ? "<span class='done'>Done</span>"
            : `<button class="start-button" data-id="${task.id}">Start</button></div>`
        }
            <div class="title">${task.title}</div>
        </div>`;
    }); //itera con cada uno de los elementos del arreglo

    const taskContainer = document.querySelector('#task');
    taskContainer.innerHTML = html.join('');

const startButtons = document.querySelectorAll('.task .start-button');

startButtons.forEach(button =>{
    button.addEventListener('click', e =>{
        if(!timer){
            const id = button.getAttribute('data-id');
            startButtonHandler(id);
            button.textContent = 'In progress ...'
        }
    })
})

}
function startButtonHandler(id){
    time = 25*60;
    current = id;

    const taskIndex= task.findIndex(task => task.id == id);
    renderTime();
    taskName.textContent = task[taskIndex].title;

    timer= setInterval(() => {
        timeHandler(id);
    }, 1000); //milisegundos
}

function timeHandler(id){
    time--;
    renderTime();

    if(time==0){
        clearInterval(timer);
        markCompleted(id);
        timer=null;
        renderTasks();
        startBreak();
    }
}

function timerBreakHanlder(){
    time--;
    renderTime();

    if(time==0){
        clearInterval(timerBreak);
        current=null;
        timerBreak=null;
        taskName.textContent="";
        renderTasks();
    }

}

function renderTime(){
    const timeDiv= document.querySelector('#time #value');
    const minutes = parseInt(time / 60);
    const seconds = parseInt(time % 60);

    timeDiv.textContent=`${minutes<10 ?'0':''}${minutes}:${seconds<10 ?'0':''}${seconds}`;
}

function markCompleted(id){
    const taskIndex= task.findIndex(task => task.id == id);
    task[taskIndex].completed=true;
}

function startBreak(){
    time = 5*60;
    taskName.textContent ="Break";
    renderTime();
    timerBreak= setInterval(()=>{
        timerBreakHanlder();
    },1000);
}
class Task {
    constructor(name, date, priority){
        this.id = Date.now() + Math.random();
        this.name = name;
        this.date = date;
        this.priority = priority;
        this.status = "pending";
    }
}

let allTasks = [];
let currentSelectedPriority = "";

const $priorityBtn = document.getElementById('priorityBtn');
const $priorityList = document.getElementById('priorityList');

// update priority when clicked
$priorityList.addEventListener('click', (e) => {
    if (e.target.classList.contains('drop-option')) {
        currentSelectedPriority = e.target.innerText;
        $priorityBtn.innerText = `Priority: ${currentSelectedPriority}`;
        $priorityList.classList.remove('show');
    }
});

// priority dropdown toggle view
$priorityBtn.addEventListener('click', (event) => {
    event.stopPropagation(); 
    $priorityList.classList.toggle('show');
});
window.addEventListener('click', () => {
    if ($priorityList.classList.contains('show')){
        $priorityList.classList.remove('show');
    }
});

// --- TASK LOGIC ---
function addTask() {
    // set elements and shit
    const $nameInput = document.getElementById('taskName');
    const $dateInput = document.getElementById('taskDate');

    const name = $nameInput.value.trim();
    const date = $dateInput.value;
    const priority = currentSelectedPriority;

    // validation
    if (!name || !date || !priority){
        // fail
    }
    if (name.length > 30){
        alert("Name too long!");
        // fail
    }

    // create task using constructor
    const newTask = new Task(name, date, priority);
    allTasks.push(newTask);

    // reset fields
    $nameInput.value = "";
    $dateInput.value = "";
    $priorityBtn.innerText = "Select Priority";
    currentSelectedPriority = "";

    // render new task
    renderTasks();
}

viewTasks();
modifyTasks();
addTasks();
removeTasks();
searchTasks();
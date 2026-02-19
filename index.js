class Task { // task template
    constructor(name, date, priority){
        this.id = Date.now().toString(36) + Math.random().toString(36).substring(2);
        this.name = name;
        this.date = date;
        this.priority = priority;
        this.status = "pending";
    }
}

// allTasks array, array of taks objs
let allTasks = []; 
let currentView = "active"; // view starts on active by default
let currentSelectedPriority = "";

const $priorityBtn = document.getElementById('priorityBtn');
const $priorityList = document.getElementById('priorityList');

// update priority button when selected
$priorityList.addEventListener('click', (e) => {
    if (e.target.classList.contains('drop-option')) {
        currentSelectedPriority = e.target.innerText;
        $priorityBtn.innerText = `Priority: ${currentSelectedPriority}`;
        $priorityList.classList.remove('show');
    }
});

// priority dropdown toggle view
$priorityBtn.addEventListener('click', (e) => { // if user clicks on button, view dropdown
    e.stopPropagation(); 
    $priorityList.classList.toggle('show');
});
window.addEventListener('click', () => { // if user clicks anywhere in window, hide dropdown
    if ($priorityList.classList.contains('show')){
        $priorityList.classList.remove('show');
    }
});

// === TASK LOGIC ===
const $addBtn = document.getElementById('taskBtn');
$addBtn.addEventListener('click', addTask);

function addTask() {
    // set elements and shit must be local
    const $nameInput = document.getElementById('taskName');
    const $dateInput = document.getElementById('taskDate');

    const name = $nameInput.value.trim();
    const date = $dateInput.value;
    const priority = currentSelectedPriority;

    // validation
    if (!name){
        alert(`Name task`);
        return;
    }
    if (!date){
        alert(`Enter task date`);
        return;
    }
    if (!priority){
        alert(`Enter task priority`);
        return;
    }
    if (name.length > 50){
        alert("Name too long");
        return;
    }
    else{
        // create w constructor and push to god array
        allTasks.push(new Task(name, date, priority));

        // reset fields
        $nameInput.value = "";
        $dateInput.value = "";
        $priorityBtn.innerText = "Priority";
        currentSelectedPriority = "";

        // render new task
        renderTasks();
        return;
    }
}

// === VIEW & SORT BUTTONS ===
const $statusButtons = document.querySelectorAll('#statusView button'); // every button in 

$statusButtons.forEach(button => {
    button.addEventListener('click', function() {
        // 1. Remove the 'selected' class from all buttons in this group
        $statusButtons.forEach(btn => btn.classList.remove('selected'));
        
        // 2. Add the 'selected' class to the one that was clicked
        this.classList.add('selected');

        // Toggle the global view state
        if (this.id === 'activeviewBtn') {
            currentView = 'active';
            console.log("Showing Active Tasks...");
        } else {
            currentView = 'completed';
            console.log("Showing Completed Tasks...");
        }
        renderTasks();
    });
});

// === TASK DISPLAY ===
function renderTasks() { // render every sort, task added, or status
    const $display = document.getElementById('taskDisplay'); // table display div
    const $viewInterface = document.querySelector('.view-interface'); // sort and status btns

    if (!$display) return; // safety check
    $display.innerHTML = "";

    // god task array is empty
    if (allTasks.length === 0) {
        $viewInterface.classList.add('hidden');
        $display.innerHTML = "<p>Your task list is empty! Add a task. </p>";
        return;
    }

    // at least one task exists if here
    $viewInterface.classList.remove('hidden');

    // ternary op, if current view is set to active tasks, then task status is pending, otherwise completed
    const filteredTasks = allTasks.filter(task => {
        return currentView === 'active' ? task.status === 'pending' : task.status === 'completed';
    });

    // EDGE CASE: empty view, display empty message
    if (filteredTasks.length === 0) {
        $display.innerHTML = `<p>No ${currentView} tasks found.</p>`;
        return;
    }

    // table headers
    let html = `
        <div class="grid-header">Task Name</div>
        <div class="grid-header">Due Date</div>
        <div class="grid-header">Priority</div>
        <div class="grid-header">Action</div>
    `;

    // map data from filteredTasks into grid slots
    html += filteredTasks.map(task => {
        // only show done button if the task is pending
        const completeBtn = task.status === 'pending' ?
             `<button class="complete-btn" onclick="completeTask('${task.id}')">Done</button>` 
            : `<span>✅</span>`;

        return `
            <div class="task-name">${task.name}</div>
            <div class="task-date">${task.date}</div>
            <div class="task-priority"><span class="badge ${task.priority.toString().toLowerCase()}">${task.priority}</span></div>
            <div class="task-actions">  ${task.status === 'pending' ? `<button class="complete-btn" onclick="completeTask('${task.id}')">Done</button>` : ''}
                <button class="delete-btn" onclick="removeTask('${task.id}')">Delete<i class="fa-solid fa-trash-can"></i></button>
            </div>
            `;
        }).join("");

    $display.innerHTML = html;
}

// === SORTING ===
// sort by alpha
document.querySelector('.sort-alpha').addEventListener('click', () => {
    allTasks.sort((a, b) => a.name.localeCompare(b.name)); // localeCompare compares regardless of capitalization
    renderTasks();
});

// sort by priority
document.querySelector('.sort-priority').addEventListener('click', () => {
    allTasks.sort((a, b) => a.priority - b.priority);
    renderTasks();
});

// sort by date
document.querySelector('.sort-date').addEventListener('click', () => {
    allTasks.sort((a, b) => new Date(a.date) - new Date(b.date)); // use new date to parse for sort comparison
    renderTasks();
});

// === TASK STATUS LOGIC ===
function completeTask(id) {
    const task = allTasks.find(t => t.id === id);
    if (task) {
        task.status = "completed"; // flip status
        renderTasks();
    }
}

function removeTask(id) {
    // Filter out the task by ID from the master array
    allTasks = allTasks.filter(task => task.id !== id);
    renderTasks();
}
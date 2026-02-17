class Task {
    constructor(name, date, priority){
        this.id = Date.now().toString(36) + Math.random().toString(36).substring(2);
        this.name = name;
        this.date = date;
        this.priority = priority;
        this.status = "pending";
    }
}

// Consolidating to One Array Style
let allTasks = []; 
let currentView = "active"; // Track which tab is selected
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
    if (!name || !date || !priority){
        alert("Invalid task input");
    }
    else if (name.length > 50){
        alert("Name too long");
    }
    else{
        // create w constructor and push to array (One Array Style)
        allTasks.push(new Task(name, date, priority));

        // reset fields
        $nameInput.value = "";
        $dateInput.value = "";
        $priorityBtn.innerText = "Priority";
        currentSelectedPriority = "";

    // render new task
    renderTasks();
    }
}

// === VIEW & SORT BUTTONS ===
const $statusButtons = document.querySelectorAll('#statusView button');

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
function renderTasks() {
    // table visiblity, empty, used to refresh appearance every recreation
    const $display = document.getElementById('taskDisplay'); // table display div
    const $viewInterface = document.querySelector('.view-interface'); // toggle buttons

    if (!$display) return; // safety check
    $display.innerHTML = "";

    // no tasks
    if (allTasks.length === 0) {
        $viewInterface.classList.add('hidden'); // Hide sort/status buttons
        $display.innerHTML = "<p>Your task list is totally empty! Add a task. </p>";
        return; // Stop here
    }

    // at least one task exists if here
    $viewInterface.classList.remove('hidden');

    const filteredTasks = allTasks.filter(task => {
        return currentView === 'active' ? task.status === 'pending' : task.status === 'completed';
    });

    // 3. Check if THIS SPECIFIC VIEW is empty
    if (filteredTasks.length === 0) {
        $display.innerHTML = `<p>No ${currentView} tasks found.</p>`;
        return; // Stop here, don't draw the table headers
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
        const completeBtn = task.status === 'pending' 
            ? `<button class="complete-btn" onclick="completeTask('${task.id}')">Done</button>` 
            : `<span>✅</span>`;

        return `
            <div class="task-name">${task.name}</div>
                <div class="task-date">${task.date}</div>
                <div><span class="badge ${task.priority.toString().toLowerCase()}">${task.priority}</span></div>
                <div class="task-actions">  ${task.status === 'pending' ? `<button class="complete-btn" onclick="completeTask('${task.id}')">Done</button>` : '✅'}
                    <button class="delete-btn" onclick="removeTask('${task.id}')"><i class="fa-solid fa-trash-can"></i></button>
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
    // Find the specific task in the master array
    const task = allTasks.find(t => t.id === id);
    if (task) {
        task.status = "completed"; // Flip the switch
        renderTasks(); // Redraw everything
    }
}

function removeTask(id) {
    // Filter out the task by ID from the master array
    allTasks = allTasks.filter(task => task.id !== id);
    renderTasks();
}
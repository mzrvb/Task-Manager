let allTasks = []; // set the array, each index of the allTasks array is a new task
const $addtaskBtn = document.getElementById('addtaskBtn'); // add button
const $dropMenu = document.getElementById('dropList'); // dropdown list
const $dropBtn = document.getElementById('dropBtn'); // button to toggle drop list



function menu()
{
    let running = true;
    let menuChoice = 0;
    while(running)
    {
        menuChoice = parseInt(prompt("====== Menu ======\n(1) View Tasks\n(2) Modify Existing Tasks\n(3) Add Tasks\n(4) Remove Tasks\n(5) Search Tasks\n(6) Quit\nEnter an option from (1 - 6):"));
    
        switch(menuChoice)
        {
            case 1:
                viewTasks();break;
            case 2:
                modifyTasks();break;
            case 3:
                addTasks();break;
            case 4:
                removeTasks();break;
            case 5:
                searchTasks();break;
            case 6:
                running = false;
                console.log("End of program");
                break;
            default:
                console.log("Invalid option");
        }
    }
}

function viewTasks()
{
    if (allTasks.length === 0)
    {
        console.log("No tasks to be displayed");
    }
    for (let i = 0; i < allTasks.length; i++)
    {
        console.table(allTasks[i]);
    }
}

function addTasks()
{
    // get task info
    const taskName = document.getElementById('task-name');
    const duration = document.getElementById('task-duration');
    const priority = document.getElementById('task-priority');

    let newTask = new Task(taskName, duration, priority);
    allTasks.push(newTask);
    console.log("Succesfully added task");
}

function modifyTasks()
{
    if (allTasks.length === 0)
    {
        return console.log("Nothing to modify.");
    }
    let menuChoice = prompt("====== Modify Tasks ======\n(1) Change task name\n(2) Change task duration\n(3) Change task priority\nEnter an option from (1 - 3)");
    let search = prompt("Enter task name to modify");
    let task = allTasks.find(t => t.taskName === search);
    if (!task)
    {
        return console.error("Task not found.");
    } 

    switch(menuChoice)
    {
        // resassign class value of variable
        case 1:
            task.taskName = prompt("Enter task new name");
            break;
        case 2:
            task.duration = parseInt(prompt("Enter new duration:"));
            break;
        case 3:
            task.priority = parseInt(prompt("Enter new priority:"));
            break;
        default:
            console.log("Invalid option");
            break;
    }
    console.log("Task updated");
}

function removeTasks()
{
    let name = prompt("Enter the name of the task to be removed");
    let initialLength = allTasks.length;
    // filter array allTasks using a function t for each element, add them to the new array if they are not the specified element
    allTasks = allTasks.filter(t => t.taskName !== name);
    
    if (allTasks.length < initialLength) 
    {
        console.log("Task removed.");
    } 
    else 
    {
        console.log("Task not found.");
    }
}

function searchTasks() 
{
    // set query to lowercase so its not case sensitive
    // compare lowercase query to lowercase task array then print into table
    let query = prompt("Search for task name:").toLowerCase();
    let results = allTasks.filter(t => t.taskName.toLowerCase().includes(query));
    console.table(results);
}

class Task
{
    constructor(taskName, duration, priority) 
    {
        this.taskName = taskName; 
        this.duration = duration;
        this.priority = priority;
    }
    set taskName(newTaskName) 
    {
        this._taskName = newTaskName;
    }
    set duration(newDuration) 
    {
        if (newDuration > 0) 
        {
            this._duration = newDuration;
        } 
        else 
        {
            console.error("Duration must be above 0 minutes!");
        }
    }
    set priority(newPriority) 
    {
        if (newPriority <= 5 && newPriority > 0)
        {
            this._priority = newPriority;
        } 
        else 
        {
            console.error("Priorities can only be from 1 - 5!");
        }
    }

    get duration() 
    {
        return this._duration;
    }
    get priority()
    {
        return this._priority;
    }
    get taskName()
    {
        return this._taskName;
    }
}

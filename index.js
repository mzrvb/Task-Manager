class Task {
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

const science = new Task("Science", 80, 2);

console.log(science.taskName);
console.log(science.duration);
console.log(science.priority);
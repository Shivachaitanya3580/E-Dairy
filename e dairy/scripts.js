// BIO & PERSONAL INFO SECTION
function saveBio() {
    const name = document.getElementById("name").value;
    const bio = document.getElementById("bio").value;
    const hobbies = document.getElementById("hobbies").value;
    const contact = document.getElementById("contact").value;

    localStorage.setItem("name", name);
    localStorage.setItem("bio", bio);
    localStorage.setItem("hobbies", hobbies);
    localStorage.setItem("contact", contact);

    alert("Personal information saved!");
}

// DIARY SECTION
function saveDiary() {
    const diaryText = document.getElementById("diary-text").value;
    const diaryTags = document.getElementById("diary-tags").value;

    const diaryEntry = {
        text: diaryText,
        tags: diaryTags,
        date: new Date().toLocaleDateString()
    };

    let diaryEntries = JSON.parse(localStorage.getItem("diaryEntries")) || [];
    diaryEntries.push(diaryEntry);
    localStorage.setItem("diaryEntries", JSON.stringify(diaryEntries));

    alert("Diary entry saved!");
}

// TO-DO LIST SECTION
function addTask() {
    const taskTitle = document.getElementById("task-title").value;
    const taskDesc = document.getElementById("task-desc").value;
    const taskDue = document.getElementById("task-due").value;
    const taskPriority = document.getElementById("task-priority").value;

    const task = {
        title: taskTitle,
        description: taskDesc,
        due: taskDue,
        priority: taskPriority,
        completed: false
    };

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTasks();
}

function displayTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskList = document.getElementById("todo-list");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const taskItem = document.createElement("li");
        taskItem.className = task.completed ? "completed" : "";
        taskItem.innerHTML = `
            <span>${task.title} - ${task.due} (${task.priority})</span>
            <button onclick="toggleTask(${index})">${task.completed ? "Undo" : "Complete"}</button>
            <button onclick="deleteTask(${index})">Delete</button>
        `;
        taskList.appendChild(taskItem);
    });
}

function toggleTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

// Initialize To-Do List on Page Load
window.onload = function() {
    displayTasks();
};

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let darkMode = JSON.parse(localStorage.getItem("darkMode")) || false;

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTaskCount() {
    document.getElementById("taskCount").textContent = `Total Tasks: ${tasks.length}`;
}

function renderTasks() {
    const taskList = document.getElementById("taskList");
    const filterValue = document.getElementById("filterSelect").value;

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        if (filterValue === "completed" && !task.completed) {
            return;
        }

        if (filterValue === "incomplete" && task.completed) {
            return;
        }

        const li = document.createElement("li");

        if (task.completed) {
            li.classList.add("completed");
        }

        const taskSpan = document.createElement("span");
        taskSpan.textContent = task.text;

        taskSpan.addEventListener("click", function () {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            renderTasks();
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";

        deleteBtn.addEventListener("click", function (event) {
            event.stopPropagation();
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });

        li.appendChild(taskSpan);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });

    updateTaskCount();
}

function addTask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();

    if (taskText === "") {
        return;
    }

    tasks.push({
        text: taskText,
        completed: false
    });

    saveTasks();
    renderTasks();
    input.value = "";
}

document.getElementById("taskInput").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

document.getElementById("themeToggle").addEventListener("click", function () {
    darkMode = !darkMode;
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    document.body.classList.toggle("dark-mode", darkMode);
});

if (darkMode) {
    document.body.classList.add("dark-mode");
}

renderTasks();
document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    // Load tasks from Local Storage on page load
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' indicates not to save again to Local Storage
    }

    // Add task function (with optional saving to Local Storage)
    function addTask(taskText, save = true) {
        // Check if the task text is empty
        if (taskText.trim() === "") {
            alert('Please enter a task');
            return;
        }

        // Create a new list item (li)
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');

        // Add click event to remove the task and update Local Storage
        removeButton.onclick = function() {
            taskList.removeChild(li);
            removeTaskFromStorage(taskText); // Remove from Local Storage
        };

        // Append the remove button to the list item
        li.appendChild(removeButton);

        // Add the new task to the task list (DOM)
        taskList.appendChild(li);

        // Save task to Local Storage if `save` is true
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }

        // Clear the input field
        taskInput.value = "";
    }

    // Remove task from Local Storage
    function removeTaskFromStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    // Add event listener to the button for adding a task
    addButton.addEventListener('click', function() {
        const taskText = taskInput.value;
        addTask(taskText);  // 'save' is true by default here
    });

    // Add event listener to the input field to allow adding tasks with the Enter key
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const taskText = taskInput.value;
            addTask(taskText);  // 'save' is true by default here
        }
    });

    // Load tasks from Local Storage when the page is loaded
    loadTasks();
});

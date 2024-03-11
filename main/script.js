"use strict";

// Add task function to add new tasks and store them in local storage
const addTask = () => {
  //Getting the values form the text fields
  let taskDescription = document.getElementById("taskDescription").value;
  let assignedTo = document.getElementById("assignedTo").value;
  let priority = document.getElementById("priority").value;
  let dueDate = document.getElementById("dueDate").value;
  let status = document.getElementById("status").value;

  //If text fields are empty them disply alert message
  if (!taskDescription || !assignedTo || !priority || !dueDate || !status) {
    alert("All fields are required!");
    return;
  }

  // Creating a task object to store task data
  const task = {
    id: Date.now(),
    description: taskDescription,
    assignedTo: assignedTo,
    priority: priority,
    dueDate: dueDate,
    status: status,
  };

  //Storing the data entered to the local storage
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  //Calling the displayTasks function to display the entered tasks
  displayTasks();

  //Emptying the text fields
  document.getElementById("taskDescription").value = "";
  document.getElementById("assignedTo").value = "";
  document.getElementById("priority").value = "";
  document.getElementById("dueDate").value = "";
  document.getElementById("status").value = "";
};

//DeleteTask function to delete a particular task
const deleteTask = (id) => {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks = tasks.filter((task) => task.id !== id);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();
};

//EidtTask function to update a particular task
const editTask = (id) => {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const index = tasks.findIndex((task) => task.id === id);
  if (index !== -1) {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("taskEdit");

    //Fetchin values form tasks object
    const { description, assignedTo, priority, dueDate, status } = tasks[index];

    // Create input fields for editing
    taskDiv.innerHTML = `
      <input type="text" id="newDescription" value="${description}" placeholder="New Description">
      <input type="text" id="newAssignedTo" value="${assignedTo}" placeholder="New Assigned To">
      <input type="text" id="newPriority" value="${priority}" placeholder="New Priority">
      <input type="date" id="newDueDate" value="${dueDate}" placeholder="New Due Date">
      <input type="text" id="newStatus" value="${status}" placeholder="New Status">
      <button class="save-btn">Save</button>
    `;

    //Saving the updated value
    taskDiv.querySelector(".save-btn").addEventListener("click", () => {
      const newDescription = document.getElementById("newDescription").value;
      const newAssignedTo = document.getElementById("newAssignedTo").value;
      const newPriority = document.getElementById("newPriority").value;
      const newDueDate = document.getElementById("newDueDate").value;
      const newStatus = document.getElementById("newStatus").value;

      // Update the task object
      tasks[index] = {
        id: id,
        description: newDescription || description,
        assignedTo: newAssignedTo || assignedTo,
        priority: newPriority || priority,
        dueDate: newDueDate || dueDate,
        status: newStatus || status,
      };

      localStorage.setItem("tasks", JSON.stringify(tasks));
      displayTasks();
    });
    //Adding edited vales to the task list.
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    taskList.appendChild(taskDiv);
  }
};

// Event listener to invoke the  edit button click
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("edit-btn")) {
    const taskId = parseInt(event.target.dataset.id);
    editTask(taskId);
  }
});

//Function to display all the enterted tasks
const displayTasks = () => {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  //Creating a loop to display all tasks stored to tasks object and crating new DOM elements to display them
  tasks.forEach((task) => {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    //
    taskDiv.innerHTML = `
      <p><strong>Description:</strong> ${task.description}</p>
      <p><strong>Assigned To:</strong> ${task.assignedTo}</p>
      <p><strong>Priority:</strong> ${task.priority}</p>
      <p><strong>Due Date:</strong> ${task.dueDate}</p>
      <p><strong>Status:</strong> ${task.status}</p>
      <button class="edit-btn" onclick="editTask(${task.id})">Edit</button>
      <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
    `;
    taskList.appendChild(taskDiv);
  });
};

//Function to filter and serach a given task
const filterTasks = () => {
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const filteredTasks = tasks.filter((task) => {
    return (
      task.description.toLowerCase().includes(searchInput) ||
      task.assignedTo.toLowerCase().includes(searchInput) ||
      task.priority.toLowerCase().includes(searchInput) ||
      task.dueDate.toLowerCase().includes(searchInput) ||
      task.status.toLowerCase().includes(searchInput)
    );
  });

  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  filteredTasks.forEach((task) => {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    taskDiv.innerHTML = `
      <p><strong>Description:</strong> ${task.description}</p>
      <p><strong>Assigned To:</strong> ${task.assignedTo}</p>
      <p><strong>Priority:</strong> ${task.priority}</p>
      <p><strong>Due Date:</strong> ${task.dueDate}</p>
      <p><strong>Status:</strong> ${task.status}</p>
      <button class="edit-btn" onclick="editTask(${task.id})">Edit</button>
      <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
    `;
    taskList.appendChild(taskDiv);
  });
};

// Creating the variable for Add Task button and search text field
const btnAddTask = document.getElementById("btnAddTask");
const searchInput = document.getElementById("searchInput");

// Event Listener for Add Task button and search text field
btnAddTask.addEventListener("click", addTask);
searchInput.addEventListener("input", filterTasks);
//Calling ehe displayTasks function to DOM load
document.addEventListener("DOMContentLoaded", displayTasks);


$(document).ready(function() {
$("#addTask").click(function() {
  const taskDescription = $('#taskDescription').val();
  const assignedTo = $('#assignedTo').val();
  const priority = $('#priority').val();
  const dueDate = $('#dueDate').val();
  const status = $('#status').val();

  if (!taskDescription || !assignedTo || !priority || !dueDate || !status) {
    alert("All fields are required!");
    return;
  }

  const task = {
    id: Date.now(),
    description: taskDescription,
    assignedTo: assignedTo,
    priority: priority,
    dueDate: dueDate,
    status: status
  };

  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  displayTasks();
});

function deleteTask(id) {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks = tasks.filter(task => task.id !== id);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  displayTasks();
}

function displayTasks() {
  const taskList = $('#taskList');
  taskList.innerHTML = '';

  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  tasks.forEach(task => {
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task');
    taskDiv.innerHTML = `
      <p><strong>Description:</strong> ${task.description}</p>
      <p><strong>Assigned To:</strong> ${task.assignedTo}</p>
      <p><strong>Priority:</strong> ${task.priority}</p>
      <p><strong>Due Date:</strong> ${task.dueDate}</p>
      <p><strong>Status:</strong> ${task.status}</p>
      <button onclick="deleteTask(${task.id})">Delete</button>
    `;
    taskList.append(taskDiv);
  });
}

$("#searchInput").keydown(()=> {
  const searchInput = $('#searchInput').val().toLowerCase();
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const filteredTasks = tasks.filter(task => {
    return task.description.toLowerCase().includes(searchInput) ||
           task.assignedTo.toLowerCase().includes(searchInput) ||
           task.priority.toLowerCase().includes(searchInput) ||
           task.dueDate.toLowerCase().includes(searchInput) ||
           task.status.toLowerCase().includes(searchInput);
  });
  const taskList = $('#taskList');
  taskList.innerHTML = '';
  filteredTasks.forEach(task => {
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task');
    taskDiv.innerHTML = `
      <p><strong>Description:</strong> ${task.description}</p>
      <p><strong>Assigned To:</strong> ${task.assignedTo}</p>
      <p><strong>Priority:</strong> ${task.priority}</p>
      <p><strong>Due Date:</strong> ${task.dueDate}</p>
      <p><strong>Status:</strong> ${task.status}</p>
      <button onclick="deleteTask(${task.id})">Delete</button>
    `;
    taskList.appendChild(taskDiv);
  });
});
document.addEventListener('DOMContentLoaded', displayTasks);
});


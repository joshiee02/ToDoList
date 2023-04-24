import './style.css';
import {
  showForm, addTask, getTask, getExistingTask, removeInput,
} from './addTasks';

getExistingTask();

const header = document.querySelector('header');
header.addEventListener('click', () => {
  showForm();
});

const submitButton = document.querySelector('button[type="submit"]');
submitButton.addEventListener('click', () => {
  // avoids submit button to refresh
  event.preventDefault();

  // gets tasks and inserts them in the taskContainer
  const userTask = getTask();
  addTask(userTask.taskName, userTask.description, userTask.dueDate, userTask.taskPriority);

  // store the tasks locally
  const existingTasks = JSON.parse(localStorage.getItem('all-tasks')) || [];
  existingTasks.push(userTask);
  localStorage.setItem('all-tasks', JSON.stringify(existingTasks));
  console.log(JSON.parse(localStorage.getItem('all-tasks')));

  removeInput();
});

import './style.css';
import { showForm, addTask, getTask } from './addTasks';

const header = document.querySelector('header');
header.addEventListener('click', () => {
  showForm();
});

let task;
const submitButton = document.querySelector('button[type="submit"]');
submitButton.addEventListener('click', () => {
  //avoids submit button to refresh
  event.preventDefault();

  task = getTask();
  console.log(task);
  addTask(task.taskName, task.description, task.dueDate, task.taskPriority);
});

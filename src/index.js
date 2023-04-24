import './style.css';
import {
  form, addTask, getTask, getExistingTask, removeInput,
} from './addTasks';

getExistingTask();

const header = document.querySelector('header');
header.addEventListener('click', () => {
  if (form.formActive === false) {
    form.showForm();
  } else if (form.formActive === true) {
    form.hideForm();
    header.style.height = '12.5%';
  }
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

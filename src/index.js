import './style.css';
import {
  form, addTask, getTask, getExistingTask, removeInput, generateID,
} from './addTasks';

getExistingTask();

const header = document.querySelector('header');
header.addEventListener('click', () => {
  event.stopPropagation();
  if (!form.formActive) {
    form.showForm();
  }
});

const closeFormBtn = document.querySelector('#closeFormBtn');
closeFormBtn.addEventListener('click', () => {
  event.stopPropagation();
  form.hideForm();
});

let taskRemoveBtn = document.querySelectorAll('#remove');
const submitButton = document.querySelector('button[type="submit"]');
submitButton.addEventListener('click', () => {
  // avoids submit button to refresh
  event.preventDefault();
  generateID();

  // gets tasks and inserts them in the taskContainer
  const userTask = getTask();
  addTask(userTask.taskName, userTask.description, userTask.dueDate, userTask.taskPriority);
  // store the tasks locally
  const existingTasks = JSON.parse(localStorage.getItem('all-tasks')) || [];
  existingTasks.push(userTask);
  localStorage.setItem('all-tasks', JSON.stringify(existingTasks));
  removeInput();

  taskRemoveBtn = document.querySelectorAll('#remove');
  taskRemoveBtn.forEach((button) => {
    button.addEventListener('click', () => {
      const dataNum = button.closest('.gridContainer').getAttribute('data-num');
      let existingTasks = JSON.parse(localStorage.getItem('all-tasks'));
      existingTasks = existingTasks.filter((task) => task.dataNum !== +dataNum);
      localStorage.setItem('all-tasks', JSON.stringify(existingTasks));
      button.closest('.gridContainer').remove();
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  taskRemoveBtn.forEach((button) => {
    button.addEventListener('click', () => {
      const dataNum = button.closest('.gridContainer').getAttribute('data-num');
      let existingTasks = JSON.parse(localStorage.getItem('all-tasks'));
      existingTasks = existingTasks.filter((task) => task.dataNum !== +dataNum);
      localStorage.setItem('all-tasks', JSON.stringify(existingTasks));
      button.closest('.gridContainer').remove();
    });
  });
});

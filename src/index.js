import './style.css';
import { showForm, addTask } from './addTasks';

const header = document.querySelector('header');
header.addEventListener('click', () => {
  showForm();
});

const submitButton = document.querySelector('button[type="submit"]');
submitButton.addEventListener('click', () => {
  addTask();
});
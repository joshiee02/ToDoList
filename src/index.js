import './style.css';
import addTasks from './addTasks';

const header = document.querySelector('header');

header.addEventListener('click', () => {
  addTasks();
});
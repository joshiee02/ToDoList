import './style.css';
import addTasks from './addToDoList';

const header = document.querySelector('header');

header.addEventListener('click', () => {
  addTasks();
});
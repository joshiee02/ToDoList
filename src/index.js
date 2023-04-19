import './style.css';
import showForm from './addTasks';

const header = document.querySelector('header');

header.addEventListener('click', () => {
  showForm();
});
import './style.css';
import {
  form, addTask, getTask, getExistingTask, removeInput, selector,
} from './addTasks';

getExistingTask();

selector.header.addEventListener('click', () => {
  event.stopPropagation();
  if (!form.formActive) {
    form.showForm();
  }
});

selector.closeForm_btn.addEventListener('click', () => {
  event.stopPropagation();
  form.hideForm();
});

selector.submitTask_btn.addEventListener('click', () => {
  // avoids submit button to refresh
  event.preventDefault();
  // generateID();

  // gets tasks and inserts them in the taskContainer
  const userTask = getTask();
  addTask(
    userTask.taskDataID,
    userTask.taskName,
    userTask.taskDescription,
    userTask.taskDueDate,
    userTask.taskPriority,
  );
  // store the tasks locally
  const existingTasks = JSON.parse(localStorage.getItem('all-tasks')) || [];
  existingTasks.push(userTask);
  localStorage.setItem('all-tasks', JSON.stringify(existingTasks));
  removeInput();

  selector.taskRemove_btn = document.querySelectorAll('#remove');
  selector.taskRemove_btn.forEach((button) => {
    button.addEventListener('click', () => {
      const dataID = button.closest('.gridContainer').getAttribute('dataID');
      let existingTasks = JSON.parse(localStorage.getItem('all-tasks'));
      existingTasks = existingTasks.filter((task) => task.taskDataID !== +dataID);
      localStorage.setItem('all-tasks', JSON.stringify(existingTasks));
      button.closest('.gridContainer').remove();
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  selector.taskRemove_btn = document.querySelectorAll('#remove');
  selector.taskRemove_btn.forEach((button) => {
    button.addEventListener('click', () => {
      const dataID = button.closest('.gridContainer').getAttribute('dataID');
      let existingTasks = JSON.parse(localStorage.getItem('all-tasks'));
      existingTasks = existingTasks.filter((task) => task.taskDataID !== +dataID);
      localStorage.setItem('all-tasks', JSON.stringify(existingTasks));
      button.closest('.gridContainer').remove();
    });
  });
});

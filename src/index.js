import './style.css';
import {
  form, tasks, removeInput, selector,
} from './addTasks';

tasks.sortTasks();
tasks.getExistingTask();
tasks.checkTasksDate();

// if form isn't active, then run the animation on click
// and changes the value inside form to true
selector.header.addEventListener('click', (event) => {
  event.stopPropagation();
  if (!form.formActive) {
    form.showForm();
  }
});

// hides the form on click, then changes the value inside the form object to false;
selector.closeForm_btn.addEventListener('click', (event) => {
  event.stopPropagation();
  form.hideForm();
});

selector.submitTask_btn.addEventListener('click', (event) => {
  event.preventDefault();
  // gets the inputted tasks from form
  const userTask = tasks.getTask();
  tasks.addTask(
    userTask.taskDataID,
    userTask.taskName,
    userTask.taskDescription,
    userTask.taskDueDate,
    userTask.taskPriority,
  );
  // updates the existingTasks data
  tasks.refreshExistingTasks();
  // stores the data locally
  tasks.existingTasks.push(userTask);
  localStorage.setItem('all-tasks', JSON.stringify(tasks.existingTasks));
  // removes input from form
  removeInput();
  // refreshes taskRemoveBtn every tasks added to update the nodes in tasks.taskRemove_btn
  selector.refreshTaskRemoveBtn();
  tasks.checkTasksDate();
});

document.addEventListener('DOMContentLoaded', () => {
  // refreshes taskRemoveBtn in website load to update the nodes in tasks.taskRemove_btn
  selector.refreshTaskRemoveBtn();
  tasks.checkTasksDate();
});

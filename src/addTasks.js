function showForm() {
  // adds classes to elements affected when form is active
  const header = document.querySelector('header');
  header.id = 'modal';
  const h1 = document.querySelector('h1');
  h1.id = 'modal_h1';
  const img = document.querySelector('.mouse_cursor');
  img.classList.add('modal_cursor');

  // adds the expanding animation of the form
  setTimeout(() => {
    const form = document.querySelector('form');
    form.classList.remove('hidden');
    setTimeout(() => {
      form.classList.add('show');
    }, 100);
  }, 300);
}

function addTask(taskName, taskDescription, taskDueDate, taskPriority) {
  const section = document.querySelector('section');

  // Create the gridContainer element
  const gridContainer = document.createElement('div');
  gridContainer.classList.add('gridContainer');

  // Create the child elements on gridContainer
  const taskContainer = document.createElement('div');
  taskContainer.classList.add('taskContainer');
  gridContainer.appendChild(taskContainer);

  // inserts description inputted by user using getTask()
  const description = document.createElement('p');
  description.setAttribute('id', 'description');
  description.textContent = taskDescription;
  taskContainer.appendChild(description);

  // inserts dueDate inputted by user using getTask()
  const dueDate = document.createElement('span');
  dueDate.setAttribute('id', 'dueDate');
  dueDate.textContent = taskDueDate;
  switch (taskPriority) {
    case 'low':
      dueDate.classList.add('priorityLow');
      break;

    case 'medium':
      dueDate.classList.add('priorityMedium');
      break;

    default:
      dueDate.classList.add('priorityHigh');
  }
  taskContainer.appendChild(dueDate);

  const bgContainer = document.createElement('div');
  bgContainer.classList.add('bgContainer');
  gridContainer.appendChild(bgContainer);

  const controlBar = document.createElement('div');
  controlBar.classList.add('controlBar');
  gridContainer.appendChild(controlBar);

  // inserts title inputted by user using getTask()
  const h2 = document.createElement('h2');
  h2.textContent = taskName;
  controlBar.appendChild(h2);

  const buttons = document.createElement('div');
  buttons.setAttribute('id', 'buttons');
  controlBar.appendChild(buttons);

  const editButton = document.createElement('button');
  editButton.setAttribute('id', 'edit');
  buttons.appendChild(editButton);

  const editIcon = document.createElement('i');
  editIcon.classList.add('las', 'la-edit');
  editButton.appendChild(editIcon);

  const removeButton = document.createElement('button');
  removeButton.setAttribute('id', 'remove');
  buttons.appendChild(removeButton);

  const removeIcon = document.createElement('i');
  removeIcon.classList.add('las', 'la-times');
  removeButton.appendChild(removeIcon);

  section.appendChild(gridContainer);
}

function getTask() {
  const taskName = document.querySelector('input[id="title"]').value;
  const description = document.querySelector('textarea[id="description"]').value;
  const dueDate = document.querySelector('input[id="due-date"]').value;
  const taskPriority = document.querySelector('input[name="priority"]:checked').value;
  return {
    taskName, description, dueDate, taskPriority,
  };
}

function removeInput() {
  document.querySelector('input[id="title"]').value = '';
  document.querySelector('textarea[id="description"]').value = '';
  document.querySelector('input[id="due-date"]').value = '';
  document.querySelector('input[name="priority"]:checked').value = '';
}

function getExistingTask() {
  const existingTasks = JSON.parse(localStorage.getItem('all-tasks'));
  if (existingTasks) {
    for (let i = 0; i < existingTasks.length; i += 1) {
      addTask(
        existingTasks[i].taskName,
        existingTasks[i].description,
        existingTasks[i].dueDate,
        existingTasks[i].taskPriority,
      );
    }
  }
}

export {
  showForm, addTask, getTask, getExistingTask, removeInput,
};

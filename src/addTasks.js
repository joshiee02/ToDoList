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
    form.classList.remove('hidden');;
    setTimeout(function() {
      form.classList.add('show')
    }, 100);
  }, 300);
}
function addTask() {
  const section = document.querySelector('section');

  // Create the gridContainer element
  const gridContainer = document.createElement('div');
  gridContainer.classList.add('gridContainer');

  // Create the other elements and append them to gridContainer as necessary
  const taskContainer = document.createElement('div');
  taskContainer.classList.add('taskContainer');
  gridContainer.appendChild(taskContainer);

  const bgContainer = document.createElement('div');
  bgContainer.classList.add('bgContainer');
  gridContainer.appendChild(bgContainer);

  const controlBar = document.createElement('div');
  controlBar.classList.add('controlBar');
  gridContainer.appendChild(controlBar);

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
  const taskName = document.querySelector('input[name="title"]').value;
  const description = document.querySelector('textarea[id="description"]').value;
  const dueDate = document.querySelector('input[name="due-date"]').value;
  const taskPriority = document.querySelector('input[name="priority"]:checked').value;

  return { taskName, description, dueDate, taskPriority }
}

export { showForm, addTask };

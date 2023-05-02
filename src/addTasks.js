import isPast from 'date-fns/isPast';
import compareAsc from 'date-fns/compareAsc';

// generate a random ID to assign to a task
function generateID() {
  const existingTasks = JSON.parse(localStorage.getItem('all-tasks'));
  let id;
  let randomInt;
  function getRandomInt() {
    randomInt = Math.floor(Math.random() * 100 + 1);
  }
  getRandomInt();
  if (existingTasks) {
    existingTasks.forEach((task) => {
      if (task.taskDataID === randomInt) {
        getRandomInt();
      } id = randomInt;
    });
  } id = randomInt;
  return id;
}

// removes input from the form
function removeInput() {
  document.querySelector('input[id="title"]').value = '';
  document.querySelector('textarea[id="description"]').value = '';
  document.querySelector('input[id="due-date"]').value = '';
  document.querySelector('input[name="priority"]:checked').checked = false;
}

const selector = {
  header: document.querySelector('header'),
  h1: document.querySelector('h1'),
  cursor_img: document.querySelector('.mouse_cursor'),

  form: document.querySelector('form'),
  closeForm_btn: document.querySelector('#closeFormBtn'),

  section: document.querySelector('section'),
  gridContainer: document.querySelectorAll('.gridContainer'),
  refreshGridContainer() {
    this.gridContainer = document.querySelectorAll('.gridContainer');
  },
  taskRemove_btn: document.querySelectorAll('#remove'),
  refreshTaskRemoveBtn() {
    this.taskRemove_btn = document.querySelectorAll('#remove');
    this.taskRemove_btn.forEach((button) => {
      button.addEventListener('click', () => {
        const dataID = button.closest('.gridContainer').getAttribute('dataID');
        tasks.refreshExistingTasks();
        tasks.existingTasks = tasks.existingTasks.filter((task) => task.taskDataID !== +dataID);
        localStorage.setItem('all-tasks', JSON.stringify(tasks.existingTasks));
        button.closest('.gridContainer').remove();
      });
    });
  },
  submitTask_btn: document.querySelector('button[type="submit"]'),
};

const tasks = {
  existingTasks: JSON.parse(localStorage.getItem('all-tasks')) || [],
  checkTasksDate() {
    selector.refreshGridContainer();
    this.existingTasks.forEach((task) => {
      if (isPast(new Date(task.taskDueDate))) {
        selector.gridContainer.forEach((grid) => {
          if (grid.getAttribute('dataID') == task.taskDataID) {
            grid.classList.add('isDueDate');
          }
        })
      }
    });
  },

  addTask(taskDataID, taskName, taskDescription, taskDueDate, taskPriority) {
    // Create the gridContainer element
    const gridContainer = document.createElement('div');
    gridContainer.classList.add('gridContainer');
    gridContainer.setAttribute('dataID', taskDataID);

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

    selector.section.appendChild(gridContainer);
  },

  getExistingTask() {
    if (this.existingTasks) {
      for (let i = 0; i < this.existingTasks.length; i += 1) {
        tasks.addTask(
          this.existingTasks[i].taskDataID,
          this.existingTasks[i].taskName,
          this.existingTasks[i].taskDescription,
          this.existingTasks[i].taskDueDate,
          this.existingTasks[i].taskPriority,
        );
      }
    }
  },

  getTask() {
    const taskDataID = generateID();
    const taskName = document.querySelector('input[id="title"]').value;
    const taskDescription = document.querySelector('textarea[id="description"]').value;
    const taskDueDate = document.querySelector('input[id="due-date"]').value;
    const taskPriority = document.querySelector('input[name="priority"]:checked').value;
    return {
      taskDataID, taskName, taskDescription, taskDueDate, taskPriority,
    };
  },

  sortTasks() {
    this.existingTasks.sort((a, b) => {
    const dateA = new Date(a.taskDueDate);
    const dateB = new Date(b.taskDueDate);
    return compareAsc(dateA, dateB);
  });
  },
  
  refreshExistingTasks() {
    this.existingTasks = JSON.parse(localStorage.getItem('all-tasks')) || [];
  },

};
const form = {
  formActive: false,
  showForm() {
    this.formActive = true;
    selector.header.style.height = '75%';
    selector.header.id = 'modal';
    selector.h1.id = 'modal_h1';
    selector.cursor_img.classList.add('modal_cursor');

    // adds the expanding animation of the form
    setTimeout(() => {
      selector.form.classList.remove('hidden');
      selector.closeForm_btn.classList.remove('hidden');
      setTimeout(() => {
        selector.closeForm_btn.classList.add('show');
        selector.form.classList.add('show');
      }, 100);
    }, 300);
  },
  hideForm() {
    this.formActive = false;

    selector.header.style.height = '12.5%';
    selector.header.removeAttribute('id');
    selector.h1.removeAttribute('id');
    selector.cursor_img.classList.remove('modal_cursor');
    selector.form.classList.add('hidden');
    selector.form.classList.remove('show');
    selector.closeForm_btn.classList.add('hidden');
    selector.closeForm_btn.classList.remove('show');
  },
};

export {
  form, tasks, removeInput, selector,
};

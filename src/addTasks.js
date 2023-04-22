export default function showForm() {
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

function getTask() {
  const taskName = document.querySelector('input[name="title"]').value;
  const description = document.querySelector('textarea[id="description"]').value;
  const dueDate = document.querySelector('input[name="due-date"]').value;
  const taskPriority = document.querySelector('input[name="priority"]:checked').value;

  return { taskName, description, dueDate, taskPriority }
}

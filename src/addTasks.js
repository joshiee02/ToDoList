export default function showForm() {
  // adds classes to elements affected when form is active
  const header = document.querySelector('header');
  header.id = 'modal';
  const h1 = document.querySelector('h1');
  h1.id = 'modal_h1';
  const img = document.querySelector('.mouse_cursor');
  img.classList.add('modal_cursor');

  setTimeout(() => {
    const form = document.querySelector('form');
    form.classList.remove('hidden');;
    setTimeout(function() {
      form.classList.add('show')
    }, 100);
  }, 300);
}

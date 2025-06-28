
document.addEventListener('DOMContentLoaded', function () {
  const toggleDark = document.querySelector('#dark-toggle');
  toggleDark.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  });
});

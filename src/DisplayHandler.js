const createHeader = () => {
  const header = document.createElement('div');
  header.classList.add('header');

  const logo = document.createElement('div');
  logo.classList.add('logo');
  logo.textContent = 'ToDo';

  header.appendChild(logo);

  return header;
}
createDisplay() {
  const content = document.querySelector('#content');
  content.appendChild(createHeader());
  createBody();
  createFooter();
}

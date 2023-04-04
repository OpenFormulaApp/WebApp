function addActiveClass() {
  const links = this.querySelectorAll('.nav-link');
  const currentPath = window.location.pathname;

  links.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });
}



// Navbar custom-element
class Navbar extends HTMLElement{
  constructor(){
    super();
  }
  connectedCallback(){
    fetch('templates/navbar.html')
    .then(response => response.text())
    .then(data =>{
      this.innerHTML = data;
      this.addActiveClass = addActiveClass.bind(this);
      this.addActiveClass();
    })
  }
}
customElements.define('of-navbar',Navbar);
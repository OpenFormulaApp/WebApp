window.addEventListener('load',() =>{
  const bootstrapStyles = document.createElement('link');
  bootstrapStyles.rel = 'stylesheet';
  bootstrapStyles.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css';
  document.head.appendChild(bootstrapStyles);

  const bootstrapScript = document.createElement('script');
  bootstrapScript.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js';
  document.body.appendChild(bootstrapScript);

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

  //Footer custom-element
  class Footer extends HTMLElement{
    constructor(){
      super();
    }
    connectedCallback(){
      fetch('templates/footer.html')
      .then(response => response.text())
      .then(data => {
        this.innerHTML = data;
      })
    }
  }
  customElements.define('of-footer',Footer);

  class breadcrumb extends HTMLElement{
    constructor(){
      super();
    }

    connectedCallback(){
      let rutaActual = window.location.pathname.split("/");
      //rutaActual = rutaActual.shift();
      let ultimoElemento = rutaActual.pop();
      ultimoElemento = ultimoElemento.charAt(0).toUpperCase() + ultimoElemento.slice(1).slice(0,-5);
      this.ruta = rutaActual.filter((ruta) => ruta !== '');

      let html = '<nav aria-label="breadcrumb"><ol class="breadcrumb">';
      html += '<li class="breadcrumb-item"><a href="/">Inicio</a></li>';

      this.ruta.forEach((ruta) => {
        html += `<li class="breadcrumb-item"><a href="/${ruta}">${ruta}</a></li>`;
      });

      html += `<li class="breadcrumb-item active" aria-current="page">${ultimoElemento}</li>`;
      html += '</ol></nav>';

      this.innerHTML = html;
    }
  }
  customElements.define('of-breadcrumb',breadcrumb);
})
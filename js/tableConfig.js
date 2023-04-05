const bootstrapStyle = document.createElement('link');
bootstrapStyle.rel = 'stylesheet';
bootstrapStyle.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css';
document.head.appendChild(bootstrapStyle);

const katexStyle = document.createElement('link');
katexStyle.rel = 'stylesheet';
katexStyle.href = 'https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.css';
document.head.appendChild(katexStyle);

const dataTablesStyle = document.createElement('link');
dataTablesStyle.rel = 'stylesheet';
dataTablesStyle.href = 'https://cdn.datatables.net/v/bs5/dt-1.13.4/sb-1.4.2/sp-2.1.2/datatables.min.css';
document.head.appendChild(dataTablesStyle);

const jQueryScript = document.createElement('script');
jQueryScript.src = 'https://cdn.jsdelivr.net/npm/jquery@3.6.4/dist/jquery.min.js';
jQueryScript.onload = () => {
  const dataTablesScript = document.createElement('script');
  dataTablesScript.src = 'https://cdn.datatables.net/v/bs5/dt-1.13.4/sb-1.4.2/sp-2.1.2/datatables.min.js';
  dataTablesScript.onload = () =>{
    const bootstrapScript = document.createElement('script');
    bootstrapScript.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js';
    document.body.appendChild(bootstrapScript);

    const dataTablesSearch = document.createElement('script');
    dataTablesSearch.src = 'https://cdn.datatables.net/plug-ins/1.13.4/features/fuzzySearch/dataTables.fuzzySearch.js';
    document.body.appendChild(dataTablesSearch);

    const katexScript = document.createElement('script');
    katexScript.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.js';
    document.body.appendChild(katexScript);

    function renderKatex(data, type, row) {
        if (type === "display") {
          return katex.renderToString(data);
        }
        return data;
      }
    function showModal(informacion){
      let modal = $("<div>").addClass("modal fade");

      modal.html(`
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title">Más información</h4>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                </div>
                <div class="modal-body">
                    ${informacion}
                </div>
            </div>
        </div>
      `);
      modal.appendTo("body").modal("show");
    }
      let table = new DataTable("#formulas", {
        ajax: {
          url: remoteJSON,
          dataSrc: "",
        },
        columns: [
          { data: "nombre", createdCell: function (td, cellData, rowData, row, col){
            $(td).on("click", function(){
              showModal(rowData.informacion)
            })
          } },
          { data: "formula", orderable: false, render: renderKatex },
        ],
        fuzzySearch: true,
        order: [[0, "des"]],
        language: {
          url: '//cdn.datatables.net/plug-ins/1.13.4/i18n/es-MX.json'
        }
      });
  }
  document.body.appendChild(dataTablesScript);
}
document.body.appendChild(jQueryScript);
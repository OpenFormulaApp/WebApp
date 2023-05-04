const katexStyle = document.createElement("link");
katexStyle.rel = "stylesheet";
katexStyle.href =
  "https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.css";
document.head.appendChild(katexStyle);

const dataTablesStyle = document.createElement("link");
dataTablesStyle.rel = "stylesheet";
dataTablesStyle.href =
  "https://cdn.datatables.net/v/bs5/dt-1.13.4/sb-1.4.2/sp-2.1.2/datatables.min.css";
document.head.appendChild(dataTablesStyle);

const jQueryScript = document.createElement("script");
jQueryScript.src =
  "https://cdn.jsdelivr.net/npm/jquery@3.6.4/dist/jquery.min.js";
jQueryScript.onload = () => {
  const dataTablesScript = document.createElement("script");
  dataTablesScript.src =
    "https://cdn.datatables.net/v/bs5/dt-1.13.4/sb-1.4.2/sp-2.1.2/datatables.min.js";
  dataTablesScript.onload = () => {
    const dataTablesSearch = document.createElement("script");
    dataTablesSearch.src =
      "https://cdn.datatables.net/plug-ins/1.13.4/features/fuzzySearch/dataTables.fuzzySearch.js";
    document.body.appendChild(dataTablesSearch);

    const katexScript = document.createElement("script");
    katexScript.src =
      "https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.js";
    document.body.appendChild(katexScript);

    function renderKatex(data, type, row) {
      if (type === "display") {
        return katex.renderToString(data);
      }
      return data;
    }
    function showModal(informacion) {
      informacion = informacion.replace(/(?<!\$)\n(?!.*?\$)/g, "<br>");

      informacion = informacion.replace(/\$\$(.*?)\$\$/g, function (match, p1) {
        try {
          return katex.renderToString(p1, {
            throwOnError: false,
            displayMode: false,
            fontSize: 14,
          });
        } catch (error) {
          console.error(error);
          return match;
        }
      });

      let modal = $("<div>").addClass("modal fade").attr("tabindex", "-1");

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

      $("body").append(modal);
      modal.modal("show");
    }
    let table = new DataTable("#formulas", {
      ajax: {
        url: remoteJSON,
        dataSrc: "",
      },
      columns: [
        {
          data: "nombre",
          createdCell: function (td, cellData, rowData, row, col) {
            $(td).on("click", function () {
              showModal(rowData.informacion);
            });
          },
        },
        { data: "formula", orderable: false, render: renderKatex },
      ],
      columnDefs: [
        {
          targets: 1,
          className: "dt-center",
        },
        {
          targets: 0,
          render: function (data, type, row) {
            return (
              '<span class="badge text-bg-info rounded-pill"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle-fill" viewBox="0 0 16 16"><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></svg></i></span>' +
              " " +
              data
            );
          },
        },
      ],
      fuzzySearch: true,
      order: [[0, "des"]],
      language: {
        url: "//cdn.datatables.net/plug-ins/1.13.4/i18n/es-MX.json",
      },
    });
  };
  document.body.appendChild(dataTablesScript);
};
document.body.appendChild(jQueryScript);

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

    let table = new DataTable("#formulas", {
      paging: paginacion,
      ajax: {
        url: remoteJSON,
        dataSrc: "",
      },
      columns: [
        {
          data: "nombre",
        },
        { data: "formula", orderable: false, render: renderKatex },
      ],
      columnDefs: [
        {
          targets: 1,
          className: "dt-center",
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

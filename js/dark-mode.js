if (
  localStorage.getItem("theme") === "dark" ||
  localStorage.getItem("theme") == null
) {
  document.documentElement.setAttribute("data-bs-theme", "dark");
} else if (localStorage.getItem("theme") === "light") {
  document.documentElement.setAttribute("data-bs-theme", "light");
}

function toggleDM() {
  if (document.documentElement.getAttribute("data-bs-theme") === "dark") {
    document.documentElement.setAttribute("data-bs-theme", "light");
    localStorage.setItem("theme", "light");
  } else {
    document.documentElement.setAttribute("data-bs-theme", "dark");
    localStorage.setItem("theme", "dark");
  }
}

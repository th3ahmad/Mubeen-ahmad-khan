document.addEventListener("DOMContentLoaded", function () {
  const includeElements = document.querySelectorAll("[data-include]");

  includeElements.forEach(el => {
    let file = el.getAttribute("data-include");

    // ✅ IMPORTANT FIX for GitHub Pages + Custom Domain
    if (!file.startsWith("http")) {
      file = window.location.origin + "/" + file;
    }

    fetch(file, { cache: "no-store" })
      .then(response => {
        if (!response.ok) throw new Error(`Failed to load ${file}`);
        return response.text();
      })
      .then(data => {
        el.outerHTML = data;
      })
      .catch(error => console.error("Include error:", error));
  });
});

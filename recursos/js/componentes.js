/**
 * Carga un componente HTML en la página
 * @param {string} url - Ruta del archivo HTML del componente
 * @param {string} idElemento - ID del elemento donde se insertará el contenido
 */
function cargarComponente(url, idElemento) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            const elemento = document.getElementById(idElemento);
            if (elemento) {
                elemento.innerHTML = data;
            } else {
                console.warn(`No se encontró el elemento con ID: ${idElemento}`);
            }
        })
        .catch(error => console.error(`Error al cargar ${idElemento}:`, error));
}

// Cargar siempre el header y el footer en todas las páginas
document.addEventListener("DOMContentLoaded", function () {
    let basePath = window.location.pathname.includes("/paginas/") ? "../componentes/" : "componentes/";
    cargarComponente(basePath + "header.html", "header");
    cargarComponente(basePath + "footer.html", "footer");
});

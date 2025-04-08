document.addEventListener("DOMContentLoaded", () => {
    // Función para cargar un componente en un div
    function cargarComponente(id, url) {
        fetch(url)
            .then(response => response.text())
            .then(html => {
                document.getElementById(id).innerHTML = html;
            })
            .catch(error => console.error(`Error cargando ${url}:`, error));
    }

    // Función para cambiar de pagina
    function navegarA(pagina) {
        fetch(`paginas/${pagina}.html`)
            .then(response => response.text())
            .then(html => {
                // Cargar siempre en el main (id "main")
                document.getElementById("main").innerHTML = html;
                window.history.pushState({}, "", `#${pagina}`);
                cargarScriptPagina(pagina);
            })
            .catch(error => console.error(`Error al cargar la pagina: ${pagina}`, error));
    }

    // Cargar el script de cada página (si existe)
    

    function cargarScriptPagina(pagina) {
        const rutaScript = `recursos/js/${pagina}.js?t=${new Date().getTime()}`;
        const scriptExistente = document.getElementById("ScriptDinamico");
        if (scriptExistente) scriptExistente.remove();
        const script = document.createElement("script");
        script.src = rutaScript;
        script.id = "ScriptDinamico";
        
        // Manejo de error para no interrumpir la SPA si el script no existe
        script.onerror = () => {
            console.warn(`No se pudo cargar el script: ${rutaScript}`);
        };
        
        document.body.appendChild(script);
    }

    // Carga de componenetes
    
    cargarComponente("footer", "componentes/footer.html");
    cargarComponente("header", "componentes/header.html");
    // cargarComponente("aside", "componentes/aside.html");
    
    
    // Exponer 'navegarA' al ámbito global para usarlo en tus componentes
    window.navegarA = navegarA;
});

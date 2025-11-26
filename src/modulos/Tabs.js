import ERR from "./Errores"

class Tab {

    destroy(contexto) {
        // Remover event listeners de tabs con borde
        const borderedLabels = document.querySelectorAll(`${contexto} .tab-borde .op-tab-borde label`);
        borderedLabels.forEach(label => {
            const newLabel = label.cloneNode(true);
            label.parentNode.replaceChild(newLabel, label);
        });

        // Remover event listeners de tabs regulares
        const regularLabels = document.querySelectorAll(`${contexto} .tab .op-tab label`);
        regularLabels.forEach(label => {
            const newLabel = label.cloneNode(true);
            label.parentNode.replaceChild(newLabel, label);
        });
    }

    /**
     * Inicializa el Tab de tipo solapa
     * @param {ID del contenedor padre de todo el tab} contexto 
     */
    inicializar(contexto) {
        const MODULO = "Error BodyStyle dice: M24";
        if (!ERR.id.validacion.test(contexto)) {
            console.error(MODULO + ERR.id.mensaje);
            return;
        }

        let encontrado = 0;

        // Ocultar todos los contenidos de tabs
        const contenidos = document.querySelectorAll(`${contexto} .contenido-tab`);
        contenidos.forEach(contenido => {
            contenido.style.display = "none";
        });

        // Buscar el primer tab no desactivado y activarlo
        const labels = document.querySelectorAll(`${contexto} .tab .op-tab label`);
        labels.forEach(label => {
            if (!label.classList.contains("desactivado") && encontrado === 0) {
                label.classList.add("activo");
                const idCont = label.dataset.target || label.getAttribute("data-target");
                const contenido = document.querySelector(idCont);
                if (contenido) {
                    contenido.style.display = "block";
                }
                encontrado = 1;
            }
        });
    }

    /**
     * Inicializa el Tab tipo borde
     * @param {Obj Json con la configuración} c 
     */
    inicializarBorde(c) {
        // Agregar clases de color al contenedor
        const ul = document.querySelector(`${c.contexto} .tab-borde .op-tab-borde ul`);
        if (ul) {
            ul.classList.add(c.colorFondo);
        }

        // Agregar clase de color a los labels
        const labels = document.querySelectorAll(`${c.contexto} .tab-borde .op-tab-borde label`);
        labels.forEach(label => {
            label.classList.add(c.colorFuente);
        });

        // Ocultar todos los contenidos
        const contenidos = document.querySelectorAll(`${c.contexto} .contenido-tab`);
        contenidos.forEach(contenido => {
            contenido.style.display = "none";
        });

        let encontrado = 0;

        // Buscar el primer tab no desactivado y activarlo
        labels.forEach(label => {
            if (!label.classList.contains("desactivado") && encontrado === 0) {
                const borde = document.createElement("span");
                borde.className = `activo ${c.colorBorde}`;
                label.appendChild(borde);

                const id = label.dataset.target || label.getAttribute("data-target");
                const contenido = document.querySelector(id);
                if (contenido) {
                    contenido.style.display = "block";
                }
                encontrado = 1;
            }
        });
    }

    cambiarBorde(c) {
        const labels = document.querySelectorAll(`${c.contexto} .tab-borde .op-tab-borde label`);

        labels.forEach(label => {
            label.addEventListener("click", () => {
                if (!label.classList.contains("desactivado")) {
                    // Remover todos los bordes activos
                    const spans = document.querySelectorAll(`${c.contexto} .tab-borde .op-tab-borde label span`);
                    spans.forEach(span => span.remove());

                    // Agregar borde al tab clickeado
                    const borde = document.createElement("span");
                    borde.className = `activo ${c.colorBorde}`;
                    label.appendChild(borde);

                    // Ocultar todos los contenidos
                    const contenidos = document.querySelectorAll(`${c.contexto} .contenido-tab`);
                    contenidos.forEach(contenido => {
                        contenido.style.display = "none";
                    });

                    // Mostrar el contenido correspondiente
                    const id = label.dataset.target || label.getAttribute("data-target");
                    const contenido = document.querySelector(id);
                    if (contenido) {
                        contenido.style.display = "block";
                    }
                }
            });
        });
    }

    cambiarSolapa(contexto) {
        const labels = document.querySelectorAll(`${contexto} .tab .op-tab label`);

        labels.forEach(label => {
            label.addEventListener("click", () => {
                if (!label.classList.contains("desactivado")) {
                    // Remover clase activo de todos los labels
                    const allLabels = document.querySelectorAll(`${contexto} .tab .op-tab label`);
                    allLabels.forEach(l => l.classList.remove("activo"));

                    // Agregar clase activo al label clickeado
                    label.classList.add("activo");

                    // Ocultar todos los contenidos
                    const contenidos = document.querySelectorAll(`${contexto} .contenido-tab`);
                    contenidos.forEach(contenido => {
                        contenido.style.display = "none";
                    });

                    // Mostrar el contenido correspondiente
                    const idInfo = label.dataset.target || label.getAttribute("data-target");
                    const contenido = document.querySelector(idInfo);
                    if (contenido) {
                        contenido.style.display = "block";
                    }
                }
            });
        });
    }

    iniciar(contexto) {
        this.inicializar(contexto);
        this.cambiarSolapa(contexto);
    }

    iniciarBorde({ contexto = "vacio", colorFuente = "c-negro", colorFondo = "fd-blanco", colorBorde = "fd-negro" } = {}) {
        const MODULO = "Error BodyStyle dice: M28";

        if (!ERR.id.validacion.test(contexto)) {
            console.error(MODULO + ERR.id.mensaje);
            return;
        }

        if (!ERR.clasesColorTexto.validacion.test(colorFuente)) {
            console.error(MODULO + ERR.clasesColorTexto.mensaje);
            return;
        }

        if (!ERR.clasesColorFondo.validacion.test(colorFondo)) {
            console.error(MODULO + ERR.clasesColorFondo.mensaje);
            return;
        }

        if (!ERR.clasesColorFondo.validacion.test(colorBorde)) {
            console.error(MODULO + ERR.clasesColorFondo.mensaje);
            return;
        }

        const c = {
            contexto,       // ID del contenido
            colorFuente,    // Color de la fuente de los Tabs
            colorFondo,     // Color de Fondo de la barra 
            colorBorde      // Color del borde seleccionado
        };

        // Inicializa el Tab con borde
        this.inicializarBorde(c);

        // Inicializa el Tab con solapa
        this.cambiarBorde(c);
    }
}

export default Tab;
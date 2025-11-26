import ERR from "./Errores"
import { slideUp, slideDown } from "./Animaciones"

/**
 * Módulo (21) Clase que permite gestionar el Select de bodystyle
 */
class Select {

    /**
     * Método que permite desasociar la lógica del elemento SELECT
     * pide como parámetro el ID del select a desasociar.
     * @param {ID} contexto id del select 
     */
    destroy(contexto) {
        const container = document.querySelector(contexto);
        if (container) {
            // Clonar el nodo para eliminar todos los event listeners
            const newContainer = container.cloneNode(true);
            container.parentNode.replaceChild(newContainer, container);
        }
    }

    /**
     * 
     * @param {ID del select} contexto 
     * @param {Efecto hover asociado} efecto 
     */
    inicializar(contexto, efecto) {
        const MODULO = "Error BodyStyle dice: M20"

        if (!ERR.id.validacion.test(contexto)) {
            console.error(MODULO + ERR.id.mensaje)
            return
        }

        const container = document.querySelector(contexto);
        if (!container) return;

        const selectElement = container.querySelector('select');
        const opciones = selectElement ? selectElement.querySelectorAll('option') : [];
        let visible = false;

        // Crear elemento seleccionado
        const seleccionado = document.createElement('span');
        seleccionado.className = 'seleccionado';
        if (opciones.length > 0) {
            seleccionado.textContent = opciones[0].textContent;
            if (opciones[0].classList.contains("inactivo")) {
                seleccionado.classList.add("inactivo");
            }
        }
        container.appendChild(seleccionado);

        // Crear lista de opciones
        const listaDiv = document.createElement('div');
        listaDiv.className = 'lista';
        const ul = document.createElement('ul');
        listaDiv.appendChild(ul);
        container.appendChild(listaDiv);

        opciones.forEach((opcion, index) => {
            if (!opcion.classList.contains("inactivo")) {
                const li = document.createElement('li');
                li.className = efecto;
                // Guardar el índice original (1-based para coincidir con lógica original)
                li.dataset.index = index + 1;

                const opt = document.createElement('option');
                opt.textContent = opcion.textContent;
                li.appendChild(opt);

                ul.appendChild(li);

                // Evento click en cada opción de la lista custom
                li.addEventListener('click', (event) => {
                    event.stopPropagation();
                    seleccionado.classList.remove("inactivo");

                    // Deseleccionar todas las opciones
                    opciones.forEach(o => {
                        o.selected = false;
                        o.removeAttribute('selected');
                    });

                    // Seleccionar la opción correcta
                    const ind = li.dataset.index;
                    // Encontrar la opción que corresponde (usando nth-child o index)
                    // La lógica original usaba value=ind, pero aquí asumimos orden
                    // Original: $(contexto + " select option[value=" + ind + "]")
                    // Pero el original usaba index() + 1. 
                    // Si el value no coincide con el index, esto fallaba en el original si no tenían values secuenciales.
                    // Vamos a asumir que se busca por índice para ser fieles al comportamiento de "index() + 1"
                    if (opciones[index]) {
                        opciones[index].selected = true;
                        opciones[index].setAttribute('selected', 'selected');
                    }

                    seleccionado.textContent = li.textContent.trim();

                    // Disparar evento change
                    selectElement.dispatchEvent(new Event('change'));
                });
            }
        });

        // Evento click en el contenedor principal
        container.addEventListener('click', function () {
            const divLista = container.querySelector('.lista');

            if (visible === false) {
                slideDown(divLista, 300);
                container.style.border = "1px solid rgba(135, 217, 255)";
                visible = true;
            }
            else {
                slideUp(divLista, 300);
                container.style.border = "1px solid rgb(207, 207, 207)";
                visible = false;
            }
        });
    }

    iniciar(contexto, hover = "none") {

        switch (hover) {
            case "none":
                this.inicializar(contexto, "none")
                break;
            case "borde":
                this.inicializar(contexto, "e-borde-izq-verde-5")
                break;
            case "fondo":
                this.inicializar(contexto, "hover")
                break;
            default:
                const MODULO = "Error BodyStyle dice: M20"
                console.error(MODULO + ERR.hover.mensaje)
        }
    }
}

export default Select
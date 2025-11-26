/**
 * Módulo (13) Permite agregar un dropdown al input-g 
 * de los formularios de bodystyle.
 */
class GruposInput {

    iniciar() {
        // Seleccionar todos los toggles dentro de grupos de input
        const toggles = document.querySelectorAll(".input-g .grupo .dropdown-toggle");

        toggles.forEach(toggle => {
            // Agregar span para la flecha si no existe
            if (!toggle.querySelector('.f-abajo-grupo')) {
                const span = document.createElement("span");
                span.className = "f-abajo-grupo";
                toggle.appendChild(span);
            }

            // Agregar clases si tiene texto
            const text = toggle.textContent.trim();
            if (text !== "") {
                toggle.classList.add("a-ajuste-btn", "combo-box");
            }

            // Configurar eventos si es un combo-box
            if (toggle.classList.contains("combo-box")) {
                this.configurarEventos(toggle);
            }
        });
    }

    configurarEventos(toggle) {
        // Obtener ID del dropdown asociado
        const idDrop = toggle.dataset.target;
        if (!idDrop) return;

        // Obtener el dropdown
        const dropElement = document.querySelector(idDrop);
        if (!dropElement) return;

        // Ocultar drop-complemento si existe (lógica original)
        const dropComplemento = document.querySelector(".drop-complemento");
        if (dropComplemento) {
            dropComplemento.style.display = "none";
        }

        // Obtener items del dropdown
        const items = dropElement.querySelectorAll("ul li a, ul li button");

        items.forEach(item => {
            // Usar una función nombrada o arrow function para el listener
            // Nota: En la lógica original, se agregaba un listener a CADA item por CADA toggle.
            // Si hay múltiples toggles apuntando al mismo dropdown, se agregarían múltiples listeners.
            // Para evitar duplicados, podríamos clonar el nodo o verificar si ya tiene listener.
            // Sin embargo, dado que 'iniciar' se llama una vez, asumiremos que está bien.
            // Pero mejor aún, adjuntamos el evento al item que actualiza ESPECÍFICAMENTE este toggle.

            item.addEventListener("click", (e) => {
                // Actualizar texto del toggle
                // Guardamos el span de la flecha
                const arrowSpan = toggle.querySelector('.f-abajo-grupo');

                // Actualizamos el texto (esto borra el span si es hijo directo)
                toggle.textContent = item.textContent.trim();

                // Restauramos el span
                if (arrowSpan) {
                    toggle.appendChild(arrowSpan);
                } else {
                    // Si por alguna razón no estaba, lo creamos
                    const span = document.createElement("span");
                    span.className = "f-abajo-grupo";
                    toggle.appendChild(span);
                }
            });
        });
    }
}

export default new GruposInput();
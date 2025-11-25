/**
 * Módulo (13) Permite agregar un dropdown al input-g 
 * de los formularios de bodystyle.
 */
(function () {

    var inicializar = () => {
        // PASO 1: Agregar span a todos los dropdown-toggle
        document.querySelectorAll(".input-g .grupo .dropdown-toggle").forEach(element => {
            const span = document.createElement("span");
            span.className = "f-abajo-grupo";
            element.appendChild(span);
        });

        // PASO 2: Agregar clases a elementos con texto
        document.querySelectorAll(".input-g .grupo .dropdown-toggle").forEach(element => {
            const text = element.textContent.trim();
            if (text !== "" && text !== undefined) {
                element.classList.add("a-ajuste-btn", "combo-box");
            }
        });

        // PASO 3: Configurar eventos de click
        document.querySelectorAll(".combo-box").forEach(comboElement => {
            // Ocultar drop-complemento
            const dropComplemento = document.querySelector(".drop-complemento");
            if (dropComplemento) {
                dropComplemento.style.display = "none";
            }

            // Obtener ID del dropdown asociado
            const idDrop = comboElement.dataset.target;
            if (!idDrop) return;

            // Obtener el dropdown
            const dropElement = document.querySelector(idDrop);
            if (!dropElement) return;

            // Navegar 3 niveles: dropdown > children > children > children
            // Equivalente a: $(idDrop).children().children().children()
            const items = dropElement.querySelectorAll("ul li a, ul li button");

            // Agregar evento click a cada item
            items.forEach(item => {
                item.addEventListener("click", function () {
                    // Buscar el combo-box correspondiente
                    let targetCombobox = null;
                    document.querySelectorAll(".combo-box").forEach(cb => {
                        if (cb.dataset.target === idDrop) {
                            targetCombobox = cb;
                        }
                    });

                    if (targetCombobox) {
                        // Actualizar texto del combobox
                        targetCombobox.textContent = this.textContent;

                        // Reagregar el span a TODOS los dropdown-toggle
                        document.querySelectorAll(".input-g .grupo .dropdown-toggle").forEach(toggle => {
                            const span = document.createElement("span");
                            span.className = "f-abajo-grupo";
                            toggle.appendChild(span);
                        });
                    }
                });
            });
        });
    }

    var GruposInput = {
        iniciar: () => {
            inicializar()
        }
    }

    window.GruposInput = GruposInput
})()

export default GruposInput
/**
 * Módulo: (15) Manejador de los inputs que permite seleccionar un archivo
 * El manejador brida la funcionalizadad necesaria para cargar el path en el elemento 
 * oculto detras de la apariencia del elemento, también controla los campos 
 * requeridos añadiendole el la clase i-error a los campos vacíos.
 */
(function () {
    var inicializar = () => {

        /**
         * Si el input pierde el foco y el campo posee el attr required
         * y está vacío esta función le asignará un borde rojo al input 
         * a través de la clase .i-error.
         */
        document.querySelectorAll(".form-grupo input, .form-group input").forEach((elemento) => {
            elemento.addEventListener("blur", () => {
                // Si el attr required no esta indefinido
                // y el input está vacío se añade la clase
                // i-error.
                if (elemento.getAttribute("required") !== null)
                    if (elemento.value === "")
                        elemento.classList.add("i-error")
            })

            elemento.addEventListener("focus", () => {
                // Cuando se gana el FOCO se reemueve 
                // la clase i-error
                elemento.classList.remove("i-error")
            })
        })


        /**
         * Permite agregar la clase i-error a los 
         * campos de los input-icon cuando el usuario
         * no respeta al attr requerido. 
         */
        document.querySelectorAll(".input-icon input").forEach((input) => {
            // Evento de perdida de foco 
            // aplica los estilos en función al evento foco 
            // y mostrar de esta manera estilos acordes a la situación 
            // que el usuario debe afrontar con este elemento.
            input.addEventListener("blur", () => {
                const parent = input.parentElement
                parent.style.border = "1px solid rgb(163, 163, 163)"

                if (input.value === "") {
                    parent.querySelector(".elemento").style.color = "rgb(131, 131, 131)"
                } else {
                    parent.querySelector(".elemento").style.color = "#212121"
                }

                if (input.getAttribute("required") !== null) {
                    if (input.value === "") {
                        parent.classList.add("i-error")
                    }
                }
            })

            // Reacomoda los estilos cuando el FOCO se gana nuevamente.
            input.addEventListener("focus", () => {
                const parent = input.parentElement
                parent.style.border = "1px solid rgba(135, 217, 255)"
                parent.querySelector(".elemento").style.color = "#212121"
                parent.classList.remove("i-error")
            })
        })
    }


    var archivoSeleccionado = () => {
        // Crea el elemento que permite mostrar la leyenda 
        // Seleccionar archivo ...
        const elemento = document.createElement("span")
        elemento.className = "archivo-seleccionado"
        elemento.textContent = "Seleccionar un archivo ..."

        document.querySelectorAll(".f-label").forEach((label) => {
            label.appendChild(elemento.cloneNode(true))
        })

        document.querySelectorAll(".input-file").forEach((input) => {
            input.addEventListener("change", () => {
                const label = input.parentElement.querySelector(".f-label")
                const archivoSpan = label.querySelector(".archivo-seleccionado")

                if (input.value === "") {
                    archivoSpan.textContent = "Seleccionar un archivo ..."
                    archivoSpan.style.color = "rgb(56, 56, 56)"
                    archivoSpan.style.borderBottom = "1px solid rgb(136, 136, 136)"
                } else {
                    archivoSpan.textContent = input.value
                    archivoSpan.style.color = "rgb(22, 112, 60)"
                    archivoSpan.style.borderBottom = "1px solid rgb(22, 112, 60)"
                }
            })
        })
    }

    var InputHandler = {
        iniciar: () => {
            inicializar()
            archivoSeleccionado()
        }
    }

    window.InputHandler = InputHandler
})()

export default InputHandler
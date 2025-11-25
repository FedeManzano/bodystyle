
import { fadeOut, fadeIn } from "./Animaciones.js"

/**
 * Módulo: (16) Perimte crear una ventana fija dentro del dom 
 * mostrada a partir de un evento click proporcionado por un disparador.
 */
(function () {


    const destroy = () => {
        document.querySelectorAll(".activar-modal").forEach((modal) => {
            modal.removeEventListener("click", clickDisparador)
        })
        document.querySelectorAll(".complemento").forEach((complemento) => {
            complemento.removeEventListener("click", clickComplemento)
        })
    }


    var estadoInicial = () => {
        document.querySelectorAll(".modal-fondo").forEach((modal) => {
            modal.style.opacity = 1

            // Evitamos duplicar el complemento si ya existe
            if (!modal.querySelector(".complemento")) {
                const complemento = document.createElement("div")
                complemento.className = "complemento"
                modal.appendChild(complemento)
            }

            modal.style.display = "none"
        })
    }

    var aparecerModal = () => {
        document.querySelectorAll(".activar-modal").forEach((modal) => {
            modal.addEventListener("click", clickDisparador)
        })
    }

    var desaparecerModal = () => {
        document.querySelectorAll(".complemento").forEach((complemento) => {
            complemento.addEventListener("click", clickComplemento)
        })
    }


    const clickComplemento = (evt) => {
        // Cierra el modal padre del complemento clickeado
        const modal = evt.target.closest(".modal-fondo")
        if (modal) {
            fadeOut(modal, 200)
        }
    }

    const clickDisparador = (evt) => {
        // Usamos currentTarget para asegurar que obtenemos el botón, 
        // incluso si se clickeó un elemento hijo (icono, texto, etc)
        let elemento = evt.currentTarget
        let targetId = elemento.getAttribute("data-target")

        if (targetId) {
            targetId = targetId.replace("#", "")
            const targetModal = document.getElementById(targetId)
            if (targetModal) {
                fadeIn(targetModal)
            }
        }
    }

    var Modal = {
        iniciar: function () {
            estadoInicial()
            aparecerModal()
            desaparecerModal()
        },

        destroy: () => destroy()
    }

    window.Modal = Modal

})()

export default Modal;
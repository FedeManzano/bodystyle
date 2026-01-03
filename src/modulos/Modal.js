
import { fadeOut, fadeIn } from "./Animaciones.js"

/**
 * Módulo: (16) Perimte crear una ventana fija dentro del dom 
 * mostrada a partir de un evento click proporcionado por un disparador.
 * Con mejoras de accesibilidad (WCAG 2.1)
 */
(function () {

    // Almacena el elemento que abrió el modal para retornar el focus
    let elementoActivador = null
    // Stack de modales abiertos para manejar modales anidados
    let modalStack = []

    const destroy = () => {
        document.querySelectorAll(".activar-modal").forEach((modal) => {
            modal.removeEventListener("click", clickDisparador)
        })
        document.querySelectorAll(".complemento").forEach((complemento) => {
            complemento.removeEventListener("click", clickComplemento)
        })
        document.removeEventListener("keydown", handleEscapeKey)
    }


    var estadoInicial = () => {
        document.querySelectorAll(".modal-fondo").forEach((modal) => {
            modal.style.opacity = 1

            // Agregamos atributos ARIA para accesibilidad
            modal.setAttribute("role", "presentation")
            modal.setAttribute("aria-hidden", "true")

            // Evitamos duplicar el complemento si ya existe
            if (!modal.querySelector(".complemento")) {
                const complemento = document.createElement("div")
                complemento.className = "complemento"
                modal.appendChild(complemento)
            }

            // Buscamos el .modal dentro de .modal-fondo y lo configuramos
            const modalContent = modal.querySelector(".modal")
            if (modalContent) {
                // Agregamos atributos de accesibilidad al contenedor del modal
                modalContent.setAttribute("role", "dialog")
                modalContent.setAttribute("aria-modal", "true")

                // Encontramos el título si existe
                const titulo = modalContent.querySelector(".modal-titulo")
                if (titulo && !titulo.id) {
                    titulo.id = `modal-titulo-${Math.random().toString(36).substr(2, 9)}`
                }
                if (titulo) {
                    modalContent.setAttribute("aria-labelledby", titulo.id)
                }

                // Configuramos el botón de cerrar
                const btnCerrar = modalContent.querySelector(".modal-salir")
                if (btnCerrar) {
                    btnCerrar.setAttribute("role", "button")
                    btnCerrar.setAttribute("tabindex", "0")
                    btnCerrar.setAttribute("aria-label", "Cerrar modal")
                    btnCerrar.addEventListener("click", () => cerrarModal(modal))
                    btnCerrar.addEventListener("keydown", (e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault()
                            cerrarModal(modal)
                        }
                    })
                }
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
        // Agregamos listener para la tecla Escape
        document.addEventListener("keydown", handleEscapeKey)
    }

    // Nueva función para manejar la tecla Escape
    const handleEscapeKey = (evt) => {
        if (evt.key === "Escape" && modalStack.length > 0) {
            // Cerramos el último modal abierto
            const ultimoModal = modalStack[modalStack.length - 1]
            cerrarModal(ultimoModal)
        }
    }

    // Nueva función para cerrar modal de forma centralizada
    const cerrarModal = (modal) => {
        fadeOut(modal, 200)
        // Removemos de la pila
        modalStack = modalStack.filter(m => m !== modal)
        // Restauramos el focus al elemento que abrió el modal
        if (elementoActivador && modalStack.length === 0) {
            elementoActivador.focus()
        }
        // Actualizamos aria-hidden
        modal.setAttribute("aria-hidden", "true")
    }


    const clickComplemento = (evt) => {
        // Cierra el modal padre del complemento clickeado
        const modal = evt.target.closest(".modal-fondo")
        if (modal) {
            cerrarModal(modal)
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
                elementoActivador = elemento // Guardamos referencia para restaurar focus
                modalStack.push(targetModal) // Agregamos a la pila
                fadeIn(targetModal)
                // Actualizamos aria-hidden cuando se muestra
                targetModal.setAttribute("aria-hidden", "false")
                // Movemos focus al modal
                const firstFocusable = targetModal.querySelector(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                )
                if (firstFocusable) {
                    setTimeout(() => firstFocusable.focus(), 200) // Espera a que termine la animación
                }
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
import { fadeIn, fadeOut } from './Animaciones'
import ERR from "./GestionErrores"

/**
 * Módulo (17) que controla a la barra de navegación y al sidebar simple
 * Permite mostrar un sidebar que ocupa el foco completo de la pantalla
 * y puede ser utilizada por el usuario hasta el momento que presiona fuera
 * del área del elemento y el sidebar se oculta.
 */
(function () {

    const MODULO = "Error BodyStyle dice: M17"
    /**
     * JSON con que permite controlar toda la barra de navegación
     * junto con el sidebar simple que se mostrará luego de presionar 
     * el botón menu que se encuentra en el NAV.
     */
    let state = {
        "context": "", // ID del nav necesario para poder controlar el elemento
        "open": false, // Guarda el estado del sidebar visible: true, no visible: false
        "classBtnMenu": "btn-menu", // Clase del Botón disparador del evento para mostrar el sidebar
        "widthSidebar": 240, // Ancho del sidebar
        "fixed": "bs-nav-fixed", // Clase para que el NAV tenga un posicionamiento FIJO
        "sidebar": null, // Almacena el ID del Sidebar
        "btnMenu": null, // Almacena el botón de menú disparador del evento
        "complement": "bs-nav-complement", // Clase del complemento, permite ocultar el sidebar
        "complementElement": null, // Complemento elemento del DOM
        "sm": 55, // Altura del nav pequeño SM
        "md": 65, // Altura del nav mediamo MD
        "lg": 75, // Altura del nav grande LG
        "border": 0 // Estado del borde inferior del nav 1:ON 0:OFF
    }

    /**
     * Función que elimina los eventos y borra el botón de menú,
     * elimina el evento resize del de la ventana
     */
    const Destroy = () => {

        if (state.btnMenu) {
            // Retira el evento click del botón de menú
            state.btnMenu.removeEventListener("click", Toggle)

            // Retira las etquetas label dentro del botón que le dan su apariencia
            state.btnMenu.innerHTML = ""
        }

        // Retira el evento resize de la ventana
        window.removeEventListener("resize", Clear)

        // Elimina el evento click del complemento
        if (state.complementElement) {
            state.complementElement.removeEventListener("click", Clear)
            state.complementElement.remove() // También removemos el elemento del DOM
        }
    }

    /**
     * Función de inicialización del nav, que permite disparar un evento 
     * que muestra un sidebar simple complementado al menú principal.
     * @param {id del nav que se utiliza como contexto} id 
     * @param {variable que define si el nav tiene borde inferior} border 
     * @returns void
     */
    const InitialNavigation = (id = null, border = false) => {

        // Validación del ID de contexto
        if (!ERR.contexto.val(id)) {
            // Si el ID no posee el formato adecuado 
            // El módulo no se inicializa
            console.error(MODULO + ERR.contexto.mje)
            return
        }

        /**
         * Solo admite valores true / false
         */
        if (!ERR.bool.val(border)) {
            // El valor booleano es incorrecto
            console.error(MODULO + ERR.bool.mje)
            return
        }

        // Configura el contexto
        state.context = id
        const contextElement = document.querySelector(id)

        if (!contextElement) {
            console.error(MODULO + " El elemento de contexto no existe.")
            return
        }

        // Obtiene el ID del sidevar
        // En jQuery: $(id).data("target")
        // En Vanilla: getAttribute("data-target")
        let targetId = contextElement.getAttribute("data-target")
        if (targetId) targetId = targetId.replace("#", "")

        state.sidebar = document.getElementById(targetId)

        // Si la estructura del nav no es correcta 
        // se produce un error que no permite inicializar el módulo
        if (!state.sidebar || !state.sidebar.classList.contains("bs-nav-sidebar")) {
            console.error(MODULO + "Error en el elemento referenciado por el data-target.")
            return
        }

        // Obtine el OBJETO para gestionarlo
        // $(id).children().children("." + state.classBtnMenu)
        // Buscamos dentro del contexto el botón con la clase
        state.btnMenu = contextElement.querySelector("." + state.classBtnMenu)

        // Si el botón no posee la clase btn-menu
        // el módulo no se inicializa
        if (!state.btnMenu) {
            console.error(MODULO + "El botón de menú no posee la clase .btn-menu.")
            return
        }

        // Cambia el display de sidebar de none a block
        fadeIn(state.sidebar)

        // Añade los laben dentro del .btn-menu para dale la apariencia
        state.btnMenu.innerHTML = "<label></label><label></label><label></label>"

        // Oculta el sidebar fuera de la ventana
        state.sidebar.style.left = `-${state.widthSidebar}px`

        // Si tine borde el elemento toma el valor 1
        // Caso contrario 0
        state.border = border ? 1 : 0

        // Evalua que tipo de nav se está utilizando
        const firstChild = contextElement.firstElementChild

        if (firstChild) {
            if (firstChild.classList.contains("bs-nav-md"))
                state.sidebar.style.top = `${state.md + state.border}px`
            else if (firstChild.classList.contains("bs-nav-sm"))
                state.sidebar.style.top = `${state.sm + state.border}px`
            else if (firstChild.classList.contains("bs-nav-lg"))
                state.sidebar.style.top = `${state.lg + state.border}px`
        }

        // Complemento
        state.complementElement = document.createElement("div")
        state.complementElement.className = state.complement
        state.complementElement.style.display = "none" // Inicialmente oculto

        // Añade al body el complemento
        document.body.appendChild(state.complementElement)

        // Evento click en el menu
        state.btnMenu.addEventListener("click", Toggle)

        // Evento resize de la venta que limpa 
        // e inicializa los estos de los elementos
        window.addEventListener("resize", Clear)

        // Evento click del complemento
        // Inicializa los elementos.
        state.complementElement.addEventListener("click", Clear)
    }

    /**
     * Permite ocultar y mostrar el sidebar 
     * conmutando el esto del mismo.
     */
    const Toggle = () => {
        if (!state.open) {
            fadeIn(state.complementElement)
            state.sidebar.style.left = "0px"
        } else {
            fadeOut(state.complementElement)
            state.sidebar.style.left = `-${state.widthSidebar}px`
        }
        // Cambio de estado cada vez que se presiona
        // el botón de menú
        state.open = !state.open
    }

    /**
     * Inicializa el estado de los elementos
     * Oculta el sidebar y oculta el complemento
     * y configura el state.open en false
     */
    const Clear = () => {
        if (state.complementElement) fadeOut(state.complementElement)
        if (state.sidebar) state.sidebar.style.left = `-${state.widthSidebar}px`
        state.open = false
    }


    let Navigation = {
        Init: (id, border) => InitialNavigation(id, border),
        Destroy: () => Destroy()
    }

    window.Navigation = Navigation
})()



export default Navigation
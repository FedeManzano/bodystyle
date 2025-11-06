import $ from 'jquery'
import ERR from "./GestionErrores"

/**
 * Módulo que controla a la barra de navegación y al sidebar simple
 * Permite mostrar un sidebar que ocupa el foco completo de la pantalla
 * y puede ser utilizada por el usuario hasta el momento que presiona fuera
 * del área del elemento y el sidebar se oculta.
 */
(function() {

    const MODULO = "Módulo-18(NAVIGATION) "
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
        "complementElement": null, // Complemento elemento de JQUERY
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

        // Retira el evento click del botón de menú
        $(state.btnMenu).off()

        // Retira las etquetas label dentro del botón que le dan su apariencia
        $(state.btnMenu).children("label").remove()

        // Retira el evento resize de la ventana
        $(window).on("resize").off()

        // Elimina el evento click del complemento
        $(state.complementElement).on("click").off()
    }

    /**
     * Función de inicialización del nav, que permite disparar un evento 
     * que muestra un sidebar simple complementado al menú principal.
     * @param {id del nav que se utiliza como contexto} id 
     * @param {variable que define si el nav tiene borde inferior} border 
     * @returns void
     */
    const InitialNavigation = (id = null, border = false) => 
    {

        // Validación del ID de contexto
        if(!ERR.contexto.val(id))
        {
            // Si el ID no posee el formato adecuado 
            // El módulo no se inicializa
            console.error(MODULO + ERR.contexto.mje)
            return
        }

        if(!ERR.bool.val(border))
        {
            console.error(MODULO + ERR.bool.mje)
            return
        }
        
        state.context = id
        state.sidebar =  $(id).data("target")
        
        if(!$(state.sidebar).hasClass("bs-nav-sidebar"))
        {
            console.error(MODULO + "Error en el elemento referenciado por el data-target.")
            return
        }

        state.btnMenu = $(id).children().children("." + state.classBtnMenu)

        if(!$(state.btnMenu).hasClass("btn-menu"))
        {
            console.error(MODULO + "El botón de menú no posee la clase .btn-menu.")
            return
        }

        $(state.sidebar).fadeIn()
        $(state.btnMenu).append("<label></label><label></label><label></label>")
        $(state.sidebar).css("left", -state.widthSidebar)

        state.border = border ? 1 : 0
        if( $(state.context).children().hasClass("bs-nav-md"))
            $(state.sidebar).css("top", state.md + state.border)
        else if( $(state.context).children().hasClass("bs-nav-sm"))
            $(state.sidebar).css("top", state.sm + state.border)
        else if($(state.context).children().hasClass("bs-nav-lg"))
            $(state.sidebar).css("top", state.lg + state.border)

        state.complementElement = $(`<div class="${state.complement}"></div>`)
        $("body").append(state.complementElement)

        $(state.btnMenu).on("click", Toggle)

        $(window).on("resize", Clear)

        $(state.complementElement).on("click", Clear)
    }

    const Toggle = () => {
        if (!state.open)
        {
            $(state.complementElement).fadeIn()
            $(state.sidebar).css("left", 0)
        }else 
        {
            $(state.complementElement).fadeOut()
            $(state.sidebar).css("left", -state.widthSidebar)
        }
        state.open = !state.open
    }

    const Clear = () => {
        $(state.complementElement).fadeOut()
        $(state.sidebar).css("left", -state.widthSidebar)
        state.open = false 
    }


    let Navigation = {
        Init: (id, border) => InitialNavigation(id, border),
        Destroy: () => Destroy()
    }

   window.Navigation = Navigation  
})()



export default Navigation
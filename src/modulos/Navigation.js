import $ from 'jquery'
import ERR from "./GestionErrores"

/**
 * Módulo que controla a la barra de navegación y al sidebar simple
 * Permite mostrar un sidebar que ocupa el foco completo de la pantalla
 * y puede ser utilizada por el usuario hasta el momento que presiona fuera
 * del área del elemento y el sidebar se oculta.
 */
(function() {

    /**
     * JSON con que permite controlar toda la barra de navegación
     * junto con el sidebar simple que se mostrará luego de presionar 
     * el botón menu que se encuentra en el NAV.
     */
    let state = {
        "context": "", // ID del nav necesario para poder controlar el elemento
        "open": false, // Guarda el estado del sidebar visible: true, no visible: false
        "classBtnMenu": "btn-menu",
        "widthSidebar": 240,
        "fixed": "bs-nav-fixed",
        "sidebar": null,
        "btnMenu": null,
        "complement": "bs-nav-complement",
        "complementElement": null,
        "sm": 55,
        "md": 65,
        "lg": 75,
        "border": 0
    }

    const InitialNavigation = (id = null, border = false) => 
    {

        if(!ERR.contexto.val(id))
        {
            console.error(ERR.contexto.mje)
            return
        }

        if(!ERR.bool.val(border))
        {
            console.error(ERR.bool.mje)
            return
        }
        
        state.context = id
        state.sidebar =  $(id).data("target")
        
        if(!$(state.sidebar).hasClass("bs-nav-sidebar"))
        {
            console.error("Error en el elemento referenciado por el data-target.")
            return
        }

        state.btnMenu = $(id).children().children("." + state.classBtnMenu)

        if(!$(state.btnMenu).hasClass("btn-menu"))
        {
            console.error("El botón de menú no posee la clase .btn-menu.")
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
        Init: (id, border) => InitialNavigation(id, border)
    }

   window.Navigation = Navigation  
})()



export default Navigation
import $ from 'jquery'
import ERR from "./GestionErrores"

(function() {

    let state = {
        "context": "",
        "open": false,
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

        $(state.btnMenu).on("click", (e) => {
            if ( $(window).width() <= 1030)
            {
                Toggle()
            } else 
            {
                Clear()
            }
        })

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
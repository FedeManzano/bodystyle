import $ from "jquery"


/**
 * Manejador del sidebar drop
 * Bodystyle 5.0.0 
 */
(function(){

    // Configuración Inicial
    const conf = {
        nav: "", // ID DEL NAV
        sidebar: "", // ID DEL SIDEBAR
    }

    let state = false

    const Init = (idNav, idSidebar) => {
        conf.nav = idNav
        conf.sidebar = idSidebar

        show_hide()

        $("body").append("<div class='bs-nav-complement'></div>")

        $(conf.nav + " .bs-nav-md .btn-menu").append("<label></label><label></label><label></label>")

        $(window).on("resize", () => show_hide())

        $(conf.nav + " .bs-nav-md").on("click",".btn-menu", (e) => {
            if(!state)
                show()
            else
                hide()
        })

        $(".bs-nav-complement").on("click", () => hide())
    }

    const show_hide = () => {
        $(".bs-nav-complement").hide()
        if($(window).width() > 1030)
        {
            $(conf.sidebar).css("left", 0)
            state = true
        } else {
            $(conf.sidebar).css("left", -260)
            state = false
        }
    }

    const show = () => {
        if($(window).width() < 1030)
        {
            $(".bs-nav-complement").show()
        }
        $(conf.sidebar).css("left", 0)
        state = true
    }

    const hide = () => {
        if($(window).width() < 1030)
        {
            $(".bs-nav-complement").hide()
        }
        $(conf.sidebar).css("left", -260)
        state = false
    }

    const SidebarHandler = {
        Init: (idNav, idSidebar) => Init(idNav, idSidebar)
    }

    window.SidebarHandler = SidebarHandler
})()

export default SidebarHandler
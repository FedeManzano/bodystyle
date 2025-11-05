import $ from "jquery"

(function(){

    const conf = {
        nav: "",
        sidebar: ""
    }

    let state = false

    const Init = (idNav, idSidebar) => {
        conf.nav = idNav
        conf.sidebar = idSidebar

        show_hide()

        $(conf.nav + " .bs-nav-md .btn-menu").append("<label></label><label></label><label></label>")

        $(window).on("resize", () => show_hide())

        $(conf.nav + " .bs-nav-md").on("click",".btn-menu", (e) => {
            if(!state)
                show()
            else
                hide()
        })

    }

    const show_hide = () => {
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
        $(conf.sidebar).css("left", 0)
        state = true
    }

    const hide = () => {
        $(conf.sidebar).css("left", -260)
        state = false
    }





    const SidebarHandler = {
        Init: (idNav, idSidebar) => Init(idNav, idSidebar)
    }

    window.SidebarHandler = SidebarHandler
})()

export default SidebarHandler
import $ from "jquery"
import ERR from "./Errores"
import SidebarHandler from "./SidebarHandler"

(function() {

    let elements = []
    const arrow_right = `<i class="arrow-right"></i>`
    const arrow_bottom = `<i class="arrow-bottom"></i>`
    const time = 50

    const conf = {
        idSidebar : "SinID",
        idNav: "SinID"
    }


    const Init = ({idNav = "SinID", idSidebar = "SinID", submenu = "n/a"}) => {
    
        if(!ERR.id.validacion.test(idNav))
        {
            console.error(ERR.id.mensaje)
            return
        }

        if(!ERR.id.validacion.test(idSidebar))
        {
            console.error(ERR.id.mensaje)
            return
        }

        conf.idNav = idNav
        conf.idSidebar = idSidebar

        $(idSidebar + " .bs-sidebar-title").each((index, e) => {
            let ele = {
                obj: e,
                state: false,
                target: $(e).data("target")
            }
            elements[index] = ele
        }) 

        $(idSidebar + " .bs-sidebar-title").append(arrow_right)


        if(submenu != "n/a" && submenu !== undefined && submenu !== null)
        {
            if(ERR.id.validacion.test(idSidebar))
            {
                elements.forEach((e) => {
                    if(e.target == submenu)
                    {
                        $(submenu).slideDown(time)
                        $(e.obj).children("i").remove()
                        $(e.obj).append(arrow_bottom)
                        e.state = true
                    }
                })
            }
        }

        SidebarHandler.Init(idNav, idSidebar)

        EventClick()
    }

    const EventClick = () => {
        $(conf.idSidebar + " .bs-sidebar-title").on("click","*", (e) => ToogleLabel(e.target))
        $(conf.idSidebar + " .bs-sidebar-title").on("click", (e) => Toogle(e.target))
    }

    const ToogleLabel = (element) => Toogle($(element).parent())

    const Toogle = (targetElement) => {
        elements.forEach((ele) =>{
            if($(targetElement).data("target") === $(ele.obj).data("target"))
            {
                $(targetElement).children("i").remove()
                if(!ele.state)
                {
                    $(ele.target).slideDown(time)
                    $(targetElement).append(arrow_bottom)
                }
                else 
                {
                    $(ele.target).slideUp(time)
                    $(targetElement).append(arrow_right)
                }
                ele.state = !ele.state
            }
        })
    }


    const SidebarDrop = {
        Init : (conf) => Init(conf)
    }

    window.SidebarDrop = SidebarDrop
})()

export default SidebarDrop;


import $ from "jquery"
import ERR from "./Errores"

(function() {


   let elements = []



    const cantElements = $(".bs-sidebar-title").length
    const conf = {
        idSidebar : "SinID",
        idNav: "SinID"
    }


    const Init = ({idNav = "SinID", idSidebar = "SinID"}) => {
    
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
                if(!ele.state)
                {
                    $(ele.target).slideDown(150)
                }
                else 
                {
                    $(ele.target).slideUp(150)
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


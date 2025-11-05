import $ from "jquery"
import ERR from "./Errores"

(function() {


    let elements = {
        obj: null,
        state: false,
        id: ""
    }

    const cantElements = $(".bs-sidebar-title").length



    const Init = ({idNav = "SinID", idSidebar = "SinID"}) => {
        console.log(idNav + " " + idSidebar)

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
    }


    const SidebarDrop = {
        Init : (conf) => Init(conf)
    }

    window.SidebarDrop = SidebarDrop
})()

export default SidebarDrop;


import { slideUp, slideDown } from './Animaciones'
import ERR from "./Errores"
import SidebarHandler from "./SidebarHandler"

/**
 * Módulo (22) Sidebar con menús desplegables dentro
 * Nueva funcionalidad de bodystyle a partir de 
 * la versión 5.0.0.
 * Migrado a Vanilla JS - Bodystyle 5.8.0
 */
(function () {

    let elements = []
    const arrow_right = `<i class="arrow-right"></i>`
    const arrow_bottom = `<i class="arrow-bottom"></i>`
    const time = 50

    const conf = {
        idSidebar: "SinID",
        idNav: "SinID"
    }


    const Init = ({ idNav = "SinID", idSidebar = "SinID", submenu = "n/a" }) => {

        if (!ERR.id.validacion.test(idNav)) {
            console.error(ERR.id.mensaje)
            return
        }

        if (!ERR.id.validacion.test(idSidebar)) {
            console.error(ERR.id.mensaje)
            return
        }

        conf.idNav = idNav
        conf.idSidebar = idSidebar

        const sidebarTitles = document.querySelectorAll(idSidebar + " .bs-sidebar-title")
        sidebarTitles.forEach((e, index) => {
            let ele = {
                obj: e,
                state: false,
                target: e.dataset.target
            }
            elements[index] = ele
        })

        sidebarTitles.forEach(title => {
            title.insertAdjacentHTML('beforeend', arrow_right)
        })


        if (submenu != "n/a" && submenu !== undefined && submenu !== null) {
            if (ERR.id.validacion.test(submenu)) {
                elements.forEach((e) => {
                    if (e.target == submenu) {
                        const submenuElement = document.querySelector(submenu)
                        if (submenuElement) {
                            slideDown(submenuElement, time)
                            const arrow = e.obj.querySelector("i")
                            if (arrow) arrow.remove()
                            e.obj.insertAdjacentHTML('beforeend', arrow_bottom)
                            e.state = true
                        }
                    }
                })
            }
        }

        SidebarHandler.Init(idNav, idSidebar)

        EventClick()
    }

    const EventClick = () => {
        const sidebarTitles = document.querySelectorAll(conf.idSidebar + " .bs-sidebar-title")
        sidebarTitles.forEach(title => {
            title.addEventListener("click", (e) => {
                // If clicked on a child element, get the parent .bs-sidebar-title
                const targetElement = e.target.closest('.bs-sidebar-title')
                if (targetElement) {
                    Toogle(targetElement)
                }
            })
        })
    }

    const Toogle = (targetElement) => {
        const targetData = targetElement.dataset.target

        elements.forEach((ele) => {
            if (targetData === ele.obj.dataset.target) {
                const arrow = targetElement.querySelector("i")
                if (arrow) arrow.remove()

                const targetEl = document.querySelector(ele.target)

                if (!ele.state) {
                    if (targetEl) slideDown(targetEl, time)
                    targetElement.insertAdjacentHTML('beforeend', arrow_bottom)
                }
                else {
                    if (targetEl) slideUp(targetEl, time)
                    targetElement.insertAdjacentHTML('beforeend', arrow_right)
                }
                ele.state = !ele.state
            }
        })
    }


    const SidebarDrop = {
        Init: (conf) => Init(conf)
    }

    window.SidebarDrop = SidebarDrop
})()

export default SidebarDrop;

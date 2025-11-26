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
            // Insert arrow only if it doesn't exist
            if (!e.querySelector('.arrow-right') && !e.querySelector('.arrow-bottom')) {
                e.insertAdjacentHTML('beforeend', arrow_right)
            }
        })


        if (submenu != "n/a" && submenu !== undefined && submenu !== null) {
            if (ERR.id.validacion.test(submenu)) {
                elements.forEach((e) => {
                    if (e.target == submenu) {
                        const submenuElement = document.querySelector(submenu)
                        if (submenuElement) {
                            slideDown(submenuElement, time)
                            // Remove only arrow icons, not user icons
                            const arrowRight = e.obj.querySelector('.arrow-right')
                            if (arrowRight) arrowRight.remove()
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
                Toogle(e.currentTarget)
            })
        })
    }

    const Toogle = (targetElement) => {

        let idTarget = targetElement.dataset.target



        elements.forEach((ele) => {

            if (ele.obj === targetElement) {
                const submenu = document.querySelector(targetElement.getAttribute("data-target"))
                if (!ele.state) {
                    // Remove arrow-right, add arrow-bottom
                    const arrowRight = targetElement.querySelector('.arrow-right')
                    if (arrowRight) arrowRight.remove()
                    slideDown(submenu, time)
                    targetElement.insertAdjacentHTML('beforeend', arrow_bottom)
                }
                else {
                    // Remove arrow-bottom, add arrow-right
                    const arrowBottom = targetElement.querySelector('.arrow-bottom')
                    if (arrowBottom) arrowBottom.remove()
                    slideUp(submenu, time)
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

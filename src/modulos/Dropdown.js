
import Drop from "dynamics-tips/src/modulos/DropDown"

/**
 * Módulo (12) 
 */
(function () {

   
    const DropDown = {
        iniciar: () => {
            Drop.iniciar()
        },
        destroy: () => {
            Drop.destroy()
        }
    }

    window.DropDown = DropDown
})()

export default DropDown
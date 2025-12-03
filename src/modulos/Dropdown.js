
import Drop from "dytips/src/modulos/DropDown"

/**
 * Módulo (12) Perimite desplegar un listado asociado a un elemento
 * con un conjunto de opciones que le permitirá al usuario diregirse
 * a diferentes lugares.
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
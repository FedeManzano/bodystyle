
import CodigoCss from "@bodystyle/show-code/src/modulos/CodigoCss"

/**
 * Módulo (04) de la dependencia de Bodystyle para colorear el código en lenguaje 
 * CSS dentro las etiquetas PRE de Html.
 * Repositorio: https://github.com/FedeManzano/show-code
 */
(function () {

    const inicializar = (config) => {
        CodigoCss.iniciar(config)
    }

    const Css = {
        iniciar: (config) => {
            inicializar(config)
        }
    }

    window.Css = Css
})()

export default Css




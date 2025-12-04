
import CodigoHtml from "@bodystyle/show-code/src/modulos/CodigoHtml"

/**
 * Módulo (05) de la dependencia de Bodystyle para colorear el código en lenguaje 
 * HTML dentro las etiquetas PRE de Html.
 * Repositorio: https://github.com/FedeManzano/show-code
 */
(function () {

    const inicializar = (config) => {
        CodigoHtml.iniciar(config)
    }

    const Html = {
        iniciar: (config) => {
            inicializar(config)
        }
    }
    window.Html = Html
})()

export default Html



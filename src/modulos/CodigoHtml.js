
import CodigoHtml from "show-sintax/src/modulos/CodigoHtml"

/**
 * Módulo de la dependencia de Bodystyle para colorear el código en lenguaje 
 * HTML dentro las etiquetas PRE de Html.
 * Repositorio: https://github.com/FedericoManzano/show-sintax
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
     


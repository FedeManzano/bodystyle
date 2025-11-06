
import CodigoCss from "show-sintax/src/modulos/CodigoCss"

/**
 * Módulo de la dependencia de Bodystyle para colorear el código en lenguaje 
 * CSS dentro las etiquetas PRE de Html.
 * Repositorio: https://github.com/FedericoManzano/show-sintax
 */
(function() {
   
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

        


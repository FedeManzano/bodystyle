
import CodigoC from "@bodystyle/show-code/src/modulos/CodigoC"

/**
 * Módulo (03) de la dependencia de Bodystyle para colorear el código en lenguaje 
 * C dentro las etiquetas PRE de Html.
 * Repositorio: https://github.com/FedeManzano/show-code
 */
(function () {

    const inicializar = (config) => CodigoC.iniciar(config)

    const C = {
        iniciar: (config) => inicializar(config)
    }

    window.C = C
})()

export default C

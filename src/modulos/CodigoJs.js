import CodigoJs from "@bodystyle/show-code/src/modulos/CodigoJs"

/**
 * Módulo (07) de la dependencia de Bodystyle para colorear el código en lenguaje 
 * JS dentro las etiquetas PRE de Html.
 * Repositorio: https://github.com/FedeManzano/show-code
 */
(function () {

    const inicializar = (config) => {
        CodigoJs.iniciar(config)
    }


    const Js = {
        iniciar: (config) => {
            inicializar(config)
        }
    }

    window.Js = Js
})()

export default Js




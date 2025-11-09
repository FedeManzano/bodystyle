import CodigoJs from "show-sintax/src/modulos/CodigoJs"

/**
 * Módulo (07) de la dependencia de Bodystyle para colorear el código en lenguaje 
 * JS dentro las etiquetas PRE de Html.
 * Repositorio: https://github.com/FedericoManzano/show-sintax
 */
(function() {

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

        


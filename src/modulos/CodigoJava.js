
import CodigoJava from "show-sintax/src/modulos/CodigoJava"

/**
 * Módulo de la dependencia de Bodystyle para colorear el código en lenguaje 
 * JAVA dentro las etiquetas PRE de Html.
 * Repositorio: https://github.com/FedericoManzano/show-sintax
 */
(function () {

    const inicializar = (config) => {
        CodigoJava.iniciar(config)
    }

    const Java = {
        iniciar: (config) => {
            inicializar(config)
        }
    }
    window.Java = Java
})()

export default Java
     
import Ts from "dynamics-tips/src/modulos/Toast"

/**
 * Módulo (25) Permite desplegar un comentario 
 * descriptivo asociado a un elemento y permitirle al
 * usuario orientarse respecto al contenido de la página.
 */
(function(){

    var toast = (config) => {
        Ts.toast(config)
    }

    const Toast = {
        ejecutar: (config) => toast(config)
    }

    window.Toast = Toast;
})()

export default Toast;
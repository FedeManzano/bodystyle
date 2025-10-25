import Ts from "dynamics-tips/src/modulos/Toast"


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
import Tips from "dynamics-tips/src/modulos/ToolTips"

/**
 * Módulo (26) Permite desplegar un comentario 
 * descriptivo asociado a un elemento y permitirle al
 * usuario orientarse respecto al contenido de la página.
 */
(function(){

    var ToolTips = {
        iniciar: () => {
            Tips.iniciar()
        },
        destroy: () => Tips.destroy()
    }

    window.ToolTips = ToolTips;
})()

export default ToolTips;
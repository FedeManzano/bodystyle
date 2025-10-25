import Tips from "dynamics-tips/src/modulos/ToolTips"

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
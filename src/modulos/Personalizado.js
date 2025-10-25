import Per from "dynamics-tips/src/modulos/Personalizado";


(function(){

    const inicializar = (config) => {
        Per.iniciar(config)
    }

    const Personalizado = {
        iniciar: (config) => inicializar(config),
        destroy: () => Per.destroy()
    }

    window.Personalizado = Personalizado
})()

export default Personalizado
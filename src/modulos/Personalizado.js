import Per from "dytips/src/modulos/Personalizado";

/**
 * Módulo (19) Permite desplegar un elemento dinámico personalizado y 
 * descriptivo asociado a un elemento y permitirle al
 * usuario orientarse respecto al contenido de la página.
 */
(function () {

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
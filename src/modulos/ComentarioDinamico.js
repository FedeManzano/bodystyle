import Comentario from "dytips/src/modulos/ComentariosDinamicos"

/**
 * Módulo (10) Permite desplegar un comentario 
 * descriptivo asociado a un elemento y permitirle al
 * usuario orientarse respecto al contenido de la página.
 */
(function () {

    const ComentarioDinamico = {
        iniciar: () => Comentario.iniciar(),
        destroy: () => Comentario.destroy()
    }

    window.ComentarioDinamico = ComentarioDinamico
})()

export default ComentarioDinamico
import Comentario from "dynamics-tips/src/modulos/ComentariosDinamicos"

(function(){

    const ComentarioDinamico = {
        iniciar: () => Comentario.iniciar(),
        destroy: () => Comentario.destroy()
    }

    window.ComentarioDinamico = ComentarioDinamico
})()

export default ComentarioDinamico
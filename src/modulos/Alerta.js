
/**
 * Módulo (01) de Bodystyle que permite cerrar una alerta
 * De manera tal de bridarle al usuario la posibilidad 
 * de desaparecer este elemento cuando no lo necesite.
 */
(function () {


    const Time = 300;

    /**
     * Función que permite cerrar una alerta
     */
    const eventoClick = (evt) => {

        /**
         * @description 
         * Obtine el elemento actual proveniente del foreach
         * desde donde se origina el evento click
         */
        let elemento = evt.currentTarget;

        elemento.animate([
            { opacity: 1 },
            { opacity: 0 }
        ], {
            duration: 500,
            easing: "ease-in-out",
            fill: "forwards"
        });
        setTimeout(() => {
            elemento.remove();
        }, Time);
    }

    /**
     * @description
     * Función que permite cerrar una alerta
     */
    const cerrar = () => {
        document.querySelectorAll(".alerta-cerrar, .alert-close").forEach(alerta => {
            alerta.addEventListener("click", eventoClick);
        });
    }

    /**
     * @description
     * Función que permite remover los eventos de la alerta
     */
    const destroy = () => {
        document.querySelectorAll(".alerta-cerrar, .alert-close").forEach(alerta => {
            alerta.removeEventListener("click", eventoClick);
        });
    }

    var Alerta = {
        iniciar: function () {
            cerrar();
        },
        destroy: function () {
            destroy();
        }
    }

    window.Alerta = Alerta
})()

export default window.Alerta;
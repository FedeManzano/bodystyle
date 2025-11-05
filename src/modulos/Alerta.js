import $ from 'jquery'
/**
 * Módulo de Bodystyle que permite cerrar una alerta
 * De manera tal de bridarle al usuario la posibilidad 
 * de desaparecer este elemento cuando no lo necesite.
 */
(function() {

    var cerrar = () => {
        $(".alerta-cerrar, .alert-close").on("click", () => {
            $(this).hide(300);
        })
    }
    var Alerta = {
        iniciar: function() {
            cerrar ();
        } 
    }

    window.Alerta = Alerta
})()

export default Alerta;
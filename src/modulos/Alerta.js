import $ from 'jquery'

(function() {

    var cerrar = () => {
        $(".alerta-cerrar").click(function() {
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
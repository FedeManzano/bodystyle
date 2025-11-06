import $ from 'jquery'

/**
 * Botoón que permite volver al inició de la 
 * página (scroll top = 0) desde cualquier lugar 
 * hacia el inicio.
 */
(function(){

    const conf = {
        show_hide: 200, // Tiempo en tarda en aparecer y desaparecer
        scroll: 300, // Tiempo que tarda en llevar el scroll a 0
        limit: 100 // A partir de que nivel del scroll se mostrará el botón
    }

    // Objeto de Jquery que va a contener 
    // el botón junto con los estilos asociados
    var boton = null;


    // Elmina todos los eventos asociados
    // Permite limpiar el buffer de eventos
    const destroy = () => {
        $(boton).off()
        $(boton).remove()
    }

    /**
     * Función que permite inicializar el módulo del botón
     */
    var inicializar = ()=> {

        // El elemento es un div con la clase .boton-inicio
        boton = $("<div class='boton-inicio'></div>")
        $(boton).hide() // Oculta el elemnto

        // Se carga el botón al body
        $("body").append(boton)
    }

    var scroll = () => {

        // Evento scroll del evento 
        // de la ventana cuando supera 
        // a 100px se muestra el botón
        $(window).on("scroll", (e) => {
            if($(e.target).scrollTop() > conf.limit){
                $(boton).show(conf.show_hide) 
            }else {
                $(boton).hide(conf.show_hide)
            }
        })
    }

    /**
     * Permite que cuando se hace click al botón
     * llevar el scroll de la venta  a 0
     */
    var activar = () => {
        $(boton).on("click", () => {
            $("html, body").animate({
                scrollTop: 0
            }, conf.scroll)
         
        })
    }
    var BotonInicio =  {
        iniciar: ()=> {
            inicializar()
            scroll()
            activar()
        },

        destroy: () => destroy()
    }
    // Se carga el elemento en la ventana
    window.BotonInicio = BotonInicio
})()

// Exporta el elemento 
// Se lo inicializa en el archivo app.js
export default BotonInicio
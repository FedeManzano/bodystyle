import $ from 'jquery'
/**
 * Módulo (18) Permite establecer el efecto paralax
 * en las imágenes seleccionadas.
 */
(function(){

    var inicializar = () => {
        $(".paralax-contenedor img").css("opacity", 0)
        $(".paralax-contenedor").each(function(e, i){
            var ruta = $(this).children(".paralax").attr("src")
            $(this).css("background-image", "url("+ ruta +")")
            $(this).css("background-attachment", "fixed")
        })
    }

    var Paralax = {
        iniciar: () => inicializar()
    }

    window.Paralax = Paralax
})()


export default Paralax
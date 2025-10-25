import $ from 'jquery'

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
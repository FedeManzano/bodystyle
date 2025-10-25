import $ from 'jquery'
import ERR from "./Errores"


(function() {

    var c = {}
    var cantidad = $(".scroll-item").length;
    var ids = new Array(cantidad)


    const destroy = () => {
        $(".lista-scroll ul li").off()
    }


    const validarListaScroll = ( 
        modulo, 
        ancho, 
        tamFuente, 
        colorBorde, 
        alturaBorde, 
        separacion, 
        colorSeleccionado, 
        colorNoSeleccionado 
    ) => {


        if(!ERR.positivos.validacion(ancho)){
            console.error(modulo + ERR.positivos.mensaje)
            return false
        }

        if(!ERR.positivos.validacion(tamFuente)){
            console.error(modulo + ERR.positivos.mensaje)
            return false
        }


        if(!ERR.clasesColorFondo.validacion.test(colorBorde)){
            console.error(modulo + ERR.clasesColorFondo.mensaje)
            return false
        }

        if(!ERR.positivos.validacion(alturaBorde)){
            console.error(modulo + ERR.positivos.mensaje)
            return false
        }

        if(!ERR.positivos.validacion(separacion)){
            console.error(modulo + ERR.separacion.mensaje)
            return false
        }

        if(!ERR.hexadecimal.validacion.test(colorSeleccionado)){
            console.error(modulo + ERR.hexadecimal.mensaje)
            return false
        }

        if(!ERR.hexadecimal.validacion.test(colorNoSeleccionado)){
            console.error(modulo + ERR.hexadecimal.mensaje)
            return false
        }

        return true
    }



    var inicializarIds = 
    ({
        ancho = 15, 
        tamFuente = 18, 
        colorBorde = "fd-azul-c",
        alturaBorde = 30, 
        separacion = 120, 
        colorSeleccionado = "#000", 
        colorNoSeleccionado = "#666"
    } = {}) => {


    const MODULO = "Error BodyStyle dice: M21" 
    if(!validarListaScroll(MODULO, ancho, tamFuente, colorBorde, alturaBorde, separacion, colorSeleccionado, colorNoSeleccionado)) {
        return 
    }



        for(var i = 0; i < cantidad; i++){
            ids[i] = $(".scroll-item:nth-child("+ (i + 1) +")").attr("id") 
        }


        c.ancho = ancho
        c.tamFuente = tamFuente
        c.colorBorde = colorBorde
        c.alturaBorde = alturaBorde
        c.separacion = separacion
        c.colorSeleccionado = colorSeleccionado
        c.colorNoSeleccionado = colorNoSeleccionado



        $(".lista-scroll").css("width", c.ancho + "%")
        $(".lista-scroll ul li a").css("font-size", c.tamFuente)
        $(".elemento-seleccionado").addClass(c.colorBorde)
        $(".lista-scroll").css("top", c.separacion)


        seleccionarIndice(1)
    } 

    const eventoScroll = (e) => {
        for(var i = 0; i < cantidad; i++){
            if($(e.target).scrollTop() >= $("#" + ids[i]).offset().top - 200){
                seleccionarIndice(i + 1)
            }
        }
    }

    var seleccionarIndice = (indice)=> {
        $(".elemento-seleccionado").remove()
        $(".lista-scroll ul li a").css("color", c.colorNoSeleccionado)
        var elem = $("<p class='elemento-seleccionado " + c.colorBorde + "'></p>")
        elem.css("height", c.alturaBorde)
        $(".lista-scroll ul li:nth-child("+  indice + ") a")
            .before(elem);
        $(".lista-scroll ul li:nth-child("+ indice + ") a").css("color", c.colorSeleccionado)
    }

    var inicializar = () => {
        $(window).scroll(eventoScroll)
    }

    var seleccionar = () => {
        $(".lista-scroll ul li").click(function() {
            $(".lista-scroll ul li a").css("color", c.colorNoSeleccionado)
            $(".elemento-seleccionado").remove()
            var elem = $("<p class='elemento-seleccionado " + c.colorBorde + "'></p>")
            elem.css("height", c.alturaBorde)
            $(this).children("a").before(elem);
            $(this).children("a").css("color", c.colorSeleccionado)
        })
    }

    var ScrollSpy = {
        iniciar: (config) => {
            inicializarIds(config)
            inicializar()
            seleccionar()
            
        },

        destroy: () => destroy()
    }
    window.ScrollSpy = ScrollSpy;
})()

export default ScrollSpy;
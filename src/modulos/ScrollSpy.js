import $ from 'jquery'
import ERR from "./Errores"

/**
 * Módulo (21) Elemento que sirve como guia para el usuario
 * de manera tal que el usuario conozca en cada momento 
 * el lugar de la página en la cual se encuentra. 
 */
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



        $(".scroll-item").each( (index, element) => {
            if($(element).attr("id") !== null && $(element).attr("id") !== undefined )
                ids[index]= $(element).attr("id")
        })


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

        eventoScroll(null)
    } 

    const eventoScroll = (el) => {

        ids.forEach((e) => {
            if($(window).scrollTop() >= $("#" + e).offset().top - 200)
            {
                seleccionarIndice(ids.indexOf(e) + 1)
            }
        })
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
        $(window).scroll((e) => eventoScroll(e))
    }

    var ScrollSpy = {
        iniciar: (config) => {
            inicializarIds(config)
            inicializar()
        },

        destroy: () => destroy()
    }
    window.ScrollSpy = ScrollSpy;
})()

export default ScrollSpy;
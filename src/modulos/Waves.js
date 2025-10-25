

import $ from 'jquery'
import ERR from "./GestionErrores"

(function(){
    const efecto = () => {
        $(".waves").click(function(e){
            var color = $(e.target).data("color")
            var boton = $(e.target)
            var elemento = $("<span class='efecto-waves'></span>")
            if(color !== undefined && color !== "") {
                if(!ERR.fondo.val(color)) {
                    console.error("(WAVES)" + ERR.fondo.mje + " Revise el attr data-color='fd-[color]'")
                    return
                }
                $(elemento).addClass(color)
            }

        
            $(elemento).css({
                width: 10,
                height: 10,
                left: e.offsetX,
                top: e.offsetY
            }).appendTo(boton).animate({
                width: 200,
                height: 200,
                opacity: 0
            }, 500, function(){
                $(elemento).remove()
            })
        })
    }

    var Waves = {
        iniciar: function(){
            efecto()
        }
    }
    window.Waves = Waves
})()

export default Waves
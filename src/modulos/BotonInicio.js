import $ from 'jquery'

(function(){
    var boton = null;


    const destroy = () => {
        $(boton).off()
    }
    var inicializar = ()=> {
        boton = $("<div class='boton-inicio'></div>")
        $(boton).hide()
        $("body").append(boton)
    }

    var scroll = () => {
        $(window).scroll(function(){
            if($(this).scrollTop() > 100){
                $(boton).show(200) 
            }else {
                $(boton).hide(200)
            }
        })
    }


    var activar = () => {
        $(boton).click(function(){
     
            $("html, body").animate({
                scrollTop: 0
            }, 300)
         
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
    window.BotonInicio = BotonInicio
})()

export default BotonInicio
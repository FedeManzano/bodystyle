
import $ from 'jquery'

(function(){


    const destroy = () => {
        $(".activar-modal").off()
        $(".complemento").off()
    }


    var estadoInicial = () => {
        $(".modal-fondo").css("opacity", 1)
        $(".modal-fondo").append("<div class='complemento'></div>")
        $(".modal-fondo").hide()
    }

    var aparecerModal = ()=> {
        $(".activar-modal").click(function(){
            $($(this).data("target")).fadeIn()
        })
    }

    var desaparecerModal = ()=> {
        $(".complemento").click(function(){
            $(".modal-fondo").fadeOut(200)
        })
    }

    var Modal = {
        iniciar: function(conf){
            estadoInicial(conf)
            aparecerModal()
            desaparecerModal()
        },

        destroy: () => destroy()
    }

    window.Modal = Modal

})()

export default Modal;
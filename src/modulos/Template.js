import $ from 'jquery'

(function(){

    var destroy = () => {
        $(".tem-input input").off()
        $(".tem-input select").off()
    }
    var inicializar = () => {
        $(".tem-input select").parent().children("label").css("top", 5)
        $(".tem-input select").parent().children("label").css("font-size", 10)
        $(".tem-input select").parent().append("<span class='flechas'></span>")
        
    }

    var focus = () => {
        $(".tem-input input").focus((e)=> {
            $(e.target).parent().css("border", "2px solid #1B94FF ")
            $(e.target).parent().children("label").css("top", 5)
            $(e.target).parent().children("label").css("font-size", 10)
            $(e.target).css("top", "calc(50% - 10px)")
        })

        $(".tem-input select").focus((e)=> {
            $(e.target).parent().css("border", "2px solid #1B94FF ")
        })

        $(".tem-input input").blur((e)=> {
            $(e.target).parent().css("border", "1px solid rgba(0, 0, 0, 0.171)")
            if($(e.target).val() === ""){
                $(e.target).parent().children("label").css("top", "calc(50% - 9px)")
                $(e.target).parent().children("label").css("font-size", 15)
                $(e.target).css("top", "calc(50% - 10px)")
            }
        })

        $(".tem-input select").blur((e)=> {
            $(e.target).parent().css("border", "1px solid rgba(0, 0, 0, 0.171)")
        })
    }


    var Template = {
        iniciar : () => {
            inicializar()
            focus()
        },

        destroy: ()=> destroy()
    }

    window.Template = Template
})()

export default Template
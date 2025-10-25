import $ from "jquery"

(function(){
    var inicializar = () => {

        var elemento = $("<span class='archivo-seleccionado'>Seleccionar un archivo ...</span>")
        $(".f-label").append(elemento)

        $(".form-grupo input").each(function(){
            $(this).blur(function(){
                if($(this).attr("required") !== undefined)
                    if($(this).val() === "")
                        $(this).addClass("i-error")
            })

            $(this).focus(function(){
                $(this).removeClass("i-error")
            })
        })

        $(".tem-input input").each(function(){
            $(this).blur(function(){
                if($(this).attr("required") !== undefined)
                    if($(this).val() === "")
                        $(this).parent(".tem-input").addClass("tem-error")
            })

            $(this).focus(function(){
                $(this).parent(".tem-input").removeClass("tem-error")
            })
        })

        $(".input-icon input").each(function(){
            
            $(this).blur(function(){
                $(this).parent().css("border", "1px solid rgb(163, 163, 163)")
                    if($(this).val() === "")
                        $(this).parent().children(".elemento").css("color", "rgb(131, 131, 131)")
                    else 
                         $(this).parent().children(".elemento").css("color", "#212121")
                if($(this).attr("required") !== undefined){
                    if($(this).val() === "")
                        $(this).parent(".input-icon").addClass("i-error")
                }
            })

            $(this).focus(function(){
                
                $(this).parent().css("border", "1px solid rgba(135, 217, 255)")
                $(this).parent().children(".elemento").css("color", "#212121")
                $(this).parent(".input-icon").removeClass("i-error")
            })
        })
    }


    var archivoSeleccionado = () => {
        $(".input-file").change(function() {
            var texto = $(this).val()

            if(texto === ""){
                $(this).siblings(".f-label").children(".archivo-seleccionado").text("Seleccionar un archivo ...")
                $(this).siblings(".f-label").children(".archivo-seleccionado").css("color", "rgb(56, 56, 56)")
                $(this).siblings(".f-label").children(".archivo-seleccionado").css("border-bottom", "1px solid rgb(136, 136, 136)")
            }else {
                $(this).siblings(".f-label").children(".archivo-seleccionado").text(texto)
                $(this).siblings(".f-label").children(".archivo-seleccionado").css("color", "rgb(22, 112, 60)")
                $(this).siblings(".f-label").children(".archivo-seleccionado").css("border-bottom", "1px solid rgb(22, 112, 60)")
            }
            
        })
    }

    var InputHandler = {
        iniciar: () => {
            inicializar()
            archivoSeleccionado()
        }
    }

    window.InputHandler = InputHandler
})()

export default InputHandler
import $ from "jquery"

/**
 * Módulo: (15) Manejador de los inputs que permite seleccionar un archivo
 * El manejador brida la funcionalizadad necesaria para cargar el path en el elemento 
 * oculto detras de la apariencia del elemento, también controla los campos 
 * requeridos añadiendole el la clase i-error a los campos vacíos.
 */
(function(){
    var inicializar = () => {

        /**
         * Si el input pierde el foco y el campo posee el attr required
         * y está vacío esta función le asignará un borde rojo al input 
         * a través de la clase .i-error.
         */
        $(".form-grupo input").each(function(){

            // Evento asociado a la perdida del FOCO
            $(this).blur(function(){
                // Si el attr required no esta indefinido
                // y el input está vacío se añade la clase
                // i-error.
                if($(this).attr("required") !== undefined)
                    if($(this).val() === "")
                        $(this).addClass("i-error")
            })

            // Cuando se gana el FOCO se reemueve 
            // la clase i-error
            $(this).focus(function(){
                $(this).removeClass("i-error")
            })
        })


        /**
         * Permite agregar la clase i-error a los 
         * campos de los input-icon cuando el usuario
         * no respeta al attr requerido. 
         */
        $(".input-icon input").each(function(){

            // Evento de perdida de foco 
            // aplica los estilos en función al evento foco 
            // y mostrar de esta manera estilos acordes a la situación 
            // que el usuario debe afrontar con este elemento.
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
            // Reacomoda los estilos cuando el FOCO se gana nuevamente.
            $(this).focus(function(){
                
                $(this).parent().css("border", "1px solid rgba(135, 217, 255)")
                $(this).parent().children(".elemento").css("color", "#212121")
                $(this).parent(".input-icon").removeClass("i-error")
            })
        })
    }


    var archivoSeleccionado = () => {
        /// Crea el elemento que permite mostrar la leyenda 
        /// Seleccionar archivo ...
        var elemento = $("<span class='archivo-seleccionado'>Seleccionar un archivo ...</span>")
        $(".f-label").append(elemento)
        
        $(".input-file").change(function() {
            if($(this).val() === ""){
                $(this).siblings(".f-label").children(".archivo-seleccionado").text("Seleccionar un archivo ...")
                $(this).siblings(".f-label").children(".archivo-seleccionado").css("color", "rgb(56, 56, 56)")
                $(this).siblings(".f-label").children(".archivo-seleccionado").css("border-bottom", "1px solid rgb(136, 136, 136)")
            }else {
                $(this).siblings(".f-label").children(".archivo-seleccionado").text($(this).val())
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
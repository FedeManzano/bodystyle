import $ from "jquery"
import ERR from "./Errores"

class Select {

    destroy(contexto) {
        $(contexto).off()
        $(contexto + " .lista ul li").off()
    }

    inicializar(contexto, efecto){
        const MODULO = "Error BodyStyle dice: M20"
      
        if(!ERR.id.validacion.test(contexto)) {
            console.error(MODULO + ERR.id.mensaje)
            return
        }

        var opciones = $(contexto + " select option")
        var visible = false


        $(contexto).append("<span class='seleccionado'></span>")
        $(contexto + " .seleccionado").text($(opciones[0]).text())
        if($(opciones[0]).hasClass("inactivo")) {
            $(contexto + " .seleccionado").addClass("inactivo")
        }

        
        $(contexto).append("<div class='lista'><ul></ul></div>")
        $(opciones).each(function(){
            if(!$(this).hasClass("inactivo")){
                $(contexto).children(".lista")
                    .children("ul").append(
                            `<li class=${efecto}>
                                <option> ${$(this).text()}</option>
                            </li>`
                    )
            }
        })

        $(contexto + " .lista ul li").click(function(){
            $(contexto + " .seleccionado").removeClass("inactivo")
            var ind =  ($(this).index() + 1).toString()
            $(contexto + " select option").attr("selected", false)
            $(contexto + " select option[value=" + ind +"]").attr("selected", true)
            $(contexto + " .seleccionado").text($(this).children("option").text())

        })

        $(contexto).click(function(){
            
            if(visible === false){
                $(contexto).children("div").slideDown(300)
                $(this).css("border" , "1px solid rgba(135, 217, 255)")
                visible = true
            }
            else{
                $(contexto).children("div").slideUp(300)
                $(this).css("border" , "1px solid rgb(207, 207, 207)")
                visible = false
            }
        })
    }

    iniciar(contexto, hover = "none") {

        switch(hover){
            case "none": 
                this.inicializar(contexto, "none")
            break;
            case "borde":
                this.inicializar(contexto, "e-borde-izq-verde-5")
             break;
            case "fondo": 
                this.inicializar(contexto, "hover")
            break;
            default: 
                const MODULO = "Error BodyStyle dice: M20"
                console.error(MODULO + ERR.hover.mensaje)
        }
    }
}

export default Select
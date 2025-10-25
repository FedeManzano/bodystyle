import $ from 'jquery'
import ERR from "./Errores"

class EfectoHoverBorde {


    validarConfig(contexto, posicion, color){

        const MODULO = "Error BodyStyle dice: M09"


        if(!ERR.id.validacion.test(contexto)){
            console.error(MODULO + ERR.id.mensaje)
            return false
        }

        if(!ERR.clasesColorFondo.validacion.test(color)){
            console.error(MODULO + ERR.clasesColorFondo.mensaje)
            return false
        }


        if(!ERR.posicion.validacion(posicion)){
            console.error(MODULO + ERR.posicion.mensaje)
            return false
        }

        return true
    }

    iniciar(
        {contexto = "vacio", posicion="izquierda",color= "fd-rojo"} = {}
    ){

        if(!this.validarConfig(contexto, posicion, color))
            return

        var borde = $("<span></span>")
        $(contexto).append(borde)
        $(borde).addClass(color)

        switch(posicion){
            case "izquierda":
                $(borde).addClass("borde-izq")
            break;
            case "derecha":
                $(borde).addClass("borde-der")
            break;
            case "arriba":
                $(borde).addClass("borde-arr")
            break;
            case "abajo":
                $(borde).addClass("borde-aba")
            break;

        }
    }
}


export default EfectoHoverBorde
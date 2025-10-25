import $ from "jquery"
import ERR from "./Errores"

(function(){

    var inicializar = () => {
        $(".con-simbolo").each(function(){
            var tipo = $($(this)).data("tipo")
            var posicion = $($(this)).data("posicion")
            var texto = $($(this)).data("texto")
            var etiqueta = $("<label></label>")
            $(etiqueta).addClass(tipo)
            $(etiqueta).addClass(posicion)
            $(etiqueta).text(texto)
            $(this).append(etiqueta)
        })
    }

    var Contenedores = {
        iniciar: ()=> {
            inicializar()
        }
    }
    window.Contenedores = Contenedores
})()

export default Contenedores
import $ from 'jquery'
import ERR from './Errores'

class ColeccionFlotante {


    destroy (contexto) {
        $(contexto + " .lista-float-der .cerrar").off()
        $(contexto + " .lista-float-der .abrir").off()
        $(contexto + " .lista-float-izq .cerrar").off()
        $(contexto + " .lista-float-izq .abrir").off()
    }


    inicializarElemento(c){

        $(c.contexto + " .lista-float-der").css("top", c.altura)
        $(c.contexto + " .lista-float-izq").css("top", c.altura)

        $(c.contexto + " .lista-float-der .cerrar").show()
        $(c.contexto + " .lista-float-der .abrir").hide()

        $(c.contexto + " .lista-float-izq .cerrar").show()
        $(c.contexto + " .lista-float-izq .abrir").hide()


        $(c.contexto + " .lista-float-der .lista-item").addClass(c.fondoItem)
        $(c.contexto + " .lista-float-izq .lista-item").addClass(c.fondoItem)

        $(c.contexto + " .lista-float-der .lista-item *").addClass(c.colorTexto)
        $(c.contexto + " .lista-float-izq .lista-item *").addClass(c.colorTexto)


        $(c.contexto + " .lista-float-der .cerrar").click(function(){
            $(this).parent().css("right", "-230px")
            $(this).hide()
            $(c.contexto + " .lista-float-der .abrir").show()
        })

        $(c.contexto + " .lista-float-der .abrir").click(function(){
            $(this).parent().css("right", 0)
            $(this).hide()
            $(c.contexto + " .lista-float-der .cerrar").show()
        })


        $(c.contexto + " .lista-float-izq .cerrar").click(function(){
            $(this).parent().css("left", "-230px")
            $(this).hide()
            $(c.contexto + " .lista-float-izq .abrir").show()
        })

        $(c.contexto + " .lista-float-izq .abrir").click(function(){
            $(this).parent().css("left", 0)
            $(this).hide()
            $(c.contexto + " .lista-float-izq .cerrar").show()
        })
    }

    validarColeecion(c) {
        const MODULO = "Error BodyStyle dice: M05"
        if(!ERR.id.validacion.test(c.contexto)){
            console.error(MODULO + ERR.id.mensaje)
            return false
        }


        if(!ERR.clasesColorFondo.validacion.test(c.fondoItem)){
            console.error(MODULO + ERR.clasesColorFondo.mensaje)
            return false
        }


        if(!ERR.clasesColorTexto.validacion.test(c.colorTexto)){
            console.error(MODULO + ERR.clasesColorTexto.mensaje)
            return false
        }

        if(!ERR.positivos.validacion(c.altura)){
            console.error(MODULO + ERR.positivos.mensaje)
            return false
        }

        return true
    }


    iniciar({contexto="vacio", fondoItem="fd-gris-az-o", colorTexto="c-blanco", altura = 100} = {}) {

        var c = {
            contexto,
            fondoItem,
            colorTexto,
            altura
        }
        if(!this.validarColeecion(c))
            return
            
        this.inicializarElemento(c)
    }
}

export default ColeccionFlotante
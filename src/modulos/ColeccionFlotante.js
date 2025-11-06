import $ from 'jquery'
import ERR from './Errores'

/**
 * Clase que permite la gestión de las colecciones flotantes
 * generando un conjunto de enlaces que pueden ser utilizados 
 * con diferentes propositos en función de las necesidades del
 * desarrollador.
 */
class ColeccionFlotante {


    /**
     * En poryectos web dinámicos es necesario en muchas oportunidades 
     * desvincular los eventos asociados a los elementos, en este caso 
     * limpia el buffer de eventos.
     * @param {ID de la colección que permite gestionar su lógica} contexto 
     */
    destroy (contexto) {
        $(contexto + " .lista-float-der .cerrar").off()
        $(contexto + " .lista-float-der .abrir").off()
        $(contexto + " .lista-float-izq .cerrar").off()
        $(contexto + " .lista-float-izq .abrir").off()
    }

    /**
     * Este método permite cargar la configuración 
     * de los elementos que conforman la colección
     * @param {JSON de Configuración de la lista} c 
     */
    inicializarElemento(c){

        // Configuración de la propiedad TOP
        // Distancia entre la lista y el inicio de la página
        $(c.contexto + " .lista-float-der").css("top", c.altura)
        $(c.contexto + " .lista-float-izq").css("top", c.altura)

        // Configurar la visibilidad del botón para mostrar
        // o ocultar la lista en lista flotantes que se 
        // encuentran a la derecha.
        $(c.contexto + " .lista-float-der .cerrar").show()
        $(c.contexto + " .lista-float-der .abrir").hide()

        // Configurar la visibilidad del botón para mostrar
        // o ocultar la lista en lista flotantes que se 
        // encuentran a la derecha.
        $(c.contexto + " .lista-float-izq .cerrar").show()
        $(c.contexto + " .lista-float-izq .abrir").hide()

        /// Configuración del color de fondo de la lista
        $(c.contexto + " .lista-float-der .lista-item").addClass(c.fondoItem)
        $(c.contexto + " .lista-float-izq .lista-item").addClass(c.fondoItem)

        // Configuración del color del texto de los elementos internos de la lista
        $(c.contexto + " .lista-float-der .lista-item *").addClass(c.colorTexto)
        $(c.contexto + " .lista-float-izq .lista-item *").addClass(c.colorTexto)


        /**
         * evento click para el botón que oculta la lista
         */
        $(c.contexto + " .lista-float-der .cerrar").click(function(){
            $(this).parent().css("right", "-230px")
            $(this).hide()
            $(c.contexto + " .lista-float-der .abrir").show()
        })

        /**
         * evento click para el botón que muestra la lista
         */
        $(c.contexto + " .lista-float-der .abrir").click(function(){
            $(this).parent().css("right", 0)
            $(this).hide()
            $(c.contexto + " .lista-float-der .cerrar").show()
        })


        /**
         * evento click para el botón que oculta la lista
         */
        $(c.contexto + " .lista-float-izq .cerrar").click(function(){
            $(this).parent().css("left", "-230px")
            $(this).hide()
            $(c.contexto + " .lista-float-izq .abrir").show()
        })

        /**
         * evento click para el botón que muestra la lista
         */
        $(c.contexto + " .lista-float-izq .abrir").click(function(){
            $(this).parent().css("left", 0)
            $(this).hide()
            $(c.contexto + " .lista-float-izq .cerrar").show()
        })
    }

    /**
     * Función de validación de los datos ingresados por parámetro 
     * a través de objeto JSON destinado a esta función.
     * {
     *    contexto: "ID DE LA LISTA FLOTANTE" Ej: #lista1
     *    fondoItem: "Color del fondo" Ej: fd-gris-n clazse de bodystyle
     *    colorTexto: "Color del texto de los elementos" Ej: c-white
     *    altura: distancia entre la lista y el inicio de la página (INT) positivo
     * }
     * @param {JSON de configuración del elemento ColecciónFlotante} c 
     * @returns false si no son válidos los datos de entrada al elemento.
     *          true si son válidos
     */
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
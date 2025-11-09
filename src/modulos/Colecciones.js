
import $ from 'jquery'
import ERR from "./Errores"


const timeEffect = 300 // tiempo del efecto acordeón

/**
 * Clase que permite establecer el el efecto acordeón 
 * en las colecciones de la biblioteca.
 */
class Coleccion {

    
    /**
     * Función que permite borrar los eventos asociados 
     * a las colecciones, luego de esto el efecto acordeón
     * desaparecerá.
     * @param {ID} contexto id que envuelve a la lista 
     *  se utiliza como contexto del elemento 
     */
    destroy(contexto) {
        $(contexto + " .l-colapso .lista-item").off()
        $(contexto + " .l-colapso .lista-item").each((i, e) => {
            $(e).children("i").remove()
        })
    }


    /**
     * Permite definir los estilos de las lista 
     * que poseen el efecto acordeón para desplegar
     * submenus asociados.
     * @param {*} c Configuración de la colección
     */
    acordeon(c) {
        $(c.contexto + " .l-colapso .lista-item").each(function () {

            /** Si el item no está desactivado y está definido */
            if (!$(this).hasClass("desactivado") && $($(this)).data("target") !== undefined) {

                // Añade las flechas al elemento indicando
                // Que es un elemento que permite desplegar a otros elementos
                $(this).append("<i class='f-der'></i>");
                $(this).append("<i class='f-aba'></i>");

                // Configura las clases CSS de la pariencia de las flecha que apuntan a la derecha
                $(this).children(".f-der").css("border-left", "5px solid " + c.colorFlechas)
                $(this).children(".f-der").css("border-bottom", "5px solid transparent")
                $(this).children(".f-der").css("border-top", "5px solid transparent")

                // Configura las clases CSS de la pariencia de las flecha que apuntan hacia abajo
                $(this).children(".f-aba").css("border-top", "5px solid " + c.colorFlechas)
                $(this).children(".f-aba").css("border-left", "5px solid transparent")
                $(this).children(".f-aba").css("border-right", "5px solid transparent")

                /**
                 * Reacomoda las flechas para que se visualicen justo al final 
                 * de cada item de la lista y con un alineamiento vertical 
                 * centrado.
                 */
                $(this).children(".f-der").css("top", "calc(50% - 2.5px)");
                $(this).children(".f-der").css("height", 5);
                $(this).children(".f-aba").css("top", 13);

                $(this).children(".f-aba").hide();
                $(c.contexto + " .l-colapso > .desplegable").hide();
            }
        })
    }


    desplegable(c) {

        /**
         * Esta función permite cerrar todos los sub-memus desplegables,
         * Esto de debe a que solo puede estar un abiero a la vez. 
         */
        var cerrarTodos = () => {

            // Recorre todos los elementos que contienen la clase .lista-item
            // Dentro del contexto suministrado por parámetro a través 
            // de la configuración.
            $(c.contexto + " .l-colapso .lista-item").each(function () {

                // Ingresa al contenido almacenado en el 
                // data-target (en este caso un ID) de la sub-lista 
                // a guardar o ocultar.
                $(($(this)).data("target")).slideUp(300)

                /**
                 * Cambia la flecha derecha por la flecha 
                 * debajo, para representar que el submenú 
                 * está desplegado.
                 */
                $(this).children(".f-aba").hide()
                $(this).children(".f-der").show()
            })
        }

        /**
         * Ebento click que permite asociar este evento al despliegue del 
         * submenu de la lista asociaso al item que sirve como disparador.
         */
        $(c.contexto + " .l-colapso .lista-item").click(function () {

            // Si el item de la lista tiene la clase desactivado 
            // el submenú no se desplegará
            if ($(this).hasClass("desactivado"))
                return

            // Cuando unsubmenú tiene que ser desplagado 
            // es necesario asegurarse que los demás 
            // no sean visibles y así lograr obtener el efecto acordeón.
            cerrarTodos(c)

            // obtiene el ID del submenu configurado en el attr 
            // data-target del elemento disparador
            var desplegable = $($(this).data("target"))

            /**
             * Si el submenu es vissible lo guarda
             * si el submenu no es visible lo muestra
             */
            if ($(desplegable).is(":visible")) {
                $(this).children(".f-aba").hide()
                $(this).children(".f-der").show()
                $(desplegable).slideUp(300)
            } else {
                $(this).children(".f-der").hide()
                $(this).children(".f-aba").show()
                $(desplegable).slideDown(timeEffect)
            }
        })
    }

    /**
     * Carga la configuración para definir los estilos y la visual de 
     * la lista.
     * @param {Configuración de la colección} c 
     */
    cargarConfiguracion(c) {

        $(c.contexto + " .lista-contenedor, .list-container").addClass(c.colorFondo)
        $(c.contexto + " .lista-item").addClass(c.colorFondo)
        $(c.contexto + " .list-item").addClass(c.colorFondo)
        $(c.contexto + " a").addClass(c.colorTexto)
        $(c.contexto + " p").addClass(c.colorTexto)
        $(c.contexto + " b").addClass(c.colorTexto)
        $(c.contexto + " i").addClass(c.colorTexto)
        $(c.contexto + " .lista-cabecera").addClass(c.colorTexto)
        $(c.contexto + " .list-header").addClass(c.colorTexto)
        $(c.contexto + " .lista-pie").addClass(c.colorTexto)
        $(c.contexto + " .list-footer").addClass(c.colorTexto)
        $(c.contexto + " .lista-contenedor .desplegable ul li a").addClass(c.colorTexto)
        $(c.contexto + " .list-container .dropdown ul li a").addClass(c.colorTexto)
    }

    /**
     * Este método permite validar si todos los parámetros que 
     * están incluidos en el objeto JSON que se envía por parámetro 
     * a la función de inicialización.
     * @param {Configuración de la lista} c 
     * @returns false si los parámtros de configuración son erroneos
     */
    validarConfig(c) {
        // Nombre del MODULO e Identificador
        const MODULO = "Error bodystyle dice: M08" // Módulo N°8

        // Validar el ID que sirve como contecto de la colección
        // Si el formato del ID es erroneo, el módulo no permitirá
        // que continue la inicialozación de la colección
        if (!ERR.id.validacion.test(c.contexto)) {
            console.log(MODULO + ERR.id.mensaje)
            return false
        }

        /**
         * Los errores de fondo se producen porque los mismos 
         * tienen que ser una clase provista por Bodystyle
         * su formato es fd-[color] o  bg-[color].
         */
        if (!ERR.clasesColorFondo.validacion.test(c.colorFondo)) {
            console.log(MODULO + ERR.clasesColorFondo.mensaje)
            return false
        }

        /**
         * Los errores acerca el color del texto se producen 
         * porque el color del texto es necesario configurarlo 
         * con una de las clases provistas por Bodystyle con el 
         * formato c-[color]. 
         */
        if (!ERR.clasesColorTexto.validacion.test(c.colorTexto)) {
            console.log(MODULO + ERR.clasesColorTexto.mensaje)
            return false
        }

        /**
         * Los colores de las flechas se definen con unvalor hexadecimal
         * por ejemplo: #000
         */
        if (!ERR.hexadecimal.validacion.test(c.colorFlechas)) {
            console.log(MODULO + ERR.hexadecimal.mensaje)
            return false
        }

        return true // Si todo es correcto devuelve verdadero

    }


    iniciar(
        { contexto = "SinContexto", colorFondo = "fd-blanco", colorTexto = "c-negro", colorFlechas = "#000" } = {}) {

        var c = {
            contexto: contexto,
            colorFondo: colorFondo,
            colorTexto: colorTexto,
            colorFlechas: colorFlechas
        }
        if (!this.validarConfig(c)) {
            return
        }

        this.cargarConfiguracion(c)
        this.acordeon(c)
        this.desplegable(c)
    }
}

export default Coleccion
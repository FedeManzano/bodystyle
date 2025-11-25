
import $ from 'jquery'
import ERR from "./Errores"
import { slideUp, slideDown } from './Animaciones';


const timeEffect = 300 // tiempo del efecto acordeón
class Coleccion {
    constructor() {
        this.menues = new Map()
        this.eventListeners = new Map()
        this.select(".l-colapso .lista-item").forEach((ele) => {
            this.menues.set(ele, false)
        })
    }

    /**
     * Función que permite borrar los eventos asociados 
     * a las colecciones, luego de esto el efecto acordeón
     * desaparecerá.
     * @param {ID} contexto id que envuelve a la lista 
     *  se utiliza como contexto del elemento 
     */
    destroy(contexto) {
        this.select(contexto + " .l-colapso .lista-item").forEach((ele) => {
            if (this.eventListeners.has(ele)) {
                const handler = this.eventListeners.get(ele);
                ele.removeEventListener("click", handler);
                this.eventListeners.delete(ele);
            }
            ele.querySelectorAll("i").forEach(i => i.remove());
        })
    }

    /**
     * @description Permite seleccionar un elemento o elementos del DOM
     * @param {Permite seleccionar un elemento o elementos del DOM} selector 
     * @returns 
     */
    select(selector) {
        // Retorno del elemento seleccionado / o elementos seleccionados
        return document.querySelectorAll(selector)
    }


    /**
     * Permite definir los estilos de las lista 
     * que poseen el efecto acordeón para desplegar
     * submenus asociados.
     * @param {*} c Configuración de la colección
     */
    acordeon(c) {

        this.select(c.contexto + " .l-colapso .lista-item").forEach((ele) => {
            if (!ele.classList.contains("desactivado") &&
                ele.hasAttribute("data-target") !== null &&
                ele.hasAttribute("data-target") !== undefined) {

                // Añade las flechas al elemento indicando
                // Que es un elemento que permite desplegar a otros elementos
                let f_derecha = document.createElement("i")
                let f_izquierda = document.createElement("i")

                f_derecha.classList.add("f-der")
                f_izquierda.classList.add("f-aba")

                ele.appendChild(f_derecha)
                ele.appendChild(f_izquierda)


                // Configura las clases CSS de la pariencia de las flecha que apuntan a la derecha
                f_derecha.style.borderLeft = "5px solid " + c.colorFlechas
                f_derecha.style.borderBottom = "5px solid transparent"
                f_derecha.style.borderTop = "5px solid transparent"

                // Configura las clases CSS de la pariencia de las flecha que apuntan hacia abajo
                f_izquierda.style.borderTop = "5px solid " + c.colorFlechas
                f_izquierda.style.borderLeft = "5px solid transparent"
                f_izquierda.style.borderRight = "5px solid transparent"

                // Reacomoda las flechas para que se visualicen justo al final 
                // de cada item de la lista y con un alineamiento vertical 
                // centrado.
                f_derecha.style.top = "calc(50% - 2.5px)";
                f_derecha.style.height = 5;
                f_izquierda.style.top = 13;

                f_izquierda.style.display = "none";
                this.select(c.contexto + " .l-colapso > .desplegable").forEach((ele) => {
                    ele.style.display = "none";
                });
            }
        })
    }


    desplegable(c) {

        /**
         * Esta función permite cerrar todos los sub-memus desplegables,
         * Esto de debe a que solo puede estar un abiero a la vez. 
         */
        const cerrarTodos = () => {

            // Recorre todos los elementos que contienen la clase .lista-item
            // Dentro del contexto suministrado por parámetro a través 
            // de la configuración.
            this.select(c.contexto + " .l-colapso .lista-item").forEach((ele) => {
                let idDesplegable = ele.getAttribute("data-target")
                document.getElementById(idDesplegable.replaceAll("#", "")).style.display = "none";
                ele.querySelector(".f-der").style.display = "block"
                ele.querySelector(".f-aba").style.display = "none"
                this.menues.set(ele, false)
            })
        }


        // Recorre todos los elementos que contienen la clase .lista-item
        // Dentro del contexto suministrado por parámetro a través 
        // de la configuración.
        this.select(c.contexto + " .l-colapso .lista-item").forEach((ele) => {

            // Ingresa al contenido almacenado en el 
            // data-target (en este caso un ID) de la sub-lista 
            // a guardar o ocultar.
            let listado = document.getElementById(ele.getAttribute("data-target"))
            slideUp(listado)

            /**
             * Cambia la flecha derecha por la flecha 
             * debajo, para representar que el submenú 
             * está desplegado.
             */
            let f_derecha = ele.querySelector(".f-der")
            let f_abajo = ele.querySelector(".f-aba")
            if (f_derecha) f_derecha.style.display = "block"
            if (f_abajo) f_abajo.style.display = "none"

            // 3️⃣ Accesibilidad: el disparador ya no está expandido
            ele.setAttribute('aria-expanded', 'false');
        })

        this.select(c.contexto + " .l-colapso .lista-item").forEach((ele) => {
            const handler = (evt) => {
                let ele = evt.currentTarget
                // Si el item de la lista tiene la clase desactivado 
                // el submenú no se desplegará
                if (ele.classList.contains("desactivado")) return



                // obtiene el ID del submenu configurado en el attr 
                // data-target del elemento disparador
                let desplegable = ele.getAttribute("data-target")
                desplegable = desplegable.replaceAll("#", "")
                let listado = document.getElementById(desplegable)
                let estadoTemporal = this.menues.get(ele)

                // Cuando unsubmenú tiene que ser desplagado 
                // es necesario asegurarse que los demás 
                // no sean visibles y así lograr obtener el efecto acordeón.
                cerrarTodos(c)


                if (estadoTemporal === true) {
                    slideUp(listado)
                    this.menues.set(ele, false)
                    ele.setAttribute('aria-expanded', 'false');
                    ele.querySelector(".f-der").style.display = "block"
                    ele.querySelector(".f-aba").style.display = "none"
                } else {
                    slideDown(listado)
                    this.menues.set(ele, true)
                    ele.setAttribute('aria-expanded', 'true');
                    ele.querySelector(".f-der").style.display = "none"
                    ele.querySelector(".f-aba").style.display = "block"
                }
            }

            // Store the handler so we can remove it later
            this.eventListeners.set(ele, handler)
            ele.addEventListener("click", handler)
        })
    }


    /**
     * Carga la configuración para definir los estilos y la visual de 
     * la lista.
     * @param {Configuración de la colección} c 
     */
    cargarConfiguracion(c) {
        // Agrupa todos los selectores que necesitan colorFondo
        const selectorFondo = `${c.contexto} .lista-contenedor, ${c.contexto} .list-container, ${c.contexto} .lista-item, ${c.contexto} .list-item`;
        this.select(selectorFondo).forEach((ele) => {
            ele.classList.add(c.colorFondo)
        })

        // Agrupa todos los selectores que necesitan colorTexto
        const selectorTexto = `${c.contexto} a, ${c.contexto} p, ${c.contexto} b, ${c.contexto} i, ${c.contexto} .lista-cabecera, ${c.contexto} .list-header, ${c.contexto} .lista-pie, ${c.contexto} .list-footer, ${c.contexto} .lista-contenedor .desplegable ul li a, ${c.contexto} .list-container .dropdown ul li a`;
        this.select(selectorTexto).forEach((ele) => {
            ele.classList.add(c.colorTexto)
        })
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
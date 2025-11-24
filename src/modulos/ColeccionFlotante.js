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
    destroy(contexto) {
        const selectors = [
            `${contexto} .lista-float-der .cerrar`,
            `${contexto} .lista-float-der .abrir`,
            `${contexto} .lista-float-izq .cerrar`,
            `${contexto} .lista-float-izq .abrir`
        ];

        selectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                // Clonar el nodo elimina los event listeners
                const newEl = el.cloneNode(true);
                if (el.parentNode) {
                    el.parentNode.replaceChild(newEl, el);
                }
            });
        });
    }

    /**
     * Este método permite cargar la configuración 
     * de los elementos que conforman la colección
     * @param {JSON de Configuración de la lista} c 
     */
    inicializarElemento(c) {

        // Helper para seleccionar elementos
        const select = (selector) => document.querySelectorAll(`${c.contexto} ${selector}`);

        // Configuración de la propiedad TOP
        // Distancia entre la lista y el inicio de la página
        const altura = typeof c.altura === 'number' ? `${c.altura}px` : c.altura;

        select(".lista-float-der").forEach(el => el.style.top = altura);
        select(".lista-float-izq").forEach(el => el.style.top = altura);

        // Configurar la visibilidad del botón para mostrar
        // o ocultar la lista en lista flotantes que se 
        // encuentran a la derecha.
        select(".lista-float-der .cerrar").forEach(el => el.style.display = 'block');
        select(".lista-float-der .abrir").forEach(el => el.style.display = 'none');

        // Configurar la visibilidad del botón para mostrar
        // o ocultar la lista en lista flotantes que se 
        // encuentran a la derecha.
        select(".lista-float-izq .cerrar").forEach(el => el.style.display = 'block');
        select(".lista-float-izq .abrir").forEach(el => el.style.display = 'none');

        /// Configuración del color de fondo de la lista
        select(".lista-float-der .lista-item").forEach(el => {
            el.classList.add(c.fondoItem);
            el.classList.add(c.colorTexto);
        });
        select(".lista-float-izq .lista-item").forEach(el => {
            el.classList.add(c.fondoItem);
            el.classList.add(c.colorTexto);
        });

        // Configuración del color del texto de los elementos internos de la lista
        select(".lista-float-der .lista-item *").forEach(el => el.classList.add(c.colorTexto));
        select(".lista-float-izq .lista-item *").forEach(el => el.classList.add(c.colorTexto));


        /**
         * evento click para el botón que oculta la lista
         */
        select(".lista-float-der .cerrar").forEach(el => {
            el.addEventListener('click', function () {
                this.parentNode.style.right = "-230px";
                this.style.display = "none";
                select(".lista-float-der .abrir").forEach(btn => btn.style.display = "block");
            });
        });

        /**
         * evento click para el botón que muestra la lista
         */
        select(".lista-float-der .abrir").forEach(el => {
            el.addEventListener('click', function () {
                this.parentNode.style.right = "0";
                this.style.display = "none";
                select(".lista-float-der .cerrar").forEach(btn => btn.style.display = "block");
            });
        });


        /**
         * evento click para el botón que oculta la lista
         */
        select(".lista-float-izq .cerrar").forEach(el => {
            el.addEventListener('click', function () {
                this.parentNode.style.left = "-230px";
                this.style.display = "none";
                select(".lista-float-izq .abrir").forEach(btn => btn.style.display = "block");
            });
        });

        /**
         * evento click para el botón que muestra la lista
         */
        select(".lista-float-izq .abrir").forEach(el => {
            el.addEventListener('click', function () {
                this.parentNode.style.left = "0";
                this.style.display = "none";
                select(".lista-float-izq .cerrar").forEach(btn => btn.style.display = "block");
            });
        });
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
        const MODULO = "Error BodyStyle dice: M09" // Módulo N°9
        if (!ERR.id.validacion.test(c.contexto)) {
            console.error(MODULO + ERR.id.mensaje)
            return false
        }


        if (!ERR.clasesColorFondo.validacion.test(c.fondoItem)) {
            console.error(MODULO + ERR.clasesColorFondo.mensaje)
            return false
        }


        if (!ERR.clasesColorTexto.validacion.test(c.colorTexto)) {
            console.error(MODULO + ERR.clasesColorTexto.mensaje)
            return false
        }

        if (!ERR.positivos.validacion(c.altura)) {
            console.error(MODULO + ERR.positivos.mensaje)
            return false
        }

        return true
    }


    iniciar({ contexto = "vacio", fondoItem = "fd-gris-az-o", colorTexto = "c-blanco", altura = 100 } = {}) {

        var c = {
            contexto,
            fondoItem,
            colorTexto,
            altura
        }
        if (!this.validarColeecion(c))
            return

        this.inicializarElemento(c)
    }
}

export default ColeccionFlotante
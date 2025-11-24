

import ERR from "./GestionErrores"

/**
 * Módulo (27) Efecto que incorpora momentaneamente 
 * un elemento dentro de otro para generar el efecto pretendido.
 * migrado a vanilla js desde la versión 5.8.0.
 */
(function () {

    // Si alguien quiere cambiar el tiempo de espera
    const Time = 500;


    /**
     * Almacena los event listeners para poder eliminarlos posteriormente
     * @type {Map<HTMLElement, Function>}
     * @private
     */
    const eventListeners = new Map();

    /**
     * Aplica el efecto de onda a un elemento específico
     * @private
     * @param {HTMLElement} elemento - Elemento que recibirá el efecto waves
     * @returns {void}
     * 
     * @description
     * Esta función interna agrega un event listener de click al elemento.
     * Cuando se hace clic:
     * 1. Obtiene el color personalizado del atributo `data-color` (opcional)
     * 2. Crea un elemento `<span>` con la clase `efecto-waves`
     * 3. Posiciona el span en las coordenadas del clic
     * 4. Aplica el color si es válido
     * 5. Agrega el elemento al DOM
     * 6. Elimina el elemento después de 500ms (duración de la animación CSS)
     * 
     * La animación de expansión se maneja mediante CSS con `transform: translate3d()`
     * y transiciones en el archivo `_efecto-waves.scss`.
     */
    const aplicarEfecto = (elemento) => {
        const clickHandler = (e) => {
            const color = elemento.getAttribute("data-color");
            const boton = e.currentTarget;
            const span = document.createElement("span");

            span.classList.add("efecto-waves");

            // Validar y aplicar color personalizado
            if (color !== null && color !== "") {
                if (!ERR.fondo.val(color)) {
                    console.error(
                        `(WAVES) ${ERR.fondo.mje} Revise el atributo data-color='bg-[color]'`
                    );
                    return;
                }
                span.classList.add(color);
            }

            // Posicionar el efecto en el punto de clic
            span.style.left = e.offsetX + "px";
            span.style.top = e.offsetY + "px";

            // Agregar al DOM
            boton.appendChild(span);

            // Animar con Web Animations API
            span.animate([
                // Keyframe inicial (0%)
                {
                    width: '10px',
                    height: '10px',
                    opacity: 0.8
                },
                // Keyframe final (100%)
                {
                    width: '200px',
                    height: '200px',
                    opacity: 0
                }
            ], {
                duration: Time,        // Duración en ms
                easing: 'ease-out',    // Curva de animación
                fill: 'forwards'       // Mantener estado final
            });

            // Remover después de la animación
            setTimeout(() => {
                span.remove();
            }, Time);
        };

        elemento.addEventListener("click", clickHandler);
        eventListeners.set(elemento, clickHandler);
    };

    /**
     * Inicializa el efecto waves en todos los elementos con la clase `.waves`
     * @private
     * @returns {void}
     */
    const inicializarEfectos = () => {
        document.querySelectorAll(".waves").forEach((elemento) => {
            aplicarEfecto(elemento);
        });
    };

    /**
     * Elimina todos los event listeners del efecto waves
     * @private
     * @returns {void}
     */
    const destruirEfectos = () => {
        eventListeners.forEach((handler, elemento) => {
            elemento.removeEventListener("click", handler);
        });
        eventListeners.clear();
    };

    /**
     * Objeto público del módulo Waves
     * @namespace Waves
     * @type {Object}
     * @property {Function} iniciar - Inicializa el efecto waves
     * @property {Function} destroy - Elimina todos los event listeners
     */
    const Waves = {
        /**
         * Inicializa el efecto waves en todos los elementos con la clase `.waves`
         * @memberof Waves
         * @function iniciar
         * @returns {void}
         * @example
         * Waves.init();
         */
        iniciar: function () {
            inicializarEfectos();
        },

        /**
         * Elimina todos los event listeners del efecto waves
         * @memberof Waves
         * @function destroy
         * @returns {void}
         * @example
         * Waves.destroy();
         */
        destroy: function () {
            destruirEfectos();
        }
    };

    // Auto-inicialización al cargar el módulo
    inicializarEfectos();

    // Exponer en el objeto window para compatibilidad con código legacy
    window.Waves = Waves;

    // Exportar el módulo
    return Waves;
})();

export default window.Waves;

/**
 * Módulo (11) Se encarga de retirarle todos los eventos HTML
 * a los elementos que contengan la clase .desactivado.
 * Módulo que se inicializa de manera automática, sin necesidad de llamar a 
 * la función de inicialización.
 * 
 * Características:
 * - Almacena los atributos originales en un WeakMap para poder restaurarlos
 * - Detecta automáticamente cuando se añade o remueve la clase .desactivado
 * - Usa vanilla JavaScript (sin jQuery)
 */
(function () {

    // WeakMap para almacenar los atributos originales de cada elemento
    // Usamos WeakMap para evitar memory leaks (se limpia automáticamente cuando el elemento se elimina del DOM)
    const atributosOriginales = new WeakMap();

    // Lista de atributos de eventos que se deben remover/restaurar
    const atributosEventos = [
        'onclick', 'ondblclick', 'onmousedown', 'onmouseleave',
        'onmouseout', 'onkeydown', 'onkeypress', 'onkeyup',
        'onfocus', 'onblur', 'onchange', 'onselect',
        'onreset', 'onsubmit', 'href'
    ];

    /**
     * Guarda los atributos actuales de un elemento antes de desactivarlo
     * @param {HTMLElement} elemento - Elemento del cual guardar los atributos
     */
    const guardarAtributos = (elemento) => {
        // Solo guardar si no hemos guardado antes
        if (atributosOriginales.has(elemento)) {
            return;
        }

        const atributos = {};

        // Guardar atributos de eventos
        atributosEventos.forEach(attr => {
            if (elemento.hasAttribute(attr)) {
                atributos[attr] = elemento.getAttribute(attr);
            }
        });

        // Guardar estado readonly si es un input
        if (elemento.tagName === 'INPUT' || elemento.tagName === 'TEXTAREA') {
            atributos._readonly = elemento.hasAttribute('readonly');
        }

        // Guardar el atributo 'for' de labels relacionados
        if (elemento.tagName === 'INPUT' && elemento.id) {
            const label = document.querySelector(`label[for="${elemento.id}"]`);
            if (label) {
                atributos._labelFor = elemento.id;
                atributos._labelElement = label;
            }
        }

        atributosOriginales.set(elemento, atributos);
    };

    /**
     * Desactiva un elemento removiendo sus atributos de eventos
     * @param {HTMLElement} elemento - Elemento a desactivar
     */
    const desactivarElemento = (elemento) => {
        // Guardar atributos antes de removerlos
        guardarAtributos(elemento);

        // Remover atributos de eventos
        atributosEventos.forEach(attr => {
            elemento.removeAttribute(attr);
        });

        // Hacer readonly si es input o textarea
        if (elemento.tagName === 'INPUT' || elemento.tagName === 'TEXTAREA') {
            elemento.setAttribute('readonly', 'true');
        }

        // Remover el atributo 'for' del label relacionado
        if (elemento.tagName === 'INPUT' && elemento.id) {
            const label = document.querySelector(`label[for="${elemento.id}"]`);
            if (label) {
                label.removeAttribute('for');
            }
        }

        // Desactivar todos los hijos también
        const hijos = elemento.querySelectorAll('*');
        hijos.forEach(hijo => {
            if (!hijo.classList.contains('desactivado')) {
                hijo.classList.add('desactivado');
            }
        });
    };

    /**
     * Restaura los atributos originales de un elemento
     * @param {HTMLElement} elemento - Elemento a restaurar
     */
    const restaurarElemento = (elemento) => {
        const atributos = atributosOriginales.get(elemento);

        if (!atributos) {
            return; // No hay atributos guardados para este elemento
        }

        // Restaurar atributos de eventos
        atributosEventos.forEach(attr => {
            if (atributos[attr]) {
                elemento.setAttribute(attr, atributos[attr]);
            }
        });

        // Restaurar estado readonly
        if (elemento.tagName === 'INPUT' || elemento.tagName === 'TEXTAREA') {
            if (atributos._readonly) {
                elemento.setAttribute('readonly', 'true');
            } else {
                elemento.removeAttribute('readonly');
            }
        }

        // Restaurar el atributo 'for' del label
        if (atributos._labelFor && atributos._labelElement) {
            atributos._labelElement.setAttribute('for', atributos._labelFor);
        }

        // Limpiar el WeakMap
        atributosOriginales.delete(elemento);
    };

    /**
     * Procesa todos los elementos con la clase .desactivado
     */
    const procesarElementosDesactivados = () => {
        const elementos = document.querySelectorAll('.desactivado');
        elementos.forEach(elemento => {
            desactivarElemento(elemento);
        });
    };

    /**
     * Inicializa el módulo y configura el MutationObserver
     */
    const inicializar = () => {
        // Procesar elementos existentes
        procesarElementosDesactivados();

        // Configurar MutationObserver para detectar cambios en clases
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const elemento = mutation.target;

                    if (elemento.classList.contains('desactivado')) {
                        // Se añadió la clase .desactivado
                        desactivarElemento(elemento);
                    } else if (atributosOriginales.has(elemento)) {
                        // Se removió la clase .desactivado y tenemos atributos guardados
                        restaurarElemento(elemento);
                    }
                }
            });
        });

        // Observar cambios en todo el documento
        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ['class'],
            subtree: true
        });

        // También observar nuevos nodos añadidos al DOM
        const nodeObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) { // Es un elemento
                        if (node.classList && node.classList.contains('desactivado')) {
                            desactivarElemento(node);
                        }
                        // Buscar elementos desactivados dentro del nodo añadido
                        const desactivados = node.querySelectorAll && node.querySelectorAll('.desactivado');
                        if (desactivados) {
                            desactivados.forEach(elem => desactivarElemento(elem));
                        }
                    }
                });
            });
        });

        nodeObserver.observe(document.body, {
            childList: true,
            subtree: true
        });
    };

    const Desactivado = {
        /**
         * Inicializa el módulo Desactivado
         */
        iniciar: () => {
            inicializar();
        },

        /**
         * Desactiva manualmente un elemento específico
         * @param {string|HTMLElement} selector - Selector CSS o elemento HTML
         */
        desactivar: (selector) => {
            const elemento = typeof selector === 'string'
                ? document.querySelector(selector)
                : selector;

            if (elemento) {
                elemento.classList.add('desactivado');
                desactivarElemento(elemento);
            }
        },

        /**
         * Reactiva manualmente un elemento específico
         * @param {string|HTMLElement} selector - Selector CSS o elemento HTML
         */
        reactivar: (selector) => {
            const elemento = typeof selector === 'string'
                ? document.querySelector(selector)
                : selector;

            if (elemento) {
                elemento.classList.remove('desactivado');
                restaurarElemento(elemento);
            }
        }
    };

    window.Desactivado = Desactivado;
})();

export default Desactivado;
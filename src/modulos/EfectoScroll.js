/**
 * Modulo (29) Efecto Scroll
 * 
 * Este módulo aplica una clase CSS a los elementos con la clase 'scroll-effect'
 */

// Variable para almacenar el observer
let observer = null;

/**
 * Función que inicializa el componente 
 * permite crear el observer y observar los elementos con la clase 'scroll-effect'
 * @description Inicializa el efecto scroll
 */
const iniciar = () => {

    /**
     * Configuración del IntersectionObserver
     */
    const config = {
        threshold: 0.1, // El umbral de visibilidad para activar el efecto
        rootMargin: "0px 0px -100px 0px" // Margen para activar el efecto antes de que el elemento entre completamente en la vista
    }

    /**
     * Creación del IntersectionObserver
     * @description Observa los elementos con la clase 'scroll-effect' y les añade la clase 'active-scroll' cuando entran en la vista
     */
    observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Si el elemento se ve en pantalla añade el active-scroll
            if (entry.isIntersecting) {
                entry.target.classList.add('active-scroll');
            }
        })
    }, config);

    /**
     * Observación de los elementos con la clase 'scroll-effect'
     * @description Selecciona todos los elementos con la clase 'scroll-effect' y los observa con el IntersectionObserver
     */
    const elementos = document.querySelectorAll('.scroll-effect');
    elementos.forEach(el => {
        observer.observe(el);
    })
}

/**
 * Función que destruye el componente
 * @description Desconecta el observer y limpia la variable
 */
const destroy = () => {
    if (observer) {
        observer.disconnect();
        observer = null;
    }
}


/**
 * Objeto público del módulo EfectoScroll
 * @description Proporciona métodos para iniciar y destruir el efecto scroll
 */
const EfectoScroll = {
    iniciar: () => iniciar(),
    destroy: () => destroy()
}

// Accesible desde el ámbito global
if (typeof window !== 'undefined') {
    window.EfectoScroll = EfectoScroll;
}

// Exportación del módulo EfectoScroll
export default EfectoScroll;

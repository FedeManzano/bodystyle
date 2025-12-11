/**
 * Modulo (29) Efecto Scroll
 * 
 * Este módulo aplica una clase CSS a los elementos con la clase 'efecto-scroll'
 */
(function(){

    // Variable para almacenar el observer
    let observer = null; // Aquí se almacenará el IntersectionObserver

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
        observer = new IntersectionObserver((ent) => {
            ent.forEach(e => {
                // Si el elemento se ve en pantalla añade el active-scroll
                if(e.isIntersecting){
                    e.target.classList.add('active-scroll');
                }
            })
        })

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
    window.EfectoScroll = EfectoScroll;        // Aquí iría la lógica específica del efecto scroll
})()

// Exportación del módulo EfectoScroll
export default EfectoScroll;


/**
 * Módulo (02) botón que permite volver al inició de la 
 * página (scroll top = 0) desde cualquier lugar 
 * hacia el inicio.
 */
(function () {

    const conf = {
        show_hide: 200, // Tiempo en tarda en aparecer y desaparecer
        scroll: 300, // Tiempo que tarda en llevar el scroll a 0
        limit: 100 // A partir de que nivel del scroll se mostrará el botón
    }

    // Objeto de Jquery que va a contener 
    // el botón junto con los estilos asociados
    var boton = null;


    // Elmina todos los eventos asociados
    // Permite limpiar el buffer de eventos
    const destroy = () => {
        window.removeEventListener("scroll", scrollHandler)
        boton.removeEventListener("click", clickHandler)
        boton.remove()
    }

    /**
     * Función que permite inicializar el módulo del botón
     */
    var inicializar = () => {

        boton = document.createElement("div")
        boton.className = "boton-inicio"
        boton.style.display = "none"

        // Se carga el botón al body
        document.body.appendChild(boton)

        window.addEventListener("scroll", scrollHandler)

        boton.addEventListener("click", clickHandler)
    }

    /**
     * Sección de handler para los eventos scroll y click 
     * del botón.
     */
    const clickHandler = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    const scrollHandler = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        // Evento scroll del evento 
        // de la ventana cuando supera 
        // a 100px se muestra el botón
        if (scrollTop > conf.limit) boton.style.display = "block"
        else boton.style.display = "none"
    }

    const BotonInicio = {
        iniciar: () => {
            inicializar()
        },

        destroy: () => destroy()
    }

    // Se carga el elemento en la ventana
    window.BotonInicio = BotonInicio
})()

// Exporta el elemento 
// Se lo inicializa en el archivo app.js
export default window.BotonInicio
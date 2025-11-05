import $ from "jquery"


/**
 * Manejador del sidebar drop
 * Permite gestionar la visibilidad del Sidebar
 * El punto de inflexión del comportamiento es cuando 
 * la ventana mide 1030px.
 * 
 * - Mayor a 1030px el sidebar se muestra
 * - Menor a 1030px el sidebar se oculta 
 * 
 * Bodystyle 5.0.0 
 */
(function(){

    // Configuración Inicial
    const conf = {
        nav: "", // ID DEL NAV
        sidebar: "", // ID DEL SIDEBAR
    }

    // TRUE Visible
    // FALSE Oculto
    let state = false

    const width = 260 // Ancho del Sidebar


    /**
     * Función de inicialización del manejador de
     * del sidebar.
     * @param {*} idNav  // ID del nav
     * @param {*} idSidebar  // ID del sidebar
     */
    const Init = (idNav, idSidebar) => {
        /**ID DEL NAV (CONTROLADOR) */
        conf.nav = idNav

        /**ID DEL SIDEBAR (CONTROLADO) */
        conf.sidebar = idSidebar

        // Evaluar si el sidebar se debe mostrar o no.
        show_hide()

        // Añade al body la cubierta que permite ocultar el Sidebar
        // Un contenedor fijo que cubre toda la pantalla
        $("body").append("<div class='bs-nav-complement'></div>")

        // Configura el botón de menú que será el disparador de del evento show-hide
        $(conf.nav + " .bs-nav-md .btn-menu").append("<label></label><label></label><label></label>")
        $(conf.nav + " .bs-nav-sm .btn-menu").append("<label></label><label></label><label></label>")
        $(conf.nav + " .bs-nav-lg .btn-menu").append("<label></label><label></label><label></label>")


        // Cada vez que se modifica el ancho de la ventana
        // Ocultará o mostrará el sidebar.
        $(window).on("resize", () => show_hide())

        ///Manejador del evento click, ocultará o mostrará el sidebar
        $(conf.nav + " .bs-nav-md, " + conf.nav + " .bs-nav-sm, " + conf.nav + " .bs-nav-lg").on("click",".btn-menu", (e) => {
            if(!state)
                show()
            else
                hide()
        })

        // Oculta el sidebar cualdo se hace click en cualquier lugar de la pantalla
        // Solo disponible en pantallas menores a 1030px
        $(".bs-nav-complement").on("click", () => hide())
    }

    /**
     * Función que permite ocultar y mostrar el sidebar 
     * en función al tamaño de la ventana
     */
    const show_hide = () => {
        $(".bs-nav-complement").hide()
        if($(window).width() > 1030)
        {
            // Si el dispositivo es mayor a 1030px 
            // el sidebar se muestra siempre
            $(conf.sidebar).css("left", 0)
            state = true // Activo
        } else {
            // Si la pantalla es menor a 1030px
            // Se oculta siempre
            $(conf.sidebar).css("left", -260)
            state = false
        }
    }

    /**
     * Función para mostrar el sidebar 
     * en equipos con pantallas menores a 1030px
     * aparece el complemento.
     */
    const show = () => {
        if($(window).width() < 1030)
        {
            $(".bs-nav-complement").show()
        }
        $(conf.sidebar).css("left", 0)
        state = true
    }

    const hide = () => {
        if($(window).width() < 1030)
        {
            $(".bs-nav-complement").hide()
        }
        $(conf.sidebar).css("left", -width)
        state = false
    }

    const SidebarHandler = {
        Init: (idNav, idSidebar) => Init(idNav, idSidebar)
    }

    window.SidebarHandler = SidebarHandler
})()

export default SidebarHandler
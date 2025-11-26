/**
 * Módulo (23)
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
class SidebarHandler {
    constructor() {
        // Configuración Inicial
        this.conf = {
            nav: "", // ID DEL NAV
            sidebar: "", // ID DEL SIDEBAR
        };

        // TRUE Visible, FALSE Oculto
        this.state = false;

        // Ancho del Sidebar
        this.width = 240;

        // Referencias a event listeners para poder removerlos
        this.resizeHandler = null;
        this.menuClickHandler = null;
        this.complementClickHandler = null;
    }

    /**
     * Función de inicialización del manejador del sidebar.
     * @param {string} idNav - ID del nav
     * @param {string} idSidebar - ID del sidebar
     */
    Init(idNav, idSidebar) {
        // ID DEL NAV (CONTROLADOR)
        this.conf.nav = idNav;

        // ID DEL SIDEBAR (CONTROLADO)
        this.conf.sidebar = idSidebar;

        // Añade al body la cubierta que permite ocultar el Sidebar
        // Un contenedor fijo que cubre toda la pantalla
        document.body.insertAdjacentHTML('beforeend', "<div class='bs-nav-complement'></div>");

        // Evaluar si el sidebar se debe mostrar o no
        this.show_hide();

        // Configura el botón de menú que será el disparador del evento show-hide
        const navMd = document.querySelector(`${this.conf.nav} .bs-nav-md .btn-menu`);
        const navSm = document.querySelector(`${this.conf.nav} .bs-nav-sm .btn-menu`);
        const navLg = document.querySelector(`${this.conf.nav} .bs-nav-lg .btn-menu`);

        if (navMd) navMd.insertAdjacentHTML('beforeend', "<label></label><label></label><label></label>");
        if (navSm) navSm.insertAdjacentHTML('beforeend', "<label></label><label></label><label></label>");
        if (navLg) navLg.insertAdjacentHTML('beforeend', "<label></label><label></label><label></label>");

        // Cada vez que se modifica el ancho de la ventana
        // Ocultará o mostrará el sidebar
        this.resizeHandler = () => this.show_hide();
        window.addEventListener("resize", this.resizeHandler);

        // Manejador del evento click, ocultará o mostrará el sidebar
        this.menuClickHandler = (e) => {
            if (e.target.closest('.btn-menu')) {
                if (!this.state) {
                    this.show();
                } else {
                    this.hide();
                }
            }
        };

        // Agregar event listener a los contenedores de navegación
        const navContainers = document.querySelectorAll(
            `${this.conf.nav} .bs-nav-md, ${this.conf.nav} .bs-nav-sm, ${this.conf.nav} .bs-nav-lg`
        );
        navContainers.forEach(container => {
            container.addEventListener("click", this.menuClickHandler);
        });

        // Oculta el sidebar cuando se hace click en cualquier lugar de la pantalla
        // Solo disponible en pantallas menores a 1030px
        this.complementClickHandler = () => this.hide();
        const complement = document.querySelector(".bs-nav-complement");
        if (complement) {
            complement.addEventListener("click", this.complementClickHandler);
        }
    }

    /**
     * Función que permite ocultar y mostrar el sidebar 
     * en función al tamaño de la ventana
     */
    show_hide() {
        const complement = document.querySelector(".bs-nav-complement");
        if (complement) {
            complement.style.display = "none";
        }

        const sidebar = document.querySelector(this.conf.sidebar);
        if (!sidebar) return;

        if (window.innerWidth > 1030) {
            // Si el dispositivo es mayor a 1030px 
            // el sidebar se muestra siempre
            sidebar.style.left = "0px";
            this.state = true; // Activo
        } else {
            // Si la pantalla es menor a 1030px
            // Se oculta siempre
            sidebar.style.left = "-260px";
            this.state = false;
        }
    }

    /**
     * Función para mostrar el sidebar 
     * en equipos con pantallas menores a 1030px
     * aparece el complemento.
     */
    show() {
        if (window.innerWidth < 1030) {
            const complement = document.querySelector(".bs-nav-complement");
            if (complement) {
                complement.style.display = "block";
            }
        }

        const sidebar = document.querySelector(this.conf.sidebar);
        if (sidebar) {
            sidebar.style.left = "0px";
        }
        this.state = true;
    }

    /**
     * Función para ocultar el sidebar
     */
    hide() {
        if (window.innerWidth < 1030) {
            const complement = document.querySelector(".bs-nav-complement");
            if (complement) {
                complement.style.display = "none";
            }
        }

        const sidebar = document.querySelector(this.conf.sidebar);
        if (sidebar) {
            sidebar.style.left = `-${this.width}px`;
        }
        this.state = false;
    }
}

export default new SidebarHandler();
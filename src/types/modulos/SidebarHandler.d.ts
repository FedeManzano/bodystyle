declare const _default: SidebarHandler;
export default _default;
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
declare class SidebarHandler {
    conf: {
        nav: string;
        sidebar: string;
    };
    state: boolean;
    width: number;
    resizeHandler: () => void;
    menuClickHandler: (e: any) => void;
    complementClickHandler: () => void;
    /**
     * Función de inicialización del manejador del sidebar.
     * @param {string} idNav - ID del nav
     * @param {string} idSidebar - ID del sidebar
     */
    Init(idNav: string, idSidebar: string): void;
    /**
     * Función que permite ocultar y mostrar el sidebar
     * en función al tamaño de la ventana
     */
    show_hide(): void;
    /**
     * Función para mostrar el sidebar
     * en equipos con pantallas menores a 1030px
     * aparece el complemento.
     */
    show(): void;
    /**
     * Función para ocultar el sidebar
     */
    hide(): void;
}

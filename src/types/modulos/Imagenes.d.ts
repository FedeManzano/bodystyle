export default imagenesInstance;
declare const imagenesInstance: Imagenes;
/**
 * Módulo (14) Se encarga de la gestión de imágenes
 * brindando la posibilidad de realizarle zoom a la imágen
 * seleccionada.
 */
declare class Imagenes {
    desplegarImagen(e: any): void;
    cerrarClick(): void;
    cerrarEsc(e: any): void;
    cerrarScroll(): void;
    iniciar(): void;
    removerListenersCierre(): void;
    destroy(): void;
}

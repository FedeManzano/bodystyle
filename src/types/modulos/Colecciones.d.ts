export default Coleccion;
declare class Coleccion {
    menues: Map<any, any>;
    eventListeners: Map<any, any>;
    /**
     * Función que permite borrar los eventos asociados
     * a las colecciones, luego de esto el efecto acordeón
     * desaparecerá.
     * @param {ID} contexto id que envuelve a la lista
     *  se utiliza como contexto del elemento
     */
    destroy(contexto: ID): void;
    /**
     * @description Permite seleccionar un elemento o elementos del DOM
     * @param {Permite seleccionar un elemento o elementos del DOM} selector
     * @returns
     */
    select(selector: any): NodeListOf<any>;
    /**
     * Permite definir los estilos de las lista
     * que poseen el efecto acordeón para desplegar
     * submenus asociados.
     * @param {*} c Configuración de la colección
     */
    acordeon(c: any): void;
    desplegable(c: any): void;
    /**
     * Carga la configuración para definir los estilos y la visual de
     * la lista.
     * @param {Configuración de la colección} c
     */
    cargarConfiguracion(c: any): void;
    /**
     * Este método permite validar si todos los parámetros que
     * están incluidos en el objeto JSON que se envía por parámetro
     * a la función de inicialización.
     * @param {Configuración de la lista} c
     * @returns false si los parámtros de configuración son erroneos
     */
    validarConfig(c: any): boolean;
    iniciar({ contexto, colorFondo, colorTexto, colorFlechas }?: {
        contexto?: string;
        colorFondo?: string;
        colorTexto?: string;
        colorFlechas?: string;
    }): void;
}

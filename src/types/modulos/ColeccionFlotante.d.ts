export default ColeccionFlotante;
/**
 * Clase que permite la gestión de las colecciones flotantes
 * generando un conjunto de enlaces que pueden ser utilizados
 * con diferentes propositos en función de las necesidades del
 * desarrollador.
 */
declare class ColeccionFlotante {
    /**
     * En poryectos web dinámicos es necesario en muchas oportunidades
     * desvincular los eventos asociados a los elementos, en este caso
     * limpia el buffer de eventos.
     * @param {ID de la colección que permite gestionar su lógica} contexto
     */
    destroy(contexto: any): void;
    /**
     * Este método permite cargar la configuración
     * de los elementos que conforman la colección
     * @param {JSON de Configuración de la lista} c
     */
    inicializarElemento(c: any): void;
    /**
     * Función de validación de los datos ingresados por parámetro
     * a través de objeto JSON destinado a esta función.
     * {
     *    contexto: "ID DE LA LISTA FLOTANTE" Ej: #lista1
     *    fondoItem: "Color del fondo" Ej: fd-gris-n clazse de bodystyle
     *    colorTexto: "Color del texto de los elementos" Ej: c-white
     *    altura: distancia entre la lista y el inicio de la página (INT) positivo
     * }
     * @param {JSON de configuración del elemento ColecciónFlotante} c
     * @returns false si no son válidos los datos de entrada al elemento.
     *          true si son válidos
     */
    validarColeecion(c: any): boolean;
    iniciar({ contexto, fondoItem, colorTexto, altura }?: {
        contexto?: string;
        fondoItem?: string;
        colorTexto?: string;
        altura?: number;
    }): void;
}

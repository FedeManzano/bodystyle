export default Select;
/**
 * Módulo (21) Clase que permite gestionar el Select de bodystyle
 */
declare class Select {
    visible: boolean;
    /**
     * Método que permite desasociar la lógica del elemento SELECT
     * pide como parámetro el ID del select a desasociar.
     * @param {ID} contexto id del select
     */
    destroy(contexto: ID): void;
    /**
     *
     * @param {ID del select} contexto
     * @param {Efecto hover asociado} efecto
     */
    inicializar(contexto: any, efecto: any): void;
    show_hide_list(contexto: any): void;
    iniciar(contexto: any, hover?: string): void;
}

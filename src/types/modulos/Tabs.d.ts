export default Tab;
declare class Tab {
    destroy(contexto: any): void;
    /**
     * Inicializa el Tab de tipo solapa
     * @param {ID del contenedor padre de todo el tab} contexto
     */
    inicializar(contexto: any): void;
    /**
     * Inicializa el Tab tipo borde
     * @param {Obj Json con la configuración} c
     */
    inicializarBorde(c: any): void;
    cambiarBorde(c: any): void;
    cambiarSolapa(contexto: any): void;
    iniciar(contexto: any): void;
    iniciarBorde({ contexto, colorFuente, colorFondo, colorBorde }?: {
        contexto?: string;
        colorFuente?: string;
        colorFondo?: string;
        colorBorde?: string;
    }): void;
}

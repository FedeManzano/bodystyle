export default scrollSpyInstance;
declare const scrollSpyInstance: ScrollSpy;
/**
 * Módulo (21) Elemento que sirve como guia para el usuario
 * de manera tal que el usuario conozca en cada momento
 * el lugar de la página en la cual se encuentra.
 */
declare class ScrollSpy {
    config: {};
    ids: any[];
    eventoScroll(): void;
    validarListaScroll(modulo: any, ancho: any, tamFuente: any, colorBorde: any, alturaBorde: any, separacion: any, colorSeleccionado: any, colorNoSeleccionado: any): boolean;
    iniciar({ ancho, tamFuente, colorBorde, alturaBorde, separacion, colorSeleccionado, colorNoSeleccionado }?: {
        ancho?: number;
        tamFuente?: number;
        colorBorde?: string;
        alturaBorde?: number;
        separacion?: number;
        colorSeleccionado?: string;
        colorNoSeleccionado?: string;
    }): void;
    seleccionarIndice(indice: any): void;
    destroy(): void;
}

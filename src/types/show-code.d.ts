/**
 * TypeScript definitions for @bodystyle/show-code
 * Módulos para resaltado de sintaxis de código
 */

declare module '@bodystyle/show-code/src/modulos/CodigoHtml' {
    export interface CodigoHtmlModule {
        iniciar(config?: CodigoConfig): void;
    }
    const CodigoHtml: CodigoHtmlModule;
    export default CodigoHtml;
}

declare module '@bodystyle/show-code/src/modulos/CodigoJs' {
    export interface CodigoJsModule {
        iniciar(config?: CodigoConfig): void;
    }
    const CodigoJs: CodigoJsModule;
    export default CodigoJs;
}

declare module '@bodystyle/show-code/src/modulos/CodigoCss' {
    export interface CodigoCssModule {
        iniciar(config?: CodigoConfig): void;
    }
    const CodigoCss: CodigoCssModule;
    export default CodigoCss;
}

declare module '@bodystyle/show-code/src/modulos/CodigoJava' {
    export interface CodigoJavaModule {
        iniciar(config?: CodigoConfig): void;
    }
    const CodigoJava: CodigoJavaModule;
    export default CodigoJava;
}

declare module '@bodystyle/show-code/src/modulos/CodigoC' {
    export interface CodigoCModule {
        iniciar(config?: CodigoConfig): void;
    }
    const CodigoC: CodigoCModule;
    export default CodigoC;
}

/**
 * Configuración para módulos de código
 */
export interface CodigoConfig {
    tema?: 'light' | 'dark';
    lineNumbers?: boolean;
    [key: string]: any;
}

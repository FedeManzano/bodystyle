/**
 * TypeScript definitions for dytips v3.0.0
 * Biblioteca de tooltips, dropdowns y elementos dinámicos
 */

/**
 * Configuración base para módulos dinámicos
 */
export interface DytipsConfig {
    [key: string]: any;
}

/**
 * Módulo DropDown
 */
declare module 'dytips/src/modulos/DropDown' {
    export interface DropDownModule {
        iniciar(config?: DytipsConfig): void;
        destruir(elemento?: HTMLElement): void;
    }
    const Drop: DropDownModule;
    export default Drop;
}

/**
 * Módulo ComentariosDinamicos
 */
declare module 'dytips/src/modulos/ComentariosDinamicos' {
    export interface ComentariosDinamicosModule {
        iniciar(): void;
        destruir(): void;
    }
    const Comentario: ComentariosDinamicosModule;
    export default Comentario;
}

/**
 * Módulo ToolTips
 */
declare module 'dytips/src/modulos/ToolTips' {
    export interface ToolTipsModule {
        iniciar(): void;
        destruir(): void;
    }
    const Tips: ToolTipsModule;
    export default Tips;
}

/**
 * Módulo Toast
 */
declare module 'dytips/src/modulos/Toast' {
    export interface ToastConfig {
        mensaje?: string;
        duracion?: number;
        color?: string;
        posicion?: 'top' | 'bottom';
        [key: string]: any;
    }

    export interface ToastModule {
        ejecutar(config?: ToastConfig): void;
    }
    const Ts: ToastModule;
    export default Ts;
}

/**
 * Módulo Personalizado
 */
declare module 'dytips/src/modulos/Personalizado' {
    export interface PersonalizadoConfig {
        ori: string;
        ele: string;
        [key: string]: any;
    }

    export interface PersonalizadoModule {
        iniciar(config: PersonalizadoConfig): void;
        destruir(): void;
    }
    const Per: PersonalizadoModule;
    export default Per;
}

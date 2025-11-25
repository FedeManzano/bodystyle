/**
 * TypeScript definitions for remaining Bodystyle modules
 * Includes all utility and UI component modules
 */

// ==================== UI Components ====================

/**
 * Modal module - Modal window management
 */
export interface ModalModule {
    iniciar(): void;
    destroy(): void;
}
export const Modal: ModalModule;

/**
 * Toast module - Toast notification system
 */
export interface ToastModule {
    ejecutar(config: {
        mensaje?: string;
        duracion?: number;
        color?: string;
        posicion?: 'top' | 'bottom';
    }): void;
}
export const Toast: ToastModule;

/**
 * Alerta module - Alert management
 */
export interface AlertaModule {
    iniciar(): void;
}
export const Alerta: AlertaModule;

/**
 * Tab class - Tab navigation component
 */
export class Tab {
    constructor();
    iniciar(config?: any): void;
    destroy(): void;
}

/**
 * Select class - Custom select component
 */
export class Select {
    constructor();
    iniciar(config?: any): void;
    destroy(): void;
}

// ==================== Dynamic Elements ====================

/**
 * Dropdown module - Dropdown menu management
 */
export interface DropdownModule {
    iniciar(): void;
    destroy(): void;
}
export const DropDown: DropdownModule;

/**
 * ToolTips module - Tooltip management
 */
export interface ToolTipsModule {
    iniciar(): void;
    destroy(): void;
}
export const ToolTips: ToolTipsModule;

/**
 * Personalizado module - Custom dynamic elements
 */
export interface PersonalizadoModule {
    iniciar(config: { ori: string; ele: string }): void;
    destroy(): void;
}
export const Personalizado: PersonalizadoModule;

/**
 * ComentarioDinamico module - Dynamic comments
 */
export interface ComentarioDinamicoModule {
    iniciar(): void;
    destroy(): void;
}
export const ComentarioDinamico: ComentarioDinamicoModule;

// ==================== Navigation ====================

/**
 * Navigation module - Navigation bar management
 */
export interface NavigationModule {
    Init(id: string, border?: boolean): void;
    Destroy(): void;
}
export const Navigation: NavigationModule;

/**
 * SidebarDrop module - Sidebar with dropdown
 */
export interface SidebarDropModule {
    Init(config: { idNav: string; idSidebar: string }): void;
}
export const SidebarDrop: SidebarDropModule;

/**
 * SidebarHandler module - Sidebar event handling
 */
export interface SidebarHandlerModule {
    iniciar(): void;
    destroy(): void;
}
export const SidebarHandler: SidebarHandlerModule;

/**
 * ColeccionFlotante class - Floating collection component
 */
export class ColeccionFlotante {
    constructor();
    iniciar(config?: any): void;
    destroy(): void;
}

// ==================== Scroll & Navigation ====================

/**
 * ScrollSpy module - Scroll spy navigation
 */
export interface ScrollSpyModule {
    iniciar(config: {
        ancho?: string;
        tamFuente?: string;
        colorBorde?: string;
        alturaBorde?: string;
        separacion?: string;
        colorSeleccionado?: string;
        colorNoSeleccionado?: string;
    }): void;
    destroy(): void;
}
export const ScrollSpy: ScrollSpyModule;

/**
 * BotonInicio module - Back to top button
 */
export interface BotonInicioModule {
    iniciar(): void;
    destroy(): void;
}
export const BotonInicio: BotonInicioModule;

// ==================== Visual Effects ====================

/**
 * Paralax module - Parallax effect
 */
export interface ParalaxModule {
    iniciar(): void;
}
export const Paralax: ParalaxModule;

/**
 * Imagenes module - Image zoom effect
 */
export interface ImagenesModule {
    iniciar(): void;
    destroy(): void;
}
export const Imagenes: ImagenesModule;

// ==================== Form Elements ====================

/**
 * Range module - Range input styling
 */
export interface RangeModule {
    iniciar(): void;
}
export const Range: RangeModule;

/**
 * GruposInput module - Input group management
 */
export interface GruposInputModule {
    iniciar(): void;
}
export const GruposInput: GruposInputModule;

/**
 * InputHandler module - File input handling
 */
export interface InputHandlerModule {
    iniciar(): void;
}
export const InputHandler: InputHandlerModule;

/**
 * Desactivado module - Disabled element management
 */
export interface DesactivadoModule {
    iniciar(): void;
}
export const Desactivado: DesactivadoModule;

// ==================== Code Syntax Highlighting ====================

/**
 * Code highlighting configuration
 */
export interface CodigoConfig {
    tema?: string;
    lineNumbers?: boolean;
}

/**
 * CodigoHtml module - HTML syntax highlighting
 */
export interface CodigoHtmlModule {
    iniciar(config?: CodigoConfig): void;
}
export const Html: CodigoHtmlModule;

/**
 * CodigoJs module - JavaScript syntax highlighting
 */
export interface CodigoJsModule {
    iniciar(config?: CodigoConfig): void;
}
export const Js: CodigoJsModule;

/**
 * CodigoCss module - CSS syntax highlighting
 */
export interface CodigoCssModule {
    iniciar(config?: CodigoConfig): void;
}
export const Css: CodigoCssModule;

/**
 * CodigoJava module - Java syntax highlighting
 */
export interface CodigoJavaModule {
    iniciar(config?: CodigoConfig): void;
}
export const Java: CodigoJavaModule;

/**
 * CodigoC module - C syntax highlighting
 */
export interface CodigoCModule {
    iniciar(config?: CodigoConfig): void;
}
export const C: CodigoCModule;

// ==================== Error Management ====================

/**
 * Error validation module
 */
export interface ErroresModule {
    fondo: {
        val(color: string): boolean;
        mje: string;
    };
}
export const ERR: ErroresModule;

/**
 * Error management module
 */
export interface GestionErroresModule {
    validar(elemento: HTMLElement): boolean;
}
export const GestionErrores: GestionErroresModule;

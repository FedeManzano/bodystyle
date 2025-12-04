/**
 * TypeScript definitions for Bodystyle v6.0.0
 * Biblioteca de estilos estáticos y dinámicos para la creación del Front-End WEB
 * @author Federico Manzano
 * @license MIT
 */

// Export all module types
export * from './Waves';
export * from './Animaciones';
export * from './Colecciones';
export * from './modules';
export * from './show-code';
export * from './dytips';

// Global namespace for window.BS
declare global {
    interface Window {
        BS: typeof import('./index').BS;
        Waves: typeof import('./Waves').Waves;
    }
}

/**
 * Main Bodystyle API
 */
export interface BodystyleAPI {
    // Dynamics
    DynamicsAutoInit(): void;
    DynamicsAutoDestroy(): void;

    // Personalizado
    PersonalizadoInit(config: PersonalizadoConfig): void;
    PersonalizadoDestroy(): void;
    PersonalizedInit(config: PersonalizadoConfig): void;
    PersonalizedDestroy(): void;

    // Dropdown
    DropDownInit(config?: any): void;
    DropDownDestroy(elemento?: HTMLElement): void;

    // Toast
    Toast(config: ToastConfig): void;

    // Tooltips
    ToolTipsInit(): void;
    ToolTipsDestroy(): void;

    // Comentarios
    CommentInit(): void;
    CommentDestroy(): void;
    ComentariosInit(): void;
    ComentariosDestroy(): void;

    // Modales
    ModalInit(config?: any): void;
    ModalDestroy(): void;

    // ScrollSpy
    ScrollSpyInit(config: ScrollSpyConfig): void;
    ScrollSpyDestroy(): void;

    // Imagenes
    ImagenesInit(): void;
    ImagenesDestroy(): void;

    // Paralax
    ParalaxInit(): void;

    // Botón Inicio
    BotonInicioInit(): void;
    BotonInicioDestroy(): void;

    // Tabs
    TabInit(): Tab;

    // Colecciones
    Colecciones(): Coleccion;
    ColeccionFlot(): ColeccionFlotante;

    // Select
    SelectInit(): Select;

    // Navigation
    SidebarDropInit(conf: SidebarDropConfig): void;
    NavigationInit(id: string, border?: boolean): void;
    NavigationDestroy(): void;

    // Waves
    WavesInit(): void;
    WavesDestroy(): void;

    // Código Pintado
    CodigoHtmlInit(config?: CodigoConfig): void;
    CodigoCssInit(config?: CodigoConfig): void;
    CodigoJsInit(config?: CodigoConfig): void;
    CodigoJavaInit(config?: CodigoConfig): void;
    CodigoCInit(config?: CodigoConfig): void;

    // Alias
    CodeHtmlInit(config?: CodigoConfig): void;
    CodeCssInit(config?: CodigoConfig): void;
    CodeJsInit(config?: CodigoConfig): void;
    CodeJavaInit(config?: CodigoConfig): void;
    CodeCInit(config?: CodigoConfig): void;

    CodeAutoInit(config?: CodigoConfig): void;
    CodigoAutoInit(config?: CodigoConfig): void;

    // Desactivado
    DesactivadoInit(): void;
    InactiveInit(): void;

    // Input Handler
    InputHandlerInit(): void;
}

/**
 * Configuration interfaces
 */
export interface PersonalizadoConfig {
    ori: string;
    ele: string;
}

export interface ToastConfig {
    mensaje?: string;
    duracion?: number;
    color?: string;
    posicion?: 'top' | 'bottom';
}

export interface ScrollSpyConfig {
    ancho?: string;
    tamFuente?: string;
    colorBorde?: string;
    alturaBorde?: string;
    separacion?: string;
    colorSeleccionado?: string;
    colorNoSeleccionado?: string;
}

export interface SidebarDropConfig {
    idNav: string;
    idSidebar: string;
}

export interface CodigoConfig {
    tema?: string;
    lineNumbers?: boolean;
}

/**
 * Main export
 */
export const BS: BodystyleAPI;
export default BS;

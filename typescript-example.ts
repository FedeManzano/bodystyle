/**
 * TypeScript Usage Example for Bodystyle
 * This file demonstrates how to use Bodystyle with TypeScript
 */

// Import the main Bodystyle API
import BS from './src/types/index';

// Import specific modules
import { Waves } from './src/types/Waves';
import { slideUp, slideDown } from './src/types/Animaciones';
import { Coleccion } from './src/types/Colecciones';

// ==================== Example 1: Using Waves ====================
function initializeWaves(): void {
    // Initialize waves effect
    Waves.iniciar();

    // Later, destroy if needed
    // Waves.destroy();
}

// ==================== Example 2: Using Animations ====================
function animateElement(): void {
    const element = document.querySelector('.my-element') as HTMLElement;

    if (element) {
        // Slide down with custom duration and callback
        slideDown(element, 500, () => {
            console.log('Animation complete!');
        });

        // Slide up after 2 seconds
        setTimeout(() => {
            slideUp(element, 300);
        }, 2000);
    }
}

// ==================== Example 3: Using Collections ====================
function setupCollection(): void {
    const coleccion = new Coleccion();

    coleccion.iniciar({
        contexto: 'mi-lista',
        colorFondo: 'fd-blanco',
        colorTexto: 'c-negro',
        colorFlechas: '#333'
    });
}

// ==================== Example 4: Using BS Global API ====================
function initializeComponents(): void {
    // Initialize tooltips
    BS.ToolTipsInit();

    // Initialize modal
    BS.ModalInit();

    // Show a toast notification
    BS.Toast({
        mensaje: 'Welcome to Bodystyle with TypeScript!',
        duracion: 3000,
        color: 'bg-success',
        posicion: 'top'
    });

    // Initialize ScrollSpy with configuration
    BS.ScrollSpyInit({
        ancho: '250px',
        tamFuente: '14px',
        colorBorde: 'fd-primary',
        alturaBorde: '3px',
        separacion: '100px',
        colorSeleccionado: '#007bff',
        colorNoSeleccionado: '#6c757d'
    });
}

// ==================== Example 5: Code Syntax Highlighting ====================
function initializeCodeHighlighting(): void {
    // Initialize all code highlighting modules
    BS.CodeAutoInit({
        tema: 'dark',
        lineNumbers: true
    });

    // Or initialize specific languages
    BS.CodeJsInit({ tema: 'light' });
    BS.CodeHtmlInit({ tema: 'dark' });
}

// ==================== Example 6: Navigation ====================
function setupNavigation(): void {
    // Initialize navigation
    BS.NavigationInit('main-nav', true);

    // Setup sidebar dropdown
    BS.SidebarDropInit({
        idNav: 'main-nav',
        idSidebar: 'main-sidebar'
    });
}

// ==================== Example 7: Dynamic Elements ====================
function setupDynamicElements(): void {
    // Initialize all dynamic elements at once
    BS.DynamicsAutoInit();

    // Or initialize individually
    BS.DropDownInit();
    BS.ToolTipsInit();
    BS.ComentariosInit();

    // Custom dynamic element
    BS.PersonalizadoInit({
        ori: '.trigger-element',
        ele: '.dynamic-content'
    });
}

// ==================== Example 8: Tabs ====================
function setupTabs(): void {
    const tabs = BS.TabInit();
    tabs.iniciar({
        contexto: 'my-tabs'
    });
}

// ==================== Example 9: Select ====================
function setupCustomSelect(): void {
    const select = BS.SelectInit();
    select.iniciar({
        contexto: 'my-select'
    });
}

// ==================== Example 10: Type Safety ====================
// TypeScript will catch errors at compile time
function demonstrateTypeSafety(): void {
    // ✅ Correct usage
    BS.Toast({
        mensaje: 'Hello',
        duracion: 3000,
        posicion: 'top' // TypeScript knows this must be 'top' or 'bottom'
    });

    // ❌ TypeScript will show an error for invalid values
    // BS.Toast({
    //   posicion: 'middle' // Error: Type '"middle"' is not assignable to type '"top" | "bottom"'
    // });
}

// Initialize everything on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    initializeWaves();
    initializeComponents();
    setupNavigation();
});

export {
    initializeWaves,
    animateElement,
    setupCollection,
    initializeComponents,
    initializeCodeHighlighting,
    setupNavigation,
    setupDynamicElements,
    setupTabs,
    setupCustomSelect
};

/**
 * @jest-environment jsdom
 * 
 * GUÍA DE TESTING: PERSONALIZADO
 * ==============================
 * Este test verifica el módulo Personalizado.js, que es otro wrapper
 * de la librería dynamics-tips.
 */

import Personalizado from '../modulos/Personalizado';

/**
 * MOCK DE LA DEPENDENCIA
 * ======================
 * Simulamos 'dynamics-tips/src/modulos/Personalizado'
 * para aislar el test y evitar ejecutar código que depende de jQuery.
 */
jest.mock('dytips/src/modulos/Personalizado', () => ({
    __esModule: true,
    default: {
        iniciar: jest.fn(),
        destroy: jest.fn()
    }
}));

// Importamos el mock para poder hacer aserciones sobre él
import Per from 'dytips/src/modulos/Personalizado';

describe('Personalizado.js', () => {

    // Limpieza antes de cada test
    beforeEach(() => {
        jest.clearAllMocks();
    });

    /**
     * TEST DE INTEGRIDAD
     * Verifica que el objeto global se crea correctamente
     */
    test('Debe estar disponible en window.Personalizado', () => {
        expect(window.Personalizado).toBeDefined();
        expect(typeof window.Personalizado).toBe('object');
    });

    /**
     * TEST DE INTERFAZ
     * Verifica que los métodos esperados existen
     */
    test('Debe tener los métodos iniciar y destroy', () => {
        expect(window.Personalizado.iniciar).toBeDefined();
        expect(typeof window.Personalizado.iniciar).toBe('function');
        expect(window.Personalizado.destroy).toBeDefined();
        expect(typeof window.Personalizado.destroy).toBe('function');
    });

    /**
     * TEST DE FUNCIONALIDAD (iniciar)
     * Verifica que se pasan los parámetros de configuración correctamente
     */
    test('Debe delegar iniciar() con configuración a la dependencia', () => {
        const config = {
            ori: "disparador",
            ele: "alert-op-black"
        };

        // Ejecutamos el método del wrapper
        window.Personalizado.iniciar(config);

        // Verificamos que la dependencia recibió la configuración exacta
        expect(Per.iniciar).toHaveBeenCalledWith(config);
        expect(Per.iniciar).toHaveBeenCalledTimes(1);
    });

    /**
     * TEST DE FUNCIONALIDAD (destroy)
     * Verifica la limpieza
     */
    test('Debe delegar destroy() a la dependencia', () => {
        window.Personalizado.destroy();

        expect(Per.destroy).toHaveBeenCalledTimes(1);
    });

    /**
     * TEST DE EXPORTACIÓN
     * Verifica que el módulo exportado es el correcto
     */
    test('Debe exportar correctamente el módulo Personalizado', () => {
        expect(Personalizado).toBeDefined();
        expect(Personalizado).toBe(window.Personalizado);
    });
});

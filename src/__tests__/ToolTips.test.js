/**
 * @jest-environment jsdom
 * 
 * GUÍA DE TESTING PARA APRENDER:
 * ================================
 * Este archivo contiene tests unitarios para el módulo ToolTips.js
 * 
 * CONCEPTOS CLAVE:
 * - describe(): Agrupa tests relacionados
 * - test(): Define un test individual
 * - expect(): Hace una afirmación sobre el resultado
 * - jest.fn(): Crea una función "mock" (simulada)
 * - jest.mock(): Simula una dependencia externa
 */

import ToolTips from '../modulos/ToolTips';

/**
 * MOCK DE DEPENDENCIAS:
 * =====================
 * Como ToolTips depende de dynamics-tips (que usa jQuery),
 * creamos un "mock" (simulación) para no depender de la librería real.
 * Esto hace los tests más rápidos y controlables.
 */
jest.mock('dynamics-tips/src/modulos/ToolTips', () => ({
    __esModule: true,
    default: {
        // Creamos funciones simuladas que podemos espiar
        iniciar: jest.fn(),
        destroy: jest.fn()
    }
}));

// Importamos el mock para poder verificar las llamadas
import Tips from 'dynamics-tips/src/modulos/ToolTips';

/**
 * SUITE DE TESTS:
 * ===============
 * describe() agrupa todos los tests relacionados con ToolTips
 */
describe('ToolTips.js', () => {

    /**
     * SETUP (beforeEach):
     * ===================
     * Se ejecuta ANTES de cada test individual.
     * Aquí limpiamos los mocks para que cada test empiece "limpio"
     */
    beforeEach(() => {
        jest.clearAllMocks();
    });

    /**
     * TEST 1: Verificar que el módulo está disponible globalmente
     * ============================================================
     * Objetivo: Confirmar que window.ToolTips existe
     */
    test('Debe estar disponible en window.ToolTips', () => {
        // expect() hace una afirmación
        // toBeDefined() verifica que el valor no es undefined
        expect(window.ToolTips).toBeDefined();
        expect(typeof window.ToolTips).toBe('object');
    });

    /**
     * TEST 2: Verificar que tiene el método iniciar
     * ==============================================
     */
    test('Debe tener el método iniciar', () => {
        expect(window.ToolTips.iniciar).toBeDefined();
        expect(typeof window.ToolTips.iniciar).toBe('function');
    });

    /**
     * TEST 3: Verificar que tiene el método destroy
     * ==============================================
     */
    test('Debe tener el método destroy', () => {
        expect(window.ToolTips.destroy).toBeDefined();
        expect(typeof window.ToolTips.destroy).toBe('function');
    });

    /**
     * TEST 4: Verificar delegación del método iniciar
     * ================================================
     * Objetivo: Confirmar que cuando llamamos a ToolTips.iniciar(),
     * internamente llama a Tips.iniciar()
     */
    test('Debe llamar a Tips.iniciar cuando se llama a ToolTips.iniciar()', () => {
        // Llamamos al método
        window.ToolTips.iniciar();

        // Verificamos que el mock fue llamado
        // toHaveBeenCalled() verifica que la función fue ejecutada
        expect(Tips.iniciar).toHaveBeenCalled();

        // toHaveBeenCalledTimes(1) verifica que fue llamada exactamente 1 vez
        expect(Tips.iniciar).toHaveBeenCalledTimes(1);
    });

    /**
     * TEST 5: Verificar delegación del método destroy
     * ================================================
     */
    test('Debe llamar a Tips.destroy cuando se llama a ToolTips.destroy()', () => {
        window.ToolTips.destroy();

        expect(Tips.destroy).toHaveBeenCalled();
        expect(Tips.destroy).toHaveBeenCalledTimes(1);
    });

    /**
     * TEST 6: Verificar que el export es correcto
     * ============================================
     * Objetivo: Confirmar que el módulo exportado es el mismo
     * que está en window.ToolTips
     */
    test('Debe exportar correctamente el módulo ToolTips', () => {
        expect(ToolTips).toBeDefined();
        expect(ToolTips).toBe(window.ToolTips);
    });
});

/**
 * RESUMEN DE CONCEPTOS:
 * =====================
 * 
 * 1. jest.mock() - Simula dependencias externas
 * 2. jest.fn() - Crea funciones espía
 * 3. beforeEach() - Setup antes de cada test
 * 4. describe() - Agrupa tests relacionados
 * 5. test() - Define un test individual
 * 6. expect() - Hace afirmaciones
 * 7. toBeDefined() - Verifica que existe
 * 8. toBe() - Verifica igualdad estricta
 * 9. toHaveBeenCalled() - Verifica que función fue llamada
 * 10. toHaveBeenCalledTimes(n) - Verifica número de llamadas
 * 
 * PATRÓN AAA (Arrange-Act-Assert):
 * =================================
 * - Arrange: Preparar el escenario (beforeEach)
 * - Act: Ejecutar la acción (window.ToolTips.iniciar())
 * - Assert: Verificar el resultado (expect...)
 */

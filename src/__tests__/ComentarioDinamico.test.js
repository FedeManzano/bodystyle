/**
 * @jest-environment jsdom
 * 
 * GUÍA DE TESTING: MOCKS Y WRAPPERS
 * =================================
 * Este test demuestra cómo probar un módulo "wrapper" (envoltorio)
 * que simplemente delega funcionalidad a otra librería.
 */

import ComentarioDinamico from '../modulos/ComentarioDinamico';

/**
 * MOCKING DE LA DEPENDENCIA
 * =========================
 * Simulamos 'dynamics-tips/src/modulos/ComentariosDinamicos'
 * para aislar nuestro test. No queremos probar si la librería externa
 * funciona (eso es responsabilidad de sus propios tests), sino si
 * nuestro código la llama correctamente.
 */
jest.mock('dytips/src/modulos/ComentariosDinamicos', () => ({
    __esModule: true,
    default: {
        iniciar: jest.fn(),
        destroy: jest.fn()
    }
}));

// Importamos el mock para verificar las llamadas
import Comentario from 'dytips/src/modulos/ComentariosDinamicos';

describe('ComentarioDinamico.js', () => {

    beforeEach(() => {
        // Limpiamos el historial de llamadas de los mocks antes de cada test
        jest.clearAllMocks();
    });

    /**
     * VERIFICACIÓN DE EXISTENCIA
     * ==========================
     * Confirmamos que el objeto global se creó correctamente.
     */
    test('Debe estar disponible en window.ComentarioDinamico', () => {
        expect(window.ComentarioDinamico).toBeDefined();
        expect(typeof window.ComentarioDinamico).toBe('object');
    });

    /**
     * VERIFICACIÓN DE API PÚBLICA
     * ===========================
     * Confirmamos que los métodos esperados existen.
     */
    test('Debe tener los métodos iniciar y destroy', () => {
        expect(window.ComentarioDinamico.iniciar).toBeDefined();
        expect(window.ComentarioDinamico.destroy).toBeDefined();
    });

    /**
     * VERIFICACIÓN DE DELEGACIÓN (iniciar)
     * ====================================
     * Probamos que al llamar a nuestro método, se llama al método
     * de la dependencia.
     */
    test('Debe delegar iniciar() a la dependencia', () => {
        // Act: Ejecutamos nuestro método
        window.ComentarioDinamico.iniciar();

        // Assert: Verificamos que la dependencia fue llamada
        expect(Comentario.iniciar).toHaveBeenCalledTimes(1);
    });

    /**
     * VERIFICACIÓN DE DELEGACIÓN (destroy)
     * ====================================
     */
    test('Debe delegar destroy() a la dependencia', () => {
        // Act
        window.ComentarioDinamico.destroy();

        // Assert
        expect(Comentario.destroy).toHaveBeenCalledTimes(1);
    });

    /**
     * VERIFICACIÓN DE EXPORT
     * ======================
     */
    test('Debe exportar correctamente el módulo', () => {
        expect(ComentarioDinamico).toBe(window.ComentarioDinamico);
    });
});

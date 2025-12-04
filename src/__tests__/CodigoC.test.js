/**
 * @jest-environment jsdom
 */
import C from '../modulos/CodigoC';

// Mock de la dependencia @bodystyle/show-code
jest.mock('@bodystyle/show-code/src/modulos/CodigoC', () => ({
    __esModule: true,
    default: {
        iniciar: jest.fn()
    }
}));

import CodigoC from '@bodystyle/show-code/src/modulos/CodigoC';

describe('CodigoC.js', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Debe estar disponible en window.C', () => {
        expect(window.C).toBeDefined();
        expect(typeof window.C).toBe('object');
    });

    test('Debe tener el método iniciar', () => {
        expect(window.C.iniciar).toBeDefined();
        expect(typeof window.C.iniciar).toBe('function');
    });

    test('Debe llamar a CodigoC.iniciar cuando se llama a C.iniciar()', () => {
        const config = { theme: 'dark' };

        window.C.iniciar(config);

        expect(CodigoC.iniciar).toHaveBeenCalledWith(config);
        expect(CodigoC.iniciar).toHaveBeenCalledTimes(1);
    });

    test('Debe llamar a CodigoC.iniciar sin configuración', () => {
        window.C.iniciar();

        expect(CodigoC.iniciar).toHaveBeenCalledWith(undefined);
        expect(CodigoC.iniciar).toHaveBeenCalledTimes(1);
    });

    test('Debe exportar correctamente el módulo C', () => {
        expect(C).toBeDefined();
        expect(C).toBe(window.C);
    });
});

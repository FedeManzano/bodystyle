/**
 * @jest-environment jsdom
 */
import Java from '../modulos/CodigoJava';

// Mock de la dependencia @bodystyle/show-code
jest.mock('@bodystyle/show-code/src/modulos/CodigoJava', () => ({
    __esModule: true,
    default: {
        iniciar: jest.fn()
    }
}));

import CodigoJava from '@bodystyle/show-code/src/modulos/CodigoJava';

describe('CodigoJava.js', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Debe estar disponible en window.Java', () => {
        expect(window.Java).toBeDefined();
        expect(typeof window.Java).toBe('object');
    });

    test('Debe tener el método iniciar', () => {
        expect(window.Java.iniciar).toBeDefined();
        expect(typeof window.Java.iniciar).toBe('function');
    });

    test('Debe llamar a CodigoJava.iniciar cuando se llama a Java.iniciar()', () => {
        const config = { theme: 'dark' };

        window.Java.iniciar(config);

        expect(CodigoJava.iniciar).toHaveBeenCalledWith(config);
        expect(CodigoJava.iniciar).toHaveBeenCalledTimes(1);
    });

    test('Debe llamar a CodigoJava.iniciar sin configuración', () => {
        window.Java.iniciar();

        expect(CodigoJava.iniciar).toHaveBeenCalledWith(undefined);
        expect(CodigoJava.iniciar).toHaveBeenCalledTimes(1);
    });

    test('Debe exportar correctamente el módulo Java', () => {
        expect(Java).toBeDefined();
        expect(Java).toBe(window.Java);
    });
});

/**
 * @jest-environment jsdom
 */
import Js from '../modulos/CodigoJs';

// Mock de la dependencia show-sintax
jest.mock('show-sintax/src/modulos/CodigoJs', () => ({
    __esModule: true,
    default: {
        iniciar: jest.fn()
    }
}));

import CodigoJs from 'show-sintax/src/modulos/CodigoJs';

describe('CodigoJs.js', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Debe estar disponible en window.Js', () => {
        expect(window.Js).toBeDefined();
        expect(typeof window.Js).toBe('object');
    });

    test('Debe tener el método iniciar', () => {
        expect(window.Js.iniciar).toBeDefined();
        expect(typeof window.Js.iniciar).toBe('function');
    });

    test('Debe llamar a CodigoJs.iniciar cuando se llama a Js.iniciar()', () => {
        const config = { theme: 'dark' };

        window.Js.iniciar(config);

        expect(CodigoJs.iniciar).toHaveBeenCalledWith(config);
        expect(CodigoJs.iniciar).toHaveBeenCalledTimes(1);
    });

    test('Debe llamar a CodigoJs.iniciar sin configuración', () => {
        window.Js.iniciar();

        expect(CodigoJs.iniciar).toHaveBeenCalledWith(undefined);
        expect(CodigoJs.iniciar).toHaveBeenCalledTimes(1);
    });

    test('Debe exportar correctamente el módulo Js', () => {
        expect(Js).toBeDefined();
        expect(Js).toBe(window.Js);
    });
});

/**
 * @jest-environment jsdom
 */
import Css from '../modulos/CodigoCss';

// Mock de la dependencia @bodystyle/show-code
jest.mock('@bodystyle/show-code/src/modulos/CodigoCss', () => ({
    __esModule: true,
    default: {
        iniciar: jest.fn()
    }
}));

import CodigoCss from '@bodystyle/show-code/src/modulos/CodigoCss';

describe('CodigoCss.js', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Debe estar disponible en window.Css', () => {
        expect(window.Css).toBeDefined();
        expect(typeof window.Css).toBe('object');
    });

    test('Debe tener el método iniciar', () => {
        expect(window.Css.iniciar).toBeDefined();
        expect(typeof window.Css.iniciar).toBe('function');
    });

    test('Debe llamar a CodigoCss.iniciar cuando se llama a Css.iniciar()', () => {
        const config = { theme: 'dark' };

        window.Css.iniciar(config);

        expect(CodigoCss.iniciar).toHaveBeenCalledWith(config);
        expect(CodigoCss.iniciar).toHaveBeenCalledTimes(1);
    });

    test('Debe llamar a CodigoCss.iniciar sin configuración', () => {
        window.Css.iniciar();

        expect(CodigoCss.iniciar).toHaveBeenCalledWith(undefined);
        expect(CodigoCss.iniciar).toHaveBeenCalledTimes(1);
    });

    test('Debe exportar correctamente el módulo Css', () => {
        expect(Css).toBeDefined();
        expect(Css).toBe(window.Css);
    });
});

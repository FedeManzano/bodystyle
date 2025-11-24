/**
 * @jest-environment jsdom
 */
import Html from '../modulos/CodigoHtml';

// Mock de la dependencia show-sintax
jest.mock('show-sintax/src/modulos/CodigoHtml', () => ({
    __esModule: true,
    default: {
        iniciar: jest.fn()
    }
}));

import CodigoHtml from 'show-sintax/src/modulos/CodigoHtml';

describe('CodigoHtml.js', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Debe estar disponible en window.Html', () => {
        expect(window.Html).toBeDefined();
        expect(typeof window.Html).toBe('object');
    });

    test('Debe tener el método iniciar', () => {
        expect(window.Html.iniciar).toBeDefined();
        expect(typeof window.Html.iniciar).toBe('function');
    });

    test('Debe llamar a CodigoHtml.iniciar cuando se llama a Html.iniciar()', () => {
        const config = { theme: 'dark' };

        window.Html.iniciar(config);

        expect(CodigoHtml.iniciar).toHaveBeenCalledWith(config);
        expect(CodigoHtml.iniciar).toHaveBeenCalledTimes(1);
    });

    test('Debe llamar a CodigoHtml.iniciar sin configuración', () => {
        window.Html.iniciar();

        expect(CodigoHtml.iniciar).toHaveBeenCalledWith(undefined);
        expect(CodigoHtml.iniciar).toHaveBeenCalledTimes(1);
    });

    test('Debe exportar correctamente el módulo Html', () => {
        expect(Html).toBeDefined();
        expect(Html).toBe(window.Html);
    });
});

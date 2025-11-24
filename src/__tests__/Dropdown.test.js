/**
 * @jest-environment jsdom
 */
import DropDown from '../modulos/Dropdown';

// Mock de la dependencia dynamics-tips
jest.mock('dynamics-tips/src/modulos/DropDown', () => ({
    __esModule: true,
    default: {
        iniciar: jest.fn(),
        destroy: jest.fn()
    }
}));

import Drop from 'dynamics-tips/src/modulos/DropDown';

describe('Dropdown.js', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Debe estar disponible en window.DropDown', () => {
        expect(window.DropDown).toBeDefined();
        expect(typeof window.DropDown).toBe('object');
    });

    test('Debe tener los métodos iniciar y destroy', () => {
        expect(window.DropDown.iniciar).toBeDefined();
        expect(typeof window.DropDown.iniciar).toBe('function');
        expect(window.DropDown.destroy).toBeDefined();
        expect(typeof window.DropDown.destroy).toBe('function');
    });

    test('Debe delegar iniciar() a la dependencia', () => {
        window.DropDown.iniciar();

        expect(Drop.iniciar).toHaveBeenCalledTimes(1);
    });

    test('Debe delegar destroy() a la dependencia', () => {
        window.DropDown.destroy();

        expect(Drop.destroy).toHaveBeenCalledTimes(1);
    });

    test('Debe exportar correctamente el módulo DropDown', () => {
        expect(DropDown).toBeDefined();
        expect(DropDown).toBe(window.DropDown);
    });
});

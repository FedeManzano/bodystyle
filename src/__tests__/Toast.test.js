/**
 * @jest-environment jsdom
 */

// Mock the external dynamics-tips Toast module
jest.mock('dytips/src/modulos/Toast', () => ({
    toast: jest.fn()
}));

import Toast from '../modulos/Toast';
import Ts from 'dytips/src/modulos/Toast';

describe('Toast module', () => {
    beforeEach(() => {
        // Clear mock calls before each test
        jest.clearAllMocks();
    });

    test('window.Toast should be defined and equal the exported object', () => {
        expect(window.Toast).toBeDefined();
        expect(window.Toast).toBe(Toast);
    });

    test('Toast.ejecutar forwards the config to Ts.toast', () => {
        const config = { message: 'Hola', type: 'info' };
        Toast.ejecutar(config);
        expect(Ts.toast).toHaveBeenCalledWith(config);
        expect(Ts.toast).toHaveBeenCalledTimes(1);
    });

    test('Toast.ejecutar works without a config object', () => {
        Toast.ejecutar();
        expect(Ts.toast).toHaveBeenCalledWith(undefined);
        expect(Ts.toast).toHaveBeenCalledTimes(1);
    });
});

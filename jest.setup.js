import '@testing-library/jest-dom';

/**
 * Setup global para Jest
 * Este archivo se ejecuta antes de cada suite de tests
 */

// Mock de Web Animations API para tests
// La Web Animations API no está disponible en jsdom por defecto
if (!Element.prototype.animate) {
    Element.prototype.animate = jest.fn(function (keyframes, options) {
        return {
            finished: Promise.resolve(),
            cancel: jest.fn(),
            play: jest.fn(),
            pause: jest.fn(),
            finish: jest.fn(),
            reverse: jest.fn(),
            currentTime: 0,
            playbackRate: 1
        };
    });
}

// Mock de console.error para tests que esperan errores
const originalError = console.error;
beforeAll(() => {
    console.error = jest.fn((...args) => {
        // Solo mostrar errores que no sean esperados en tests
        if (!args[0]?.includes('(WAVES)')) {
            originalError(...args);
        }
    });
});

afterAll(() => {
    console.error = originalError;
});

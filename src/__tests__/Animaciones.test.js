/**
 * @jest-environment jsdom
 */

import { slideUp, slideDown } from '../modulos/Animaciones';

describe('Módulo Animaciones', () => {
    let testElement;

    beforeEach(() => {
        // Crear elemento de prueba
        testElement = document.createElement('div');
        testElement.style.height = '100px';
        testElement.style.overflow = 'visible';
        testElement.textContent = 'Test content';
        document.body.appendChild(testElement);

        // Mock de Element.animate
        testElement.animate = jest.fn(() => ({
            onfinish: null,
            finished: Promise.resolve()
        }));
    });

    afterEach(() => {
        // Limpiar DOM
        document.body.innerHTML = '';
        jest.clearAllMocks();
    });

    describe('slideUp', () => {
        test('Debe existir como función exportada', () => {
            expect(slideUp).toBeDefined();
            expect(typeof slideUp).toBe('function');
        });

        test('Debe manejar elemento null o undefined', () => {
            expect(() => slideUp(null)).not.toThrow();
            expect(() => slideUp(undefined)).not.toThrow();
        });

        test('Debe aceptar un HTMLElement', () => {
            slideUp(testElement);
            expect(testElement.animate).toHaveBeenCalled();
        });

        test('Debe aceptar un NodeList', () => {
            const nodeList = document.querySelectorAll('div');
            slideUp(nodeList);
            expect(testElement.animate).toHaveBeenCalled();
        });

        test('Debe llamar a animate con parámetros correctos', () => {
            const duration = 500;
            slideUp(testElement, duration);

            expect(testElement.animate).toHaveBeenCalledWith(
                expect.arrayContaining([
                    expect.objectContaining({ height: expect.any(String) }),
                    expect.objectContaining({ height: '0px' })
                ]),
                expect.objectContaining({
                    duration: duration,
                    easing: 'ease-in-out',
                    fill: 'forwards'
                })
            );
        });

        test('Debe usar duración por defecto de 300ms', () => {
            slideUp(testElement);

            expect(testElement.animate).toHaveBeenCalledWith(
                expect.anything(),
                expect.objectContaining({
                    duration: 300
                })
            );
        });

        test('Debe establecer opacity a 1 antes de animar', () => {
            slideUp(testElement);
            expect(testElement.style.opacity).toBe('1');
        });

        test('Debe ocultar el elemento al finalizar', () => {
            const mockAnimation = {
                onfinish: null
            };
            testElement.animate = jest.fn(() => mockAnimation);

            slideUp(testElement);

            // Simular finalización de animación
            mockAnimation.onfinish();

            expect(testElement.style.display).toBe('none');
        });

        test('Debe limpiar propiedad height al finalizar', () => {
            const mockAnimation = {
                onfinish: null
            };
            testElement.animate = jest.fn(() => mockAnimation);

            slideUp(testElement);
            mockAnimation.onfinish();

            expect(testElement.style.height).toBe('');
        });

        test('Debe ejecutar callback al finalizar', () => {
            const callback = jest.fn();
            const mockAnimation = {
                onfinish: null
            };
            testElement.animate = jest.fn(() => mockAnimation);

            slideUp(testElement, 300, callback);
            mockAnimation.onfinish();

            expect(callback).toHaveBeenCalled();
        });

        test('No debe fallar si no se proporciona callback', () => {
            const mockAnimation = {
                onfinish: null
            };
            testElement.animate = jest.fn(() => mockAnimation);

            slideUp(testElement);
            expect(() => mockAnimation.onfinish()).not.toThrow();
        });
    });

    describe('slideDown', () => {
        test('Debe existir como función exportada', () => {
            expect(slideDown).toBeDefined();
            expect(typeof slideDown).toBe('function');
        });

        test('Debe manejar elemento null o undefined', () => {
            expect(() => slideDown(null)).not.toThrow();
            expect(() => slideDown(undefined)).not.toThrow();
        });

        test('Debe aceptar un HTMLElement', () => {
            slideDown(testElement);
            expect(testElement.animate).toHaveBeenCalled();
        });

        test('Debe aceptar un NodeList', () => {
            const nodeList = document.querySelectorAll('div');
            slideDown(nodeList);
            expect(testElement.animate).toHaveBeenCalled();
        });

        test('Debe llamar a animate con parámetros correctos', () => {
            const duration = 500;
            slideDown(testElement, duration);

            expect(testElement.animate).toHaveBeenCalledWith(
                expect.arrayContaining([
                    expect.objectContaining({ height: '0px' }),
                    expect.objectContaining({ height: expect.any(String) })
                ]),
                expect.objectContaining({
                    duration: duration,
                    easing: 'ease-in-out',
                    fill: 'forwards'
                })
            );
        });

        test('Debe usar duración por defecto de 300ms', () => {
            slideDown(testElement);

            expect(testElement.animate).toHaveBeenCalledWith(
                expect.anything(),
                expect.objectContaining({
                    duration: 300
                })
            );
        });

        test('Debe establecer display block antes de animar', () => {
            testElement.style.display = 'none';
            slideDown(testElement);
            expect(testElement.style.display).toBe('block');
        });

        test('Debe establecer opacity a 1 antes de animar', () => {
            slideDown(testElement);
            expect(testElement.style.opacity).toBe('1');
        });

        test('Debe establecer height a 0 antes de animar', () => {
            slideDown(testElement);
            expect(testElement.style.height).toBe('0px');
        });

        test('Debe establecer overflow hidden antes de animar', () => {
            slideDown(testElement);
            expect(testElement.style.overflow).toBe('hidden');
        });

        test('Debe limpiar propiedades al finalizar', () => {
            const mockAnimation = {
                onfinish: null
            };
            testElement.animate = jest.fn(() => mockAnimation);

            slideDown(testElement);
            mockAnimation.onfinish();

            expect(testElement.style.height).toBe('');
            expect(testElement.style.overflow).toBe('');
            expect(testElement.style.opacity).toBe('');
        });

        test('Debe ejecutar callback al finalizar', () => {
            const callback = jest.fn();
            const mockAnimation = {
                onfinish: null
            };
            testElement.animate = jest.fn(() => mockAnimation);

            slideDown(testElement, 300, callback);
            mockAnimation.onfinish();

            expect(callback).toHaveBeenCalled();
        });

        test('No debe fallar si no se proporciona callback', () => {
            const mockAnimation = {
                onfinish: null
            };
            testElement.animate = jest.fn(() => mockAnimation);

            slideDown(testElement);
            expect(() => mockAnimation.onfinish()).not.toThrow();
        });
    });

    describe('Integración slideUp y slideDown', () => {
        test('Debe poder alternar entre slideUp y slideDown', () => {
            const mockAnimation = {
                onfinish: null
            };
            testElement.animate = jest.fn(() => mockAnimation);

            // slideDown
            slideDown(testElement);
            mockAnimation.onfinish();
            expect(testElement.style.display).not.toBe('none');

            // slideUp
            slideUp(testElement);
            mockAnimation.onfinish();
            expect(testElement.style.display).toBe('none');
        });

        test('Callbacks deben ejecutarse en secuencia', () => {
            const mockAnimation = {
                onfinish: null
            };
            testElement.animate = jest.fn(() => mockAnimation);

            const callOrder = [];
            const callback1 = jest.fn(() => callOrder.push('down'));
            const callback2 = jest.fn(() => callOrder.push('up'));

            slideDown(testElement, 300, callback1);
            mockAnimation.onfinish();

            slideUp(testElement, 300, callback2);
            mockAnimation.onfinish();

            expect(callOrder).toEqual(['down', 'up']);
        });
    });
});

/**
 * @jest-environment jsdom
 */
import Alerta from '../modulos/Alerta';

describe('Alerta.js', () => {
    let container;
    let closeButton;

    beforeEach(() => {
        // Setup DOM
        container = document.createElement('div');
        closeButton = document.createElement('button');
        closeButton.className = 'alerta-cerrar';
        container.appendChild(closeButton);
        document.body.appendChild(container);

        // Mock Web Animations API
        Element.prototype.animate = jest.fn().mockImplementation(() => ({
            finished: Promise.resolve(),
            cancel: jest.fn(),
            play: jest.fn(),
            pause: jest.fn(),
            reverse: jest.fn(),
            onfinish: null
        }));

        // Mock setTimeout to run immediately or control time
        jest.useFakeTimers();
    });

    afterEach(() => {
        document.body.innerHTML = '';
        jest.clearAllMocks();
        jest.useRealTimers();
    });

    test('Debe inicializar y agregar evento click', () => {
        const spyAddEventListener = jest.spyOn(closeButton, 'addEventListener');

        Alerta.iniciar();

        expect(spyAddEventListener).toHaveBeenCalledWith('click', expect.any(Function));
    });

    test('Debe animar y remover el elemento al hacer click', () => {
        Alerta.iniciar();

        // Spy on remove method
        const spyRemove = jest.spyOn(closeButton, 'remove');

        // Simulate click
        closeButton.click();

        // Check if animate was called
        expect(closeButton.animate).toHaveBeenCalledWith(
            [{ opacity: 1 }, { opacity: 0 }],
            { duration: 500, easing: "ease-in-out", fill: "forwards" }
        );

        // Fast-forward time
        jest.runAllTimers();

        // Check if element was removed
        expect(spyRemove).toHaveBeenCalled();
    });

    test('Debe remover evento click al destruir', () => {
        Alerta.iniciar();
        const spyRemoveEventListener = jest.spyOn(closeButton, 'removeEventListener');

        Alerta.destroy();

        expect(spyRemoveEventListener).toHaveBeenCalledWith('click', expect.any(Function));
    });
});

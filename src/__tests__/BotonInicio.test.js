/**
 * @jest-environment jsdom
 */
import BotonInicio from '../modulos/BotonInicio';

describe('BotonInicio.js', () => {
    beforeEach(() => {
        // Limpiar el DOM
        document.body.innerHTML = '';

        // Mock de window.scrollTo
        window.scrollTo = jest.fn();

        // Mock de pageYOffset
        Object.defineProperty(window, 'pageYOffset', {
            writable: true,
            value: 0
        });

        // Usar fake timers
        jest.useFakeTimers();
    });

    afterEach(() => {
        // Limpiar después de cada test
        if (BotonInicio) {
            BotonInicio.destroy();
        }
        jest.clearAllMocks();
        jest.useRealTimers();
    });

    test('Debe inicializar y crear el botón en el DOM', () => {
        BotonInicio.iniciar();

        const boton = document.querySelector('.boton-inicio');
        expect(boton).toBeTruthy();
        expect(boton.style.display).toBe('none');
        expect(document.body.contains(boton)).toBe(true);
    });

    test('Debe mostrar el botón cuando el scroll supera el límite', () => {
        BotonInicio.iniciar();

        const boton = document.querySelector('.boton-inicio');

        // Simular scroll mayor a 100px
        Object.defineProperty(window, 'pageYOffset', {
            writable: true,
            value: 150
        });

        // Disparar evento scroll
        window.dispatchEvent(new Event('scroll'));

        expect(boton.style.display).toBe('block');
    });

    test('Debe ocultar el botón cuando el scroll está por debajo del límite', () => {
        BotonInicio.iniciar();

        const boton = document.querySelector('.boton-inicio');

        // Primero mostrar el botón
        Object.defineProperty(window, 'pageYOffset', {
            writable: true,
            value: 150
        });
        window.dispatchEvent(new Event('scroll'));
        expect(boton.style.display).toBe('block');

        // Luego simular scroll menor a 100px
        Object.defineProperty(window, 'pageYOffset', {
            writable: true,
            value: 50
        });
        window.dispatchEvent(new Event('scroll'));

        expect(boton.style.display).toBe('none');
    });

    test('Debe hacer scroll a top al hacer click en el botón', () => {
        BotonInicio.iniciar();

        const boton = document.querySelector('.boton-inicio');

        // Simular click
        boton.click();

        // Verificar que se llamó window.scrollTo con los parámetros correctos
        expect(window.scrollTo).toHaveBeenCalledWith({
            top: 0,
            behavior: 'smooth'
        });
    });

    test('Debe remover eventos y elemento del DOM al destruir', () => {
        BotonInicio.iniciar();

        const boton = document.querySelector('.boton-inicio');
        expect(boton).toBeTruthy();

        // Destruir
        BotonInicio.destroy();

        // Verificar que el botón fue removido del DOM
        const botonDespues = document.querySelector('.boton-inicio');
        expect(botonDespues).toBeNull();
    });

    test('Debe agregar event listeners al iniciar', () => {
        const addEventListenerSpy = jest.spyOn(window, 'addEventListener');

        BotonInicio.iniciar();

        // Verificar que se agregó el listener de scroll
        expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    });
});

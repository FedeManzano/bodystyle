/**
 * @jest-environment jsdom
 */

import Imagenes from '../modulos/Imagenes';
import * as Animaciones from '../modulos/Animaciones';

// Mock de Animaciones
jest.mock('../modulos/Animaciones', () => ({
    fadeIn: jest.fn((el, dur, cb) => {
        el.style.opacity = '1';
        el.style.display = 'block';
        if (cb) cb();
    }),
    fadeOut: jest.fn((el, dur, cb) => {
        el.style.opacity = '0';
        el.style.display = 'none';
        if (cb) cb();
    })
}));

describe('Imagenes.js', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
        jest.clearAllMocks();
    });

    afterEach(() => {
        if (Imagenes && Imagenes.destroy) {
            Imagenes.destroy();
        }
    });

    test('Debe inicializar correctamente y agregar listeners', () => {
        document.body.innerHTML = `
            <img class="img-exp" src="test.jpg" alt="Test Image">
        `;

        Imagenes.iniciar();

        const img = document.querySelector('.img-exp');
        // Simular click
        img.click();

        // Verificar que se creó el contenedor
        const contenedor = document.querySelector('.contenedor-imagen');
        expect(contenedor).toBeTruthy();

        // Verificar que se llamó a fadeIn
        expect(Animaciones.fadeIn).toHaveBeenCalled();

        // Verificar que la imagen está dentro del contenedor
        const imgEnContenedor = contenedor.querySelector('img');
        expect(imgEnContenedor).toBeTruthy();
        expect(imgEnContenedor.getAttribute('src')).toBe('test.jpg');
    });

    test('Debe cerrar al hacer click en el contenedor', () => {
        document.body.innerHTML = `
            <img class="img-exp" src="test.jpg">
        `;
        Imagenes.iniciar();
        document.querySelector('.img-exp').click();

        const contenedor = document.querySelector('.contenedor-imagen');
        contenedor.click();

        expect(Animaciones.fadeOut).toHaveBeenCalledWith(contenedor, 300, expect.any(Function));
    });

    test('Debe cerrar al presionar ESC', () => {
        document.body.innerHTML = `
            <img class="img-exp" src="test.jpg">
        `;
        Imagenes.iniciar();
        document.querySelector('.img-exp').click();

        const contenedor = document.querySelector('.contenedor-imagen');

        // Simular evento ESC
        const event = new KeyboardEvent('keydown', { which: 27 });
        document.body.dispatchEvent(event);

        expect(Animaciones.fadeOut).toHaveBeenCalled();
    });

    test('Debe cerrar al hacer scroll', () => {
        document.body.innerHTML = `
            <img class="img-exp" src="test.jpg">
        `;
        Imagenes.iniciar();
        document.querySelector('.img-exp').click();

        // Simular scroll
        window.dispatchEvent(new Event('scroll'));

        expect(Animaciones.fadeOut).toHaveBeenCalled();
    });

    test('Debe limpiar listeners en destroy', () => {
        document.body.innerHTML = `
            <img class="img-exp" src="test.jpg">
        `;
        Imagenes.iniciar();

        const img = document.querySelector('.img-exp');
        Imagenes.destroy();

        // Limpiar mocks para verificar que no se llamen después del destroy
        jest.clearAllMocks();

        // Simular click después de destroy
        img.click();

        // No debería haberse creado el contenedor ni llamado a fadeIn
        // Nota: Si el contenedor ya existía, destroy debería haberlo removido o limpiado, 
        // pero en este caso verificamos que el click no dispare la lógica de apertura.
        // Como nuestra implementación de destroy removerá el listener, esto debería pasar.
        expect(Animaciones.fadeIn).not.toHaveBeenCalled();
    });
});

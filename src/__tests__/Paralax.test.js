/**
 * @jest-environment jsdom
 */

import Paralax from '../modulos/Paralax';

describe('Paralax.js', () => {
    beforeEach(() => {
        // Limpiar el DOM antes de cada test
        document.body.innerHTML = '';
    });

    test('Debe inicializar correctamente y aplicar estilos', () => {
        // Configurar el DOM simulado
        document.body.innerHTML = `
            <div class="paralax-contenedor">
                <img class="paralax" src="image.jpg" alt="Parallax Image">
            </div>
        `;

        // Ejecutar la inicialización
        Paralax.iniciar();

        const contenedor = document.querySelector('.paralax-contenedor');
        const img = document.querySelector('.paralax-contenedor img');

        // Verificar que la imagen tiene opacidad 0
        expect(img.style.opacity).toBe('0');

        // Verificar que el contenedor tiene la imagen de fondo correcta
        expect(contenedor.style.backgroundImage).toMatch(/url\(["']?image\.jpg["']?\)/);
        // Nota: jsdom puede normalizar las URLs, así que usamos toContain o verificamos si agrega comillas

        // Verificar que el contenedor tiene background-attachment fixed
        expect(contenedor.style.backgroundAttachment).toBe('fixed');
    });

    test('Debe manejar múltiples contenedores paralax', () => {
        document.body.innerHTML = `
            <div class="paralax-contenedor" id="p1">
                <img class="paralax" src="img1.jpg">
            </div>
            <div class="paralax-contenedor" id="p2">
                <img class="paralax" src="img2.jpg">
            </div>
        `;

        Paralax.iniciar();

        const p1 = document.getElementById('p1');
        const p2 = document.getElementById('p2');
        const img1 = p1.querySelector('img');
        const img2 = p2.querySelector('img');

        expect(img1.style.opacity).toBe('0');
        expect(img2.style.opacity).toBe('0');

        expect(p1.style.backgroundImage).toMatch(/url\(["']?img1\.jpg["']?\)/);
        expect(p2.style.backgroundImage).toMatch(/url\(["']?img2\.jpg["']?\)/);
    });

    test('Debe no fallar si no hay contenedores paralax', () => {
        document.body.innerHTML = '<div>Nada por aquí</div>';

        expect(() => {
            Paralax.iniciar();
        }).not.toThrow();
    });
});

/**
 * @jest-environment jsdom
 */

import GruposInput from '../modulos/GruposInput';

describe('GruposInput.js', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });

    test('Debe agregar el span de flecha a los dropdown-toggle', () => {
        document.body.innerHTML = `
            <div class="input-g">
                <div class="grupo">
                    <button class="dropdown-toggle">Texto</button>
                </div>
            </div>
        `;

        GruposInput.iniciar();

        const span = document.querySelector('.f-abajo-grupo');
        expect(span).toBeTruthy();
        expect(document.querySelector('.dropdown-toggle').contains(span)).toBe(true);
    });

    test('Debe agregar clases a-ajuste-btn y combo-box si tiene texto', () => {
        document.body.innerHTML = `
            <div class="input-g">
                <div class="grupo">
                    <button class="dropdown-toggle">  Texto con espacios  </button>
                </div>
            </div>
        `;

        GruposInput.iniciar();

        const toggle = document.querySelector('.dropdown-toggle');
        expect(toggle.classList.contains('a-ajuste-btn')).toBe(true);
        expect(toggle.classList.contains('combo-box')).toBe(true);
    });

    test('No debe agregar clases si no tiene texto', () => {
        document.body.innerHTML = `
            <div class="input-g">
                <div class="grupo">
                    <button class="dropdown-toggle">   </button>
                </div>
            </div>
        `;

        GruposInput.iniciar();

        const toggle = document.querySelector('.dropdown-toggle');
        expect(toggle.classList.contains('a-ajuste-btn')).toBe(false);
        expect(toggle.classList.contains('combo-box')).toBe(false);
    });

    test('Debe ocultar .drop-complemento', () => {
        document.body.innerHTML = `
            <div class="input-g">
                <div class="grupo">
                    <button class="dropdown-toggle">Texto</button>
                </div>
            </div>
            <div class="drop-complemento"></div>
        `;

        GruposInput.iniciar();

        const complemento = document.querySelector('.drop-complemento');
        expect(complemento.style.display).toBe('none');
    });

    test('Debe actualizar el texto del combo-box al hacer click en un item', () => {
        document.body.innerHTML = `
            <div class="input-g">
                <div class="grupo">
                    <button class="dropdown-toggle" data-target="#drop1">Seleccionar</button>
                </div>
            </div>
            <div id="drop1">
                <ul>
                    <li><a href="#" id="opcion1">Opción 1</a></li>
                </ul>
            </div>
        `;

        GruposInput.iniciar();

        const opcion = document.getElementById('opcion1');
        opcion.click();

        const toggle = document.querySelector('.dropdown-toggle');
        // El texto debe actualizarse y mantener el span
        expect(toggle.textContent).toContain('Opción 1');
        expect(toggle.querySelector('.f-abajo-grupo')).toBeTruthy();
    });

    test('Debe manejar múltiples combo-boxes correctamente', () => {
        document.body.innerHTML = `
            <div class="input-g">
                <div class="grupo">
                    <button class="dropdown-toggle" id="toggle1" data-target="#drop1">Combo 1</button>
                </div>
            </div>
            <div id="drop1">
                <ul><li><a href="#" id="opcion1">Op1</a></li></ul>
            </div>

            <div class="input-g">
                <div class="grupo">
                    <button class="dropdown-toggle" id="toggle2" data-target="#drop2">Combo 2</button>
                </div>
            </div>
            <div id="drop2">
                <ul><li><a href="#" id="opcion2">Op2</a></li></ul>
            </div>
        `;

        GruposInput.iniciar();

        // Click en opción 2
        document.getElementById('opcion2').click();

        const toggle1 = document.getElementById('toggle1');
        const toggle2 = document.getElementById('toggle2');

        expect(toggle1.textContent).toContain('Combo 1'); // No debe cambiar
        expect(toggle2.textContent).toContain('Op2'); // Debe cambiar
    });
});

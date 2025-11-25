/**
 * @jest-environment jsdom
 * 
 * TESTS PARA InputHandler.js
 * ==========================
 * Este módulo maneja la validación de inputs y la selección de archivos.
 * Funcionalidades principales:
 * 1. Validación de campos requeridos con clase i-error
 * 2. Manejo de inputs con iconos (.input-icon)
 * 3. Selector de archivos con feedback visual
 */

import InputHandler from '../modulos/InputHandler';

describe('InputHandler.js', () => {

    beforeEach(() => {
        // Limpiar el DOM antes de cada test
        document.body.innerHTML = '';
    });

    /**
     * VERIFICACIÓN DE EXISTENCIA
     * ==========================
     */
    test('Debe estar disponible en window.InputHandler', () => {
        expect(window.InputHandler).toBeDefined();
        expect(typeof window.InputHandler).toBe('object');
    });

    test('Debe tener el método iniciar', () => {
        expect(window.InputHandler.iniciar).toBeDefined();
        expect(typeof window.InputHandler.iniciar).toBe('function');
    });

    test('Debe exportar correctamente el módulo', () => {
        expect(InputHandler).toBeDefined();
        expect(InputHandler).toBe(window.InputHandler);
    });

    /**
     * VALIDACIÓN DE CAMPOS REQUERIDOS (.form-grupo)
     * =============================================
     */
    describe('Validación de campos requeridos en .form-grupo', () => {

        beforeEach(() => {
            document.body.innerHTML = `
                <div class="form-grupo">
                    <input type="text" id="input1" required />
                </div>
                <div class="form-group">
                    <input type="email" id="input2" required />
                </div>
            `;
            window.InputHandler.iniciar();
        });

        test('Debe agregar clase i-error cuando input requerido pierde foco estando vacío', () => {
            const input = document.getElementById('input1');

            // Simular blur con campo vacío
            input.dispatchEvent(new Event('blur'));

            expect(input.classList.contains('i-error')).toBe(true);
        });

        test('No debe agregar clase i-error cuando input requerido pierde foco con valor', () => {
            const input = document.getElementById('input1');
            input.value = 'Texto de prueba';

            // Simular blur con campo lleno
            input.dispatchEvent(new Event('blur'));

            expect(input.classList.contains('i-error')).toBe(false);
        });

        test('Debe remover clase i-error cuando input gana foco', () => {
            const input = document.getElementById('input1');

            // Primero agregar la clase
            input.classList.add('i-error');

            // Simular focus
            input.dispatchEvent(new Event('focus'));

            expect(input.classList.contains('i-error')).toBe(false);
        });

        test('Debe funcionar con .form-group además de .form-grupo', () => {
            const input = document.getElementById('input2');

            // Simular blur con campo vacío
            input.dispatchEvent(new Event('blur'));

            expect(input.classList.contains('i-error')).toBe(true);
        });

        test('No debe agregar clase i-error a inputs sin atributo required', () => {
            document.body.innerHTML = `
                <div class="form-grupo">
                    <input type="text" id="input-optional" />
                </div>
            `;
            window.InputHandler.iniciar();

            const input = document.getElementById('input-optional');
            input.dispatchEvent(new Event('blur'));

            expect(input.classList.contains('i-error')).toBe(false);
        });
    });

    /**
     * VALIDACIÓN DE INPUT-ICON
     * ========================
     */
    describe('Validación de .input-icon', () => {

        beforeEach(() => {
            document.body.innerHTML = `
                <div class="input-icon">
                    <span class="elemento">@</span>
                    <input type="email" id="email-input" required />
                </div>
            `;
            window.InputHandler.iniciar();
        });

        test('Debe cambiar borde a gris cuando pierde foco', () => {
            const input = document.getElementById('email-input');
            const parent = input.parentElement;

            input.dispatchEvent(new Event('blur'));

            expect(parent.style.border).toBe('1px solid rgb(163, 163, 163)');
        });

        test('Debe cambiar color del icono a gris cuando input está vacío', () => {
            const input = document.getElementById('email-input');
            const icono = input.parentElement.querySelector('.elemento');

            input.value = '';
            input.dispatchEvent(new Event('blur'));

            expect(icono.style.color).toBe('rgb(131, 131, 131)');
        });

        test('Debe cambiar color del icono a negro cuando input tiene valor', () => {
            const input = document.getElementById('email-input');
            const icono = input.parentElement.querySelector('.elemento');

            input.value = 'test@example.com';
            input.dispatchEvent(new Event('blur'));

            expect(icono.style.color).toBe('rgb(33, 33, 33)');
        });

        test('Debe agregar clase i-error al parent cuando input requerido está vacío', () => {
            const input = document.getElementById('email-input');
            const parent = input.parentElement;

            input.value = '';
            input.dispatchEvent(new Event('blur'));

            expect(parent.classList.contains('i-error')).toBe(true);
        });

        test('Debe cambiar borde a azul cuando gana foco', () => {
            const input = document.getElementById('email-input');
            const parent = input.parentElement;

            input.dispatchEvent(new Event('focus'));

            // El navegador normaliza rgba(135, 217, 255) a rgb(135, 217, 255)
            expect(parent.style.border).toBe('1px solid rgb(135, 217, 255)');
        });

        test('Debe cambiar color del icono a negro cuando gana foco', () => {
            const input = document.getElementById('email-input');
            const icono = input.parentElement.querySelector('.elemento');

            input.dispatchEvent(new Event('focus'));

            expect(icono.style.color).toBe('rgb(33, 33, 33)');
        });

        test('Debe remover clase i-error del parent cuando gana foco', () => {
            const input = document.getElementById('email-input');
            const parent = input.parentElement;

            // Primero agregar la clase
            parent.classList.add('i-error');

            input.dispatchEvent(new Event('focus'));

            expect(parent.classList.contains('i-error')).toBe(false);
        });
    });

    /**
     * SELECTOR DE ARCHIVOS
     * ====================
     */
    describe('Selector de archivos', () => {

        beforeEach(() => {
            document.body.innerHTML = `
                <div>
                    <input type="file" class="input-file" id="file-input" />
                    <label class="f-label" for="file-input">Seleccionar</label>
                </div>
            `;
            window.InputHandler.iniciar();
        });

        test('Debe crear elemento span.archivo-seleccionado dentro de .f-label', () => {
            const label = document.querySelector('.f-label');
            const span = label.querySelector('.archivo-seleccionado');

            expect(span).toBeDefined();
            expect(span.tagName).toBe('SPAN');
            expect(span.className).toBe('archivo-seleccionado');
        });

        test('Debe mostrar texto por defecto "Seleccionar un archivo ..."', () => {
            const span = document.querySelector('.archivo-seleccionado');

            expect(span.textContent).toBe('Seleccionar un archivo ...');
        });

        test('Debe actualizar texto cuando se selecciona un archivo', () => {
            const input = document.getElementById('file-input');
            const span = document.querySelector('.archivo-seleccionado');

            // Simular selección de archivo
            Object.defineProperty(input, 'value', {
                writable: true,
                value: 'C:\\fakepath\\documento.pdf'
            });

            input.dispatchEvent(new Event('change'));

            expect(span.textContent).toBe('C:\\fakepath\\documento.pdf');
        });

        test('Debe cambiar color a verde cuando se selecciona archivo', () => {
            const input = document.getElementById('file-input');
            const span = document.querySelector('.archivo-seleccionado');

            Object.defineProperty(input, 'value', {
                writable: true,
                value: 'C:\\fakepath\\documento.pdf'
            });

            input.dispatchEvent(new Event('change'));

            expect(span.style.color).toBe('rgb(22, 112, 60)');
            expect(span.style.borderBottom).toBe('1px solid rgb(22, 112, 60)');
        });

        test('Debe restaurar texto por defecto cuando se limpia la selección', () => {
            const input = document.getElementById('file-input');
            const span = document.querySelector('.archivo-seleccionado');

            // Primero seleccionar un archivo
            Object.defineProperty(input, 'value', {
                writable: true,
                value: 'C:\\fakepath\\documento.pdf'
            });
            input.dispatchEvent(new Event('change'));

            // Luego limpiar
            Object.defineProperty(input, 'value', {
                writable: true,
                value: ''
            });
            input.dispatchEvent(new Event('change'));

            expect(span.textContent).toBe('Seleccionar un archivo ...');
            expect(span.style.color).toBe('rgb(56, 56, 56)');
            expect(span.style.borderBottom).toBe('1px solid rgb(136, 136, 136)');
        });
    });

    /**
     * MÚLTIPLES ELEMENTOS
     * ===================
     */
    describe('Manejo de múltiples elementos', () => {

        test('Debe manejar múltiples inputs en .form-grupo', () => {
            document.body.innerHTML = `
                <div class="form-grupo">
                    <input type="text" id="input1" required />
                    <input type="text" id="input2" required />
                    <input type="text" id="input3" required />
                </div>
            `;
            window.InputHandler.iniciar();

            const inputs = document.querySelectorAll('input');

            inputs.forEach(input => {
                input.dispatchEvent(new Event('blur'));
                expect(input.classList.contains('i-error')).toBe(true);
            });
        });

        test('Debe manejar múltiples .input-icon', () => {
            document.body.innerHTML = `
                <div class="input-icon">
                    <span class="elemento">@</span>
                    <input type="email" required />
                </div>
                <div class="input-icon">
                    <span class="elemento">$</span>
                    <input type="text" required />
                </div>
            `;
            window.InputHandler.iniciar();

            const inputs = document.querySelectorAll('.input-icon input');

            inputs.forEach(input => {
                input.dispatchEvent(new Event('blur'));
                expect(input.parentElement.classList.contains('i-error')).toBe(true);
            });
        });

        test('Debe manejar múltiples selectores de archivo', () => {
            document.body.innerHTML = `
                <div>
                    <input type="file" class="input-file" />
                    <label class="f-label">Label 1</label>
                </div>
                <div>
                    <input type="file" class="input-file" />
                    <label class="f-label">Label 2</label>
                </div>
            `;
            window.InputHandler.iniciar();

            const spans = document.querySelectorAll('.archivo-seleccionado');

            expect(spans.length).toBe(2);
            spans.forEach(span => {
                expect(span.textContent).toBe('Seleccionar un archivo ...');
            });
        });
    });
});

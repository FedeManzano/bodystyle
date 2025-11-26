/**
 * @jest-environment jsdom
 */

import Range from '../modulos/Range';

describe('Range Module', () => {
    beforeEach(() => {
        // Limpiar el DOM antes de cada test
        document.body.innerHTML = '';
    });

    describe('Initialization', () => {
        test('should initialize without errors', () => {
            expect(() => Range.iniciar()).not.toThrow();
        });

        test('should handle empty DOM gracefully', () => {
            expect(() => Range.iniciar()).not.toThrow();
        });

        test('should attach event listeners to range inputs', () => {
            // Crear un input range con su estructura
            document.body.innerHTML = `
                <div class="input-range">
                    <input type="range" min="0" max="100" value="50">
                    <span>50</span>
                </div>
            `;

            const input = document.querySelector('.input-range input');
            const addEventListenerSpy = jest.spyOn(input, 'addEventListener');

            Range.iniciar();

            expect(addEventListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
        });
    });

    describe('Value Display Updates', () => {
        test('should update span text when input value changes', () => {
            document.body.innerHTML = `
                <div class="input-range">
                    <input type="range" min="0" max="100" value="50">
                    <span>50</span>
                </div>
            `;

            const input = document.querySelector('.input-range input');
            const span = document.querySelector('.input-range span');

            Range.iniciar();

            // Cambiar el valor y disparar el evento
            input.value = '75';
            const event = new MouseEvent('mousemove', { bubbles: true });
            input.dispatchEvent(event);

            expect(span.textContent).toBe('75');
        });

        test('should handle multiple range inputs independently', () => {
            document.body.innerHTML = `
                <div class="input-range">
                    <input type="range" min="0" max="100" value="30" id="range1">
                    <span>30</span>
                </div>
                <div class="input-range">
                    <input type="range" min="0" max="100" value="70" id="range2">
                    <span>70</span>
                </div>
            `;

            Range.iniciar();

            const input1 = document.getElementById('range1');
            const input2 = document.getElementById('range2');
            const span1 = input1.parentElement.querySelector('span');
            const span2 = input2.parentElement.querySelector('span');

            // Actualizar primer input
            input1.value = '45';
            input1.dispatchEvent(new MouseEvent('mousemove', { bubbles: true }));

            expect(span1.textContent).toBe('45');
            expect(span2.textContent).toBe('70'); // No debe cambiar

            // Actualizar segundo input
            input2.value = '85';
            input2.dispatchEvent(new MouseEvent('mousemove', { bubbles: true }));

            expect(span1.textContent).toBe('45'); // No debe cambiar
            expect(span2.textContent).toBe('85');
        });

        test('should handle missing span gracefully', () => {
            document.body.innerHTML = `
                <div class="input-range">
                    <input type="range" min="0" max="100" value="50">
                </div>
            `;

            const input = document.querySelector('.input-range input');

            expect(() => {
                Range.iniciar();
                input.value = '75';
                input.dispatchEvent(new MouseEvent('mousemove', { bubbles: true }));
            }).not.toThrow();
        });
    });

    describe('Background Gradient Updates', () => {
        test('should update background gradient based on value', () => {
            document.body.innerHTML = `
                <div class="input-range">
                    <input type="range" min="0" max="100" value="50">
                    <span>50</span>
                </div>
            `;

            const input = document.querySelector('.input-range input');

            Range.iniciar();

            input.value = '60';
            input.dispatchEvent(new MouseEvent('mousemove', { bubbles: true }));

            const expectedGradient = 'linear-gradient(90deg, rgb(0, 187, 156) 60%, rgb(0, 0, 0) 60%)';
            expect(input.style.background).toBe(expectedGradient);
        });

        test('should update gradient for minimum value (0)', () => {
            document.body.innerHTML = `
                <div class="input-range">
                    <input type="range" min="0" max="100" value="0">
                    <span>0</span>
                </div>
            `;

            const input = document.querySelector('.input-range input');

            Range.iniciar();

            input.dispatchEvent(new MouseEvent('mousemove', { bubbles: true }));

            const expectedGradient = 'linear-gradient(90deg, rgb(0, 187, 156) 0%, rgb(0, 0, 0) 0%)';
            expect(input.style.background).toBe(expectedGradient);
        });

        test('should update gradient for maximum value (100)', () => {
            document.body.innerHTML = `
                <div class="input-range">
                    <input type="range" min="0" max="100" value="100">
                    <span>100</span>
                </div>
            `;

            const input = document.querySelector('.input-range input');

            Range.iniciar();

            input.dispatchEvent(new MouseEvent('mousemove', { bubbles: true }));

            const expectedGradient = 'linear-gradient(90deg, rgb(0, 187, 156) 100%, rgb(0, 0, 0) 100%)';
            expect(input.style.background).toBe(expectedGradient);
        });

        test('should update gradient dynamically as value changes', () => {
            document.body.innerHTML = `
                <div class="input-range">
                    <input type="range" min="0" max="100" value="25">
                    <span>25</span>
                </div>
            `;

            const input = document.querySelector('.input-range input');

            Range.iniciar();

            // Primer valor
            input.value = '25';
            input.dispatchEvent(new MouseEvent('mousemove', { bubbles: true }));
            expect(input.style.background).toBe('linear-gradient(90deg, rgb(0, 187, 156) 25%, rgb(0, 0, 0) 25%)');

            // Segundo valor
            input.value = '50';
            input.dispatchEvent(new MouseEvent('mousemove', { bubbles: true }));
            expect(input.style.background).toBe('linear-gradient(90deg, rgb(0, 187, 156) 50%, rgb(0, 0, 0) 50%)');

            // Tercer valor
            input.value = '75';
            input.dispatchEvent(new MouseEvent('mousemove', { bubbles: true }));
            expect(input.style.background).toBe('linear-gradient(90deg, rgb(0, 187, 156) 75%, rgb(0, 0, 0) 75%)');
        });
    });

    describe('Edge Cases', () => {
        test('should handle inputs without .input-range parent', () => {
            document.body.innerHTML = `
                <input type="range" min="0" max="100" value="50">
            `;

            expect(() => Range.iniciar()).not.toThrow();
        });

        test('should handle non-range inputs inside .input-range', () => {
            document.body.innerHTML = `
                <div class="input-range">
                    <input type="text" value="not a range">
                    <span>text</span>
                </div>
            `;

            const input = document.querySelector('.input-range input');

            expect(() => {
                Range.iniciar();
                input.dispatchEvent(new MouseEvent('mousemove', { bubbles: true }));
            }).not.toThrow();
        });

        test('should handle multiple initializations', () => {
            document.body.innerHTML = `
                <div class="input-range">
                    <input type="range" min="0" max="100" value="50">
                    <span>50</span>
                </div>
            `;

            expect(() => {
                Range.iniciar();
                Range.iniciar();
                Range.iniciar();
            }).not.toThrow();
        });

        test('should work with custom min/max values', () => {
            document.body.innerHTML = `
                <div class="input-range">
                    <input type="range" min="10" max="200" value="100">
                    <span>100</span>
                </div>
            `;

            const input = document.querySelector('.input-range input');
            const span = document.querySelector('.input-range span');

            Range.iniciar();

            input.value = '150';
            input.dispatchEvent(new MouseEvent('mousemove', { bubbles: true }));

            expect(span.textContent).toBe('150');
            expect(input.style.background).toBe('linear-gradient(90deg, rgb(0, 187, 156) 150%, rgb(0, 0, 0) 150%)');
        });
    });

    describe('Integration', () => {
        test('should work with complex DOM structure', () => {
            document.body.innerHTML = `
                <div class="container">
                    <div class="form-group">
                        <label>Volume</label>
                        <div class="input-range">
                            <input type="range" min="0" max="100" value="50" id="volume">
                            <span>50</span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Brightness</label>
                        <div class="input-range">
                            <input type="range" min="0" max="100" value="80" id="brightness">
                            <span>80</span>
                        </div>
                    </div>
                </div>
            `;

            Range.iniciar();

            const volumeInput = document.getElementById('volume');
            const brightnessInput = document.getElementById('brightness');
            const volumeSpan = volumeInput.parentElement.querySelector('span');
            const brightnessSpan = brightnessInput.parentElement.querySelector('span');

            // Test volume
            volumeInput.value = '65';
            volumeInput.dispatchEvent(new MouseEvent('mousemove', { bubbles: true }));
            expect(volumeSpan.textContent).toBe('65');

            // Test brightness
            brightnessInput.value = '90';
            brightnessInput.dispatchEvent(new MouseEvent('mousemove', { bubbles: true }));
            expect(brightnessSpan.textContent).toBe('90');
        });
    });
});

/**
 * @jest-environment jsdom
 */

describe('Test Básico de Configuración', () => {
    test('Jest está funcionando correctamente', () => {
        expect(true).toBe(true);
    });

    test('jsdom está disponible', () => {
        expect(document).toBeDefined();
        expect(window).toBeDefined();
    });

    test('Puede crear elementos del DOM', () => {
        const div = document.createElement('div');
        div.id = 'test';
        document.body.appendChild(div);

        const found = document.getElementById('test');
        expect(found).toBeTruthy();
        expect(found.id).toBe('test');

        document.body.removeChild(div);
    });
});

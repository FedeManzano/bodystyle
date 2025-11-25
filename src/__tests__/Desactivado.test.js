/**
 * @jest-environment jsdom
 */
import Desactivado from '../modulos/Desactivado';

/**
 * Helper to create a test element with various attributes.
 */
function createTestElement() {
    const container = document.createElement('div');
    container.innerHTML = `
    <a href="#" id="link" class="desactivado" onclick="alert('click')">Enlace</a>
    <input type="text" id="input" class="desactivado" readonly="true" />
    <label for="input" id="lbl">Etiqueta</label>
  `;
    document.body.appendChild(container);
    return {
        link: document.getElementById('link'),
        input: document.getElementById('input'),
        label: document.getElementById('lbl'),
        container,
    };
}

describe('Desactivado module', () => {
    beforeAll(() => {
        // Initialise the module (sets up MutationObserver)
        Desactivado.iniciar();
    });

    afterEach(() => {
        // Clean up DOM after each test
        document.body.innerHTML = '';
    });

    test('remueve atributos al añadir .desactivado', async () => {
        const { link, input, label } = createTestElement();

        // At this point the MutationObserver should have processed the initial .desactivado class
        await new Promise(r => setTimeout(r, 0));

        // Attributes should be removed / altered
        expect(link.getAttribute('onclick')).toBeNull();
        expect(link.getAttribute('href')).toBeNull();
        // readonly should be forced to true (already true, but we check it exists)
        expect(input.hasAttribute('readonly')).toBe(true);
        // label "for" should be removed
        expect(label.getAttribute('for')).toBeNull();
    });

    test('restaura atributos al remover .desactivado', async () => {
        const { link, input, label } = createTestElement();
        await new Promise(r => setTimeout(r, 0));

        // Remove the class to trigger restoration
        link.classList.remove('desactivado');
        input.classList.remove('desactivado');
        // label does not have the class, but its associated input does; the module restores the label when the input is re‑activated
        await new Promise(r => setTimeout(r, 0));

        // Attributes should be back to original values
        expect(link.getAttribute('onclick')).toBe("alert('click')");
        expect(link.getAttribute('href')).toBe('#');
        // readonly should be removed because it wasn't present originally (we set it in markup, but the module stores the original state)
        // In our test markup the input already had readonly, so it should stay
        expect(input.hasAttribute('readonly')).toBe(true);
        // label "for" should be restored
        expect(label.getAttribute('for')).toBe('input');
    });
});

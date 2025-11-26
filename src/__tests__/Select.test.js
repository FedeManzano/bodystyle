// src/__tests__/Select.test.js
/**
 * Tests for the Select module (src/modulos/Select.js)
 * The module still uses jQuery; Jest with jsdom provides a DOM environment.
 */

import $ from 'jquery';
import Select from '../modulos/Select';

// Helper to build a simple select component in the DOM
function buildSelectHTML(id = 'test-select') {
    document.body.innerHTML = `
    <div id="${id}">
      <select>
        <option value="1">Option One</option>
        <option value="2">Option Two</option>
        <option value="3" class="inactivo">Option Three (inactive)</option>
      </select>
    </div>`;
}

describe('Select module', () => {
    let selectInstance;

    beforeEach(() => {
        // Clean DOM before each test
        document.body.innerHTML = '';
        selectInstance = new Select();
    });

    test('inicializar creates .seleccionado and .lista with correct items', () => {
        buildSelectHTML();
        // Initialise with default hover (none)
        selectInstance.iniciar('#test-select');

        // .seleccionado span should exist and contain the first option text
        const seleccionado = $('#test-select .seleccionado');
        expect(seleccionado.length).toBe(1);
        expect(seleccionado.text()).toBe('Option One');

        // .lista div with ul should be created
        const listaDiv = $('#test-select .lista');
        expect(listaDiv.length).toBe(1);
        const liItems = $('#test-select .lista ul li');
        // Should contain only the two non‑inactive options
        expect(liItems.length).toBe(2);
        expect(liItems.eq(0).text().trim()).toBe('Option One');
        expect(liItems.eq(1).text().trim()).toBe('Option Two');
    });

    test('clicking a list item updates selected option and .seleccionado text', () => {
        buildSelectHTML();
        selectInstance.iniciar('#test-select');

        const firstLi = $('#test-select .lista ul li').eq(1); // second option
        firstLi.trigger('click');

        // Get the selected option via jQuery :selected selector
        const selectedOption = $('#test-select select option:selected');
        expect(selectedOption.length).toBe(1);
        expect(selectedOption.val()).toBe('2');

        const seleccionado = $('#test-select .seleccionado');
        expect(seleccionado.text()).toBe('Option Two');
    });

    test('destroy removes event listeners', () => {
        buildSelectHTML();
        selectInstance.iniciar('#test-select');

        // Ensure click works before destroy
        const firstLi = $('#test-select .lista ul li').eq(0);
        firstLi.trigger('click');
        expect($('#test-select .seleccionado').text()).toBe('Option One');

        // Call destroy
        selectInstance.destroy('#test-select');

        // After destroy, clicking should have no effect
        const secondLi = $('#test-select .lista ul li').eq(1);
        secondLi.trigger('click');
        const selectedOption = $('#test-select select option:selected');
        expect(selectedOption.val()).toBe('1');
        expect($('#test-select .seleccionado').text()).toBe('Option One');
    });
});

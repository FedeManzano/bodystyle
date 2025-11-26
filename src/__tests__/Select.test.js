import Select from '../modulos/Select';
import { slideUp, slideDown } from '../modulos/Animaciones';

// Mock Animaciones
jest.mock('../modulos/Animaciones', () => ({
    slideUp: jest.fn(),
    slideDown: jest.fn()
}));

describe('Select Module', () => {
    let selectModule;
    let container;
    let selectElement;

    beforeEach(() => {
        // Setup DOM
        document.body.innerHTML = `
            <div id="mySelect" class="select-mod-dark">
                <select>
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                    <option value="3" class="inactivo">Option 3</option>
                </select>
            </div>
        `;
        container = document.getElementById('mySelect');
        selectElement = container.querySelector('select');
        selectModule = new Select();
    });

    afterEach(() => {
        jest.clearAllMocks();
        document.body.innerHTML = '';
    });

    test('should initialize correctly', () => {
        selectModule.inicializar('#mySelect', 'hover');

        const seleccionado = container.querySelector('.seleccionado');
        const lista = container.querySelector('.lista');
        const items = lista.querySelectorAll('li');

        expect(seleccionado).toBeTruthy();
        expect(seleccionado.textContent).toBe('Option 1');
        expect(lista).toBeTruthy();
        expect(items.length).toBe(2); // Option 3 is inactive
        expect(items[0].textContent).toBe('Option 1');
        expect(items[1].textContent).toBe('Option 2');
    });

    test('should toggle dropdown on click', () => {
        selectModule.inicializar('#mySelect', 'hover');

        // Initial click to open
        container.click();
        expect(slideDown).toHaveBeenCalled();

        // Second click to close
        container.click();
        expect(slideUp).toHaveBeenCalled();
    });

    test('should select an option', () => {
        selectModule.inicializar('#mySelect', 'hover');
        const items = container.querySelectorAll('.lista li');
        const changeSpy = jest.fn();
        selectElement.addEventListener('change', changeSpy);

        // Click second option
        items[1].click();

        expect(selectElement.value).toBe('2');
        expect(container.querySelector('.seleccionado').textContent).toBe('Option 2');
        expect(changeSpy).toHaveBeenCalled();
    });

    test('should handle destroy', () => {
        selectModule.inicializar('#mySelect', 'hover');

        // Mock replaceChild to verify destroy
        const replaceChildSpy = jest.spyOn(container.parentNode, 'replaceChild');

        selectModule.destroy('#mySelect');

        expect(replaceChildSpy).toHaveBeenCalled();
    });
});

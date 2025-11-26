import GruposInput from '../modulos/GruposInput';

describe('GruposInput Module', () => {
    let container;

    beforeEach(() => {
        // Setup DOM
        document.body.innerHTML = `
            <div class="input-g">
                <div class="grupo">
                    <button class="dropdown-toggle" data-target="#myDropdown">
                        Select Me
                    </button>
                    <div id="myDropdown" class="dropdown">
                        <ul>
                            <li><a href="#">Option 1</a></li>
                            <li><button>Option 2</button></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="drop-complemento"></div>
        `;
        container = document.querySelector('.input-g');
    });

    afterEach(() => {
        document.body.innerHTML = '';
    });

    test('should initialize correctly adding spans and classes', () => {
        GruposInput.iniciar();

        const toggle = container.querySelector('.dropdown-toggle');
        const span = toggle.querySelector('.f-abajo-grupo');

        expect(span).toBeTruthy();
        expect(toggle.classList.contains('a-ajuste-btn')).toBe(true);
        expect(toggle.classList.contains('combo-box')).toBe(true);
    });

    test('should update text and preserve span on item click', () => {
        GruposInput.iniciar();

        const toggle = container.querySelector('.dropdown-toggle');
        const option1 = document.querySelector('#myDropdown li a');

        option1.click();

        expect(toggle.textContent).toContain('Option 1');
        expect(toggle.querySelector('.f-abajo-grupo')).toBeTruthy();
    });

    test('should hide drop-complemento on init', () => {
        const dropComplemento = document.querySelector('.drop-complemento');
        expect(dropComplemento.style.display).not.toBe('none');

        GruposInput.iniciar();

        expect(dropComplemento.style.display).toBe('none');
    });

    test('should handle multiple toggles independently', () => {
        // Add another group
        const newGroup = document.createElement('div');
        newGroup.className = 'grupo';
        newGroup.innerHTML = `
            <button class="dropdown-toggle" data-target="#myDropdown2">
                Other Select
            </button>
            <div id="myDropdown2" class="dropdown">
                <ul>
                    <li><a href="#">Option A</a></li>
                </ul>
            </div>
        `;
        container.appendChild(newGroup);

        GruposInput.iniciar();

        const toggle1 = container.querySelectorAll('.dropdown-toggle')[0];
        const toggle2 = container.querySelectorAll('.dropdown-toggle')[1];
        const option2 = document.querySelector('#myDropdown2 li a');

        // Click option for second toggle
        option2.click();

        // Check toggle 2 updated
        expect(toggle2.textContent).toContain('Option A');
        // Check toggle 1 remained same
        expect(toggle1.textContent).toContain('Select Me');
    });
});

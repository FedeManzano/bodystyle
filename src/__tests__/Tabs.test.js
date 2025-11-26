/**
 * @jest-environment jsdom
 */

import Tab from '../modulos/Tabs';

describe('Tab Module', () => {
    let tabInstance;

    beforeEach(() => {
        // Limpiar el DOM antes de cada test
        document.body.innerHTML = '';
        // Crear nueva instancia
        tabInstance = new Tab();
    });

    describe('Regular Tabs (iniciar)', () => {
        test('should initialize regular tabs correctly', () => {
            document.body.innerHTML = `
                <div id="myTabs">
                    <div class="tab">
                        <div class="op-tab">
                            <label data-target="#tab1">Tab 1</label>
                            <label data-target="#tab2">Tab 2</label>
                            <label data-target="#tab3">Tab 3</label>
                        </div>
                    </div>
                    <div id="tab1" class="contenido-tab">Content 1</div>
                    <div id="tab2" class="contenido-tab">Content 2</div>
                    <div id="tab3" class="contenido-tab">Content 3</div>
                </div>
            `;

            tabInstance.iniciar('#myTabs');

            // El primer tab debe estar activo
            const firstLabel = document.querySelector('#myTabs .tab .op-tab label');
            expect(firstLabel.classList.contains('activo')).toBe(true);

            // El primer contenido debe estar visible
            const firstContent = document.querySelector('#tab1');
            expect(firstContent.style.display).toBe('block');

            // Los demás contenidos deben estar ocultos
            expect(document.querySelector('#tab2').style.display).toBe('none');
            expect(document.querySelector('#tab3').style.display).toBe('none');
        });

        test('should switch tabs on click', () => {
            document.body.innerHTML = `
                <div id="myTabs">
                    <div class="tab">
                        <div class="op-tab">
                            <label data-target="#tab1">Tab 1</label>
                            <label data-target="#tab2">Tab 2</label>
                        </div>
                    </div>
                    <div id="tab1" class="contenido-tab">Content 1</div>
                    <div id="tab2" class="contenido-tab">Content 2</div>
                </div>
            `;

            tabInstance.iniciar('#myTabs');

            const secondLabel = document.querySelectorAll('#myTabs .tab .op-tab label')[1];
            secondLabel.click();

            // El segundo tab debe estar activo
            expect(secondLabel.classList.contains('activo')).toBe(true);

            // El primer tab no debe estar activo
            const firstLabel = document.querySelector('#myTabs .tab .op-tab label');
            expect(firstLabel.classList.contains('activo')).toBe(false);

            // El segundo contenido debe estar visible
            expect(document.querySelector('#tab2').style.display).toBe('block');

            // El primer contenido debe estar oculto
            expect(document.querySelector('#tab1').style.display).toBe('none');
        });

        test('should skip disabled tabs during initialization', () => {
            document.body.innerHTML = `
                <div id="myTabs">
                    <div class="tab">
                        <div class="op-tab">
                            <label data-target="#tab1" class="desactivado">Tab 1</label>
                            <label data-target="#tab2">Tab 2</label>
                            <label data-target="#tab3">Tab 3</label>
                        </div>
                    </div>
                    <div id="tab1" class="contenido-tab">Content 1</div>
                    <div id="tab2" class="contenido-tab">Content 2</div>
                    <div id="tab3" class="contenido-tab">Content 3</div>
                </div>
            `;

            tabInstance.iniciar('#myTabs');

            // El primer tab (desactivado) no debe estar activo
            const firstLabel = document.querySelector('#myTabs .tab .op-tab label');
            expect(firstLabel.classList.contains('activo')).toBe(false);

            // El segundo tab debe estar activo
            const secondLabel = document.querySelectorAll('#myTabs .tab .op-tab label')[1];
            expect(secondLabel.classList.contains('activo')).toBe(true);

            // El segundo contenido debe estar visible
            expect(document.querySelector('#tab2').style.display).toBe('block');
        });

        test('should not switch to disabled tab on click', () => {
            document.body.innerHTML = `
                <div id="myTabs">
                    <div class="tab">
                        <div class="op-tab">
                            <label data-target="#tab1">Tab 1</label>
                            <label data-target="#tab2" class="desactivado">Tab 2</label>
                        </div>
                    </div>
                    <div id="tab1" class="contenido-tab">Content 1</div>
                    <div id="tab2" class="contenido-tab">Content 2</div>
                </div>
            `;

            tabInstance.iniciar('#myTabs');

            const disabledLabel = document.querySelectorAll('#myTabs .tab .op-tab label')[1];
            disabledLabel.click();

            // El tab desactivado no debe estar activo
            expect(disabledLabel.classList.contains('activo')).toBe(false);

            // El primer tab debe seguir activo
            const firstLabel = document.querySelector('#myTabs .tab .op-tab label');
            expect(firstLabel.classList.contains('activo')).toBe(true);

            // El contenido del tab desactivado no debe estar visible
            expect(document.querySelector('#tab2').style.display).toBe('none');
        });
    });

    describe('Bordered Tabs (iniciarBorde)', () => {
        test('should initialize bordered tabs correctly', () => {
            document.body.innerHTML = `
                <div id="myTabs">
                    <div class="tab-borde">
                        <div class="op-tab-borde">
                            <ul>
                                <label data-target="#tab1">Tab 1</label>
                                <label data-target="#tab2">Tab 2</label>
                            </ul>
                        </div>
                    </div>
                    <div id="tab1" class="contenido-tab">Content 1</div>
                    <div id="tab2" class="contenido-tab">Content 2</div>
                </div>
            `;

            tabInstance.iniciarBorde({
                contexto: '#myTabs',
                colorFuente: 'c-azul',
                colorFondo: 'fd-blanco',
                colorBorde: 'fd-azul'
            });

            // El ul debe tener la clase de fondo
            const ul = document.querySelector('#myTabs .tab-borde .op-tab-borde ul');
            expect(ul.classList.contains('fd-blanco')).toBe(true);

            // Los labels deben tener la clase de fuente
            const labels = document.querySelectorAll('#myTabs .tab-borde .op-tab-borde label');
            labels.forEach(label => {
                expect(label.classList.contains('c-azul')).toBe(true);
            });

            // El primer label debe tener el borde activo
            const firstLabel = labels[0];
            const span = firstLabel.querySelector('span');
            expect(span).toBeTruthy();
            expect(span.classList.contains('activo')).toBe(true);
            expect(span.classList.contains('fd-azul')).toBe(true);

            // El primer contenido debe estar visible
            expect(document.querySelector('#tab1').style.display).toBe('block');
            expect(document.querySelector('#tab2').style.display).toBe('none');
        });

        test('should switch bordered tabs on click', () => {
            document.body.innerHTML = `
                <div id="myTabs">
                    <div class="tab-borde">
                        <div class="op-tab-borde">
                            <ul>
                                <label data-target="#tab1">Tab 1</label>
                                <label data-target="#tab2">Tab 2</label>
                            </ul>
                        </div>
                    </div>
                    <div id="tab1" class="contenido-tab">Content 1</div>
                    <div id="tab2" class="contenido-tab">Content 2</div>
                </div>
            `;

            tabInstance.iniciarBorde({
                contexto: '#myTabs',
                colorBorde: 'fd-verde'
            });

            const secondLabel = document.querySelectorAll('#myTabs .tab-borde .op-tab-borde label')[1];
            secondLabel.click();

            // El primer label no debe tener span
            const firstLabel = document.querySelector('#myTabs .tab-borde .op-tab-borde label');
            expect(firstLabel.querySelector('span')).toBeFalsy();

            // El segundo label debe tener el borde activo
            const span = secondLabel.querySelector('span');
            expect(span).toBeTruthy();
            expect(span.classList.contains('activo')).toBe(true);
            expect(span.classList.contains('fd-verde')).toBe(true);

            // El segundo contenido debe estar visible
            expect(document.querySelector('#tab2').style.display).toBe('block');
            expect(document.querySelector('#tab1').style.display).toBe('none');
        });

        test('should skip disabled bordered tabs', () => {
            document.body.innerHTML = `
                <div id="myTabs">
                    <div class="tab-borde">
                        <div class="op-tab-borde">
                            <ul>
                                <label data-target="#tab1" class="desactivado">Tab 1</label>
                                <label data-target="#tab2">Tab 2</label>
                            </ul>
                        </div>
                    </div>
                    <div id="tab1" class="contenido-tab">Content 1</div>
                    <div id="tab2" class="contenido-tab">Content 2</div>
                </div>
            `;

            tabInstance.iniciarBorde({
                contexto: '#myTabs',
                colorBorde: 'fd-rojo'
            });

            // El primer label (desactivado) no debe tener span
            const firstLabel = document.querySelector('#myTabs .tab-borde .op-tab-borde label');
            expect(firstLabel.querySelector('span')).toBeFalsy();

            // El segundo label debe tener el borde activo
            const secondLabel = document.querySelectorAll('#myTabs .tab-borde .op-tab-borde label')[1];
            expect(secondLabel.querySelector('span')).toBeTruthy();

            // El segundo contenido debe estar visible
            expect(document.querySelector('#tab2').style.display).toBe('block');
        });

        test('should not switch to disabled bordered tab on click', () => {
            document.body.innerHTML = `
                <div id="myTabs">
                    <div class="tab-borde">
                        <div class="op-tab-borde">
                            <ul>
                                <label data-target="#tab1">Tab 1</label>
                                <label data-target="#tab2" class="desactivado">Tab 2</label>
                            </ul>
                        </div>
                    </div>
                    <div id="tab1" class="contenido-tab">Content 1</div>
                    <div id="tab2" class="contenido-tab">Content 2</div>
                </div>
            `;

            tabInstance.iniciarBorde({
                contexto: '#myTabs',
                colorBorde: 'fd-negro'
            });

            const disabledLabel = document.querySelectorAll('#myTabs .tab-borde .op-tab-borde label')[1];
            disabledLabel.click();

            // El label desactivado no debe tener span
            expect(disabledLabel.querySelector('span')).toBeFalsy();

            // El primer label debe seguir teniendo el borde
            const firstLabel = document.querySelector('#myTabs .tab-borde .op-tab-borde label');
            expect(firstLabel.querySelector('span')).toBeTruthy();

            // El contenido del tab desactivado no debe estar visible
            expect(document.querySelector('#tab2').style.display).toBe('none');
        });
    });

    describe('Destroy method', () => {
        test('should remove event listeners from regular tabs', () => {
            document.body.innerHTML = `
                <div id="myTabs">
                    <div class="tab">
                        <div class="op-tab">
                            <label data-target="#tab1">Tab 1</label>
                            <label data-target="#tab2">Tab 2</label>
                        </div>
                    </div>
                    <div id="tab1" class="contenido-tab">Content 1</div>
                    <div id="tab2" class="contenido-tab">Content 2</div>
                </div>
            `;

            tabInstance.iniciar('#myTabs');
            tabInstance.destroy('#myTabs');

            // Después de destroy, los clicks no deben cambiar tabs
            const secondLabel = document.querySelectorAll('#myTabs .tab .op-tab label')[1];
            const firstLabel = document.querySelector('#myTabs .tab .op-tab label');

            // Guardar estado inicial
            const initialActiveState = firstLabel.classList.contains('activo');

            secondLabel.click();

            // El estado no debe cambiar después del click
            expect(firstLabel.classList.contains('activo')).toBe(initialActiveState);
        });

        test('should remove event listeners from bordered tabs', () => {
            document.body.innerHTML = `
                <div id="myTabs">
                    <div class="tab-borde">
                        <div class="op-tab-borde">
                            <ul>
                                <label data-target="#tab1">Tab 1</label>
                                <label data-target="#tab2">Tab 2</label>
                            </ul>
                        </div>
                    </div>
                    <div id="tab1" class="contenido-tab">Content 1</div>
                    <div id="tab2" class="contenido-tab">Content 2</div>
                </div>
            `;

            tabInstance.iniciarBorde({ contexto: '#myTabs' });

            const firstLabel = document.querySelector('#myTabs .tab-borde .op-tab-borde label');
            const initialSpanCount = firstLabel.querySelectorAll('span').length;

            tabInstance.destroy('#myTabs');

            const secondLabel = document.querySelectorAll('#myTabs .tab-borde .op-tab-borde label')[1];
            secondLabel.click();

            // El número de spans no debe cambiar después del click
            expect(firstLabel.querySelectorAll('span').length).toBe(initialSpanCount);
        });
    });

    describe('Error Handling', () => {
        test('should handle invalid context ID for regular tabs', () => {
            const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

            tabInstance.iniciar('invalid-id');

            expect(consoleSpy).toHaveBeenCalled();
            consoleSpy.mockRestore();
        });

        test('should handle invalid context ID for bordered tabs', () => {
            const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

            tabInstance.iniciarBorde({ contexto: 'invalid-id' });

            expect(consoleSpy).toHaveBeenCalled();
            consoleSpy.mockRestore();
        });

        test('should handle missing content elements gracefully', () => {
            document.body.innerHTML = `
                <div id="myTabs">
                    <div class="tab">
                        <div class="op-tab">
                            <label data-target="#nonexistent">Tab 1</label>
                        </div>
                    </div>
                </div>
            `;

            expect(() => tabInstance.iniciar('#myTabs')).not.toThrow();
        });
    });
});

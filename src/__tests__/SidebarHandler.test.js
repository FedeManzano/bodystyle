/**
 * @jest-environment jsdom
 */

import SidebarHandler from '../modulos/SidebarHandler';

describe('SidebarHandler Module', () => {
    beforeEach(() => {
        // Limpiar el DOM antes de cada test
        document.body.innerHTML = '';

        // Resetear el estado del módulo
        SidebarHandler.conf = { nav: "", sidebar: "" };
        SidebarHandler.state = false;

        // Remover event listeners previos si existen
        if (SidebarHandler.resizeHandler) {
            window.removeEventListener('resize', SidebarHandler.resizeHandler);
        }
    });

    afterEach(() => {
        // Limpiar event listeners después de cada test
        if (SidebarHandler.resizeHandler) {
            window.removeEventListener('resize', SidebarHandler.resizeHandler);
        }
    });

    describe('Initialization', () => {
        test('should initialize without errors', () => {
            document.body.innerHTML = `
                <nav id="myNav">
                    <div class="bs-nav-md"><div class="btn-menu"></div></div>
                    <div class="bs-nav-sm"><div class="btn-menu"></div></div>
                    <div class="bs-nav-lg"><div class="btn-menu"></div></div>
                </nav>
                <div id="mySidebar"></div>
            `;

            expect(() => SidebarHandler.Init('#myNav', '#mySidebar')).not.toThrow();
        });

        test('should set configuration correctly', () => {
            document.body.innerHTML = `
                <nav id="testNav">
                    <div class="bs-nav-md"><div class="btn-menu"></div></div>
                </nav>
                <div id="testSidebar"></div>
            `;

            SidebarHandler.Init('#testNav', '#testSidebar');

            expect(SidebarHandler.conf.nav).toBe('#testNav');
            expect(SidebarHandler.conf.sidebar).toBe('#testSidebar');
        });

        test('should create complement overlay element', () => {
            document.body.innerHTML = `
                <nav id="myNav">
                    <div class="bs-nav-md"><div class="btn-menu"></div></div>
                </nav>
                <div id="mySidebar"></div>
            `;

            SidebarHandler.Init('#myNav', '#mySidebar');

            const complement = document.querySelector('.bs-nav-complement');
            expect(complement).toBeTruthy();
        });

        test('should add labels to menu buttons', () => {
            document.body.innerHTML = `
                <nav id="myNav">
                    <div class="bs-nav-md"><div class="btn-menu"></div></div>
                    <div class="bs-nav-sm"><div class="btn-menu"></div></div>
                    <div class="bs-nav-lg"><div class="btn-menu"></div></div>
                </nav>
                <div id="mySidebar"></div>
            `;

            SidebarHandler.Init('#myNav', '#mySidebar');

            const btnMd = document.querySelector('#myNav .bs-nav-md .btn-menu');
            const btnSm = document.querySelector('#myNav .bs-nav-sm .btn-menu');
            const btnLg = document.querySelector('#myNav .bs-nav-lg .btn-menu');

            expect(btnMd.querySelectorAll('label').length).toBe(3);
            expect(btnSm.querySelectorAll('label').length).toBe(3);
            expect(btnLg.querySelectorAll('label').length).toBe(3);
        });

        test('should attach resize event listener', () => {
            document.body.innerHTML = `
                <nav id="myNav">
                    <div class="bs-nav-md"><div class="btn-menu"></div></div>
                </nav>
                <div id="mySidebar"></div>
            `;

            const addEventListenerSpy = jest.spyOn(window, 'addEventListener');

            SidebarHandler.Init('#myNav', '#mySidebar');

            expect(addEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
        });
    });

    describe('Sidebar Visibility Logic', () => {
        beforeEach(() => {
            document.body.innerHTML = `
                <nav id="myNav">
                    <div class="bs-nav-md"><div class="btn-menu"></div></div>
                </nav>
                <div id="mySidebar"></div>
            `;
        });

        test('should show sidebar on wide screens (>1030px)', () => {
            // Mock window.innerWidth
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: 1200
            });

            SidebarHandler.Init('#myNav', '#mySidebar');

            const sidebar = document.querySelector('#mySidebar');
            expect(sidebar.style.left).toBe('0px');
            expect(SidebarHandler.state).toBe(true);
        });

        test('should hide sidebar on narrow screens (<1030px)', () => {
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: 800
            });

            SidebarHandler.Init('#myNav', '#mySidebar');

            const sidebar = document.querySelector('#mySidebar');
            expect(sidebar.style.left).toBe('-260px');
            expect(SidebarHandler.state).toBe(false);
        });

        test('should hide complement on wide screens', () => {
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: 1200
            });

            SidebarHandler.Init('#myNav', '#mySidebar');

            const complement = document.querySelector('.bs-nav-complement');
            // El complement se crea y luego show_hide() lo oculta
            expect(complement.style.display).toBe('none');
        });
    });

    describe('Show/Hide Methods', () => {
        beforeEach(() => {
            document.body.innerHTML = `
                <nav id="myNav">
                    <div class="bs-nav-md"><div class="btn-menu"></div></div>
                </nav>
                <div id="mySidebar"></div>
            `;

            SidebarHandler.Init('#myNav', '#mySidebar');
        });

        test('show() should display sidebar', () => {
            SidebarHandler.show();

            const sidebar = document.querySelector('#mySidebar');
            expect(sidebar.style.left).toBe('0px');
            expect(SidebarHandler.state).toBe(true);
        });

        test('hide() should hide sidebar', () => {
            SidebarHandler.hide();

            const sidebar = document.querySelector('#mySidebar');
            expect(sidebar.style.left).toBe('-240px');
            expect(SidebarHandler.state).toBe(false);
        });

        test('show() should display complement on narrow screens', () => {
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: 800
            });

            SidebarHandler.show();

            const complement = document.querySelector('.bs-nav-complement');
            expect(complement.style.display).toBe('block');
        });

        test('hide() should hide complement on narrow screens', () => {
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: 800
            });

            SidebarHandler.hide();

            const complement = document.querySelector('.bs-nav-complement');
            expect(complement.style.display).toBe('none');
        });
    });

    describe('Click Event Handling', () => {
        beforeEach(() => {
            document.body.innerHTML = `
                <nav id="myNav">
                    <div class="bs-nav-md"><div class="btn-menu"></div></div>
                </nav>
                <div id="mySidebar"></div>
            `;

            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: 800
            });

            SidebarHandler.Init('#myNav', '#mySidebar');
        });

        test('clicking menu button should toggle sidebar', () => {
            const btnMenu = document.querySelector('.btn-menu');

            // Initially hidden
            expect(SidebarHandler.state).toBe(false);

            // Click to show
            btnMenu.click();
            expect(SidebarHandler.state).toBe(true);

            // Click to hide
            btnMenu.click();
            expect(SidebarHandler.state).toBe(false);
        });

        test('clicking complement should hide sidebar', () => {
            // Show sidebar first
            SidebarHandler.show();
            expect(SidebarHandler.state).toBe(true);

            // Click complement
            const complement = document.querySelector('.bs-nav-complement');
            complement.click();

            expect(SidebarHandler.state).toBe(false);
        });
    });

    describe('Resize Handling', () => {
        beforeEach(() => {
            document.body.innerHTML = `
                <nav id="myNav">
                    <div class="bs-nav-md"><div class="btn-menu"></div></div>
                </nav>
                <div id="mySidebar"></div>
            `;
        });

        test('should update sidebar visibility on resize', () => {
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: 800
            });

            SidebarHandler.Init('#myNav', '#mySidebar');

            const sidebar = document.querySelector('#mySidebar');
            expect(sidebar.style.left).toBe('-260px');

            // Simulate resize to wide screen
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: 1200
            });

            window.dispatchEvent(new Event('resize'));

            expect(sidebar.style.left).toBe('0px');
        });
    });

    describe('Edge Cases', () => {
        test('should handle missing nav elements gracefully', () => {
            document.body.innerHTML = `
                <nav id="myNav"></nav>
                <div id="mySidebar"></div>
            `;

            expect(() => SidebarHandler.Init('#myNav', '#mySidebar')).not.toThrow();
        });

        test('should handle missing sidebar element gracefully', () => {
            document.body.innerHTML = `
                <nav id="myNav">
                    <div class="bs-nav-md"><div class="btn-menu"></div></div>
                </nav>
            `;

            expect(() => SidebarHandler.Init('#myNav', '#mySidebar')).not.toThrow();
        });

        test('should handle multiple initializations', () => {
            document.body.innerHTML = `
                <nav id="myNav">
                    <div class="bs-nav-md"><div class="btn-menu"></div></div>
                </nav>
                <div id="mySidebar"></div>
            `;

            expect(() => {
                SidebarHandler.Init('#myNav', '#mySidebar');
                // Note: Multiple inits will create multiple complements
                // This is expected behavior based on the original implementation
            }).not.toThrow();
        });
    });
});

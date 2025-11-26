// src/__tests__/SidebarDrop.test.js
/**
 * Tests for the SidebarDrop module (src/modulos/SidebarDrop.js)
 * Tests the sidebar dropdown functionality with Vanilla JS implementation
 */

import SidebarDrop from '../modulos/SidebarDrop';

// Mock SidebarHandler since it's a dependency
jest.mock('../modulos/SidebarHandler', () => ({
    Init: jest.fn()
}));

// Helper to build sidebar HTML
function buildSidebarHTML() {
    document.body.innerHTML = `
    <nav id="test-nav">
      <div class="bs-nav-md">
        <div class="btn-menu"></div>
      </div>
    </nav>
    <aside id="test-sidebar">
      <div class="bs-sidebar-title" data-target="#submenu1">
        Menu 1
      </div>
      <ul id="submenu1" style="display: none;">
        <li>Item 1.1</li>
        <li>Item 1.2</li>
      </ul>
      <div class="bs-sidebar-title" data-target="#submenu2">
        Menu 2
      </div>
      <ul id="submenu2" style="display: none;">
        <li>Item 2.1</li>
        <li>Item 2.2</li>
      </ul>
    </aside>`;
}

describe('SidebarDrop module', () => {
    beforeEach(() => {
        // Clean DOM before each test
        document.body.innerHTML = '';
    });

    test('Init adds arrows to sidebar titles', () => {
        buildSidebarHTML();

        SidebarDrop.Init({
            idNav: '#test-nav',
            idSidebar: '#test-sidebar'
        });

        // Check that arrows were added
        const titles = document.querySelectorAll('#test-sidebar .bs-sidebar-title');
        titles.forEach(title => {
            const arrow = title.querySelector('i.arrow-right');
            expect(arrow).not.toBeNull();
        });
    });

    test('Init with submenu parameter opens specified submenu', (done) => {
        buildSidebarHTML();

        SidebarDrop.Init({
            idNav: '#test-nav',
            idSidebar: '#test-sidebar',
            submenu: '#submenu1'
        });

        // Wait for animation to complete
        setTimeout(() => {
            const submenu1 = document.querySelector('#submenu1');
            const title1 = document.querySelector('[data-target="#submenu1"]');

            // Check that submenu is visible
            expect(submenu1.style.display).not.toBe('none');

            // Check that arrow changed to arrow-bottom
            const arrow = title1.querySelector('i.arrow-bottom');
            expect(arrow).not.toBeNull();

            done();
        }, 150);
    });

    test('Clicking sidebar title opens submenu', (done) => {
        buildSidebarHTML();

        SidebarDrop.Init({
            idNav: '#test-nav',
            idSidebar: '#test-sidebar'
        });

        const title1 = document.querySelector('[data-target="#submenu1"]');
        const submenu1 = document.querySelector('#submenu1');

        // Initially submenu should be hidden
        expect(submenu1.style.display).toBe('none');

        // Click to open
        title1.click();

        // Wait for slideDown animation
        setTimeout(() => {
            // Submenu should be visible
            expect(submenu1.style.display).toBe('block');

            // Arrow should change to arrow-bottom
            const arrowBottom = title1.querySelector('i.arrow-bottom');
            expect(arrowBottom).not.toBeNull();

            done();
        }, 150);
    });

    test('Clicking on child elements of sidebar title also toggles submenu', (done) => {
        buildSidebarHTML();

        SidebarDrop.Init({
            idNav: '#test-nav',
            idSidebar: '#test-sidebar'
        });

        const title1 = document.querySelector('[data-target="#submenu1"]');
        const submenu1 = document.querySelector('#submenu1');

        // Add a child element to the title
        const span = document.createElement('span');
        span.textContent = 'Click me';
        title1.appendChild(span);

        // Click on the child element
        span.click();

        // Wait for animation
        setTimeout(() => {
            // Submenu should be visible
            expect(submenu1.style.display).not.toBe('none');
            done();
        }, 150);
    });

    test('Multiple submenus can be toggled independently', (done) => {
        buildSidebarHTML();

        SidebarDrop.Init({
            idNav: '#test-nav',
            idSidebar: '#test-sidebar'
        });

        const title1 = document.querySelector('[data-target="#submenu1"]');
        const title2 = document.querySelector('[data-target="#submenu2"]');
        const submenu1 = document.querySelector('#submenu1');
        const submenu2 = document.querySelector('#submenu2');

        // Open first submenu
        title1.click();

        setTimeout(() => {
            expect(submenu1.style.display).not.toBe('none');
            expect(submenu2.style.display).toBe('none');

            // Open second submenu
            title2.click();

            setTimeout(() => {
                // Both should be open
                expect(submenu1.style.display).not.toBe('none');
                expect(submenu2.style.display).not.toBe('none');

                done();
            }, 150);
        }, 150);
    });

    test('Init validates idNav parameter', () => {
        buildSidebarHTML();

        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

        SidebarDrop.Init({
            idNav: 'invalid-id', // Missing #
            idSidebar: '#test-sidebar'
        });

        expect(consoleSpy).toHaveBeenCalled();
        consoleSpy.mockRestore();
    });

    test('Init validates idSidebar parameter', () => {
        buildSidebarHTML();

        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

        SidebarDrop.Init({
            idNav: '#test-nav',
            idSidebar: 'invalid-id' // Missing #
        });

        expect(consoleSpy).toHaveBeenCalled();
        consoleSpy.mockRestore();
    });
});

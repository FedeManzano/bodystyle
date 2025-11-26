/**
 * Animaciones utilitarias para efectos de acordeón y transiciones.
 * Exporta cuatro funciones reutilizables: slideUp, slideDown, fadeIn y fadeOut.
 * Todas usan la Web Animations API y aceptan un callback opcional.
 */

/**
 * Desliza (slide‑up) un elemento ocultándolo con animación.
 * @param {HTMLElement|NodeList} elemento El panel a cerrar (puede ser un HTMLElement o un NodeList con un solo elemento).
 * @param {number} [duration=300] Duración en milisegundos.
 * @param {Function} [callback] Función opcional que se ejecuta al terminar la animación.
 */
export function slideUp(elemento, duration = 300, callback) {
    if (!elemento) return;
    const el = (elemento instanceof NodeList) ? elemento[0] : elemento;
    if (!el || !(el instanceof HTMLElement)) return;
    el.style.opacity = '1';
    const startHeight = el.scrollHeight;



    const animation = el.animate(
        [
            { height: `${startHeight}px` },
            { height: '0px' }
        ],
        {
            duration: duration,
            easing: 'ease-in-out',
            fill: 'forwards'
        }
    );

    animation.onfinish = () => {
        el.style.display = 'none';
        el.style.removeProperty('height');
        if (typeof callback === 'function') callback();
    };
}

/**
 * Desliza (slide‑down) un elemento mostrándolo con animación.
 * @param {HTMLElement|NodeList} elemento El panel a abrir.
 * @param {number} [duration=300] Duración en milisegundos.
 * @param {Function} [callback] Función opcional que se ejecuta al terminar la animación.
 */
export function slideDown(elemento, duration = 300, callback) {
    if (!elemento) return;
    const el = (elemento instanceof NodeList) ? elemento[0] : elemento;
    if (!el || !(el instanceof HTMLElement)) return;



    // Aseguramos que el elemento sea visible para calcular su altura natural
    el.style.opacity = '1';
    el.style.display = 'block';

    const targetHeight = el.scrollHeight;
    el.style.height = '0px';
    el.style.overflow = 'hidden';

    const animation = el.animate(
        [
            { height: '0px' },
            { height: `${targetHeight}px` }
        ],
        {
            duration: duration,
            easing: 'ease-in-out',
            fill: 'forwards'
        }
    );

    animation.onfinish = () => {
        el.style.removeProperty('height');
        el.style.removeProperty('overflow');
        el.style.removeProperty('opacity');
        if (typeof callback === 'function') callback();
    };
}

/**
 * Desvanece (fade‑in) un elemento mostrándolo con animación de opacidad.
 * @param {HTMLElement|NodeList} elemento El elemento a mostrar.
 * @param {number} [duration=300] Duración en milisegundos.
 * @param {Function} [callback] Función opcional que se ejecuta al terminar la animación.
 */
export function fadeIn(elemento, duration = 300, callback) {
    if (!elemento) return;
    const el = (elemento instanceof NodeList) ? elemento[0] : elemento;
    if (!el || !(el instanceof HTMLElement)) return;

    // Asegurar que el elemento sea visible
    el.style.display = el.style.display === 'none' ? 'flex' : el.style.display || 'flex';
    el.style.opacity = '0';

    const animation = el.animate(
        [
            { opacity: '0' },
            { opacity: '1' }
        ],
        {
            duration: duration,
            easing: 'ease-in-out',
            fill: 'forwards'
        }
    );

    animation.onfinish = () => {
        el.style.opacity = '1';
        if (typeof callback === 'function') callback();
    };
}

/**
 * Desvanece (fade‑out) un elemento ocultándolo con animación de opacidad.
 * @param {HTMLElement|NodeList} elemento El elemento a ocultar.
 * @param {number} [duration=300] Duración en milisegundos.
 * @param {Function} [callback] Función opcional que se ejecuta al terminar la animación.
 */
export function fadeOut(elemento, duration = 300, callback) {
    if (!elemento) return;
    const el = (elemento instanceof NodeList) ? elemento[0] : elemento;
    if (!el || !(el instanceof HTMLElement)) return;

    const animation = el.animate(
        [
            { opacity: '1' },
            { opacity: '0' }
        ],
        {
            duration: duration,
            easing: 'ease-in-out',
            fill: 'forwards'
        }
    );

    animation.onfinish = () => {
        el.style.opacity = '0';
        el.style.display = 'none';
        if (typeof callback === 'function') callback();
    };
}

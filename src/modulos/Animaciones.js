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

    // Cancelar animaciones previas para evitar conflictos
    if (el.__slideAnimation) {
        el.__slideAnimation.cancel();
    }

    // Asegurar que el elemento sea visible para obtener su altura actual
    const wasHidden = el.style.display === 'none';
    if (wasHidden) {
        el.style.display = 'block';
    }

    const startHeight = el.scrollHeight;
    el.style.overflow = 'hidden';

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

    el.__slideAnimation = animation;

    animation.onfinish = () => {
        el.style.display = 'none';
        el.style.removeProperty('height');
        el.style.removeProperty('overflow');
        el.__slideAnimation = null;
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

    // Cancelar animaciones previas para evitar conflictos
    if (el.__slideAnimation) {
        el.__slideAnimation.cancel();
    }

    // Aseguramos que el elemento sea visible para calcular su altura natural
    el.style.display = 'block';
    el.style.overflow = 'hidden';
    el.style.height = '0px';

    // Forzar reflow para que el cambio de display se aplique antes de animar
    void el.offsetHeight;

    const targetHeight = el.scrollHeight;

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

    el.__slideAnimation = animation;

    animation.onfinish = () => {
        el.style.removeProperty('height');
        el.style.removeProperty('overflow');
        el.__slideAnimation = null;
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

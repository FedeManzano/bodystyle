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
export function slideUp(elemento: HTMLElement | NodeList, duration?: number, callback?: Function): void;
/**
 * Desliza (slide‑down) un elemento mostrándolo con animación.
 * @param {HTMLElement|NodeList} elemento El panel a abrir.
 * @param {number} [duration=300] Duración en milisegundos.
 * @param {Function} [callback] Función opcional que se ejecuta al terminar la animación.
 */
export function slideDown(elemento: HTMLElement | NodeList, duration?: number, callback?: Function): void;
/**
 * Desvanece (fade‑in) un elemento mostrándolo con animación de opacidad.
 * @param {HTMLElement|NodeList} elemento El elemento a mostrar.
 * @param {number} [duration=300] Duración en milisegundos.
 * @param {Function} [callback] Función opcional que se ejecuta al terminar la animación.
 */
export function fadeIn(elemento: HTMLElement | NodeList, duration?: number, callback?: Function): void;
/**
 * Desvanece (fade‑out) un elemento ocultándolo con animación de opacidad.
 * @param {HTMLElement|NodeList} elemento El elemento a ocultar.
 * @param {number} [duration=300] Duración en milisegundos.
 * @param {Function} [callback] Función opcional que se ejecuta al terminar la animación.
 */
export function fadeOut(elemento: HTMLElement | NodeList, duration?: number, callback?: Function): void;

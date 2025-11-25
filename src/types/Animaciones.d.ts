/**
 * TypeScript definitions for Animaciones module
 * Utility animations for accordion effects
 */

/**
 * Slides up (hides) an element with animation
 * @param elemento - The element to hide (HTMLElement or NodeList with a single element)
 * @param duration - Duration in milliseconds (default: 300)
 * @param callback - Optional callback function executed when animation finishes
 * @example
 * slideUp(element, 300, () => console.log('Animation complete'));
 */
export function slideUp(
    elemento: HTMLElement | NodeList,
    duration?: number,
    callback?: () => void
): void;

/**
 * Slides down (shows) an element with animation
 * @param elemento - The element to show (HTMLElement or NodeList with a single element)
 * @param duration - Duration in milliseconds (default: 300)
 * @param callback - Optional callback function executed when animation finishes
 * @example
 * slideDown(element, 300, () => console.log('Animation complete'));
 */
export function slideDown(
    elemento: HTMLElement | NodeList,
    duration?: number,
    callback?: () => void
): void;

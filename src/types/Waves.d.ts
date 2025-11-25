/**
 * TypeScript definitions for Waves module
 * Efecto de ondas para elementos interactivos
 */

/**
 * Waves effect module
 * Provides ripple effect for interactive elements
 */
export interface WavesModule {
    /**
     * Initializes the waves effect on all elements with the `.waves` class
     * @example
     * Waves.iniciar();
     */
    iniciar(): void;

    /**
     * Removes all event listeners associated with the waves effect
     * @example
     * Waves.destroy();
     */
    destroy(): void;
}

/**
 * Global Waves instance
 */
export const Waves: WavesModule;
export default Waves;

/**
 * TypeScript definitions for Colecciones module
 * Collection/List management with accordion and dropdown effects
 */

/**
 * Configuration for collection styling
 */
export interface ColeccionConfig {
    /** Context ID that wraps the list */
    contexto?: string;
    /** Background color class (e.g., 'fd-blanco') */
    colorFondo?: string;
    /** Text color class (e.g., 'c-negro') */
    colorTexto?: string;
    /** Arrow color in hexadecimal format */
    colorFlechas?: string;
}

/**
 * Collection class for managing lists with accordion and dropdown effects
 */
export class Coleccion {
    /**
     * Creates a new Coleccion instance
     */
    constructor();

    /**
     * Removes events associated with collections
     * @param contexto - ID that wraps the list, used as element context
     */
    destroy(contexto: string): void;

    /**
     * Selects an element or elements from the DOM
     * @param selector - CSS selector
     * @returns NodeList or HTMLElement
     */
    select(selector: string): NodeListOf<Element> | HTMLElement | null;

    /**
     * Configures accordion-style lists with collapsible submenus
     * @param config - Collection configuration
     */
    acordeon(config: ColeccionConfig): void;

    /**
     * Configures dropdown-style lists
     * @param config - Collection configuration
     */
    desplegable(config: ColeccionConfig): void;

    /**
     * Loads configuration to define list styles and visuals
     * @param config - Collection configuration
     */
    cargarConfiguracion(config: ColeccionConfig): void;

    /**
     * Validates configuration parameters
     * @param config - Collection configuration
     * @returns false if configuration parameters are incorrect
     */
    validarConfig(config: ColeccionConfig): boolean;

    /**
     * Initializes the collection with specified configuration
     * @param config - Collection configuration
     */
    iniciar(config?: ColeccionConfig): void;
}

export default Coleccion;

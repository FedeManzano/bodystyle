/**
 * Mock del módulo GestionErrores para tests
 */

const ERR = {
    fondo: {
        val: jest.fn((color) => {
            // Simular validación de colores
            const validColors = ['bg-red', 'bg-blue', 'bg-green', 'bg-yellow', 'bg-purple', 'bg-orange'];
            return validColors.includes(color);
        }),
        mje: 'Color de fondo inválido'
    }
};

export default ERR;

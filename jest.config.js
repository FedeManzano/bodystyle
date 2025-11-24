module.exports = {
    // Entorno de testing (simula navegador)
    testEnvironment: 'jsdom',

    // Transformación de archivos con Babel
    transform: {
        '^.+\\.js$': 'babel-jest',
    },

    // Extensiones de archivos a procesar
    moduleFileExtensions: ['js'],

    // Patrones para encontrar archivos de test
    testMatch: [
        '**/__tests__/**/*.test.js',
        '**/?(*.)+(spec|test).js'
    ],

    // Archivos a incluir en el reporte de cobertura
    collectCoverageFrom: [
        'src/modulos/**/*.js',
        '!src/modulos/**/index.js',
        '!**/node_modules/**'
    ],

    // Umbrales mínimos de cobertura
    coverageThreshold: {
        global: {
            branches: 0,
            functions: 0,
            lines: 0,
            statements: 0
        }
    },

    // Archivo de setup que se ejecuta antes de los tests
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

    // Directorio para reportes de cobertura
    coverageDirectory: 'coverage',

    // Formato de reportes de cobertura
    coverageReporters: ['text', 'lcov', 'html'],

    // Ignorar estos directorios
    testPathIgnorePatterns: [
        '/node_modules/',
        '/dist/',
        '/ejemplos/'
    ],

    // Verbose output
    verbose: true
};

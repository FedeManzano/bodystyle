import ColeccionFlotante from '../modulos/ColeccionFlotante';

describe('ColeccionFlotante', () => {
    let coleccion;

    beforeEach(() => {
        // Configurar el DOM simulado
        document.body.innerHTML = `
            <div id="test-context">
                <div class="lista-float-der">
                    <div class="cerrar" style="display: none;">X</div>
                    <div class="abrir" style="display: block;">Open</div>
                    <div class="lista-item">Item 1</div>
                </div>
                <div class="lista-float-izq">
                    <div class="cerrar" style="display: none;">X</div>
                    <div class="abrir" style="display: block;">Open</div>
                    <div class="lista-item">Item 2</div>
                </div>
            </div>
        `;
        coleccion = new ColeccionFlotante();
    });

    afterEach(() => {
        document.body.innerHTML = '';
        jest.clearAllMocks();
    });

    test('debería inicializar correctamente con configuración válida', () => {
        const config = {
            contexto: '#test-context',
            fondoItem: 'bg-test',
            colorTexto: 'text-test',
            altura: 150
        };

        coleccion.iniciar(config);

        const der = document.querySelector('#test-context .lista-float-der');
        const izq = document.querySelector('#test-context .lista-float-izq');

        expect(der.style.top).toBe('150px');
        expect(izq.style.top).toBe('150px');

        // Verificar visibilidad inicial (cerrar visible, abrir oculto)
        expect(document.querySelector('.lista-float-der .cerrar').style.display).toBe('block');
        expect(document.querySelector('.lista-float-der .abrir').style.display).toBe('none');

        // Verificar clases añadidas
        expect(document.querySelector('.lista-float-der .lista-item').classList.contains('bg-test')).toBe(true);
        expect(document.querySelector('.lista-float-der .lista-item').classList.contains('text-test')).toBe(true);
    });

    test('debería manejar eventos de click para abrir y cerrar (derecha)', () => {
        coleccion.iniciar({ contexto: '#test-context' });

        const cerrarBtn = document.querySelector('.lista-float-der .cerrar');
        const abrirBtn = document.querySelector('.lista-float-der .abrir');
        const containerDer = document.querySelector('.lista-float-der');

        // Simular click en cerrar (ocultar)
        // Nota: En el código original, cerrar oculta el contenedor (right: -230px)
        cerrarBtn.click();
        expect(containerDer.style.right).toBe('-230px');
        expect(cerrarBtn.style.display).toBe('none');
        expect(abrirBtn.style.display).toBe('block');

        // Simular click en abrir (mostrar)
        abrirBtn.click();
        expect(containerDer.style.right).toBe('0px');
        expect(abrirBtn.style.display).toBe('none');
        expect(cerrarBtn.style.display).toBe('block');
    });

    test('debería manejar eventos de click para abrir y cerrar (izquierda)', () => {
        coleccion.iniciar({ contexto: '#test-context' });

        const cerrarBtn = document.querySelector('.lista-float-izq .cerrar');
        const abrirBtn = document.querySelector('.lista-float-izq .abrir');
        const containerIzq = document.querySelector('.lista-float-izq');

        // Simular click en cerrar (ocultar)
        cerrarBtn.click();
        expect(containerIzq.style.left).toBe('-230px');
        expect(cerrarBtn.style.display).toBe('none');
        expect(abrirBtn.style.display).toBe('block');

        // Simular click en abrir (mostrar)
        abrirBtn.click();
        expect(containerIzq.style.left).toBe('0px');
        expect(abrirBtn.style.display).toBe('none');
        expect(cerrarBtn.style.display).toBe('block');
    });

    test('debería validar configuración incorrecta', () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

        // Contexto inválido (no empieza con # o .)
        coleccion.iniciar({ contexto: 'invalid' });
        expect(consoleSpy).toHaveBeenCalled();

        consoleSpy.mockClear();
        // Altura negativa
        coleccion.iniciar({ contexto: '#valid', altura: -10 });
        expect(consoleSpy).toHaveBeenCalled();

        consoleSpy.mockRestore();
    });

    test('destroy debería limpiar event listeners reemplazando los nodos', () => {
        coleccion.iniciar({ contexto: '#test-context' });

        const cerrarBtn = document.querySelector('.lista-float-der .cerrar');
        const oldCerrarBtn = cerrarBtn;

        // Añadir un atributo para verificar que se mantiene en el clon
        cerrarBtn.dataset.test = 'original';

        coleccion.destroy('#test-context');

        const newCerrarBtn = document.querySelector('.lista-float-der .cerrar');

        expect(newCerrarBtn).not.toBe(oldCerrarBtn); // Debería ser un nuevo elemento (clon)
        expect(newCerrarBtn.dataset.test).toBe('original'); // Debería conservar atributos
    });
});

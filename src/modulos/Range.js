/**
 * Módulo (20) Permite darle estilos dinámicos a los 
 * input range.
 */
class Range {

    iniciar() {
        // Seleccionar todos los inputs dentro de .input-range
        const rangeInputs = document.querySelectorAll(".input-range input");

        rangeInputs.forEach(input => {
            // Agregar evento mousemove a cada input
            input.addEventListener("mousemove", (e) => {
                // Obtener el valor actual del input
                const val = input.value;

                // Buscar el span hermano dentro del padre
                const span = input.parentElement.querySelector("span");
                if (span) {
                    span.textContent = val;
                }

                // Crear el gradiente dinámico basado en el valor
                const gradiente = `linear-gradient(90deg, rgb(0, 187, 156) ${val}%, rgb(0, 0, 0) ${val}%)`;

                // Aplicar el gradiente como background
                input.style.background = gradiente;
            });
        });
    }
}

export default new Range();
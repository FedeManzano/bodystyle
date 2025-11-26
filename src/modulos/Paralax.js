/**
 * Módulo (18) Permite establecer el efecto paralax
 * en las imágenes seleccionadas.
 */
class Paralax {
    iniciar() {
        // Ocultar todas las imágenes dentro de .paralax-contenedor
        document.querySelectorAll(".paralax-contenedor img").forEach(img => {
            img.style.opacity = "0";
        });

        // Iterar sobre cada contenedor para configurar el fondo
        document.querySelectorAll(".paralax-contenedor").forEach(contenedor => {
            const img = contenedor.querySelector(".paralax");
            if (img) {
                const ruta = img.getAttribute("src");
                if (ruta) {
                    contenedor.style.backgroundImage = `url(${ruta})`;
                    contenedor.style.backgroundAttachment = "fixed";
                }
            }
        });
    }
}

const paralaxInstance = new Paralax();
window.Paralax = paralaxInstance;
export default paralaxInstance;
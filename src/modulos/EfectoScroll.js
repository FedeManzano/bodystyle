/**
 * Modulo (29) Efecto Scroll
 * 
 * Este módulo aplica una clase CSS a los elementos con la clase 'efecto-scroll'
 */
(function(){

    // Variable para almacenar el observer
    let observer = null;

    const iniciar = () => {

        const config = {
            threshold: 0.1,
            rootMargin: "0px 0px -100px 0px"
        }

        observer = new IntersectionObserver((ent) => {
            ent.forEach(e => {
                if(e.isIntersecting){
                    e.target.classList.add('active-scroll');
                }
            })
        })

        const elementos = document.querySelectorAll('.scroll-effect');
        elementos.forEach(el => {
            observer.observe(el);
        })
    }

    const destroy = () => {
        if (observer) {
            observer.disconnect();
            observer = null;
        }        
    }


    const EfectoScroll = {
        iniciar: () => iniciar(),
        destroy: () => destroy()
    }

    window.EfectoScroll = EfectoScroll;        // Aquí iría la lógica específica del efecto scroll
})()


export default EfectoScroll;


import $ from 'jquery'

(function() {
    var inicializar = () => {
        $(".input-range input").on("mousemove" , function(e) {
            var val = $(this).val()
            $(this).parent().children("span").text(val)
            var gradiente = 
            "linear-gradient(90deg, rgb(0, 187, 156) " + $(this).val() + 
                "%, rgb(0, 0, 0)"+ $(this).val() + "%)"
            $(this).css("background", gradiente)
        })
    }

    var Range = {
        iniciar: () => inicializar()
    }

    window.Range = Range

})()

export default Range
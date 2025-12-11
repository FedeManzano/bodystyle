(function() {
    const ERR = {
        contexto: {
            val: (id) => /^\#[a-zA-Z0-9-_]+$/.test(id),
            mje: `Error bodystyle dice: 01 El formato del contexto ingresado es erroneo revise el id suministrado`
        },
        
        bool: {
            val: (valor) => typeof valor === "boolean",
            mje: `Error bodystyle dice: 02 El valor booleano suministrado no es correcto revise el valor true / false`
        },
        
        fondo: {
            val: (fondo) => /^(fd|bg)-[a-z-]+/.test(fondo),
            mje: `Error bodystyle dice: 03 Los colores de fondo de bodystyle comienzan con fd-[color]`
        },

        posicion: {
            val: (posicion) => {
                if(typeof posicion !== "string") return false
                return posicion === "arriba" || posicion === "abajo" || posicion === "derecha" || posicion === "izquierda"
            },
            mje: `Error bodystyle dice: 04 La posición debe ser [arriba | abajo | izquierda | derecha]`
        },

        info: {
            val: (info) => info !== undefined && info !== "",
            mje: `Error bodystyle dice: 05 La información no puede ser vacia`
        },

        texto: {
            val: (texto) => /^c-[a-z-]+/.test(texto),
            mje: `Error bodystyle dice: 06 Los colores de texto de bodystyle comienzan con c-[color]`
        },
        borde: {
            val: (borde) => /^(bor-.+)/.test(borde),
            mje: `Error bodystyle dice: 07 Las clases de borde de bodystyle comienzan con bor-`
        },

        positivo: {
            val: (numero) => typeof numero === "number" && numero > 0,
            mje: `Error bodystyle dice: 08 El parametro debe ser un valor positivo`
        },

    }

    window.ERR = ERR
})()

export default ERR
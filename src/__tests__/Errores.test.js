
import { describe } from "node:test";
import Errores from "../modulos/GestionErrores.js";


describe("GestionErrores.js", () => {
    
    describe("Pruebas a todo lo referente a la validación del ID", () => {

        test("Validar ID campos internos", ()=>{
            expect(typeof Errores.contexto).toBe("object")
            expect(typeof Errores.contexto.val).toBe("function")
            expect(typeof Errores.contexto.mje).toBe("string")
        })

        test("Mensajes de error", () =>{
            expect(Errores.contexto.mje).toBe("Error bodystyle dice: 01 El formato del contexto ingresado es erroneo revise el id suministrado")
        })

        test("Validar ID ", () => {
            expect(Errores.contexto.val("id")).toBe(false);   
            expect(Errores.contexto.val("#id")).toBe(true);
            expect(Errores.contexto.val("#id-2")).toBe(true);       
            expect(Errores.contexto.val("#id*")).toBe(false);   
            expect(Errores.contexto.val("#*id")).toBe(false); 
            expect(Errores.contexto.val("#id_1")).toBe(true);  
            expect(Errores.contexto.val("id_1#")).toBe(false);
        });   
    });

    describe("Pruebas a todo lo referente a la validación de booleanos", () => {

        test("Validar booleanos campos internos", ()=>{
            expect(typeof Errores.bool).toBe("object")
            expect(typeof Errores.bool.val).toBe("function")
            expect(typeof Errores.bool.mje).toBe("string")
        })  

        test("Mensajes de error", () =>{
            expect(Errores.bool.mje).toBe("Error bodystyle dice: 02 El valor booleano suministrado no es correcto revise el valor true / false")
        })

        test("Validar booleanos ", () => {
            expect(Errores.bool.val(true)).toBe(true);
            expect(Errores.bool.val(false)).toBe(true);       
            expect(Errores.bool.val("true")).toBe(false);   
            expect(Errores.bool.val("false")).toBe(false); 
            expect(Errores.bool.val(1)).toBe(false);  
            expect(Errores.bool.val(0)).toBe(false);
        });
    });

    describe("Pruebas a todo lo referente a la validación de colores de fondo", () => {

        test("Validar colores de fondo campos internos", ()=>{
            expect(typeof Errores.fondo).toBe("object")
            expect(typeof Errores.fondo.val).toBe("function")
            expect(typeof Errores.fondo.mje).toBe("string")
        })
        test("Mensajes de error", () =>{
            expect(Errores.fondo.mje).toBe("Error bodystyle dice: 03 Los colores de fondo de bodystyle comienzan con fd-[color]")
        })
        test("Validar colores de fondo ", () => {       
            expect(Errores.fondo.val("fd-rojo")).toBe(true);   
            expect(Errores.fondo.val("bg-azul")).toBe(true);       
            expect(Errores.fondo.val("fondo-rojo")).toBe(false);   
            expect(Errores.fondo.val("background-azul")).toBe(false); 
            expect(Errores.fondo.val("fd-")).toBe(false);  
            expect(Errores.fondo.val("bg-")).toBe(false);
        });
    });

    describe("Pruebas a todo lo referente a la validación de posiciones", () => {

        test("Validar posiciones campos internos", ()=>{
            expect(typeof Errores.posicion).toBe("object")
            expect(typeof Errores.posicion.val).toBe("function")
            expect(typeof Errores.posicion.mje).toBe("string")
        });
        test("Mensajes de error", () =>{
            expect(Errores.posicion.mje).toBe("Error bodystyle dice: 04 La posición debe ser [arriba | abajo | izquierda | derecha]")
        });
        test("Validar posiciones ", () => {       
            expect(Errores.posicion.val("arriba")).toBe(true);   
            expect(Errores.posicion.val("abajo")).toBe(true);       
            expect(Errores.posicion.val("izquierda")).toBe(true);   
            expect(Errores.posicion.val("derecha")).toBe(true); 
            expect(Errores.posicion.val("centro")).toBe(false);  
            expect(Errores.posicion.val("superior")).toBe(false);
            expect(Errores.posicion.val(123)).toBe(false);
        });
    });
    describe("Pruebas a todo lo referente a la validación de información no vacía", () => {

        test("Validar info campos internos", ()=>{
            expect(typeof Errores.info).toBe("object")
            expect(typeof Errores.info.val).toBe("function")
            expect(typeof Errores.info.mje).toBe("string")
        });
        test("Mensajes de error", () =>{
            expect(Errores.info.mje).toBe("Error bodystyle dice: 05 La información no puede ser vacia")
        });
        test("Validar info ", () => {       
            expect(Errores.info.val("Hola")).toBe(true);   
            expect(Errores.info.val("123")).toBe(true);       
            expect(Errores.info.val(" ")).toBe(true);   
            expect(Errores.info.val("")).toBe(false); 
            expect(Errores.info.val(undefined)).toBe(false);  
            expect(Errores.info.val()).toBe(false);
        }); 
    });
    describe("Pruebas a todo lo referente a la validación de colores de texto", () => {

        test("Validar colores de texto campos internos", ()=>{
            expect(typeof Errores.texto).toBe("object")
            expect(typeof Errores.texto.val).toBe("function")
            expect(typeof Errores.texto.mje).toBe("string")
        });
        test("Mensajes de error", () =>{
            expect(Errores.texto.mje).toBe("Error bodystyle dice: 06 Los colores de texto de bodystyle comienzan con c-[color]")
        }); 
        test("Validar colores de texto ", () => {       
            expect(Errores.texto.val("c-rojo")).toBe(true);   
            expect(Errores.texto.val("c-azul")).toBe(true);       
            expect(Errores.texto.val("color-rojo")).toBe(false);   
            expect(Errores.texto.val("texto-azul")).toBe(false); 
            expect(Errores.texto.val("c-")).toBe(false);  
            expect(Errores.texto.val("color-")).toBe(false);
        });
    });
    describe("Pruebas a todo lo referente a la validación de clases de borde", () => {

        test("Validar clases de borde campos internos", ()=>{
            expect(typeof Errores.borde).toBe("object")
            expect(typeof Errores.borde.val).toBe("function")
            expect(typeof Errores.borde.mje).toBe("string")
        }); 
        test("Mensajes de error", () =>{
            expect(Errores.borde.mje).toBe("Error bodystyle dice: 07 Las clases de borde de bodystyle comienzan con bor-")
        });
        test("Validar clases de borde ", () => {       
            expect(Errores.borde.val("bor-rojo")).toBe(true);   
            expect(Errores.borde.val("bor-azul")).toBe(true);       
            expect(Errores.borde.val("borde-rojo")).toBe(false);   
            expect(Errores.borde.val("border-azul")).toBe(false); 
            expect(Errores.borde.val("bor-")).toBe(false);  
            expect(Errores.borde.val("borde-")).toBe(false);
        });
    });
    describe("Pruebas a todo lo referente a la validación de números positivos", () => {

        test("Validar números positivos campos internos", ()=>{
            expect(typeof Errores.positivo).toBe("object")
            expect(typeof Errores.positivo.val).toBe("function")
            expect(typeof Errores.positivo.mje).toBe("string")
        });
        test("Mensajes de error", () =>{
            expect(Errores.positivo.mje).toBe("Error bodystyle dice: 08 El parametro debe ser un valor positivo")
        });     
        test("Validar números positivos ", () => {
            expect(Errores.positivo.val(5)).toBe(true);
            expect(Errores.positivo.val(0.1)).toBe(true);       
            expect(Errores.positivo.val(0)).toBe(false);   
            expect(Errores.positivo.val(-3)).toBe(false); 
            expect(Errores.positivo.val(-0.5)).toBe(false);  
            expect(Errores.positivo.val("5")).toBe(false);
        });
    });
    describe("Pruebas generales al objeto ERR", () => {

        test("Validar que ERR es un objeto", ()=>{
            expect(typeof Errores).toBe("object")
        });
    });
});         


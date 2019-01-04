export interface aristaInterface{
    width: number,
    height: number,
    angle: number,
    top: number,
    left: number,
    border: number,
    bgcolor: string,
    value: number,
    relacion: number[],
    font: number,
    posicion: number,
    final: number, // 0 no visitada, 1 eliminada, 2 utilizada en arbol final
    opacidad: number
}

export class Arista implements aristaInterface{
    width: number;
    height: number;
    angle: number;
    top: number;
    left: number;
    border: number;
    bgcolor: string;
    value: number;
    relacion: number[];
    font: number;
    posicion: number;
    final: number;
    opacidad: number;

    constructor(){
        this.width = 0;
        this.height = 0;
        this.angle = 0;
        this.top = 0;
        this.left = 0;
        this.border = 0;
        this.bgcolor = '#000';
        this.value = 0;
        this.relacion = [];
        this.font = 0;
        this.posicion = 0;
        this.final = 0;
        this.opacidad = 1;
    }
}
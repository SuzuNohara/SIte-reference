interface rmdSelect{
    usuario: string,
    formulario: string,
    consulta: string,
    columnas: string[],
    condiciones: condicion[],
    orden: string,
    url: string,
    result?: IdValue[],
    rawResult?: string,
    jsonResult?: JSON
}
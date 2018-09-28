interface rmdSelect{
    usuario: string,
    formulario: string,
    consulta: string,
    columnas: string[],
    condiciones: condicion[],
    url: string,
    result?: IdValue[],
    rawResult?: string,
    jsonResult?: JSON
}
interface rmdUpdate{
    usuario: string,
    formulario: string,
    id: string,
    columnas: string[],
    condiciones: condicion[],
    url: string,
    result?: IdValue[],
    rawResult?: string,
    jsonResult?: JSON
}
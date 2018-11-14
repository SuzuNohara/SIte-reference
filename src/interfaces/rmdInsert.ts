interface rmdInsert{
    usuario: string,
    formulario: string,
    columnas: string[],
    condiciones: condicion[],
    url: string,
    result?: IdValue[],
    rawResult?: string,
    jsonResult?: JSON
}
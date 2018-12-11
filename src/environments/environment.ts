// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  URL_INSERT: 'http://rc01d.oymcloud.americamovil.com:8080/Remedy/servicios/RMDInsert?',
  URL_UPDATE: 'http://rc01d.oymcloud.americamovil.com:8080/Remedy/servicios/RMDUpdate?',
  URL_SELECT: 'http://rc01d.oymcloud.americamovil.com:8080/Remedy/servicios/RMDSelect?',
  MAIL_SERVICE: 'http://10.119.155.72:8080/blankServices/mail.jsp',

  SISTEMA: 'SITIOS',

  FORM_GRUP_ASS: 'CTM:Support Group Association',
  FORM_GRUP: 'CTM:Support Group',
  FORM_AMX: 'AMX:TipoSitio_Site-EP',
  FORM_SITE: 'Site-EP',
  FORM_CR: 'CHG:Infrastructure Change',

  COL_AMX: ['536870918', '536870920', '536870921', '536870922', '536870914'],
  SGS_COLS_SEARCH: ['7', '8', '536870914', '536870925', '536870974', '730000001', '1000000001'],
  SGS_COLS_CANCEL_BEFORE_OPERATE: '&cColumnas=\'7\'=\'7\' \'536878218\'=\'Yes\'',
  SGS_COLS_OOPERANDO_STTE_CHANGE: '&cColumnas=\'7\'=\'4\'',
  SGS_COLS_NOOPERANDO_STTE_CHANGE: '&cColumnas=\'7\'=\'5\'',
  SGS_COLS_DESINSTALADO_STTE_CHANGE: '&cColumnas=\'7\'=\'6\' \'536871183\'=\'.\'',
  SGS_COLS_CANCEL_AFTER_OPERATE: '&cColumnas=\'7\'=\'7\' \'536878218\'=\'Yes\' \'536878301\'=\'Yes\'',

  QUERY_GRUP: '\'1000000079\'=\'(SGP000000000344,SGP000000000397,SGP000000000453, SGP000000000502, SGP000000000534)\' \'7\'=\'1\'',

  ALTA_ENCABEZADOS: 'NUM,COMPANIA,NEMONICO,NOMBRE,REGION,TECNOLOGIA,SITIO CONECTADO A ,TIPO DE SITIO,GRUPO QUE ATIENDE,SITIO_ALARMA,IP',
  TIMEOUT: 1000,
  GRUPOS_SOPORTE: ['CORP-OPMA-GESTION DE PROCESOS' , 'CORP-OPMA-FRONT OFFICE MSC RBS', 'CORP-OPMA-BACK OFFICE DATOS'],
  ROOT_CRQ: 'CRQROOT00000000',
  USAER_ROOT: 'zzzROOT',
  PASS_ROOT: 'root'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

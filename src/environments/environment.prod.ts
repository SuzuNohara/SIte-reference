export const environment = {
  production: true,
  URL_INSERT: 'http://remedycontrol.oymcloud.americamovil.com:8080/Remedy/servicios/RMDInsert?',
  URL_UPDATE: 'http://remedycontrol.oymcloud.americamovil.com:8080/Remedy/servicios/RMDUpdate?',
  URL_SELECT: 'http://remedycontrol.oymcloud.americamovil.com:8080/Remedy/servicios/RMDSelect?',
  AUTO_REFERENCE: 'http://remedycontrol.oymcloud.americamovil.com:8080/SitiosV3',
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

  QUERY_GRUP: '(SGP000000000344,SGP000000000397,SGP000000000453, SGP000000000502, SGP000000000534)',

  TIMEOUT: 1000,
  GRUPOS_SOPORTE: ['CORP-OPMA-GESTION DE PROCESOS' , 'CORP-OPMA-FRONT OFFICE MSC RBS', 'CORP-OPMA-BACK OFFICE DATOS'],
  ROOT_CRQ: 'CRQROOT00000000',
  USER_ROOT: 'zzzROOT',
  PASS_ROOT: 'root',
  SESSION_COOKIE: 's3s10n',
  ERRORS: ['382,El sitio que intenta crear ya existe o tiene un nemónico identico'],

  ALTA_ENCABEZADOS: 'NUM,COMPANIA,NEMONICO,NOMBRE,REGION,TECNOLOGIA,SITIO CONECTADO A ,TIPO DE SITIO,GRUPO QUE ATIENDE,SITIO_ALARMA,IP',
  CONN_ENCABEZADOS: 'NUM,NEMONICO,COMPANIA,SITIO_CONECTADO_A,IP',
  EST_ENCABEZADOS: 'NUM,NEMONICO,COMPANIA,NUM_ESTADO',

  SATE_CHANGE_ALLOWED: ['0-4','0-7','1-7','2-7','3-7','4-5','5-4','5-6','6-7'],
  STAT_NAMES: ['SITIO_NUEVO','X','X','X','OPERANDO','NO OPERANDO','DESINSTALADO','CANCELADO']
};

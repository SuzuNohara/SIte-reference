export const environment = {
  production: false,
  URL_INSERT: 'http://remedycontrolq.oymcloud.americamovil.com:8080/Remedy/servicios/RMDInsert?',
  URL_UPDATE: 'http://remedycontrolq.oymcloud.americamovil.com:8080/Remedy/servicios/RMDUpdate?',
  URL_SELECT: 'http://remedycontrolq.oymcloud.americamovil.com:8080/Remedy/servicios/RMDSelect?',
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

  QUERY_GRUP: '\'1000000079\'=\'(SGP000000000344,SGP000000000397,SGP000000000453, SGP000000000502, SGP000000000534)\' \'7\'=\'1\''
};
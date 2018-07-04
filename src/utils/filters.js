// filters.js
// Utilisés par main.js (Vue.filter) mais peuvent aussi etre appelées directement.

import { PROCEDURE_TYPES } from '@/app_constants'
import moment from 'moment'

/**
 * Formatte un numero de cause
 * Si 9 chiffres, separe en groupe de 3 avec un tiret comme separateur.
 * Sinon, aucun formattage.
 * 
 * Utilisé comme filtre par main.js
 * @param {String} numero 
 */
export function formatNoCause(numero) {
  if (numero == null) { return null }
  if (numero == undefined) { return undefined }
  if (numero.length !== 9) { return numero  }
  
  return `${numero.slice(0,3)}-${numero.slice(3,6)}-${numero.slice(6)}`
}


/**
 * Retourne la version texte d'un procedure_type
 * 
 * @param {int} procedureType 
 */
export function formatProcedureType(procedureType) {
  return PROCEDURE_TYPES[procedureType]
}


/**
 * Formatte une adresse sur une seule ligne
 * NOTE: 'object' doit posséder les champs suivants:
 * 'no_civique', 'rue' et 'apt'
 * 
 * @param {Object} object 
 */
export function formatAddressOneLine(object) {
  if (object.no_civique === null || object.no_civique === undefined) {
    return 'Object invalide, pas de no civique'
  }
  let apt = ''
  if (object.apt) {
    apt = `# ${object.apt}`
  }
  return `${object.no_civique} ${object.rue} ${apt}`
}


/**
 * Formatte une date en separant la date et l'heure
 * ex: 2018-06-23 10:42
 * 
 * @param {Date} date 
 */
export function formatDateTime(date) {
  return moment(date).format('YYYY-MM-DD HH:mm')
}

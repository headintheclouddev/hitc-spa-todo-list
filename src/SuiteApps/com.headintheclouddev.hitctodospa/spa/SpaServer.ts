/**
 * @NApiVersion 2.1
 * @NScriptType SpaServerScript
 */

import log from 'N/log';

export const initializeSpa = (scriptContext: {}) => {
  log.audit('initializeSpa', `Starting at ${new Date()}: ${JSON.stringify(scriptContext)}.`);
  // Log.debug('SpaServer initialized');
}

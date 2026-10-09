// Names of the IPC channels between the main process and the preload script.
// Keeping them in one shared file means a typo becomes an import error
// instead of a message that silently never arrives.
export const IPC = {
  GET_APP_INFO: 'app:get-info',
};

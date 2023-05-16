let FLOWABLE: any = {};
let pathname = 'flowable-ui/modeler'
pathname = pathname.replace(/^(\/[^\/]*)(\/.*)?modeler\/?$/, '$1').replace(/\/$/, '');
FLOWABLE.CONFIG = {
  'onPremise' : true,
  'contextRoot' : pathname,
  'contextModelerRestRoot' : pathname + '/modeler-app',
  'webContextRoot' : pathname,
  'datesLocalization' : false
};
FLOWABLE.UI_CONFIG = {
  'showRemovedProperties' : false
};

FLOWABLE.HEADER_CONFIG = {
  'showAppTitle' : true,
  'showHeaderMenu' : true,
  'showMainNavigation' : true,
  'showPageHeader' : true
};

FLOWABLE.APP_URL = {
  /* ACCOUNT URLS */
  getAccountUrl: () => FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/account',
  getLogoutUrl: ()=> FLOWABLE.CONFIG.contextRoot + '/app/logout',

  /* MODEL URLS */
  getModelsUrl:(query: string) => FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/models' + (query || ""),
  getModelUrl: (modelId: any)=>FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/models/' + modelId,
  getModelModelJsonUrl: (modelId: any)=>FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/models/' + modelId + '/model-json',
  getModelBpmn20ExportUrl: (modelId: any)=>FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/models/' + modelId + '/bpmn20?version=' + Date.now(),
  getCloneModelsUrl: (modelId: any)=>FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/models/' + modelId + '/clone',
  getModelHistoriesUrl: (modelId: any)=>FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/models/' + modelId + '/history',
  getModelHistoryUrl: (modelId: any, modelHistoryId: any) => FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/models/' + modelId + '/history/' + modelHistoryId,
  getModelHistoryModelJsonUrl: (modelId: any, modelHistoryId: any) => FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/models/' + modelId + '/history/' + modelHistoryId + '/model-json',
  getModelHistoryBpmn20ExportUrl:(modelId: any, modelHistoryId: any) => FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/models/' + modelId + '/history/' + modelHistoryId + '/bpmn20?version=' + Date.now(),
  getCmmnModelDownloadUrl:(modelId: any, modelHistoryId: any) => FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/models/' + modelId + (modelHistoryId ? '/history/' + modelHistoryId : '') + '/cmmn?version=' + Date.now(),
  getModelParentRelationsUrl: (modelId: any)=>FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/models/' + modelId + '/parent-relations',

  /* APP DEFINITION URLS  */
  getAppDefinitionImportUrl:(renewIdmIds: any) => FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/app-definitions/import?renewIdmEntries=' + renewIdmIds,
  getAppDefinitionTextImportUrl:(renewIdmIds: any)=> FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/app-definitions/text/import?renewIdmEntries=' + renewIdmIds,
  getAppDefinitionUrl:(modelId: any) => FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/app-definitions/' + modelId,
  getAppDefinitionModelImportUrl:(modelId: any, renewIdmIds: any) =>FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/app-definitions/' + modelId + '/import?renewIdmEntries=' + renewIdmIds,
  getAppDefinitionModelTextImportUrl:(modelId: any, renewIdmIds: any) => FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/app-definitions/' + modelId + '/text/import?renewIdmEntries=' + renewIdmIds,
  getAppDefinitionPublishUrl:(modelId: any) => FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/app-definitions/' + modelId + '/publish',
  getAppDefinitionExportUrl:(modelId: any) => FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/app-definitions/' + modelId + '/export?version=' + Date.now(),
  getAppDefinitionBarExportUrl:(modelId: any) =>FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/app-definitions/' + modelId + '/export-bar?version=' + Date.now(),
  getAppDefinitionHistoryUrl:(modelId: any, historyModelId: any) =>FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/app-definitions/' + modelId + '/history/' + historyModelId,
  getModelsForAppDefinitionUrl:() => FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/models-for-app-definition',
  getCmmnModelsForAppDefinitionUrl:() =>FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/cmmn-models-for-app-definition',

  /* PROCESS INSTANCE URLS */
  getProcessInstanceModelJsonUrl: (modelId: any) =>FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/process-instances/' + modelId + '/model-json',
  getProcessInstanceModelJsonHistoryUrl: (historyModelId: any)=>FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/process-instances/history/' + historyModelId + '/model-json',

  /* PROCESS DEFINITION URLS */
  getProcessDefinitionModelJsonUrl: (processDefinitionId:any) =>FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/process-definitions/' + processDefinitionId + '/model-json',

  /* PROCESS MODEL URLS */
  getImportProcessModelUrl: () =>FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/import-process-model',
  getImportProcessModelTextUrl: () =>FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/import-process-model/text',

  /* DECISION TABLE URLS */
  getDecisionTableModelsUrl:() =>FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/decision-table-models',
  getDecisionTableImportUrl:() =>FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/decision-table-models/import-decision-table',
  getDecisionTableTextImportUrl:() =>FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/decision-table-models/import-decision-table-text',
  getDecisionTableModelUrl:(modelId: any) =>FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/decision-table-models/' + modelId,
  getDecisionTableModelValuesUrl:(query: any) =>FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/decision-table-models/values?' + query,
  getDecisionTableModelsHistoryUrl:(modelHistoryId: any) =>FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/decision-table-models/history/' + modelHistoryId,
  getDecisionTableModelHistoryUrl:(modelId: any, modelHistoryId: any) =>FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/decision-table-models/' + modelId + '/history/' + modelHistoryId,

   /* DECISION SERVICE URLS */
  getDecisionServiceModelsUrl: () =>FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/decision-service-models',
  getDecisionServiceImportUrl: () =>FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/import-decision-service-model',
  getDecisionServiceTextImportUrl: () =>FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/import-decision-service-model/text',
  getDmnModelDownloadUrl: (modelId: any, modelHistoryId: any) =>FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/decision-service-models/' + modelId + (modelHistoryId ? '/history/' + modelHistoryId : '') + '/dmn?version=' + Date.now(),

  /* FORM MODEL URLS */
  getFormModelsUrl: () =>FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/form-models',
  getFormModelValuesUrl: (query: any) =>FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/form-models/values?' + query,
  getFormModelUrl: (modelId: any) =>FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/form-models/' + modelId,
  getFormModelHistoryUrl: (modelId: any, modelHistoryId: any) =>FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/form-models/' + modelId + '/history/' + modelHistoryId,

  /* CASE MODEL URLS */
  getCaseModelsUrl: (query: any) =>FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/case-models' + (query || ""),
  getCaseModelImportUrl: () =>FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/import-case-model',
  getCaseModelTextImportUrl: () =>FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/import-case-model/text',
  getCaseInstancesHistoryModelJsonUrl: (modelHistoryId: any) =>FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/case-instances/history/' + modelHistoryId + '/model-json',
  getCaseInstancesModelJsonUrl: (modelId: any) =>FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/case-instances/' + modelId + '/model-json',
  getCaseDefinitionModelJsonUrl: (caseDefinitionId:any) =>FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/case-definitions/' + caseDefinitionId + '/model-json',

  /* IMAGE URLS (exposed in rootscope in app.js */
  getImageUrl: (imageId: any) =>FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/image/' + imageId,
  getModelThumbnailUrl: (modelId: any, version:any) =>FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/models/' + modelId + '/thumbnail' + (version ? "?version=" + version : ""),

  /* OTHER URLS */
  getEditorUsersUrl: () =>FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/editor-users',
  getEditorGroupsUrl: () =>FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/editor-groups',
  getAboutInfoUrl: () =>FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/about-info',
};

FLOWABLE.URL = {

  getModel: (modelId: any) =>FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/models/' + modelId + '/editor/json?version=' + Date.now(),
  getStencilSet: () =>FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/stencil-sets/editor?version=' + Date.now(),
  getCmmnStencilSet: () =>FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/stencil-sets/cmmneditor?version=' + Date.now(),
  getDmnStencilSet: ()=>FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/stencil-sets/dmneditor?version=' + Date.now(),
  putModel: (modelId: any) =>FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/models/' + modelId + '/editor/json',
  validateModel: ()=>FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/model/validate'
}



export default FLOWABLE;


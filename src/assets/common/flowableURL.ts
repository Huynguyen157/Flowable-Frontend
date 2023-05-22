let FLOWABLE: any = {};
let pathname = 'flowable-ui/modeler';
pathname = pathname
  .replace(/^(\/[^\/]*)(\/.*)?modeler\/?$/, '$1')
  .replace(/\/$/, '');
FLOWABLE.CONFIG = {
  onPremise: true,
  contextRoot: pathname,
  contextModelerRestRoot: pathname + '/modeler-app',
  webContextRoot: pathname,
  datesLocalization: false,
};
FLOWABLE.UI_CONFIG = {
  showRemovedProperties: false,
};

FLOWABLE.HEADER_CONFIG = {
  showAppTitle: true,
  showHeaderMenu: true,
  showMainNavigation: true,
  showPageHeader: true,
};

FLOWABLE.APP_URL = {
  /* ACCOUNT URLS */
  getAccountUrl: () => FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/account',
  getLogoutUrl: () => FLOWABLE.CONFIG.contextRoot + '/app/logout',

  /* MODEL URLS */
  getModelsUrl: (query: string) =>
    FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/models' + (query || ''),
  getModelUrl: (modelId: any) =>
    FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/models/' + modelId,
  getModelModelJsonUrl: (modelId: any) =>
    FLOWABLE.CONFIG.contextModelerRestRoot +
    '/rest/models/' +
    modelId +
    '/model-json',
  getModelBpmn20ExportUrl: (modelId: any) =>
    FLOWABLE.CONFIG.contextModelerRestRoot +
    '/rest/models/' +
    modelId +
    '/bpmn20?version=' +
    Date.now(),
  getCloneModelsUrl: (modelId: any) =>
    FLOWABLE.CONFIG.contextModelerRestRoot +
    '/rest/models/' +
    modelId +
    '/clone',
  getModelHistoriesUrl: (modelId: any) =>
    FLOWABLE.CONFIG.contextModelerRestRoot +
    '/rest/models/' +
    modelId +
    '/history',
  getModelHistoryUrl: (modelId: any, modelHistoryId: any) =>
    FLOWABLE.CONFIG.contextModelerRestRoot +
    '/rest/models/' +
    modelId +
    '/history/' +
    modelHistoryId,
  getModelHistoryModelJsonUrl: (modelId: any, modelHistoryId: any) =>
    FLOWABLE.CONFIG.contextModelerRestRoot +
    '/rest/models/' +
    modelId +
    '/history/' +
    modelHistoryId +
    '/model-json',
  getModelHistoryBpmn20ExportUrl: (modelId: any, modelHistoryId: any) =>
    FLOWABLE.CONFIG.contextModelerRestRoot +
    '/rest/models/' +
    modelId +
    '/history/' +
    modelHistoryId +
    '/bpmn20?version=' +
    Date.now(),
  getCmmnModelDownloadUrl: (modelId: any, modelHistoryId: any) =>
    FLOWABLE.CONFIG.contextModelerRestRoot +
    '/rest/models/' +
    modelId +
    (modelHistoryId ? '/history/' + modelHistoryId : '') +
    '/cmmn?version=' +
    Date.now(),
  getModelParentRelationsUrl: (modelId: any) =>
    FLOWABLE.CONFIG.contextModelerRestRoot +
    '/rest/models/' +
    modelId +
    '/parent-relations',

  /* APP DEFINITION URLS  */
  getAppDefinitionImportUrl: (renewIdmIds: any) =>
    FLOWABLE.CONFIG.contextModelerRestRoot +
    '/rest/app-definitions/import?renewIdmEntries=' +
    renewIdmIds,
  getAppDefinitionTextImportUrl: (renewIdmIds: any) =>
    FLOWABLE.CONFIG.contextModelerRestRoot +
    '/rest/app-definitions/text/import?renewIdmEntries=' +
    renewIdmIds,
  getAppDefinitionUrl: (modelId: any) =>
    FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/app-definitions/' + modelId,
  getAppDefinitionModelImportUrl: (modelId: any, renewIdmIds: any) =>
    FLOWABLE.CONFIG.contextModelerRestRoot +
    '/rest/app-definitions/' +
    modelId +
    '/import?renewIdmEntries=' +
    renewIdmIds,
  getAppDefinitionModelTextImportUrl: (modelId: any, renewIdmIds: any) =>
    FLOWABLE.CONFIG.contextModelerRestRoot +
    '/rest/app-definitions/' +
    modelId +
    '/text/import?renewIdmEntries=' +
    renewIdmIds,
  getAppDefinitionPublishUrl: (modelId: any) =>
    FLOWABLE.CONFIG.contextModelerRestRoot +
    '/rest/app-definitions/' +
    modelId +
    '/publish',
  getAppDefinitionExportUrl: (modelId: any) =>
    FLOWABLE.CONFIG.contextModelerRestRoot +
    '/rest/app-definitions/' +
    modelId +
    '/export?version=' +
    Date.now(),
  getAppDefinitionBarExportUrl: (modelId: any) =>
    FLOWABLE.CONFIG.contextModelerRestRoot +
    '/rest/app-definitions/' +
    modelId +
    '/export-bar?version=' +
    Date.now(),
  getAppDefinitionHistoryUrl: (modelId: any, historyModelId: any) =>
    FLOWABLE.CONFIG.contextModelerRestRoot +
    '/rest/app-definitions/' +
    modelId +
    '/history/' +
    historyModelId,
  getModelsForAppDefinitionUrl: () =>
    FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/models-for-app-definition',
  getCmmnModelsForAppDefinitionUrl: () =>
    FLOWABLE.CONFIG.contextModelerRestRoot +
    '/rest/cmmn-models-for-app-definition',

  /* PROCESS INSTANCE URLS */
  getProcessInstanceModelJsonUrl: (modelId: any) =>
    FLOWABLE.CONFIG.contextModelerRestRoot +
    '/rest/process-instances/' +
    modelId +
    '/model-json',
  getProcessInstanceModelJsonHistoryUrl: (historyModelId: any) =>
    FLOWABLE.CONFIG.contextModelerRestRoot +
    '/rest/process-instances/history/' +
    historyModelId +
    '/model-json',

  /* PROCESS DEFINITION URLS */
  getProcessDefinitionModelJsonUrl: (processDefinitionId: any) =>
    FLOWABLE.CONFIG.contextModelerRestRoot +
    '/rest/process-definitions/' +
    processDefinitionId +
    '/model-json',

  /* PROCESS MODEL URLS */
  getImportProcessModelUrl: () =>
    FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/import-process-model',
  getImportProcessModelTextUrl: () =>
    FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/import-process-model/text',

  /* DECISION TABLE URLS */
  getDecisionTableModelsUrl: () =>
    FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/decision-table-models',
  getDecisionTableImportUrl: () =>
    FLOWABLE.CONFIG.contextModelerRestRoot +
    '/rest/decision-table-models/import-decision-table',
  getDecisionTableTextImportUrl: () =>
    FLOWABLE.CONFIG.contextModelerRestRoot +
    '/rest/decision-table-models/import-decision-table-text',
  getDecisionTableModelUrl: (modelId: any) =>
    FLOWABLE.CONFIG.contextModelerRestRoot +
    '/rest/decision-table-models/' +
    modelId,
  getDecisionTableModelValuesUrl: (query: any) =>
    FLOWABLE.CONFIG.contextModelerRestRoot +
    '/rest/decision-table-models/values?' +
    query,
  getDecisionTableModelsHistoryUrl: (modelHistoryId: any) =>
    FLOWABLE.CONFIG.contextModelerRestRoot +
    '/rest/decision-table-models/history/' +
    modelHistoryId,
  getDecisionTableModelHistoryUrl: (modelId: any, modelHistoryId: any) =>
    FLOWABLE.CONFIG.contextModelerRestRoot +
    '/rest/decision-table-models/' +
    modelId +
    '/history/' +
    modelHistoryId,

  /* DECISION SERVICE URLS */
  getDecisionServiceModelsUrl: () =>
    FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/decision-service-models',
  getDecisionServiceImportUrl: () =>
    FLOWABLE.CONFIG.contextModelerRestRoot +
    '/rest/import-decision-service-model',
  getDecisionServiceTextImportUrl: () =>
    FLOWABLE.CONFIG.contextModelerRestRoot +
    '/rest/import-decision-service-model/text',
  getDmnModelDownloadUrl: (modelId: any, modelHistoryId: any) =>
    FLOWABLE.CONFIG.contextModelerRestRoot +
    '/rest/decision-service-models/' +
    modelId +
    (modelHistoryId ? '/history/' + modelHistoryId : '') +
    '/dmn?version=' +
    Date.now(),

  /* FORM MODEL URLS */
  getFormModelsUrl: () =>
    FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/form-models',
  getFormModelValuesUrl: (query: any) =>
    FLOWABLE.CONFIG.contextModelerRestRoot +
    '/rest/form-models/values?' +
    query,
  getFormModelUrl: (modelId: any) =>
    FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/form-models/' + modelId,
  getFormModelHistoryUrl: (modelId: any, modelHistoryId: any) =>
    FLOWABLE.CONFIG.contextModelerRestRoot +
    '/rest/form-models/' +
    modelId +
    '/history/' +
    modelHistoryId,

  /* CASE MODEL URLS */
  getCaseModelsUrl: (query: any) =>
    FLOWABLE.CONFIG.contextModelerRestRoot +
    '/rest/case-models' +
    (query || ''),
  getCaseModelImportUrl: () =>
    FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/import-case-model',
  getCaseModelTextImportUrl: () =>
    FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/import-case-model/text',
  getCaseInstancesHistoryModelJsonUrl: (modelHistoryId: any) =>
    FLOWABLE.CONFIG.contextModelerRestRoot +
    '/rest/case-instances/history/' +
    modelHistoryId +
    '/model-json',
  getCaseInstancesModelJsonUrl: (modelId: any) =>
    FLOWABLE.CONFIG.contextModelerRestRoot +
    '/rest/case-instances/' +
    modelId +
    '/model-json',
  getCaseDefinitionModelJsonUrl: (caseDefinitionId: any) =>
    FLOWABLE.CONFIG.contextModelerRestRoot +
    '/rest/case-definitions/' +
    caseDefinitionId +
    '/model-json',

  /* IMAGE URLS (exposed in rootscope in app.js */
  getImageUrl: (imageId: any) =>
    FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/image/' + imageId,
  getModelThumbnailUrl: (modelId: any, version: any) =>
    FLOWABLE.CONFIG.contextModelerRestRoot +
    '/rest/models/' +
    modelId +
    '/thumbnail' +
    (version ? '?version=' + version : ''),

  /* OTHER URLS */
  getEditorUsersUrl: () =>
    FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/editor-users',
  getEditorGroupsUrl: () =>
    FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/editor-groups',
  getAboutInfoUrl: () =>
    FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/about-info',
};

FLOWABLE.URL = {
  getModel: (modelId: any) =>
    FLOWABLE.CONFIG.contextModelerRestRoot +
    '/rest/models/' +
    modelId +
    '/editor/json?version=' +
    Date.now(),
  getStencilSet: () =>
    FLOWABLE.CONFIG.contextModelerRestRoot +
    '/rest/stencil-sets/editor?version=' +
    Date.now(),
  getCmmnStencilSet: () =>
    FLOWABLE.CONFIG.contextModelerRestRoot +
    '/rest/stencil-sets/cmmneditor?version=' +
    Date.now(),
  getDmnStencilSet: () =>
    FLOWABLE.CONFIG.contextModelerRestRoot +
    '/rest/stencil-sets/dmneditor?version=' +
    Date.now(),
  putModel: (modelId: any) =>
    FLOWABLE.CONFIG.contextModelerRestRoot +
    '/rest/models/' +
    modelId +
    '/editor/json',
  validateModel: () =>
    FLOWABLE.CONFIG.contextModelerRestRoot + '/rest/model/validate',
};
FLOWABLE.TOOLBAR_CONFIG = {
  items: [
    {
      type: 'button',
      title: 'TOOLBAR.ACTION.SAVE',
      cssClass: 'editor-icon editor-icon-save',
      action: 'FLOWABLE.TOOLBAR.ACTIONS.saveModel',
    },
    {
      type: 'button',
      title: 'TOOLBAR.ACTION.VALIDATE',
      cssClass: 'glyphicon glyphicon-ok',
      action: 'FLOWABLE.TOOLBAR.ACTIONS.validate',
    },
    {
      type: 'separator',
      title: '',
      cssClass: 'toolbar-separator',
    },
    {
      type: 'button',
      title: 'TOOLBAR.ACTION.CUT',
      cssClass: 'editor-icon editor-icon-cut',
      action: 'FLOWABLE.TOOLBAR.ACTIONS.cut',
      enabled: false,
      enabledAction: 'element',
    },
    {
      type: 'button',
      title: 'TOOLBAR.ACTION.COPY',
      cssClass: 'editor-icon editor-icon-copy',
      action: 'FLOWABLE.TOOLBAR.ACTIONS.copy',
      enabled: false,
      enabledAction: 'element',
    },
    {
      type: 'button',
      title: 'TOOLBAR.ACTION.PASTE',
      cssClass: 'editor-icon editor-icon-paste',
      action: 'FLOWABLE.TOOLBAR.ACTIONS.paste',
      enabled: false,
    },
    {
      type: 'button',
      title: 'TOOLBAR.ACTION.DELETE',
      cssClass: 'editor-icon editor-icon-delete',
      action: 'FLOWABLE.TOOLBAR.ACTIONS.deleteItem',
      enabled: false,
      enabledAction: 'element',
    },
    {
      type: 'separator',
      title: 'TOOLBAR.ACTION.SAVE',
      cssClass: 'toolbar-separator',
    },
    {
      type: 'button',
      title: 'TOOLBAR.ACTION.REDO',
      cssClass: 'editor-icon editor-icon-redo',
      action: 'FLOWABLE.TOOLBAR.ACTIONS.redo',
      enabled: false,
    },
    {
      type: 'button',
      title: 'TOOLBAR.ACTION.UNDO',
      cssClass: 'editor-icon editor-icon-undo',
      action: 'FLOWABLE.TOOLBAR.ACTIONS.undo',
      enabled: false,
    },
    {
      type: 'separator',
      title: 'TOOLBAR.ACTION.SAVE',
      cssClass: 'toolbar-separator',
    },
    {
      type: 'button',
      title: 'TOOLBAR.ACTION.ALIGNVERTICAL',
      cssClass: 'editor-icon editor-icon-align-vertical',
      action: 'FLOWABLE.TOOLBAR.ACTIONS.alignVertical',
      enabled: false,
      enabledAction: 'element',
      disableInForm: true,
      minSelectionCount: 2,
    },
    {
      type: 'button',
      title: 'TOOLBAR.ACTION.ALIGNHORIZONTAL',
      cssClass: 'editor-icon editor-icon-align-horizontal',
      action: 'FLOWABLE.TOOLBAR.ACTIONS.alignHorizontal',
      enabledAction: 'element',
      enabled: false,
      disableInForm: true,
      minSelectionCount: 2,
    },
    {
      type: 'button',
      title: 'TOOLBAR.ACTION.SAMESIZE',
      cssClass: 'editor-icon editor-icon-same-size',
      action: 'FLOWABLE.TOOLBAR.ACTIONS.sameSize',
      enabledAction: 'element',
      enabled: false,
      disableInForm: true,
      minSelectionCount: 2,
    },
    {
      type: 'separator',
      title: 'TOOLBAR.ACTION.SAVE',
      cssClass: 'toolbar-separator',
      disableInForm: true,
    },
    {
      type: 'button',
      title: 'TOOLBAR.ACTION.ZOOMIN',
      cssClass: 'editor-icon editor-icon-zoom-in',
      action: 'FLOWABLE.TOOLBAR.ACTIONS.zoomIn',
    },
    {
      type: 'button',
      title: 'TOOLBAR.ACTION.ZOOMOUT',
      cssClass: 'editor-icon editor-icon-zoom-out',
      action: 'FLOWABLE.TOOLBAR.ACTIONS.zoomOut',
    },
    {
      type: 'button',
      title: 'TOOLBAR.ACTION.ZOOMACTUAL',
      cssClass: 'editor-icon editor-icon-zoom-actual',
      action: 'FLOWABLE.TOOLBAR.ACTIONS.zoomActual',
    },
    {
      type: 'button',
      title: 'TOOLBAR.ACTION.ZOOMFIT',
      cssClass: 'editor-icon editor-icon-zoom-fit',
      action: 'FLOWABLE.TOOLBAR.ACTIONS.zoomFit',
    },
    {
      type: 'separator',
      title: 'TOOLBAR.ACTION.SAVE',
      cssClass: 'toolbar-separator',
      disableInForm: true,
    },
    {
      type: 'button',
      title: 'TOOLBAR.ACTION.BENDPOINT.ADD',
      cssClass: 'editor-icon editor-icon-bendpoint-add',
      action: 'FLOWABLE.TOOLBAR.ACTIONS.addBendPoint',
      id: 'add-bendpoint-button',
      disableInForm: true,
    },
    {
      type: 'button',
      title: 'TOOLBAR.ACTION.BENDPOINT.REMOVE',
      cssClass: 'editor-icon editor-icon-bendpoint-remove',
      action: 'FLOWABLE.TOOLBAR.ACTIONS.removeBendPoint',
      id: 'remove-bendpoint-button',
      disableInForm: true,
    },
    {
      type: 'separator',
      title: '',
      cssClass: 'toolbar-separator',
      disableInForm: true,
    },
    {
      type: 'button',
      title: 'TOOLBAR.ACTION.HELP',
      cssClass: 'glyphicon glyphicon-question-sign',
      action: 'FLOWABLE.TOOLBAR.ACTIONS.help',
    },
  ],

  secondaryItems: [],
};

FLOWABLE.eventBus = {
  /** Event fired when the editor is loaded and ready */
  EVENT_TYPE_EDITOR_READY: 'event-type-editor-ready',
  EVENT_TYPE_EDITOR_BOOTED: 'event-type-editor-booted',
  /** Event fired when a selection is made on the canvas. */
  EVENT_TYPE_SELECTION_CHANGE: 'event-type-selection-change',
  /** Event fired when a toolbar button has been clicked. */
  EVENT_TYPE_TOOLBAR_BUTTON_CLICKED: 'event-type-toolbar-button-clicked',
  /** Event fired when a stencil item is dropped on the canvas. */
  EVENT_TYPE_ITEM_DROPPED: 'event-type-item-dropped',
  /** Event fired when a property value is changed. */
  EVENT_TYPE_PROPERTY_VALUE_CHANGED: 'event-type-property-value-changed',
  /** Event fired on double click in canvas. */
  EVENT_TYPE_DOUBLE_CLICK: 'event-type-double-click',
  /** Event fired on a mouse out */
  EVENT_TYPE_MOUSE_OUT: 'event-type-mouse-out',
  /** Event fired on a mouse over */
  EVENT_TYPE_MOUSE_OVER: 'event-type-mouse-over',
  /** Event fired when a model is saved. */
  EVENT_TYPE_MODEL_SAVED: 'event-type-model-saved',
  /** Event fired when the quick menu buttons should be hidden. */
  EVENT_TYPE_HIDE_SHAPE_BUTTONS: 'event-type-hide-shape-buttons',
  /** Event fired when the validation popup should be shown. */
  EVENT_TYPE_SHOW_VALIDATION_POPUP: 'event-type-show-validation-popup',
  /** Event fired when a different process must be loaded. */
  EVENT_TYPE_NAVIGATE_TO_PROCESS: 'event-type-navigate-to-process',
  EVENT_TYPE_UNDO_REDO_RESET: 'event-type-undo-redo-reset',
  /** A mapping for storing the listeners*/
  listeners: {},
  /** The Oryx editor, which is stored locally to send events to */
  editor: null,
  /**
   * Add an event listener to the event bus, listening to the event with the provided type.
   * Type and callback are mandatory parameters.
   *
   * Provide scope parameter if it is important that the callback is executed
   * within a specific scope.
   */
  addListener(type: any, callback: any, scope: any) {
    // Add to the listeners map
    if (typeof this.listeners[type] !== 'undefined') {
      this.listeners[type].push({ scope: scope, callback: callback });
    } else {
      this.listeners[type] = [{ scope: scope, callback: callback }];
    }
  },

  /**
   * Removes the provided event listener.
   */
  removeListener(type: any, callback: any, scope: any) {
    if (typeof this.listeners[type] != 'undefined') {
      let numOfCallbacks = this.listeners[type].length;
      let newArray = [];
      for (let i = 0; i < numOfCallbacks; i++) {
        let listener = this.listeners[type][i];
        if (listener.scope === scope && listener.callback === callback) {
          // Do nothing, this is the listener and doesn't need to survive
        } else {
          newArray.push(listener);
        }
      }
      this.listeners[type] = newArray;
    }
  },

  hasListener(type: any, callback: any, scope: any) {
    if (typeof this.listeners[type] != 'undefined') {
      let numOfCallbacks = this.listeners[type].length;
      if (callback === undefined && scope === undefined) {
        return numOfCallbacks > 0;
      }
      for (let i = 0; i < numOfCallbacks; i++) {
        let listener = this.listeners[type][i];
        if (listener.scope == scope && listener.callback == callback) {
          return true;
        }
      }
    }
    return false;
  },

  /**
   * Dispatch an event to all event listeners registered to that specific type.
   */
  dispatch(type: any, event: any) {
    if (typeof this.listeners[type] != 'undefined') {
      let numOfCallbacks = this.listeners[type].length;
      for (let i = 0; i < numOfCallbacks; i++) {
        let listener = this.listeners[type][i];
        if (listener && listener.callback) {
          listener.callback.apply(listener.scope, [event]);
        }
      }
    }
  },

  dispatchOryxEvent(event: any, uiObject: any) {
    FLOWABLE.eventBus.editor.handleEvents(event, uiObject);
  },
};

export default FLOWABLE;

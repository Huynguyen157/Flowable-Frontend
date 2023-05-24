import { Component, OnInit } from '@angular/core';
import FLOWABLE from 'src/assets/common/flowableURL';
import { defer } from 'rxjs';
import { editorManager } from '../editorManager.service';
import ORYX from 'src/assets/common/config';
import { NgZone } from '@angular/core';
@Component({
  selector: 'app-stencil-controller',
  templateUrl: './stencil-controller.component.html',
  styleUrls: ['./stencil-controller.component.css'],
})
export class StencilControllerComponent {
  editorFactory = defer(() => Promise.resolve()).toPromise();
  propertyWindowState = { collapsed: false };
  headerConfig = FLOWABLE.HEADER_CONFIG;
  containmentRules: any[] = [];
  quickMenuItems: any[] = [];
  availableQuickMenuItems: any[] = [];
  morphRoles: any[] = [];
  selectedShape: any;
  selectedItem: any;
  previousSelectedShape: any;
  selectedElementBeforeScrolling: any;
  forceSelectionRefresh: any;
  shapes: any;
  staticIncludeVersion = Date.now();
  constructor(private editorManager: editorManager, private ngZone: NgZone) {}
  ngOnInit(): void {
    this.editorFactory.then(() => {
      /* Build stencil item list */

      // Build simple json representation of stencil set
      const stencilItemGroups = [];

      // Helper method: find a group in an array
      const findGroup = (name: any, groupArray: any) => {
        for (let index = 0; index < groupArray.length; index++) {
          if (groupArray[index].name === name) {
            return groupArray[index];
          }
        }
        return null;
      };

      // Helper method: add a new group to an array of groups
      const addGroup = (groupName: any, groupArray: any) => {
        const group = {
          name: groupName,
          items: [],
          paletteItems: [],
          groups: [],
          visible: true,
        };
        groupArray.push(group);
        return group;
      };

      /*
       * StencilSet items
       */
      const data = this.editorManager.getStencilData();

      let quickMenuDefinition: string[] | undefined;
      let ignoreForPaletteDefinition: string[] | undefined;

      if (data.namespace === 'http://b3mn.org/stencilset/cmmn1.1#') {
        quickMenuDefinition = ['HumanTask', 'Association'];
        ignoreForPaletteDefinition = ['CasePlanModel'];
      } else if (data.namespace === 'http://b3mn.org/stencilset/dmn1.2#') {
        quickMenuDefinition = [
          'DecisionTableDecision',
          'InformationRequirement',
          'KnowledgeRequirement',
        ];
        ignoreForPaletteDefinition = [];
      } else {
        quickMenuDefinition = [
          'UserTask',
          'EndNoneEvent',
          'ExclusiveGateway',
          'CatchTimerEvent',
          'ThrowNoneEvent',
          'TextAnnotation',
          'SequenceFlow',
          'Association',
        ];
        ignoreForPaletteDefinition = [
          'SequenceFlow',
          'MessageFlow',
          'Association',
          'DataAssociation',
          'DataStore',
          'SendTask',
        ];
      }

      for (let i = 0; i < data.rules.morphingRules.length; i++) {
        const role = data.rules.morphingRules[i].role;
        const roleItem = { role: role, morphOptions: [] };
        this.morphRoles.push(roleItem);
      }
      for (
        let stencilIndex = 0;
        stencilIndex < data.stencils.length;
        stencilIndex++
      ) {
        const currentGroupName = data.stencils[stencilIndex].groups[0];
        if (
          currentGroupName === 'Diagram' ||
          currentGroupName === 'BPMN.STENCILS.GROUPS.DIAGRAM' ||
          currentGroupName === 'CMMN.STENCILS.GROUPS.DIAGRAM' ||
          currentGroupName === 'DMN.STENCILS.GROUPS.DIAGRAM'
        ) {
          continue; // go to next item
        }

        const removed = !!data.stencils[stencilIndex].removed;

        let currentGroup: any;
        if (!removed) {
          if (
            currentGroupName !== null &&
            currentGroupName !== undefined &&
            currentGroupName.length > 0
          ) {
            currentGroup = findGroup(currentGroupName, stencilItemGroups);
            if (currentGroup === null) {
              currentGroup = addGroup(currentGroupName, stencilItemGroups);
            }

            for (
              let groupIndex = 1;
              groupIndex < data.stencils[stencilIndex].groups.length;
              groupIndex++
            ) {
              const childGroupName =
                data.stencils[stencilIndex].groups[groupIndex];
              let childGroup = findGroup(childGroupName, currentGroup.groups);
              if (childGroup === null) {
                childGroup = addGroup(childGroupName, currentGroup.groups);
              }
              currentGroup = childGroup;
            }
          }
        }

        const stencilItem: any = {
          id: data.stencils[stencilIndex].id,
          name: data.stencils[stencilIndex].title,
          description: data.stencils[stencilIndex].description,
          icon: data.stencils[stencilIndex].icon,
          type: data.stencils[stencilIndex].type,
          roles: data.stencils[stencilIndex].roles,
          removed: removed,
          customIcon: false,
          canConnect: false,
          canConnectTo: false,
          canConnectAssociation: false,
        };

        if (
          data.stencils[stencilIndex].customIconId &&
          data.stencils[stencilIndex].customIconId > 0
        ) {
          stencilItem.customIcon = true;
          stencilItem.icon = data.stencils[stencilIndex].customIconId;
        }

        if (!removed) {
          if (quickMenuDefinition.indexOf(stencilItem.id) >= 0) {
            this.quickMenuItems[quickMenuDefinition.indexOf(stencilItem.id)] =
              stencilItem;
          }
        }

        if (
          stencilItem.id === 'TextAnnotation' ||
          stencilItem.id === 'BoundaryCompensationEvent'
        ) {
          stencilItem.canConnectAssociation = true;
        }

        for (let i = 0; i < data.stencils[stencilIndex].roles.length; i++) {
          const stencilRole = data.stencils[stencilIndex].roles[i];
          if (data.namespace === 'http://b3mn.org/stencilset/cmmn1.1#') {
            if (stencilRole === 'association_start') {
              stencilItem.canConnect = true;
            } else if (stencilRole === 'association_end') {
              stencilItem.canConnectTo = true;
            }
          } else if (data.namespace === 'http://b3mn.org/stencilset/dmn1.2#') {
            if (stencilRole === 'information_requirement_start') {
              stencilItem.canConnect = true;
            } else if (stencilRole === 'information_requirement_end') {
              stencilItem.canConnectTo = true;
            }
          } else {
            if (stencilRole === 'sequence_start') {
              stencilItem.canConnect = true;
            } else if (stencilRole === 'sequence_end') {
              stencilItem.canConnectTo = true;
            }
          }

          for (let j = 0; j < this.morphRoles.length; j++) {
            if (stencilRole === this.morphRoles[j].role) {
              if (!removed) {
                this.morphRoles[j].morphOptions.push(stencilItem);
              }
              stencilItem.morphRole = this.morphRoles[j].role;
              break;
            }
          }
        }

        if (currentGroup) {
          currentGroup.items.push(stencilItem);
          if (ignoreForPaletteDefinition.indexOf(stencilItem.id) < 0) {
            currentGroup.paletteItems.push(stencilItem);
          }
        } else {
          if (!removed) {
            stencilItemGroups.push(stencilItem);
          }
        }
      }

      for (let i = 0; i < stencilItemGroups.length; i++) {
        if (
          stencilItemGroups[i].paletteItems &&
          stencilItemGroups[i].paletteItems.length === 0
        ) {
          stencilItemGroups[i].visible = false;
        }
      }

      for (let i = 0; i < this.quickMenuItems.length; i++) {
        if (this.quickMenuItems[i]) {
          this.availableQuickMenuItems.push(this.quickMenuItems[i]);
        }
      }

      this.quickMenuItems = this.availableQuickMenuItems;
      this.morphRoles = this.morphRoles;

      for (let i = 0; i < data.rules.containmentRules.length; i++) {
        const rule = data.rules.containmentRules[i];
        this.containmentRules.push(rule);
      }

      this.containmentRules = this.containmentRules;

      const availableQuickMenuItems = this.quickMenuItems.filter(
        (item) => item !== null
      );
      this.quickMenuItems = availableQuickMenuItems;
      this.morphRoles = this.morphRoles;
      for (let i = 0; i < data.rules.containmentRules.length; i++) {
        const rule = data.rules.containmentRules[i];
        this.containmentRules.push(rule);
      }

      this.editorManager.registerOnEvent(
        ORYX.CONFIG.EVENT_SELECTION_CHANGED,
        (event: any) => {
          this.shapes = event.elements;
          let canvasSelected = false;
          if (this.shapes && this.shapes.length == 0) {
            this.shapes = [this.editorManager.getCanvas()];
            canvasSelected = true;
          }
          if (this.shapes && this.shapes.length > 0) {
            const selectedShape = this.shapes[0];
            const stencil = selectedShape.getStencil();

            if (
              this.selectedElementBeforeScrolling &&
              stencil.id().indexOf('BPMNDiagram') !== -1 &&
              stencil.id().indexOf('CMMNDiagram') !== -1 &&
              stencil.id().indexOf('DMNDiagram') !== -1
            ) {
              // ignore canvas event because of empty selection when scrolling stops
              return;
            }

            if (
              this.selectedElementBeforeScrolling &&
              this.selectedElementBeforeScrolling.getId() ===
                selectedShape.getId()
            ) {
              this.selectedElementBeforeScrolling = null;
              return;
            }

            // Store previous selection
            this.previousSelectedShape = this.selectedShape;

            // Only do something if another element is selected (Oryx fires this event multiple times)
            if (
              this.selectedShape !== undefined &&
              this.selectedShape.getId() === selectedShape.getId()
            ) {
              if (this.forceSelectionRefresh) {
                // Switch the flag again, this run will force refresh
                this.forceSelectionRefresh = false;
              } else {
                // Selected the same element again, no need to update anything
                return;
              }
            }

            let selectedItem: {
              title: string;
              properties: any[];
              auditData?: { author: string; createDate: string };
            } = { title: '', properties: [] };

            if (canvasSelected) {
              // selectedItem.auditData = {
              //   author: this.modelData.createdByUser,
              //   createDate: this.modelData.createDate
              // };
            }

            // Gather properties of selected item
            const properties = stencil.properties();
            for (let i = 0; i < properties.length; i++) {
              const property = properties[i];
              if (!property.popular()) continue;
              const key = property.prefix() + '-' + property.id();

              if (key === 'oryx-name') {
                selectedItem.title = selectedShape.properties.get(key);
              }

              const propertyConfig =
                FLOWABLE.PROPERTY_CONFIG[key + '-' + property.type()] ||
                FLOWABLE.PROPERTY_CONFIG[property.type()];

              if (!propertyConfig) {
                console.log(
                  'WARNING: no property configuration defined for ' +
                    key +
                    ' of type ' +
                    property.type()
                );
              } else {
                if (selectedShape.properties.get(key) === 'true') {
                  selectedShape.properties.set(key, true);
                }

                if (
                  FLOWABLE.UI_CONFIG.showRemovedProperties == false &&
                  property.isHidden()
                ) {
                  continue;
                }

                let currentProperty: {
                  key: string;
                  title: any;
                  description: any;
                  type: any;
                  mode: string;
                  readonly: any;
                  hidden: any;
                  value: any;
                  readModeTemplateUrl?: string;
                  writeModeTemplateUrl?: string;
                  templateUrl?: string;
                  hasReadWriteMode?: boolean;
                  noValue?: boolean;
                } = {
                  key: key,
                  title: property.title(),
                  description: property.description(),
                  type: property.type(),
                  mode: 'read',
                  readonly: property.readonly(),
                  hidden: property.isHidden(),
                  value: selectedShape.properties.get(key),
                };

                if (
                  (currentProperty.type === 'complex' ||
                    currentProperty.type === 'multiplecomplex') &&
                  currentProperty.value &&
                  currentProperty.value.length > 0
                ) {
                  try {
                    currentProperty.value = JSON.parse(currentProperty.value);
                  } catch (err) {
                    // ignore
                  }
                }

                if (
                  propertyConfig.readModeTemplateUrl !== undefined &&
                  propertyConfig.readModeTemplateUrl !== null
                ) {
                  currentProperty.readModeTemplateUrl =
                    propertyConfig.readModeTemplateUrl +
                    '?version=' +
                    this.staticIncludeVersion;
                }
                if (
                  propertyConfig.writeModeTemplateUrl !== null &&
                  propertyConfig.writeModeTemplateUrl !== null
                ) {
                  currentProperty.writeModeTemplateUrl =
                    propertyConfig.writeModeTemplateUrl +
                    '?version=' +
                    this.staticIncludeVersion;
                }

                if (
                  (currentProperty.readonly &&
                    propertyConfig.templateUrl !== undefined &&
                    propertyConfig.templateUrl !== null) ||
                  (currentProperty.readonly === undefined &&
                    propertyConfig.templateUrl !== undefined &&
                    propertyConfig.templateUrl !== null)
                ) {
                  currentProperty.templateUrl =
                    propertyConfig.templateUrl +
                    '?version=' +
                    this.staticIncludeVersion;
                  currentProperty.hasReadWriteMode = false;
                } else {
                  currentProperty.hasReadWriteMode = true;
                }

                if (
                  !currentProperty.value ||
                  currentProperty.value.length == 0
                ) {
                  currentProperty.noValue = true;
                }

                selectedItem.properties.push(currentProperty);
              }
            }

            // Need to wrap this in an $apply block
            this.safeApply(() => {
              this.selectedItem = selectedItem;
              this.selectedShape = selectedShape;
            });
          } else {
            this.safeApply(() => {
              this.selectedItem = {};
              this.selectedShape = null;
            });
          }
        }
      );
    });
  }
  togglePropertyWindowState() {
    this.propertyWindowState.collapsed = !this.propertyWindowState.collapsed;
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
  }

  safeApply(fn: () => void) {
    if (this.ngZone) {
      this.ngZone.run(() => {
        if (fn && typeof fn === 'function') {
          fn();
        }
      });
    } else {
      // Handle the case when NgZone is not available
      if (fn && typeof fn === 'function') {
        fn();
      }
    }
  }
}

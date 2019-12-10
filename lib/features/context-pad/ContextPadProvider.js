import inherits from 'inherits';

import BaseContextPadProvider from 'chor-js/lib/features/context-pad/ContextPadProvider';

import {
  isAny
} from 'bpmn-js/lib/features/modeling/util/ModelingUtil';

import {
  assign
} from 'min-dash';

export default function ContextPadProvider(injector) {
  injector.invoke(BaseContextPadProvider, this);
}

inherits(ContextPadProvider, BaseContextPadProvider);

ContextPadProvider.$inject = [
  'injector'
];

/**
 * @param {Object} element Shape the user selected
 *
 * @return {Object} Context pad entries for the selected shape
 */
ContextPadProvider.prototype.getContextPadEntries = function(element) {
  let actions = BaseContextPadProvider.prototype.getContextPadEntries.call(this, element);
  if (element.type === 'label') {
    return actions;
  }
  let businessObject = element.businessObject;
  let self = this;

  // define a few local functions that are reused later
  function startConnect(event, element, autoActivate) {
    self._connect.start(event, element, autoActivate);
  }

  function popupMenuPosition(element) {

    const Y_OFFSET = 5;

    const diagramContainer = self._canvas.getContainer();
    const pad = self._contextPad.getPad(element).html;

    const diagramRect = diagramContainer.getBoundingClientRect();
    const padRect = pad.getBoundingClientRect();

    const top = padRect.top - diagramRect.top;
    const left = padRect.left - diagramRect.left;

    const pos = {
      x: left,
      y: top + padRect.height + Y_OFFSET
    };

    return pos;
  }

  // --------------------------------------------------------------------------------------------
  // connect data objects
  if (isAny(businessObject, [ 'bpmn:DataObjectReference', 'bpmn:DataInput', 'bpmn:DataOutput' ])) {
    assign(actions, {
      'connect': {
        group: 'connect',
        className: 'bpmn-icon-connection-multi',
        title: self._translate('Connect using DataInputAssociation'),
        action: {
          click: startConnect,
          dragstart: startConnect
        }
      }
    });
  }

  if (!self._popupMenu.isEmpty(element, 'active-chor-replace')) {
    assign(actions, {
      'replace': {
        group: 'edit',
        className: 'bpmn-icon-screw-wrench',
        title: self._translate('Change type'),
        action: {
          click: function(event, element) {
            var position = assign(popupMenuPosition(element), {
              cursor: { x: event.x, y: event.y }
            });
            self._popupMenu.open(element, 'active-chor-replace', position);
          }
        }
      }
    });
  }

  return actions;
};
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

  let businessObject = element.businessObject;
  let self = this;

  // define a few local functions that are reused later
  function startConnect(event, element, autoActivate) {
    self._connect.start(event, element, autoActivate);
  }

  // --------------------------------------------------------------------------------------------
  // connect data objects
  if (isAny(businessObject, [ 'bpmn:DataObjectReference', 'bpmn:DataStoreReference' ])) {
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

  return actions;
};
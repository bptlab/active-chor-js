import inherits from 'inherits';
import BaseReplaceMenuProvider from 'chor-js/lib/features/popup-menu/ReplaceMenuProvider';
import { isDifferentType } from 'bpmn-js/lib/features/popup-menu/util/TypeUtil';
import { is } from 'bpmn-js/lib/util/ModelUtil';

import * as replaceOptions from 'bpmn-js/lib/features/replace/ReplaceOptions';

export default function ReplaceMenuProvider(injector) {
  injector.invoke(BaseReplaceMenuProvider, this);
}

inherits(ReplaceMenuProvider, BaseReplaceMenuProvider);

ReplaceMenuProvider.$inject = [
  'injector'
];

ReplaceMenuProvider.prototype.register = function() {
  BaseReplaceMenuProvider.prototype.register.call(this);
  this._popupMenu.registerProvider('active-chor-replace', this);
};

ReplaceMenuProvider.prototype.getEntries = function(element) {
  let entries = BaseReplaceMenuProvider.prototype.getEntries.call(this, element);
  let businessObject = element.businessObject;

  if (!this._rules.allowed('shape.replace', { element: element })) {
    return [];
  }

  var differentType = isDifferentType(element);
  const dataObjectReplaceOptioins = [
    { target: { type: 'bpmn:DataInput' },
      actionName: 'replace-with-data-input',
      label: 'Data Input',
      className: 'bpmn-icon-data-input'
    }
  ];
  // start events
  if (is(businessObject, 'bpmn:DataObjectReference')) {
    entries = dataObjectReplaceOptioins;
    return this._createEntries(element, entries);
  }
  return entries;

};

function isInTargets(targets) {
  return function(element) {
    return targets.some(
      target => element.target.type == target.type &&
        element.target.eventDefinitionType == target.eventDefinitionType
    );
  };
}
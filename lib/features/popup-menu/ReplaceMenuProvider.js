import inherits from 'inherits';
import BaseReplaceMenuProvider from 'chor-js/lib/features/popup-menu/ReplaceMenuProvider';
import { is } from 'bpmn-js/lib/util/ModelUtil';

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

  const dataObjectReplaceOptioins = [
    { target: { type: 'bpmn:DataInput' },
      actionName: 'replace-with-data-input',
      label: 'Data Input',
      className: 'bpmn-icon-data-input'
    },
    { target: { type: 'bpmn:DataOutput' },
      actionName: 'replace-with-data-output',
      label: 'Data Output',
      className: 'bpmn-icon-data-output'
    }
  ];
  if (is(businessObject, 'bpmn:DataObjectReference')) {
    entries = dataObjectReplaceOptioins;
    return this._createEntries(element, entries);
  }
  return entries;

};

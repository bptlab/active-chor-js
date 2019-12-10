import ChoreoElementFactory from 'chor-js/lib/features/modeling/ChoreoElementFactory';
import { getBusinessObject } from 'bpmn-js/lib/util/ModelUtil';
import inherits from 'inherits';
import { isAny } from 'bpmn-js/lib/features/modeling/util/ModelingUtil';


export default function ActiveElementFactory(injector) {
  injector.invoke(ChoreoElementFactory, this);
}

inherits(ActiveElementFactory, ChoreoElementFactory);

ActiveElementFactory.$inject = [
  'injector'
];


ActiveElementFactory.prototype._getDefaultSize = function(element) {
  const businessObject = getBusinessObject(element);
  if (isAny(businessObject, ['bpmn:DataInput', 'bpmn:DataOutput'])) {
    return { width: 36, height: 50 };
  } else {
    return ChoreoElementFactory.prototype._getDefaultSize.call(this, element);
  }
};
import ChoreoElementFactory from 'chor-js/lib/features/modeling/ChoreoElementFactory';
import { getBusinessObject, is } from 'bpmn-js/lib/util/ModelUtil';
import inherits from 'inherits';


export default function ActiveElementFactory(injector) {
  injector.invoke(ChoreoElementFactory, this);
}

inherits(ActiveElementFactory, ChoreoElementFactory);

ActiveElementFactory.$inject = [
  'injector'
];



ActiveElementFactory.prototype._getDefaultSize = function(element) {
  const businessObject = getBusinessObject(element);
  if (is(businessObject, 'bpmn:DataInput')) {
    return { width: 36, height: 50 };
  } else {
    return ChoreoElementFactory.prototype._getDefaultSize.call(this, element);
  }
};
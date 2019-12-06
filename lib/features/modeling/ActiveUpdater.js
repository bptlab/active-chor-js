import inherits from 'inherits';

import ChoreoUpdater from 'chor-js/lib/features/modeling/ChoreoUpdater';

import {
  is
} from 'bpmn-js/lib/util/ModelUtil';
import { isAnyOf } from 'chor-js/lib/util/DiagramWalkerUtil';
import { remove as collectionRemove } from 'diagram-js/lib/util/Collections';

export default function ActiveUpdater(injector) {
  injector.invoke(ChoreoUpdater, this);
}

inherits(ActiveUpdater, ChoreoUpdater);

ActiveUpdater.$inject = [
  'injector'
];

ActiveUpdater.prototype.updateAttachment = function(context) {
  let shape = context.shape;
  let businessObject = shape.businessObject;
  let host = shape.host;

  if (is(host, 'bpmn:ChoreographyActivity')) {
    businessObject.attachedChoreographyRef = host && host.businessObject;
    delete businessObject.attachedToRef;
  } else {
    delete businessObject.attachedChoreographyRef;
    ChoreoUpdater.prototype.updateAttachment.call(this, context);
  }
};

ActiveUpdater.prototype.updateSemanticParent = function(businessObject, newParent, visualParent) {
  if (isAnyOf(businessObject, ['bpmn:DataInput']) && !newParent) {
    const containment = 'dataInputs';

    if (businessObject.$parent) {
      // remove from old parent
      const children = businessObject.$parent.get(containment);
      collectionRemove(children, businessObject);
      // Todo: remove ioSpec if empty? Not necessary, but would be nice.
    }
    businessObject.$parent = null;

  } else if (isAnyOf(businessObject, ['bpmn:DataInput'])
    && newParent
    && newParent.ioSpecification !== businessObject.$parent
  ) {

    if (!newParent.ioSpecification) {
      throw new Error('IOSpecification should have been created already for ' + newParent);
    }
    businessObject.$parent = newParent.ioSpecification;
    newParent.ioSpecification.dataInputs.push(businessObject);

  } else {
    ChoreoUpdater.prototype.updateSemanticParent.call(this, businessObject, newParent, visualParent);
  }
};
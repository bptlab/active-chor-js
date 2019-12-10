import inherits from 'inherits';

import ChoreoUpdater from 'chor-js/lib/features/modeling/ChoreoUpdater';

import {
  is
} from 'bpmn-js/lib/util/ModelUtil';
import { remove as collectionRemove } from 'diagram-js/lib/util/Collections';
import { isAny } from 'bpmn-js/lib/features/modeling/util/ModelingUtil';

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
  if (isAny(businessObject, ['bpmn:DataInput', 'bpmn:DataOutput']) && !newParent) {
    const containment = is(businessObject, 'bpmn:DataInput') ? 'dataInputs' : 'dataOutputs';

    if (businessObject.$parent) {
      // remove from old parent
      const children = businessObject.$parent.get(containment);
      collectionRemove(children, businessObject);
      // Todo: remove ioSpec if empty? Not necessary, but would be nice.
    }
    businessObject.$parent = null;

  } else if (isAny(businessObject, ['bpmn:DataInput', 'bpmn:DataOutput'])
    && newParent
    && newParent.ioSpecification !== businessObject.$parent
  ) {

    if (!newParent.ioSpecification) {
      throw new Error('IOSpecification should have been created already for ' + newParent);
    }
    businessObject.$parent = newParent.ioSpecification;
    if (is(businessObject,'bpmn:DataOutput')) {
      if (!newParent.ioSpecification.dataInputs) {
        newParent.ioSpecification.dataOutputs = [];
      }
      newParent.ioSpecification.dataInputs.push(businessObject);
    } else {
      if (!newParent.ioSpecification.dataOutputs) {
        newParent.ioSpecification.dataOutputs = [];
      }
      newParent.ioSpecification.dataOutputs.push(businessObject);
    }

  } else {
    ChoreoUpdater.prototype.updateSemanticParent.call(this, businessObject, newParent, visualParent);
  }
};
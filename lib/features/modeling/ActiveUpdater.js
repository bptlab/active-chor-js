import inherits from 'inherits';

import ChoreoUpdater from 'chor-js/lib/features/modeling/ChoreoUpdater';

import {
  is
} from 'bpmn-js/lib/util/ModelUtil';

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

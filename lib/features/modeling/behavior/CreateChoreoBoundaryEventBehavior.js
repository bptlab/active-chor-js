import inherits from 'inherits';

import CommandInterceptor from 'diagram-js/lib/command/CommandInterceptor';

import { is } from 'bpmn-js/lib/util/ModelUtil';


/**
 * Choreography-specific boundary event creation behavior.
 */
export default function CreateChoreoBoundaryEventBehavior(
    eventBus, modeling, elementFactory,
    bpmnFactory) {

  CommandInterceptor.call(this, eventBus);

  this.preExecute('shape.create', function(context) {
    let shape = context.shape;
    let host = context.host;
    let businessObject;
    let boundaryEvent;

    var attrs = {
      cancelActivity: true
    };

    if (host && is(host, 'bpmn:ChoreographyActivity') && is(shape, 'bpmn:IntermediateThrowEvent')) {
      attrs.attachedChoreographyRef = host.businessObject;

      businessObject = bpmnFactory.create('bpmn:BoundaryEvent', attrs);

      boundaryEvent = {
        type: 'bpmn:BoundaryEvent',
        businessObject: businessObject
      };

      context.shape = elementFactory.createShape(boundaryEvent);
    }
  }, true);
}

CreateChoreoBoundaryEventBehavior.$inject = [
  'eventBus',
  'modeling',
  'elementFactory',
  'bpmnFactory'
];

inherits(CreateChoreoBoundaryEventBehavior, CommandInterceptor);

import inherits from 'inherits';

import ChoreoRules from 'chor-js/lib/features/rules/ChoreoRules';

import {
  is,
  getBusinessObject
} from 'bpmn-js/lib/util/ModelUtil';

import {
  isLabel
} from 'bpmn-js/lib/util/LabelUtil';

import {
  isExpanded,
  isEventSubProcess,
  isInterrupting,
  hasErrorEventDefinition,
  hasEscalationEventDefinition,
  hasCompensateEventDefinition
} from 'bpmn-js/lib/util/DiUtil';

import {
  getBoundaryAttachment as isBoundaryAttachment
} from 'bpmn-js/lib/features/snapping/BpmnSnappingUtil';

export default function ActiveRules(injector) {
  injector.invoke(ChoreoRules, this);
}

inherits(ActiveRules, ChoreoRules);

ActiveRules.$inject = [ 'injector' ];

//TODO canReplace must be overwritten as well, but is unfortunately a local method again in bpmn-js

ActiveRules.prototype.canAttach = function(elements, target, source, position) {
  let element = (Array.isArray(elements) && elements[0]) || elements;

  // only handle choreography activities
  if (isBoundaryCandidate(element)) {
    if (is(target, 'bpmn:ChoreographyActivity')) {
      if (position && isBoundaryAttachment(position, target)) {
        return 'attach';
      }
    }
  }

  return ChoreoRules.prototype.canAttach.call(this, elements, target, source, position);
};

function isBoundaryEvent(element) {
  return !isLabel(element) && is(element, 'bpmn:BoundaryEvent');
}

/**
 * We treat IntermediateThrowEvents as boundary events during create,
 * this must be reflected in the rules.
 */
function isBoundaryCandidate(element) {
  if (isBoundaryEvent(element)) {
    return true;
  }

  if (is(element, 'bpmn:IntermediateThrowEvent') && hasNoEventDefinition(element)) {
    return true;
  }

  return (
    is(element, 'bpmn:IntermediateCatchEvent') &&
    hasCommonBoundaryIntermediateEventDefinition(element)
  );
}

function hasNoEventDefinition(element) {
  var bo = getBusinessObject(element);

  return bo && !(bo.eventDefinitions && bo.eventDefinitions.length);
}

function hasCommonBoundaryIntermediateEventDefinition(element) {
  return hasOneOfEventDefinitions(element, [
    'bpmn:MessageEventDefinition',
    'bpmn:TimerEventDefinition',
    'bpmn:SignalEventDefinition',
    'bpmn:ConditionalEventDefinition'
  ]);
}

function hasOneOfEventDefinitions(element, eventDefinitions) {
  return eventDefinitions.some(function(definition) {
    return hasEventDefinition(element, definition);
  });
}

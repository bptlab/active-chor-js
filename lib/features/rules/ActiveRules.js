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

/**
 * Unfortunately, we have to copy the whole function from bpmn-js as the return value
 * false does not tell us what exactly was the reason for the result, so we have to check
 * everything again.
 */
ActiveRules.prototype.canAttach = function(elements, target, source, position) {

  if (!Array.isArray(elements)) {
    elements = [ elements ];
  }

  // only (re-)attach one element at a time
  if (elements.length !== 1) {
    return false;
  }

  var element = elements[0];

  // do not attach labels
  if (isLabel(element)) {
    return false;
  }

  // only handle boundary events
  if (!isBoundaryCandidate(element)) {
    return false;
  }

  // disallow drop on event sub processes
  if (isEventSubProcess(target)) {
    return false;
  }

  // only allow drop on non compensation activities
  if (!(is(target, 'bpmn:Activity') || is(target, 'bpmn:ChoreographyActivity')) || isForCompensation(target)) {
    return false;
  }

  // only attach to subprocess border
  if (position && !isBoundaryAttachment(position, target)) {
    return false;
  }

  // do not attach on receive tasks after event based gateways
  if (isReceiveTaskAfterEventBasedGateway(target)) {
    return false;
  }

  return 'attach';
};

function isBoundaryEvent(element) {
  return !isLabel(element) && is(element, 'bpmn:BoundaryEvent');
}

function isForCompensation(e) {
  return getBusinessObject(e).isForCompensation;
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

function isReceiveTaskAfterEventBasedGateway(element) {
  return (
    is(element, 'bpmn:ReceiveTask') &&
    find(element.incoming, function(incoming) {
      return is(incoming.source, 'bpmn:EventBasedGateway');
    })
  );
}
import inherits from 'inherits';

import CommandInterceptor from 'diagram-js/lib/command/CommandInterceptor';

import { is } from 'bpmn-js/lib/util/ModelUtil';
import { isAny } from 'bpmn-js/lib/features/modeling/util/ModelingUtil';

/**
 *
 * @param injector
 * @param moddle
 * @constructor
 */
export default function CreateDataInputOutputBehavior(injector, moddle) {

  injector.invoke(CommandInterceptor, this);

  this.preExecute('shape.create', function(event) {

    const context = event.context;
    const shape = context.shape;
    if (isAny(shape, ['bpmn:DataInput', 'bpmn:DataOutput'])) {
      const parent = context.parent.businessObject;
      if (!parent.ioSpecification) {
        const ioSpec = moddle.create(
          'bpmn:InputOutputSpecification',
          { dataInputs: [], dataOutputs: [] }
        );
        ioSpec.$parent = parent;
        ioSpec.id = moddle.ids.nextPrefixed('IOSpec_', ioSpec);
        parent.ioSpecification = ioSpec;
        /* The parent is later assigned by updateSemanticParent in ActiveUpdater, which makes it easier to deal
        with reverts and redos. Also, we do not care if the ioSpec is left over by a revert or
        left empty after removing all DataInputs empty.*/

      }
      const prefix = is(shape, 'bpmn:DataInput')? 'DataInput_': 'DataOutput_';
      shape.businessObject.id = moddle.ids.nextPrefixed(prefix, shape.businessObject);
      /* This is just a temporary id which will be overwritten by the id of the DataObject this might replace.
      We need to add a temporary ID so updateProperty does not brake on revert and the DI gets an id
      (which is not overwritten)*/

      shape.businessObject.di.id = shape.businessObject.id + '_di';

    }});

}

inherits(CreateDataInputOutputBehavior, CommandInterceptor);

CreateDataInputOutputBehavior.$inject = [
  'injector',
  'moddle'
];
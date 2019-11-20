import inherits from 'inherits';

import CommandInterceptor from 'diagram-js/lib/command/CommandInterceptor';

import { is } from 'bpmn-js/lib/util/ModelUtil';

/**
 *
 * @param injector
 * @param bpmnFactory {BpmnFactory}
 * @constructor
 */
export default function CreateDataInputBehavior(injector, moddle) {

  injector.invoke(CommandInterceptor, this);

  this.preExecute('shape.create', function(event) {

    const context = event.context;
    const shape = context.shape;
    const parent = context.parent.businessObject;
    if (is(shape, 'bpmn:DataInput')) {
      if (!parent.ioSpecification) {
        const ioSpec = moddle.create(
          'bpmn:InputOutputSpecification',
          { dataInputs: [], dataOutputs: [] }
        );
        ioSpec.$parent = parent;
        ioSpec.id = moddle.ids.nextPrefixed('ioSpec_', ioSpec);
        parent.ioSpecification = ioSpec;

      }

      parent.ioSpecification.dataInputs.push(shape.businessObject);
      shape.businessObject.$parent = parent.ioSpecification;
      console.log(context);
      let aHandler = {
        get: function(target, name) {
          if (name === 'id') {
            console.log('get',target, name);
            debugger;
          }
          return target[name];
        } ,
        set : function(target,name,value) {
          if ( name === 'id') {
            console.log('set',target, name, value);
            debugger;
          }
          target[name] = value;
          return true;
        }
      };
      context.shape = new Proxy(shape, aHandler);

    }
  });
}

inherits(CreateDataInputBehavior, CommandInterceptor);

CreateDataInputBehavior.$inject = [
  'injector',
  'moddle'
];
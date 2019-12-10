import CreateChoreoBoundaryEventBehavior from './CreateChoreoBoundaryEventBehavior';
import CreateDataInputOutputBehavior from './CreateDataInputOutputBehavior';

export default {
  __init__: [
    'createChoreoBoundaryEventBehavior',
    'createDataInputOutputBehavior',
  ],
  createChoreoBoundaryEventBehavior: [ 'type', CreateChoreoBoundaryEventBehavior ],
  createDataInputOutputBehavior: ['type', CreateDataInputOutputBehavior],
};

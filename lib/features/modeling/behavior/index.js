import CreateChoreoBoundaryEventBehavior from './CreateChoreoBoundaryEventBehavior';
import CreateDataInputBehavior from './CreateDataInputBehavior';

export default {
  __init__: [
    'createChoreoBoundaryEventBehavior',
    'createDataInputBehavior'
  ],
  createChoreoBoundaryEventBehavior: [ 'type', CreateChoreoBoundaryEventBehavior ],
  createDataInputBehavior: ['type', CreateDataInputBehavior]
};

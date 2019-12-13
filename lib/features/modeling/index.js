import BehaviorModule from './behavior';

import ActiveUpdater from './ActiveUpdater';
import ActiveElementFactory from './ActiveElementFactory';

export default {
  __init__: [
    'elementFactory',
    'bpmnUpdater',
  ],
  __depends__: [
    BehaviorModule
  ],
  elementFactory: [ 'type', ActiveElementFactory ],
  bpmnUpdater: [ 'type', ActiveUpdater ],

};

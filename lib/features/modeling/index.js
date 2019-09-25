import BehaviorModule from './behavior';

import ActiveUpdater from './ActiveUpdater';

export default {
  __init__: [
    'bpmnUpdater'
  ],
  __depends__: [
    BehaviorModule
  ],
  bpmnUpdater: [ 'type', ActiveUpdater ]
};

import RulesModule from 'diagram-js/lib/features/rules';

import ActiveRules from './ActiveRules';

export default {
  __depends__: [
    RulesModule
  ],
  __init__: [ 'bpmnRules' ],
  bpmnRules: [ 'type', ActiveRules ]
};

import ActiveCopyPaste from './ActiveCopyPaste';


/**
 * We need to extend the chor-js copy paste for some small alterations
 */
export default {
  __init__: ['bpmnCopyPaste'],
  bpmnCopyPaste: ['type', ActiveCopyPaste]
};

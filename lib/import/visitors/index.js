import ActiveInitialRenderVisitor from './ActiveInitialRenderVisitor';
import ActiveRestoreFromCacheVisitor from './ActiveRestoreFromCacheVisitor';

export default {
  __init__: [
    'initialRenderVisitor',
    'restoreFromCacheVisitor'
  ],
  initialRenderVisitor: [ 'type', ActiveInitialRenderVisitor ],
  restoreFromCacheVisitor: ['type', ActiveRestoreFromCacheVisitor]
};
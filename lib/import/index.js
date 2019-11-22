import VisitorModule from './visitors';
import ActiveTreeWalker from './ActiveTreeWalker';

export default {
  __depends__: [
    VisitorModule
  ],
  treeWalker: ['type', ActiveTreeWalker]
};
import PopupMenuModule from 'diagram-js/lib/features/popup-menu';

import ReplaceMenuProvider from './ReplaceMenuProvider';


export default {
  __depends__: [
    PopupMenuModule,
  ],
  __init__: [ 'replaceMenuProvider' ],
  replaceMenuProvider: [ 'type', ReplaceMenuProvider ]
};
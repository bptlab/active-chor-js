import BaseViewer from 'chor-js/lib/Viewer';

import inherits from 'inherits';

import CoreModule from './core';

import { metamodelExtension } from './metamodel/ActiveChoreographies';
import { assign } from 'min-dash';


/**
 * A regular viewer for choreography diagrams without navigation or modeling capabilities.
 */
export default function Viewer(options) {
  BaseViewer.call(this, assign(options, {
    moddleExtensions: {
      ac: metamodelExtension
    }
  }));
}

inherits(Viewer, BaseViewer);

Viewer.prototype._modules = [].concat(
  Viewer.prototype._modules, [
    CoreModule
  ]
);

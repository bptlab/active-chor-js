import BaseModeler from 'chor-js/lib/Modeler';

import inherits from 'inherits';

import CoreModule from './core';


/**
 * A modeler for BPMN 2.0 choreography diagrams.
 */
export default function Modeler(options) {
  BaseModeler.call(this, options);
}

inherits(Modeler, BaseModeler);

Modeler.prototype._modules = [].concat(
  Modeler.prototype._modules, [
    CoreModule
  ], [
  ]
);

import BaseModeler from 'chor-js/lib/Modeler';

import inherits from 'inherits';

import CoreModule from './core';

import { metamodelExtension } from "./metamodel/ActiveChoreographies";
import { assign } from 'min-dash';

import ContextPadModule from './features/context-pad';
import PaletteModule from './features/palette';
import RulesModule from './features/rules';
import ModelingModule from './features/modeling';

/**
 * A modeler for BPMN 2.0 choreography diagrams.
 */
export default function Modeler(options) {
  BaseModeler.call(this, assign(options, {
    moddleExtensions: {
      ac: metamodelExtension
    }
  }));
}

inherits(Modeler, BaseModeler);

Modeler.prototype._modules = [].concat(
  Modeler.prototype._modules, [
    CoreModule
  ], [
    ContextPadModule,
    PaletteModule,
    RulesModule,
    ModelingModule
  ]
);

import ChorPalette from 'chor-js/lib/features/palette/PaletteProvider';

import inherits from 'inherits';

import {
  assign
} from 'min-dash';


/**
 * A provider responsible for populating the palette.
 */
export default function PaletteProvider(injector, palette) {
  injector.invoke(ChorPalette, this);
  palette.registerProvider(this);
}

inherits(PaletteProvider, ChorPalette);

PaletteProvider.$inject = [
  'injector',
  'palette'
];

/**
 * @param {Object} element (not provided by caller and not used)
 *
 * @return {Object} an object containing the palette specification
 */
PaletteProvider.prototype.getPaletteEntries = function(element) {
  var actions = ChorPalette.prototype.getPaletteEntries.call(this),
      create = this._create,
      elementFactory = this._elementFactory,
      spaceTool = this._spaceTool,
      lassoTool = this._lassoTool;

  function createAction(type, group, className, title, options) {
    function createListener(event) {
      var shape = elementFactory.createShape(assign({ type: type }, options));

      if (options) {
        shape.businessObject.di.isExpanded = options.isExpanded;
      }

      create.start(event, shape);
    }

    var shortType = type.replace(/^bpmn:/, '');

    return {
      group: group,
      className: className,
      title: title || 'Create ' + shortType,
      action: {
        dragstart: createListener,
        click: createListener
      }
    };
  }

  assign(actions, {
    'create.task': createAction(
      'bpmn:ScriptTask', 'activity', 'bpmn-icon-script-task'
    )
  });

  return actions;
};

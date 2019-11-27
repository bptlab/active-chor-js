import ChoreoTreeWalker from 'chor-js/lib/import/ChoreoTreeWalker';
import { filter, forEach } from 'min-dash';
import { is } from 'bpmn-js/lib/util/ModelUtil';
import { isAnyOf } from 'chor-js/lib/util/DiagramWalkerUtil';

export default class ActiveTreeWalker extends ChoreoTreeWalker {

  handleFlowNode(flowNode, parentShape) {
    super.handleFlowNode(flowNode, parentShape);

    this._deferred.push(() => {
      forEach(flowNode.dataInputAssociations, dia => this.visitIfDi(dia, parentShape));
      forEach(flowNode.dataOutputAssociations, doa => this.visitIfDi(doa, parentShape));
    });
  }

  handleFlowElements(flowElements, parentShape) {
    forEach(flowElements, e => {
      if (is(e, 'bpmn:DataObject')) {
        // SKIP (assume correct referencing via DataObjectReference) (This is from bpmn-js)
      } else if (is(e, 'bpmn:DataObjectReference')) {
        this.visitIfDi(e, parentShape);
      }
    });

    // We need to filter these objects otherwise the chor-js walker will throw an error.
    flowElements = filter(flowElements, x => !isAnyOf(x, ['bpmn:DataObject', 'bpmn:DataObjectReference']));
    super.handleFlowElements(flowElements, parentShape);
  }

  visitIfDi(element, parentShape) {
    if (element.di) {
      this._visitor.visit(element, parentShape);
    } else {
      throw Error('DI is missing for ' + element.id);
    }
  }

}

import inherits from 'inherits';
import RestoreFromCacheVisitor from 'chor-js/lib/import/visitors/RestoreFromCacheVisitor';
import { isAnyOf } from 'chor-js/lib/util/DiagramWalkerUtil';

export default function ActiveRestoreFromCacheVisitor(injector) {
  injector.invoke(RestoreFromCacheVisitor, this);
}

inherits(ActiveRestoreFromCacheVisitor, RestoreFromCacheVisitor);

ActiveRestoreFromCacheVisitor.$inject = [
  'injector'
];

ActiveRestoreFromCacheVisitor.prototype.visit = function(element, parentShape) {
  let shape = this.getShape(element, parentShape);
  if (isAnyOf(shape, ['bpmn:DataInputAssociation', 'bpmn:DataOutputAssociation'])) {
    // We need to handle these Associations here, as they do not inherit from bpmn:Association
    this._canvas.addConnection(shape, parentShape);
  } else {
    shape = RestoreFromCacheVisitor.prototype.visit.call(this,element,parentShape);
  }
  return shape;
};
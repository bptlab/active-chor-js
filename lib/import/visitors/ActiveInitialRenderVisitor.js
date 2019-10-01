import inherits from 'inherits';

import InitialRenderVisitor from 'chor-js/lib/import/visitors/InitialRenderVisitor';

export default function ActiveInitialRenderVisitor(injector) {
  injector.invoke(InitialRenderVisitor, this);
}

inherits(ActiveInitialRenderVisitor, InitialRenderVisitor);

ActiveInitialRenderVisitor.$inject = [ 'injector' ];

/**
 * Returns the business object that is the host to the given boundary element.
 */
ActiveInitialRenderVisitor.prototype._getBoundaryHostSemantic = function(boundarySemantic) {
  if (boundarySemantic.attachedChoreographyRef) {
    return boundarySemantic.attachedChoreographyRef;
  }
  return InitialRenderVisitor.prototype._getBoundaryHostSemantic.call(this, boundarySemantic);
};
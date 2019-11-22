import ChoreoTreeWalker from 'chor-js/lib/import/ChoreoTreeWalker';

export default class ActiveTreeWalker extends ChoreoTreeWalker {
  constructor() {
    super();
  }

  // overwrite handle choreo, choreoActive, subChoreo and add handleIOSpec there
  handleChoreography(choreo, rootShape) {
    super.handleChoreography(choreo, rootShape);
    this.handleIOSpecification(choreo.ioSpecification, rootShape);
  }

  /**
   *
   * @param ioSpecification
   * @param parentShape {Shape}
   */
  handleIOSpecification(ioSpecification, parentShape) {
    if (!ioSpecification) {
      return;
    }
    if (ioSpecification.dataInputs) {
      ioSpecification.dataInputs.forEach(input => this.handleDataInput(input, parentShape));
    }

  }

  handleDataInput(dataInput, parentShape) {
    if (dataInput.di) {
      this._visitor.visit(dataInput, parentShape);
    }
  }
}
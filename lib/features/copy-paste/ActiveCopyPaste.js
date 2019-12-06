import inherits from 'inherits';
import ChoreoCopyPaste from 'chor-js/lib/features/copy-paste/ChoreoCopyPaste';


export default function ActiveCopyPaste(injector) {
  injector.invoke(ChoreoCopyPaste, this);
}

inherits(ActiveCopyPaste, ChoreoCopyPaste);

ActiveCopyPaste.$inject = [
  'injector'
];

ActiveCopyPaste.prototype.filterProperties = function(properties) {
  let filteredProps = ChoreoCopyPaste.prototype.filterProperties.call(this, properties);
  return filteredProps.filter(prop => !['ac:dataInputAssociations', 'ac:dataOutputAssociations', 'ac:ioSpecification'].includes(prop));
};
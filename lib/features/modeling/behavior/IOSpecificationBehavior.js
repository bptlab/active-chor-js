import CommandInterceptor from 'diagram-js/lib/command/CommandInterceptor';
import inherits from 'inherits';

export default function IOSpecificationBehavior(injector, moddle) {

  injector.invoke(IOSpecificationBehavior, this);



}

inherits(IOSpecificationBehavior, CommandInterceptor);

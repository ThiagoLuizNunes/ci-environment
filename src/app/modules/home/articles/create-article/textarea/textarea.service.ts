import {
  Injectable,
  ViewContainerRef,
  ComponentRef,
  ComponentFactoryResolver,
  ComponentFactory,
} from '@angular/core';
import { TextAreaComponent } from './textarea.component';

@Injectable({
  providedIn: 'root'
})
export class TextAreaService {

  constructor(
    private resolver: ComponentFactoryResolver,
  ) { }
  createComponent(container: ViewContainerRef, index: number) {
    let factory: ComponentFactory<any>;
    factory = this.resolver.resolveComponentFactory(TextAreaComponent);
    const ref = container.createComponent(factory, index);
    ref.instance.id = container.indexOf(ref.hostView);
    ref.instance.someProp = 'Hello World';

    return ref;
  }

  destroyComponent(container: ComponentRef<any>) {
    container.destroy();
  }
}

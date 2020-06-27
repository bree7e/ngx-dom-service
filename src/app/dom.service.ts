import {
  Injectable,
  Injector,
  ComponentFactoryResolver,
  EmbeddedViewRef,
  ApplicationRef,
  ComponentRef,
} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DomService {
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  /** caroso1222 https://medium.com/hackernoon/angular-pro-tip-how-to-dynamically-create-components-in-body-ba200cc289e6 */
  appendComponentToBody(component: any): void {
    // 1. Create a component reference from the component
    const componentRef = this.componentFactoryResolver
      .resolveComponentFactory(component)
      .create(this.injector);

    // 2. Attach component to the appRef so that it's inside the ng component tree
    this.appRef.attachView(componentRef.hostView);

    // 3. Get DOM element from component
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    // 4. Append DOM element to the body
    document.body.appendChild(domElem);

    // 5. Wait some time and remove it from the component tree and from the DOM
    setTimeout(() => {
      this.appRef.detachView(componentRef.hostView);
      componentRef.destroy();
    }, 3000);
  }

  createComponent(
    component: any,
    componentProps?: object
  ): ComponentRef<unknown> {
    // 1. Create a component reference from the component
    const componentRef = this.componentFactoryResolver
      .resolveComponentFactory(component)
      .create(this.injector);

    if (componentProps && typeof componentRef.instance === 'object') {
      Object.assign(componentRef.instance as object, componentProps);
    }

    return componentRef;
  }

  attachComponent(
    componentRef: ComponentRef<unknown>,
    appendTo: Element
  ): void {
    // 2. Attach component to the appRef so that it's inside the ng component tree
    this.appRef.attachView(componentRef.hostView);

    // 3. Get DOM element from component
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    // 4. Append DOM element to the body
    appendTo.appendChild(domElem);
  }
}

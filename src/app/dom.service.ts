import {
  Injectable,
  Injector,
  ComponentFactoryResolver,
  EmbeddedViewRef,
  ApplicationRef,
  ComponentRef,
  Renderer2,
  Inject,
  RendererFactory2,
  Type,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

// https://medium.com/hackernoon/angular-pro-tip-how-to-dynamically-create-components-in-body-ba200cc289e6

@Injectable({
  providedIn: 'root',
})
export class DomService {
  /** ref to window document */
  private readonly document: Document;
  /** renderer instance */
  private readonly renderer: Renderer2;
  /** attached component  */
  private componentRef: ComponentRef<unknown>;

  constructor(
    @Inject(DOCUMENT) document,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private applicationRef: ApplicationRef,
    rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.document = document;
  }

  attachComponent<T>(component: Type<T>, componentProps: object = null): T {
    const componentRef = this.componentFactoryResolver
      .resolveComponentFactory(component)
      .create(this.injector);
    if (componentProps !== null && typeof componentRef.instance === 'object') {
      Object.assign(componentRef.instance, componentProps);
    }
    // put inside the angular component tree
    this.applicationRef.attachView(componentRef.hostView);
    const componentRootNode = (componentRef.hostView as EmbeddedViewRef<
      unknown
    >).rootNodes[0] as HTMLElement;
    // append component to the body
    this.renderer.appendChild(this.document.body, componentRootNode);
    this.componentRef = componentRef;
    return componentRef.instance;
  }

  /**
   * Destroy component
   */
  removeComponent(): void {
    this.applicationRef.detachView(this.componentRef.hostView);
    this.componentRef.destroy();
  }
}

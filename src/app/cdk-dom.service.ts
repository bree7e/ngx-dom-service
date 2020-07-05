import {
  Injectable,
  Injector,
  ComponentFactoryResolver,
  ApplicationRef,
  Inject,
} from '@angular/core';
import {
  ComponentType,
  ComponentPortal,
  DomPortalOutlet,
} from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';

// https://hackernoon.com/a-first-look-into-the-angular-cdk-67e68807ed9b

@Injectable({
  providedIn: 'root',
})
export class CdkDomService {
  /** ref to window document slot */
  private bodyPortalOutlet: DomPortalOutlet;

  constructor(
    @Inject(DOCUMENT) document,
    componentFactoryResolver: ComponentFactoryResolver,
    injector: Injector,
    applicationRef: ApplicationRef
  ) {
    this.bodyPortalOutlet = new DomPortalOutlet(
      document.body,
      componentFactoryResolver,
      applicationRef,
      injector
    );
  }

  attachComponent<T>(
    component: ComponentType<T>,
    componentProps: object = null
  ): T {
    const componentPortal = new ComponentPortal<T>(component);
    const componentRef = this.bodyPortalOutlet.attach<T>(componentPortal);
    if (componentProps !== null && typeof componentRef.instance === 'object') {
      Object.assign(componentRef.instance, componentProps);
    }
    return componentRef.instance;
  }

  /**
   * Destroy component
   */
  removeComponent(): void {
    this.bodyPortalOutlet.detach();
  }
}

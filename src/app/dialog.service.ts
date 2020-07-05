import {
  Injectable,
  Injector,
  ComponentFactoryResolver,
  ApplicationRef,
  Inject,
} from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';

import { CdkDomService } from './cdk-dom.service';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogService extends CdkDomService {
  private afterClosed$: Subject<unknown> = null;

  constructor(
    @Inject(DOCUMENT) document,
    componentFactoryResolver: ComponentFactoryResolver,
    injector: Injector,
    applicationRef: ApplicationRef
  ) {
    super(document, componentFactoryResolver, injector, applicationRef);
  }

  open<T>(
    component: ComponentType<T>,
    data: object = null
  ): T & { afterClosed$?: Observable<unknown> } {
    if (this.afterClosed$) {
      throw new Error('There is open dialag');
    }
    this.afterClosed$ = new Subject();
    const componentRef = super.attachComponent(component, data);
    // tslint:disable-next-line: no-string-literal
    if (componentRef['afterClosed$'] !== undefined) {
      throw new Error('afterClosed$ property exists');
    }
    // tslint:disable-next-line: no-string-literal
    componentRef['afterClosed$'] = this.afterClosed$.asObservable();
    return componentRef;
  }

  close(result: any): void {
    this.removeComponent();
    this.afterClosed$.next(result);
    this.afterClosed$.complete();
    this.afterClosed$ = null;
  }

  isOpen(): boolean {
    return this.afterClosed$ !== null;
  }
}

import { Component, ChangeDetectionStrategy } from '@angular/core';

import { DomService } from './dom.service';
import { CdkDomService } from './cdk-dom.service';
import { CounterComponent } from './counter/counter.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'Dom Service';

  constructor(
    private domService: DomService,
    private cdkDomService: CdkDomService
  ) {}

  insertToBody(): void {
    this.domService.attachComponent(CounterComponent, { value: 3 });
    setTimeout(() => {
      this.domService.removeComponent();
    }, 5000);
  }

  insertToBodyCdk(): void {
    this.cdkDomService.attachComponent(CounterComponent, { value: 5 });
    setTimeout(() => {
      this.cdkDomService.removeComponent();
    }, 5000);
  }
}

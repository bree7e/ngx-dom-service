import { Component, ChangeDetectionStrategy } from '@angular/core';

import { DomService } from './dom.service';
import { CounterComponent } from './counter/counter.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'Dom Service';

  constructor(private domService: DomService) {}

  insertToBody(): void {
    this.domService.appendComponentToBody(CounterComponent);
  }
}

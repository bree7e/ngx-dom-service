import { Component, ChangeDetectionStrategy } from '@angular/core';

import { DomService } from './dom.service';
import { DialogService } from './dialog.service';
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
    private dialogService: DialogService
  ) {}

  insertToBody(): void {
    this.domService.attachComponent(CounterComponent, { value: 3 });
    setTimeout(() => {
      this.domService.removeComponent();
    }, 5000);
  }

  insertToBodyCdk(): void {
    this.dialogService
      .open(CounterComponent, { value: 3 })
      .afterClosed$.subscribe((r) => console.warn(r));
  }
}

import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnInit,
} from '@angular/core';
import { DialogService } from '../dialog.service';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterComponent implements OnInit {
  @Input()
  value = 0;

  constructor(private dialogService: DialogService) {}

  ngOnInit(): void {
    if (this.dialogService.isOpen()) {
      setTimeout(() => {
        this.dialogService.close(3);
      }, 2000);
    }
  }
}

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

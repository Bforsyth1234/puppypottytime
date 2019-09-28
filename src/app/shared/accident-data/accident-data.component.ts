import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-accident-data',
  templateUrl: './accident-data.component.html',
  styleUrls: ['./accident-data.component.scss'],
})
export class AccidentDataComponent implements OnInit {
  @Input() daysSinceLastAccident: number;

  constructor(
  ) { }

  ngOnInit() {
  }

}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.component.html',
  styleUrls: ['./add-record.component.scss'],
})
export class AddRecordComponent implements OnInit {
  @Output() addAccident = new EventEmitter();
  @Output() addSuccess = new EventEmitter();
  @Output() addFeedingTimer = new EventEmitter();
  @Output() setCrateTime = new EventEmitter();
  @Output() setBedTime = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  accident() {
    this.addAccident.emit();
  }

  success() {
    this.addSuccess.emit();
  }

  public feedingTime() {
    this.addFeedingTimer.emit();
  }

  public crateTime() {
    this.setCrateTime.emit();
  }

  bedTime() {
    this.setBedTime.emit();
  }

}

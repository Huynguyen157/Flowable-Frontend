import { Component, OnInit } from '@angular/core';

declare function greet(): void;
@Component({
  selector: 'flowableModeler',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Flowable-Frontend';
  window = window;

  ngOnInit(): void {}
}

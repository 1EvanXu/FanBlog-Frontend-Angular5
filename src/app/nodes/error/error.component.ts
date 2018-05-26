import { Component, OnInit } from '@angular/core';

@Component({
  template: `
    <p>
      error happens!
    </p>
  `,
  styles: []
})
export class ErrorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

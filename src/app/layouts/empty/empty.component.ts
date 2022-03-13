import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'empty-layout',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EmptyComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private _document: any) { }

  ngOnInit(): void {
  }

}

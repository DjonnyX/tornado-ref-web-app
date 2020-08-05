import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { IBreadCrumbsSegment, extractBreadCrumbsSegments } from '@app/utils/url-extractor.util';

@Component({
  selector: 'ta-bread-crumbs',
  templateUrl: './bread-crumbs.component.html',
  styleUrls: ['./bread-crumbs.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BreadCrumbsComponent implements OnInit {

  @Input() set path(v: string) {
    this.segments = extractBreadCrumbsSegments(v);
  }

  @Output() navigate = new EventEmitter<IBreadCrumbsSegment>();

  segments: Array<IBreadCrumbsSegment>;

  constructor() { }

  ngOnInit(): void { }

  onNavigateTo(segment: IBreadCrumbsSegment): void {
    this.navigate.emit(segment);
  }
}

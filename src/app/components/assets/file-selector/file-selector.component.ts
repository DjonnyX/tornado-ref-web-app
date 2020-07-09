import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
  exportAs: 'fileSelector',
  selector: 'ta-file-selector',
  templateUrl: './file-selector.component.html',
  styleUrls: ['./file-selector.component.scss']
})
export class FileSelectorComponent implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;

  @Input() allowedExtensions = Array<string>();

  @Output() select = new EventEmitter<File>();

  constructor() { }

  ngOnInit(): void { }

  open(): void {
    this.fileInput.nativeElement.click();
  }

  onFileChange($event: InputEvent) {
    const inputNode: HTMLInputElement = this.fileInput.nativeElement;
    if (inputNode.files.length > 0) {

      const file = inputNode.files[0];

      this.select.emit(file);
    }
  }
}

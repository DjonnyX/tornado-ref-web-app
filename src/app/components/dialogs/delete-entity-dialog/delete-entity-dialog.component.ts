import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LocalizationService } from '@app/services/localization/localization.service';

interface IDialogData {
  title: string;
  message: string;
  buttons?: {
    cancel?: {
      label: string;
    },
    confirm?: {
      label: string;
    },
  }
}

@Component({
  selector: 'ta-delete-entity-dialog',
  templateUrl: './delete-entity-dialog.component.html',
  styleUrls: ['./delete-entity-dialog.component.scss']
})
export class DeleteEntityDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IDialogData,
    public readonly localization: LocalizationService,
  ) { }

  ngOnInit(): void {

  }

}

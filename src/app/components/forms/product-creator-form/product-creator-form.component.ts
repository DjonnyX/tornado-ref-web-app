import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IProduct } from '@app/models/product.model';

@Component({
  selector: 'ta-product-creator-form',
  templateUrl: './product-creator-form.component.html',
  styleUrls: ['./product-creator-form.component.scss']
})
export class ProductCreatorFormComponent implements OnInit {

  form: FormGroup;

  ctrlName = new FormControl('', [Validators.required]);

  ctrlDescription = new FormControl('');

  ctrlTags = new FormControl('');

  private _product: IProduct;
  @Input() set product(product: IProduct) {
    if (product) {
      this._product = product;

      this.ctrlName.setValue(product.name);
      this.ctrlDescription.setValue(product.description);
      this.ctrlTags.setValue(product.tags);
    }
  }

  @Input() isEditMode: boolean;

  @Output() submit = new EventEmitter<IProduct>();

  @Output() cancel = new EventEmitter<void>();

  tagsList = [];

  constructor(private _fb: FormBuilder) {
    this.form = this._fb.group({
      name: this.ctrlName,
      description: this.ctrlDescription,
      tags: this.ctrlTags,
    })
  }

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.form.valid) {
      const product: IProduct = {
        id: !!this._product ? this._product.id : undefined,
        name: this.form.get('name').value,
        description: this.form.get('description').value,
        tags: this.form.get('tags').value,
        receipt: [],
      };
      this.submit.emit(product);
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}

import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { ProductsSelectors } from '@store/selectors';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { IProduct } from '@app/models/product.model';
import { ProductsActions } from '@store/actions/products.action';

@Component({
  selector: 'ta-product-creator-form',
  templateUrl: './product-creator-form.component.html',
  styleUrls: ['./product-creator-form.component.scss']
})
export class ProductCreatorFormComponent extends BaseComponent implements OnInit, OnDestroy {

  form: FormGroup;

  ctrlName = new FormControl('', [Validators.required]);

  ctrlDescription = new FormControl('');

  @Output() create = new EventEmitter<IProduct>();

  @Output() cancel = new EventEmitter<void>();

  constructor(private _fb: FormBuilder, private _store: Store<IAppState>) {
    super();

    this.form = this._fb.group({
      name: this.ctrlName,
      description: this.ctrlDescription,
    })
  }

  ngOnInit(): void {
    this._store.pipe(
      takeUntil(this.unsubscribe$),
      select(ProductsSelectors.selectNew),
    ).subscribe(product => {
      if (product) {
        this.ctrlName.setValue(product.name);
        this.ctrlDescription.setValue(product.description);
      }
    });
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  onSubmit(): void {
    if (this.form.valid) {
      const product: IProduct = {
        name: this.form.get('name').value,
        description: this.form.get('description').value,
        tags: [],
        receipt: [],
      };
      this.create.emit(product);
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}

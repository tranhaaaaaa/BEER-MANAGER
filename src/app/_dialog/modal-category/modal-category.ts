import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  ModalComponent,
  ModalHeaderComponent,
  ModalBodyComponent,
  ModalFooterComponent,
  ButtonDirective
} from '@coreui/angular';

import { Category } from '../../_models/db.model';
import { CategoryService } from '../../_services/category.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-category',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ModalComponent,
    ModalHeaderComponent,
    ModalBodyComponent
  ],
  templateUrl: './modal-category.html',
})
export class ModalCategory {

  visible = false;

  form: Category = new Category();

  @Input() type!: number;

  @Output() saveCategory = new EventEmitter();

  constructor(private categoryService: CategoryService,
    private toastService : ToastrService
  ) {}

  open(item?: Category) {

    if (item) {
      this.form = { ...item };
    } else {
      this.form = new Category();
      this.form.Type = this.type;
    }

    this.visible = true;
  }

  close() {
    this.visible = false;
  }

  save() {
    if (!this.form.Name) return;
    if(this.form.Id){
      this.categoryService.UpdateCategories(this.form,this.form.Id) .subscribe(() => {
        this.toastService.success("Cập nhật danh mục thành công!")
         this.saveCategory.emit();
      this.close();
      })
    }else{
      this.categoryService.CreateCategories(this.form).subscribe(() => {
        this.toastService.success("Tạo mới danh mục thành công!");
      this.saveCategory.emit();
      this.close();
    });
    }

  }

}
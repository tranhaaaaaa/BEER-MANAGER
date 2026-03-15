import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../_services/category.service';
// import { ModalCategory } from '../../_dialog/modal-category/modal-category';
import { Category as CategoryModel } from '../../_models/db.model';
import { ModalCategory } from '../../_dialog/modal-category/modal-category';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, ModalCategory],
  templateUrl: './category.html',
  styleUrl: './category.css',
})
export class Category implements OnInit {

  listCategory: CategoryModel[] = [];
  filteredCategory: CategoryModel[] = [];

  currentType = 1;

  @ViewChild(ModalCategory) modal!: ModalCategory;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.onGetData();
  }

  onGetData() {
    this.categoryService.getAllCategories().subscribe((data: any) => {
      this.listCategory = data.value || data;
      this.filterCategory();
    });
  }

  filterCategory() {
    this.filteredCategory = this.listCategory.filter(
      x => x.Type === this.currentType
    );
  }

  changeType(type: number) {
    this.currentType = type;
    this.filterCategory();
  }

  openAdd() {
    this.modal.open();
  }

  openEdit(item: CategoryModel) {
    this.modal.open(item);
  }

  onSave() {
    this.onGetData();
  }
}
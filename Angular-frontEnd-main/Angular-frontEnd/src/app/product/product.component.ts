import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {ProductService} from '../services/product.service';

@Component({
  selector: 'app-product',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{

  products : any;
  constructor(private productService : ProductService) {
  }
  ngOnInit(){
  this.getAllProducts();
  }

  getAllProducts(){
    this.products = this.productService.getAllProducts().subscribe({
      next : resp => {
        this.products = resp;
      },
      error : err => {
        console.log(err);
      }
    });
  }

  handleDelete(product: any) {
    let v = confirm('are you sure, you want to delete this product?');
    if(v== true){
      this.productService.deleteProduct(product).subscribe({
        next : resp =>{
          this.getAllProducts();
        },
        error : err =>{
          console.log(err);
        }
      });

    }
  }
}

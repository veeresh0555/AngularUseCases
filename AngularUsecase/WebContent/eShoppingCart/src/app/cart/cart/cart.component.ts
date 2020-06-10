import { Component, OnInit } from '@angular/core';
import { CartModelServer } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
  cartData: CartModelServer;
  cartTotal: number;
  subTotal: number;
  constructor(public cartService: CartService) {
  }

  ngOnInit() {
     this.cartService.cartDataObs$.subscribe(data => this.cartData = data);
     this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);
  }

  /**
   * 
   * @param id 
   * @param increaseQuantity 
   * 
   * This method should be update quantity when item added to the cart
   * 
   */

  changeQuantity(id: number, increaseQuantity: boolean) {
    this.cartService.updateCartData(id, increaseQuantity);
  }

}


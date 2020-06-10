import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartModelServer, CartModelPublic } from 'src/app/models/cart.model';
import { OrderService } from 'src/app/services/order.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  cartData:CartModelServer;
  cartTotal:Number;
  cartItems: { userEmail: string; totalProducts: any; OrderDate: Date; };
  totalProducts: Array<any>=[];
  serverURL = environment.serverURL;
  cartTotal$: any;
  private cartDataClient: CartModelPublic = {prodData: [{incart: 0, id: 0,name:"",image:"",description:""}], total: 0};  // This will be sent to the backend Server as post data
  constructor(private cartService:CartService,private spinner:NgxSpinnerService,private orderService:OrderService,private router:Router,private toast:ToastrService) { }

  ngOnInit(): void {
    this.cartService.cartDataObs$.subscribe(data => this.cartData = data);
    this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);
  }

  /**
   * @description: checkout from cart .
   * 
   */
  onCheckout() {
   
       for(let i=0;i<localStorage.length;i++)
       {
         let key = localStorage.key(i);
         
         if(key!=="email")
         {
           let value = localStorage.getItem(key);
           console.log(JSON.parse(value));
           console.log(value);
           let data  = JSON.parse(value);
          this.totalProducts.push(data.prodData);
         }
       }
       this.cartItems={
         userEmail:sessionStorage.getItem("email"),
         totalProducts:this.totalProducts,
         OrderDate:new Date()
       }
       /**
        * 
        */
          this.orderService.postData(`${this.serverURL}/orders`, this.cartItems).subscribe((response) => {
            console.log("After placing order:"+response);
            this.toast.success("Order has been placed successfully");
                this.router.navigate(['/thankyou']).then(p => {
                  this.cartDataClient = {prodData: [{incart: 0, id: 0,name:"",image:"",description:""}], total: 0};
                  this.cartTotal$.next(0);
                  localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
                });
          },
            (error) => {
              console.log(error);
            },
            () => {
      
            })
   }
   
  

}

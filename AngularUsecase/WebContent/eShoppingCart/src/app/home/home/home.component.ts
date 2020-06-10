import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { serverResponse, ProductModelServer } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { OrderService } from 'src/app/services/order.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products :any=[];
  buyselectedItem: { userEmail: string; totalProducts: number; OrderDate: Date; };
  serverURL = environment.serverURL;
  constructor(private productService: ProductService,
              private cartService: CartService,private orderService:OrderService,
              private router:Router,private toast:ToastrService) {
  }

  ngOnInit() {
    this.getAllProducts();
  }

  /**
   * @description getAllProducts function get all the product records from the backend
   */
  getAllProducts=()=>{
    this.productService.getAllproductList().subscribe((response)=>{
       console.log(response);
        this.products = response;
      });
  }


  /**
   * 
   * @param id 
   * @author
   * 
   * Add to cart
   * 
   */
  addProduct(id: number) {
    this.cartService.addProductToCart(id);
  }

  /**
   * 
   * @param productid 
   * Place an Order 
   * 
   */
  buyNow(productid:number){
    console.log("ProductID: "+productid);
    let sesmail=sessionStorage.getItem("email");
    if(sesmail===null){
      this.toast.error("Please Login And Buy Now");
      this.router.navigate(['/login']);  
    }else{
    this.productService.getSingleProduct(productid).subscribe((response)=>{
      this.products=response;
      console.log("This Products: "+JSON.stringify(this.products));
      this.buyselectedItem={
        userEmail:sessionStorage.getItem("email"),
        totalProducts:this.products,
        OrderDate:new Date()
      }
      this.orderService.postData(`${this.serverURL}/orders`, this.buyselectedItem).subscribe((response) => {
        this.toast.success("Thank You! Order has been Placed SuccessFully");
        this.router.navigate(['/thankyou']);
      },
          (error) => {
            console.log(error);
          },
          () => {
    
          })

    })
  }
  }
}

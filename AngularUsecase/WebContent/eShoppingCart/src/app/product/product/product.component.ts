import { Component, OnInit,  ViewChild } from '@angular/core';//AfterViewInit,
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import {ProductModelServer, serverResponse} from "src/app/models/product.model";
import {map} from "rxjs/operators";
import { ToastrService } from 'ngx-toastr';
import { OrderService } from 'src/app/services/order.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  id: number;
  product:ProductModelServer;
  thumbimages: any[] = [];
  products :any=[];
  serverURL = environment.serverURL;
  @ViewChild('quantity') quantityInput;//quantity
  loginSuccess: boolean=false;
  loginuser: string;
  buyselectedItem: { userEmail: string; totalProducts: any; OrderDate: Date; };//change this
  cartDataClient: { prodData: { incart: number; id: number; name: string; image: string; description: string; }[]; total: number; };
  cartTotal$: any;

  
  constructor( private route:ActivatedRoute,
    private productService:ProductService,private orderService:OrderService,
    private cartService:CartService,private toast: ToastrService,private router:Router
    ) { }
  ngOnInit(): void {  
    
    this.getAllProductList();
    

      }
      /**
       * @description getAllProductList function get all the products from product table
       */
      getAllProductList=()=>{
        this.productService.getAllproductList().subscribe((response)=>{
          console.log(response);
          this.products = response;
        });
      }

     


  /**
   * @param id
   * Add to the cart 
   */
  addToCart(id: number) {
    console.log("Enter addToCart");
    console.log("id: "+id);
    this.cartService.addProductToCart(id, this.quantityInput.nativeElement.value);
    console.log("quentity: "+this.quantityInput.nativeElement.value);
  }

  /**
   * @param productid 
   * 
   * Place an Order using this function
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
        this.toast.success("Thank You! Order Placed Succussfully");
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


  /**
   * Quantity Increase
   */
  increase=()=> {
    let value = parseInt(this.quantityInput.nativeElement.value);
    if (this.product.quantity >= 1){
      value++;

      if (value > this.product.quantity) {
        // @ts-ignore
        value = this.product.quantity;
      }
    } else {
      return;
    }

    this.quantityInput.nativeElement.value = value.toString();
  }
  /**
   * Quantity decrease
   */
  decrease=()=> {
    let value = parseInt(this.quantityInput.nativeElement.value);
    if (this.product.quantity > 0){
      value--;

      if (value <= 0) {
        // @ts-ignore
        value = 0;
      }
    } else {
      return;
    }
    this.quantityInput.nativeElement.value = value.toString();
  }

}

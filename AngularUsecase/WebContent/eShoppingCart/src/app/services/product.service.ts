import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {ProductModelServer, serverResponse} from "../models/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url:string=`${environment.serverURL}/products`;

  constructor(private http: HttpClient) {
    
  }
/**
 * 
 * @param limitOfResults 
 * 
 * @description get All Products with limitresult 10
 */
  getAllProducts(limitOfResults=10): Observable<serverResponse> {
    return this.http.get<serverResponse>(this.url , {
      params: {
        limit: limitOfResults.toString()
      }
    });
  }
  /**
   * @description get all products from products
   */
  getAllproductList = () => {
    console.log(this.url);
    return this.http.get(this.url);
  }
 
/**
 * 
 * @param id 
 * get product by Id 
 */
  getSingleProduct(id: Number): Observable<ProductModelServer> {
    return this.http.get<ProductModelServer>(this.url+ "?id=" + id);
  }

  /**
   * 
   * @param catName 
   * @description category wise get all products
   */
  getProductsFromCategory(catName: String): Observable<ProductModelServer[]> {
    return this.http.get<ProductModelServer[]>(this.url + '/products/category/' + catName);
  }

}

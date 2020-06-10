export interface ProductModelServer {
    id: number;
    pid:number;
    name: string;
    category: string;
    description: string;
    image: string;
    price: number;
    quantity: number;
    images: string;
  }
  
  
  export interface serverResponse  {
    quantity: number;
    count: number;
    products: ProductModelServer[]
  };
  
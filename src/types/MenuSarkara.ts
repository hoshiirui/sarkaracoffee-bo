export interface MenuSarkara {
  id: number;
  name: string;
  imageSrc: string;
  price: number;
  recPrior: number;
  menuType: string;
  categories: string[];
  productDetail: string;
  variants?: {
    name: string;
    add: number | 0;
  }[];
}

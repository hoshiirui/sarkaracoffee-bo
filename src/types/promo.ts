import { MenuSarkara } from "./MenuSarkara";

export interface Promo {
  id: string;
  created_at: string;
  title: string;
  description: string;
  date: string;
  category: string;
  minTrans?: number;
  menuB?: string[];
  caraP?: string;
  syaratK: string;
  discType?: string;
  discAmount?: number;
  imageHref: string;
}

export interface PromoWithMenu {
  id: string;
  created_at: string;
  title: string;
  description: string;
  date: string;
  category: string;
  minTrans?: number;
  menuB?: MenuSarkara[];
  caraP?: string;
  syaratK: string;
  discType?: string;
  discAmount?: number;
  imageHref: string;
}

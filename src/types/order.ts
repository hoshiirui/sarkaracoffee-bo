export type OrderHeader = {
  id: string;
  created_at: any;
  nama: string;
  status: string;
  idvoucher: string;
  catatan: string;
};

export type OrderDetail = {
  id: string;
  harga: number;
  created_at: any;
  idproduk: string;
  imagehref: string;
  jumlah: number;
  namaproduk: string;
  penyajian: string;
  varian: string;
  tipemenu: string;
  idheader: string;
};

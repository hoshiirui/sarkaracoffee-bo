export interface userData {
  id: string;
  nama: string;
  role: string;
  status: boolean;
  username: string;
  created_by: {
    id?: string;
    nama?: string;
  };
  created_at: string;
}

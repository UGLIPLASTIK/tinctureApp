export type Tincture = {
  id: string;
  name: string;
  actual_quantity: number;
  recommended_quantity: number;
  sector: Sector;
  compound?: [string, number][];
};

export type Sector = 'base' | 'bonus' | 'test' | 'guest';

export type AddTinctureBody = {
  sector: Sector;
  body: Omit<Tincture, 'id'>;
};

export type sortState = {
  isActive: boolean;
  state: 'ascending' | 'descending';
};

export type Role = 'admin' | 'user';

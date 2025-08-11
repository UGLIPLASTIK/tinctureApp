export type Tincture = {
  id: string;
  name: string;
  actual_quantity: number;
  recommended_quantity: number;
  sector: Sector;
  compound?: [string, number][];
};

export type Sector = 'base' | 'bonus' | 'test';

export type AddTinctureBody = {
  sector: Sector;
  body: Omit<Tincture, 'id'>;
};

export type DeleteTinctureBody = {
  sector: Sector;
  id: string;
};

export type EditTinctureBody = {
  sector: Sector;
  editItem: Tincture;
};

export type sortState = {
  isActive: boolean;
  state: 'ascending' | 'descending';
};

export interface Pet {
  id: string;
  name: string;
  isAdult: boolean;
}

export interface State {
  pets: Pet[];
  selectedPet: string | null;
}
export interface Hero {
  data: any;
  id: number;
  name: string;
  attributes: any;
}

export interface Relationships {
  id: any;
  data: any;
  meta: number;
  links: any;
}
export interface MediaRelation {
  data: any;
  attributes: any;
  relationships: any; /* All things of animes */
}

export class Heroes{
  data: Hero[];
  count: number;
}

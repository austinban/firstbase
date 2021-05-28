export interface Person {
  id: number;
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
}

export interface PersonQueryParams {
  id: string;
}

export interface EditPersonParams {
  id: string;
  payload: {
    title?: string;
    first?: string;
    last?: string;
    email?: string;
  };
}

export interface ModifyParams {
  variables: {
    id: number;
    payload: { title: string; first: string; last: string; email: string };
  };
}

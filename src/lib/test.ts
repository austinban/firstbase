import { Person } from "../lib/types";

export function getFakePerson(): Person {
  return {
    id: 0,
    name: {
      title: "Mr",
      first: "Austin",
      last: "Ban"
    },
    email: "austin@email.com"
  };
}

export function getFakePeople(): Person[] {
  return [
    getFakePerson(),
    {
      id: 1,
      name: {
        title: "Mrs",
        first: "Callie",
        last: "Ban"
      },
      email: "callie@email.com"
    },
    {
      id: 2,
      name: {
        title: "Miss",
        first: "Marigold",
        last: "Ban"
      },
      email: "marigold@email.com"
    }
  ];
}

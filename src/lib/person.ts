import { Person } from "../lib/types";

export function getFullName(person: Person) {
  const { name } = person;
  let fullName = `${name.first} ${name.last}`;
  if (name.title) fullName += ` (${name.title})`;

  return fullName;
}

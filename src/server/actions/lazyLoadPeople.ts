import { gql, useMutation, useLazyQuery } from "@apollo/client";
import { Person } from "../../lib/types";

interface PersonReturn {
  people: Person[];
}

interface Props {
  loadPeople: () => void;
  called: boolean;
  loading: boolean;
  data: PersonReturn;
}

export function LazyLoadPeople(): Props {
  const GET_PEOPLE = gql`
    query GetPeople {
      people {
        id
        name {
          title
          first
          last
        }
      }
    }
  `;

  const [loadPeople, { called, loading, data }] = useLazyQuery(GET_PEOPLE);

  return {
    loadPeople,
    called,
    loading,
    data
  };
}

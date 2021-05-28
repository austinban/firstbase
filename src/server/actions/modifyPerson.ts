import { gql, useMutation, ApolloError } from "@apollo/client";
import { Person, ModifyParams } from "../../lib/types";

interface Props {
  modify: (params: ModifyParams) => void;
  data: Person;
  mutationError?: ApolloError;
}

export function ModifyPerson(): Props {
  const MODIFY_USER = gql`
    mutation EditPerson($id: ID!, $payload: EditPerson) {
      editPerson(id: $id, payload: $payload) {
        id
        name {
          title
          first
          last
        }
      }
    }
  `;

  const [modify, { data, error: mutationError }] = useMutation(MODIFY_USER);

  return {
    modify,
    data,
    mutationError
  };
}

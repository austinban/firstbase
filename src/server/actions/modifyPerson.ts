import { gql, useMutation, ApolloError } from "@apollo/client";
import { Person, ModifyParams, SubmitModifyParams } from "../../lib/types";

interface Props {
  SubmitModify: (params: SubmitModifyParams) => void;
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

  const SubmitModify = (params: SubmitModifyParams) => {
    const { id, title, first, last, email } = params;

    modify({
      variables: { id: id, payload: { title, first, last, email } }
    });
  };

  return {
    SubmitModify,
    modify,
    data,
    mutationError
  };
}

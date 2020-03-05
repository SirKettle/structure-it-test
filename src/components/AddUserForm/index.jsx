import React, { useCallback, useMemo, useReducer, useRef } from 'react';
import styled from 'styled-components';
import { validate } from '../../state/domain/user/validation';
import { displayNames, petOptions } from '../../state/domain/user/constants';
import { Heading } from '../typography';
import { LOADING_STATUS } from '../../state/loadingStatus';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: left;
  max-width: 500px;
`;

const Fieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 0;
  border: none;
  outline: none;
`;

const Legend = styled(Heading)`
  align
`;

const FormField = styled.div`
  display: flex;
  margin: 1em;
  align-items: center;

  input,
  select {
    padding: 0.5em 1em;
    border: solid 1px #ddd;
    width: 100%;
    flex: 1 1 auto;
    display: block;
  }
`;

const Label = styled.label`
  display: block;
  flex: 0 0 40%;
  text-align: right;
  margin-right: 1em;
`;

const SubmitButton = styled.input`
  display: block;
  width: auto;
  align-self: center;
  justify-self: center;
  background: #00aadd;
  color: #fff;
  padding: 1em 2em;
  border-radius: 1em;
  border: none;

  &:disabled {
    opacity: 0.5;
  }
`;

const initialFormValues = {
  name: '',
  telephone: '',
  dateOfBirth: '',
  favouritePet: '',
};

const reducer = (state, { reset = false, name, value }) => {
  if (reset) {
    return initialFormValues;
  }
  return { ...state, [name]: value };
};

export const AddUserForm = ({ onAddUser, loadingStatus }) => {
  const [formValues, dispatchFormValues] = useReducer(reducer, initialFormValues);
  const favouritePetEl = useRef(null);

  const validation = useMemo(() => validate(formValues), [formValues]);
  const isValid = useMemo(() => Object.keys(validation).length === 0, [validation]);

  const onChange = ({ target: { name, value } }) => dispatchFormValues({ name, value });

  const resetFormValues = () => dispatchFormValues({ reset: true });

  const onSubmit = useCallback(
    e => {
      if (loadingStatus !== LOADING_STATUS.PENDING) {
        onAddUser(formValues);
        resetFormValues();
        favouritePetEl.current.focus();
      }
      e.preventDefault();
    },
    [formValues],
  );

  const { name, telephone, dateOfBirth, favouritePet } = formValues;

  return (
    <Form onSubmit={onSubmit}>
      <Fieldset>
        <Legend as="legend">New user form</Legend>
        <FormField>
          <Label htmlFor="favouritePet">{displayNames.favouritePet}</Label>
          <select id="favouritePet" name="favouritePet" value={favouritePet} onChange={onChange} ref={favouritePetEl}>
            <option label="Select a favourite pet" />
            {petOptions.map(pet => (
              <option key={pet} label={pet} value={pet} />
            ))}
          </select>
        </FormField>
        <FormField>
          <Label htmlFor="name">{displayNames.name}</Label>
          <input id="name" name="name" type="text" onChange={onChange} value={name} />
        </FormField>
        <FormField>
          <Label htmlFor="dateOfBirth">{displayNames.dateOfBirth}</Label>
          <input id="dateOfBirth" name="dateOfBirth" type="date" onChange={onChange} value={dateOfBirth} />
        </FormField>
        <FormField>
          <Label htmlFor="telephone">{displayNames.telephone}</Label>
          <input id="telephone" name="telephone" type="text" onChange={onChange} value={telephone} />
        </FormField>
      </Fieldset>
      <SubmitButton
        type="submit"
        value="Add new user"
        disabled={!isValid || loadingStatus === LOADING_STATUS.PENDING}
      />
    </Form>
  );
};

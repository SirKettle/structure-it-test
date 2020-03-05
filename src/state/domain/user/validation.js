import { any, isNil } from 'ramda';
const requiredFields = ['name', 'favouritePet'];

export const isValid = user => Object.keys(validate(user)).length === 0;

export const validate = user => {
  const validation = {};

  if (!user.name) {
    validation.name = 'Name is required';
  }

  if (!user.favouritePet) {
    validation.favouritePet = 'Pet is required';
  }

  return validation;
};

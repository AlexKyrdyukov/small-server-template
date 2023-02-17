import * as yup from 'yup';

const userId = yup.number().integer().positive();

const file = yup.string().required();

const fullName = yup.string()
  .trim()
  .max(25, 'please enter correctly name & last name')
  .test('is-full-name', 'Please enter both your first and last name', (value) => {
    const nameArray = value?.split(' ');
    return nameArray!.length >= 2;
  });

const requiredUserId = userId.required();
const requiredFullName = fullName.required('field fullname is required');

export default {
  file,
  userId,
  fullName,
  requiredUserId,
  requiredFullName,
};

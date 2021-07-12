import { createNode } from '../domHelper';
import { CommonProps, Component } from '../types';

interface Props extends CommonProps {}

const Form: Component<Props> = ({ className, children }) => {
  const $form = createNode(`<form></form>`, children);

  $form.className = className;

  return $form;
};

export default Form;

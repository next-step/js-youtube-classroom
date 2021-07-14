import { createNode } from '../domHelper';
import { CommonProps, Component } from '../types';

interface Props extends CommonProps {
  onSubmit?: EventListener;
}

const Form: Component<Props> = ({ className, children, onSubmit }) => {
  const $form = createNode(`<form></form>`, children);

  $form.className = className;
  if (onSubmit) $form.addEventListener('submit', onSubmit);

  return $form;
};

export default Form;

export interface Component<Props> {
  (props: Props): Element;
}

export interface CommonProps {
  className?: string;
  children?: Element[];
  textContent?: string;
  id?: string;
}

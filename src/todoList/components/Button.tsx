import { Icon, SemanticCOLORS, SemanticSIZES, SemanticICONS } from "semantic-ui-react";
import {Button} from "semantic-ui-react";

interface PropsShape {
  color: SemanticCOLORS,
  icon: SemanticICONS,
  text: string,
  size: SemanticSIZES,
  disabled?: boolean,
  onClick: () => any,
}

const ButtonWrapper = (props: PropsShape) => {
  const { color, icon, text, size, onClick, ...otherProps } = props;

  return (
    <Button onClick={onClick} animated color={color} size={size} {...otherProps}>
      <Button.Content visible>{text}</Button.Content>
      <Button.Content hidden>
        <Icon name={icon}></Icon>
      </Button.Content>
    </Button>
  )
}

export default ButtonWrapper;

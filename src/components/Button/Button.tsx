import "./Button.css";
interface ButtonProps {
  textButton: string;
  aditionalText?: string;
  onAction?: () => void;
  testId: string;
}

const Button: React.FC<ButtonProps> = ({
  textButton,
  aditionalText,
  testId,
  onAction,
}) => {
  return (
    <div className="buttonContainer">
      <button className="button" onClick={onAction} data-testid={testId}>
        {textButton}
      </button>
      <p className="aditionalText">{aditionalText}</p>
    </div>
  );
};

export default Button;

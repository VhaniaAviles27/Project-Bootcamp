import "./styleTitle.css";

type TitleProps = {
  title: string;
};

const Title: React.FC<TitleProps> = ({ title }) => {
  return (
    <div className="titleProperties">
      <h2 className="textTitle">{title}</h2>
      <hr className="separatorTitle" />
    </div>
  );
};
export default Title;

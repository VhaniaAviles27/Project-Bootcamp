import "../styles/styleCbo.css";

type CboProps = {
  subtitle: string;
  categories: string[]; // Asegúrate de definir el tipo para las categorías
};

const Cbo: React.FC<CboProps> = ({ subtitle, categories }) => {
  return (
    <div className="containerCbo">
      <label className="textCbo">{subtitle}</label>
      <select className="principalCbo">
        <option value="--Selecciona una opcion--" disabled>
          -- Selecciona una opción --
        </option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Cbo;

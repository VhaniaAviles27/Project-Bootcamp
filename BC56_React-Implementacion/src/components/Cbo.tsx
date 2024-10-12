import "../styles/styleCbo.css";

type CboProps = {
    subtitle: string;
};

const Cbo: React.FC<CboProps> = ({ subtitle }) => {
    return (
        <div className="containerCbo">
            <label className="textCbo">{subtitle}</label>
            <select className="principalCbo">
                <option value="" disabled>
                    -- Selecciona una opción --
                </option>
            </select>
        </div>
    );
};

export default Cbo;

import "../styles/styleCbo.css";

type Category = {
    slug: string;
    name: string;
    url: string;
};

type CboProps = {
    subtitle: string;
    categories: Category[];
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Cbo: React.FC<CboProps> = ({ subtitle, categories, onChange }) => {
    return (
        <div className="containerCbo">
            <label className="textCbo">{subtitle}</label>
            <select className="principalCbo" onChange={onChange}>
                <option value="--Selecciona una opcion--" disabled>
                    -- Selecciona una opción --
                </option>
                {categories.map((category) => (
                    <option key={category.slug} value={category.slug}>
                        {category.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Cbo;

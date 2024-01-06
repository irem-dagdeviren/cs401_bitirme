
const CategoryCard = ({ category, subcategories }) => (
    <div className="card">
        <div className="card-body">
            <h5 className="card-title">{category}</h5>
            <ul>
                {subcategories.map((subcategory, index) => (
                    <li key={index}>
                        <strong>Subcategory:</strong> {subcategory[0]}, <strong>Score:</strong> {subcategory[1]}
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

const TableAsCards = ({ data }) => (
    <div className="card-deck">
        {Object.keys(data).map((category) => (
            <CategoryCard
                key={category}
                category={category}
                subcategories={data[category]}
            />
        ))}
    </div>
);
export default TableAsCards;

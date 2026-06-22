import "./Filtering.css";

const CATEGORIES = ["All", "Technology", "Fashion", "Food", "Business"];

const Filtering = ({ filterCategory, setFilterCategory }) => {
  return (
    <div className="filtering-wrapper">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          className={`filter-btn ${filterCategory === cat ? "active" : ""}`}
          onClick={() => setFilterCategory(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default Filtering;

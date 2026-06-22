import "./Sorting.css";

const Sorting = ({ sortType, setSortType }) => {
  return (
    <div className="sorting-wrapper">
      <select
        className="sort-select"
        value={sortType}
        onChange={(e) => setSortType(e.target.value)}
      >
        <option value="">Sort By</option>
        <option value="az">A → Z</option>
        <option value="za">Z → A</option>
        <option value="oldest">Oldest First</option>
        <option value="category">Category</option>
      </select>
    </div>
  );
};

export default Sorting;

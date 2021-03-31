import { StarRating } from "shoto-ui";
import "./filterMenu.css";

export const FilterMenu = ({ brands }) => {
  return (
    <div className="container-filterMenu">
      {brands && (
        <div>
          <div className="filter-heading">Brands</div>
          <div>
            {brands.map((item) => (
              <input type="checkbox" />
            ))}
          </div>
        </div>
      )}

      <div>
        <div className="filter-heading">Price</div>
        <div>0 to 500</div>
        <div>500 to 1000</div>
        <div>1000 to 1500</div>
        <div>1500 to 2000</div>
      </div>

      <div>
        <div className="filter-heading">Avg. Customer Review</div>
        <div>
          <StarRating rating={4} /> and Up
        </div>
        <div>
          <StarRating rating={3} /> and Up
        </div>
        <div>
          <StarRating rating={2} /> and Up
        </div>
        <div>
          <StarRating rating={1} /> and Up
        </div>
      </div>
    </div>
  );
};

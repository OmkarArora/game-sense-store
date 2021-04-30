import { useState } from "react";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { FilterMenu } from "../FilterMenu/FilterMenu";
import "./filterPhone.css";

export const FilterPhone = ({
  brands,
  dispatch,
  ratingFilter,
  priceFilter,
}) => {
  const [isFilterOpen, setFilter] = useState(false);
  return (
    <div
      className="container-filterPhone"
      onClick={() => setFilter((prev) => !prev)}
    >
      <div className="heading">
        <span>FILTERS</span>
        {isFilterOpen ? (
          <span className="icon-arrow">
            <AiOutlineArrowDown />
          </span>
        ) : (
          <span className="icon-arrow">
            <AiOutlineArrowUp />
          </span>
        )}
      </div>
      {isFilterOpen && (
        <FilterMenu
          brands={brands}
          dispatch={(args) => dispatch(args)}
          ratingFilter={ratingFilter}
          priceFilter={priceFilter}
        />
      )}
    </div>
  );
};

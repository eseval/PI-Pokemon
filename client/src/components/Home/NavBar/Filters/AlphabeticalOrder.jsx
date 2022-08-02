import React from "react";
import { useDispatch } from "react-redux";
import { orderByName } from "../../../../actions";
import "./AlphabeticalOrder.css";

export default function AlphabeticalOrder() {
  const dispatch = useDispatch();

  function handleOnChange(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
  }

  return (
    <div>
      <div>Alphabetical Order</div>
      <select className='alphabetical-filter' onChange={(e) => handleOnChange(e)}>
        <option value="All">Default</option>
        <option value="Asc">Ascending</option>
        <option value="Desc">Descending</option>
      </select>
    </div>
  );
}

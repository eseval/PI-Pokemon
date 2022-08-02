import React from "react";
import { useDispatch } from "react-redux";
import { orderByAttack } from "../../../../actions";
import './ByAttack.css';

export default function ByAttack() {
  const dispatch = useDispatch();

  function handleOnChange(e) {
    e.preventDefault();
    dispatch(orderByAttack(e.target.value));
  }

  return (
    <div>
      <div>By Attack</div>
      <select className="byAttack-filter" onChange={(e) => handleOnChange(e)}>
        <option value="All">Default</option>
        <option value="Asc">Ascending</option>
        <option value="Desc">Descending</option>
      </select>
    </div>
  );
}

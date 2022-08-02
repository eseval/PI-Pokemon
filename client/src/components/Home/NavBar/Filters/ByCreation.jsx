import React from "react";
import { useDispatch } from "react-redux";
import { orderByCreation } from "../../../../actions";
import "./ByCreation.css";

export default function ByCreation() {

    const dispatch = useDispatch();

    function handleOnChange(e) {
        e.preventDefault()
        dispatch(orderByCreation(e.target.value))
    }

    return(
        <div>
            <div>By Creation</div>
            <select className="byCreation-filter" onChange={e => handleOnChange(e)}>
                <option value="all">All</option>
                <option value="api">API</option>
                <option value="bd">BD</option>
            </select>
        </div>
    )
}

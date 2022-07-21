import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";
// import pokeball from "./../../images/closed_pokeball.png";

export default function LandingPage() {
  return (
    <div>
      <div className="landing_background">
        <h1>
          Let's catch them all
          <Link to="/home">
            <button className="landing_start">Start</button>
          </Link>
          {/*{<a href="/home" className="landing_button">*/}
          {/*  <img src={pokeball} alt="create" width="60px" height="60px" />*/}
          {/*</a>}*/}
        </h1>
      </div>
    </div>
  );
}
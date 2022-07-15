import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div>
      <div>
        <h1>
          Let's catch them all
          <Link to="/home">
            <button>Start</button>
          </Link>
        </h1>
      </div>
    </div>
  );
}

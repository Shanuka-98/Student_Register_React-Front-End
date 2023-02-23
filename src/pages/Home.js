import React from "react";
import "../styles/Home.css";
import landBg from "../assets/land-image.png";

export default function Home() {
  return (
    <div className="Home">
      <div className="Lander">
        <h1 className="">Subjects Register Home</h1>
        <p className="text-muted">A simple subject register application</p>
        <img className="LandImg" src={landBg} alt="subjects" />
        <div className="btns">
          <a href="/add-student" className="btn btn-primary btn-lg">
            Register
          </a>
          <a href="/view-student" className="btn btn-secondary btn-lg">
            View
          </a>
        </div>
      </div>
    </div>
  );
}

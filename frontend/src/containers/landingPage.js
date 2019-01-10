import React, { Component } from "react";
import "./_landingpage.scss";

class LandingPage extends Component {
  render() {
    return (
      <div>
        <div className="page-wrap">
          <div className="contentbox">
            <h1>Welcome to DevProfiles </h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Quibusdam veniam, veritatis est blanditiis autem perferendis,
              asperiores odit explicabo ipsa eligendi. Veritatis tempora quos
              fuga fugiat impedit, cum blanditiis reiciendis unde.
            </p>

            <button className="btn btn--stripe">Let's Get Acquainted
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;

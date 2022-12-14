import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { policyListAPI } from "../../../redux/action/policy";
import { parseHtml } from "../../../Utils/utils";

function Recommendation() {
  return (
    <>
      <section class="cards terms" id="privacy-policy">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <h4>Recommendation</h4>
            </div>

            <div class="col-md-12 bg-light-orange box-radius service">
              <p></p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Recommendation;

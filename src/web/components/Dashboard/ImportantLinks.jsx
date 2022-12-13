import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { impListAPI } from "../../../redux/action/link";
import { parseHtml } from "../../../Utils/utils";

const ImportantLink = ({ impListAPI, linkData }) => {
  useEffect(() => {
    impListAPI();
  }, []);
  return (
    <>
      {/*====================== MANAGEMENT ================== */}
      <section className="management our-centers">
        <div className="container box-radius ">
          <div className="row">
            <div className="col-md-12 text-center">
              <h3 className="headline">
                Important <span className="text-blue">Links</span>
              </h3>
              <p className="sub-headline">Our world-class infrastructure is reaching into various cities. Find one of our institutes near you.</p>
            </div>
          </div>

          <div className="row g-4">
            {linkData &&
              linkData.data &&
              linkData.data.map((item, index) => (
                <div className="col-md-4">
                  <div className="card-address centres">
                    <h5>{item && item.name}</h5>
                    <div className="detail">
                      <ul>
                        <li>
                          <span></span>
                          <span>{item && item.url}</span>
                        </li>
                        <li>
                          <span></span>
                          <span></span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
      {/* =================== Management ends here ==================== */}
    </>
  );
};

const mapStateToProps = (state) => {
  const { LinkReducer } = state;
  const { linkData } = LinkReducer;
  return {
    linkData: LinkReducer.linkData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    impListAPI: () => dispatch(impListAPI()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImportantLink);

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { WebRoutes } from "../../../routes";
import { connect } from "react-redux";
import ContactUs from "../modal/ContactUs";
import { Form, Input } from "antd";

const Footer = ({ emailSubscriptionApi, categoryData }) => {
  const [openContact, setOpenContact] = useState(false);
  const [email, setEmail] = useState();

  const onFinish = () => {
    const data = { email: email };
    emailSubscriptionApi(data);
    setInterval(() => {
      window.location.reload(false);
    }, 1000 * 5);
  };

  const handleCategory = (id) => {
    localStorage.setItem("categorySelectedId", id);
  };

  const handleVision = (vision) => {
    localStorage.setItem("vision", vision);
  };

  return (
    <>
      <footer>
        <div className="container box-radius bg-light-orange footer">
          <div className="row">
            <div className="col-md-4">
              <div className="download-app">
                <a href="https://apps.apple.com/in/app/robomate-std-8-12-iit-neet-ca/id1133076165" target="_blank">
                  {" "}
                  <img src="../assets/imgs/app-store.svg" alt="app-store" />
                </a>
                <a href="https://play.google.com/store/apps/details?id=com.mteducare.mtrobomateplus" target="_blank">
                  {" "}
                  <img src="../assets/imgs/google-play.svg" alt="google-play" />{" "}
                </a>
              </div>

              <p>To Install Robomate+ at your Institution call 9987686444</p>

              <p>For Product Enquiries, call on our Toll-free Number 1800 2100 009</p>
            </div>

            <div className="col-md-4">
              <div className="footer-links">
                <ul>
                  {/* =================== COURSES LINKS STARTS HERE =====================*/}

                  <li>
                    <h5 className="mb-3">Categories</h5>
                  </li>

                  {categoryData &&
                    categoryData.data &&
                    categoryData.data.map((item) => (
                      <li onClick={(e) => handleCategory(item && item.id)}>
                        <Link to={WebRoutes.CATEGORY}>{item && item.name}</Link>
                      </li>
                    ))}

                  {/* ==================== COURSES LINKS ENDS HERE ======================== */}
                </ul>
                {/* ================  SUBSCRIPTION FORM ================ */}
                {/* <div className="subscription-form">
                  <Form
                    labelCol={{
                      span: 8,
                    }}
                    wrapperCol={{
                      span: 16,
                    }}
                    onFinish={onFinish}
                  >
                    <label for="subscribe">Subsribe Our News Letter</label>
                    <div>
                      <input type="email" id="subscribe" value={email} placeholder="example@mail.com" onChange={(e) => setEmail(e.target.value)} required />
                      <button type="submit">
                        <img src="../assets/imgs/button-submit.svg" alt="button-img" />
                      </button>
                    </div>
                  </Form>
                </div> */}

                {/* ================   SUBSCRIPTION FORM Ends ================ */}

                <ul>
                  {/* ====================== ABOUT US STARTS HERE  =========================== */}
                  <li>
                    <h5>About Us</h5>
                  </li>
                  <li>
                    <Link to={WebRoutes.CENTERS}>Objectives</Link>
                  </li>
                  <li>
                    <Link to={WebRoutes.ABOUT_US}>CA RoadMap</Link>
                  </li>

                  {/* ================= ABOUT US ENDS HERE ======================= */}
                </ul>
              </div>
            </div>

            <div className="col-md-4">
              <div className="footer-links">
                <ul>
                  {/*============================  INVESTOR RELATIONS STARTS HERE ============================= */}
                  <li>
                    <h5 className="mb-3">Contact Us</h5>
                  </li>
                  <li>
                    <Link to={WebRoutes.PHOTO_GALLARY}>Gallary</Link>
                  </li>
                  <li>
                    <Link to={WebRoutes.RESULTS}>Results</Link>
                  </li>
                  <li>
                    <Link to={WebRoutes.CENTERS}>Locations</Link>
                  </li>
                  <li>
                    <Link to={WebRoutes.IMPORTANT_LINKS}>Important Links</Link>
                  </li>
                  <li>
                    <Link to={WebRoutes.BLOG}>Blog</Link>
                  </li>
                  <li>
                    <Link to={WebRoutes.DEMO_VIDEO}>Demo VIdeos</Link>
                  </li>

                  {/* ================= INVESTOR RELATIONS ENDS HERE ====================== */}
                </ul>

                <ul>
                  {/*======================  SOCIAL LINKS STARTS HERE ====================== */}
                  <li>
                    <h5>&nbsp;</h5>
                  </li>
                  <li>
                    <Link to={WebRoutes.TERMS_SERVICE}>Term of Services</Link>
                  </li>
                  <li>
                    <Link to={WebRoutes.DISCLAIMER}>Disclaimer</Link>
                  </li>
                  <li>
                    <Link to={WebRoutes.PRIVACY_POLICY}>Privacy Policy</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {openContact ? <ContactUs openContact={openContact} handleCancel={(e) => setOpenContact(false)} /> : null}
    </>
  );
};

export default Footer;

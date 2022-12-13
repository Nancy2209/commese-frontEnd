import React, { useState } from "react";
import { Link } from "react-router-dom";
import Connect from "./Connect";
// import Courses from "./Courses";
import DemoVideos from "./Demo-vedios";
import Feedback from "./Feedback";
import Offerings from "./Offerings";
import TopperDetails from "./Toppers";
import WhyMtEducare from "./WhyMTEducare";
import OwlCarousel from "react-owl-carousel";
import Slider from "react-slick";
import { Form, Input, Select } from "antd";
import { connect } from "react-redux";
import { useEffect } from "react";
import { topperListAPI, categoryBaodStandardsListAPI, cityListAPI, AreaListAPI } from "../../../redux/action/home";
import { categoryListApi, categoryDetailsApi, defaultCategoryListApi } from "../../../redux/action/category";
import { WebRoutes } from "../../../routes";
import { parseHtml } from "../../../Utils/utils";
import { IMAGE_BASE_URL } from "../../../redux/constants";
import Blog from "./Blog";

const Dashboard = ({ categoryListApi, defaultCategoryListApi, categoryDetailsApi, topperListAPI, toppersData, categoryBaodStandardsListAPI, boardStandardsData, categoryData, cityListAPI, AreaListAPI, cityData, areaData, categoryDetailsData, defaultCategoryDetailsData }) => {
  // console.log(categoryData && categoryData.data && categoryData.data[0].id);
  const [categoryActive, setCategoryActive] = useState(0);

  const heroToppersConfig = {
    loop: false,
    autoplay: false,
    autoplayTimeout: 2000,
    // autoplaySpeed: 2000,
    margin: 0,
    dots: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 2,
      },
    },
  };

  const CoursesWeOfferConfig = {
    loop: false,
    autoplay: false,
    autoplayTimeout: 1000,
    margin: 0,
    dots: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3,
      },
    },
  };

  const homeHeroCarousel = {
    loop: false,
    items: 1,
    animateIn: "animate__zoomIn",
    animateOut: "animate__zoomOut",
    autoplayTimeout: 5000,
    autoplay: true,
  };

  const demoVideoConfig = {
    loop: false,
    autoplay: false,
    margin: 0,
    dots: true,
    autoplayTimeout: 4000,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3,
      },
    },
  };

  const [category, setCategory] = useState();
  const [boards, setBoards] = useState();
  const [standards, setStandards] = useState();
  const [city, setCity] = useState();
  const [area, setArea] = useState();
  const [indexData, setIndexData] = useState();

  useEffect(() => {
    topperListAPI();
    defaultCategoryListApi();
    // categoryListApi();
    cityListAPI();
  }, []);

  useEffect(() => {
    categoryBaodStandardsListAPI(category);
  }, [category]);

  useEffect(() => {
    if (city) {
      AreaListAPI(localStorage.getItem("cityId"));
    }
  }, [city]);

  const handleCityChange = (e) => {
    setCity(e.target.value);
    localStorage.setItem("cityId", city);
  };

  const onFinish = (event) => {
    const data = {
      city: city,
      area: area,
    };
    localStorage.setItem("centersearch", data);
  };

  const handleCategoryId = (id) => {
    localStorage.setItem("categorySelectedId", id);
    categoryDetailsApi(id);
  };
  useEffect(() => {
    categoryDetailsApi(categoryActive);
  }, [categoryActive]);

  return (
    <>
      {/* BANNER  */}
      <header>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div id="banner-main" className="carousel carousel-dark slide carousel-fade" data-bs-ride="carousel"></div>
              {/* -- banner ends here -- */}
              <div className="carousel-inner">
                {toppersData &&
                  toppersData.data &&
                  toppersData.data.map((item, index) => (
                    <div className="carousel-item banner bg-light-orange active" data-bs-interval="10000" key={index}>
                      <div className="row">
                        <div className="col-md-7 col-sm-12">
                          <div className="caption">
                            <h2>
                              <span className="text-blue">Tailored Courses</span> for Success in commerce.
                            </h2>
                            <p className="mt-3">Will you be the next star of MT Educare? Accomplish greatness and be a part of our legacy. Find your course now.</p>
                          </div>
                        </div>

                        <div className="col-md-5 col-sm-12 sub-slider">
                          <OwlCarousel className="owl-theme top-students top-students-a MT-OwlDots" {...heroToppersConfig}>
                            {toppersData &&
                              toppersData.data &&
                              toppersData.data.slice(0, 5).map((item1, index) => (
                                <div className="item" key={index}>
                                  <div className="students">
                                    <div className="detail">
                                      <div className="student text-center">
                                        {/* <img src="../assets/imgs/photo-student-a.png" alt="student" className="photograph" /> */}
                                        <img src={item1 && IMAGE_BASE_URL + "/" + item1.image} alt="student" className="photograph" />
                                        <h3 className="percentage text-blue mt-3">{item1 && item1.percentage}</h3>
                                        <p className="name mb-2">{item1 && item1.name}</p>
                                        <p className="rank-year">{item1 && parseHtml(item1.description.substring(0, 100))}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </OwlCarousel>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              <Form
                labelCol={{
                  span: 8,
                }}
                wrapperCol={{
                  span: 16,
                }}
              >
                <div className="floating-form in-banner">
                  <div className="form-controls">
                    <Form.Item label="Category" name="category" className="form-label" rules={[{ required: true, message: "Please select your category!" }]}>
                      <select name="course" className="form-controls w-100" id="course" value={category} onChange={(e) => setCategory(e.target.value)} required>
                        <option disabled selected hidden>
                          Select category
                        </option>
                        {categoryData && categoryData.data && categoryData.data.map((item) => <option value={item.id}>{item.name}</option>)}
                      </select>
                    </Form.Item>
                  </div>

                  <div className="form-controls">
                    <Form.Item label="Baord" name="board" className="form-label" rules={[{ required: true, message: "Please select your board!" }]}>
                      <select name="boards" className="form-controls w-100" id="boards" value={boards} onChange={(e) => setBoards(e.target.value)} required>
                        <option disabled selected hidden>
                          Select board
                        </option>
                        {boardStandardsData && boardStandardsData.data && boardStandardsData.data.map((item) => <option value={item.board_name}>{item.board_name}</option>)}
                      </select>
                    </Form.Item>
                  </div>

                  <div className="form-controls">
                    <Form.Item label="Standards" name="standards" className="form-label" rules={[{ required: true, message: "Please select your standard!" }]}>
                      <select name="standards" id="standards" className="form-controls w-100" value={standards} onChange={(e) => setStandards(e.target.value)} required>
                        <option disabled selected hidden>
                          Select Standards
                        </option>
                        {boardStandardsData && boardStandardsData.data && boardStandardsData.data.map((item) => <option value={item.id}>{item.name}</option>)}
                      </select>
                    </Form.Item>
                  </div>

                  <div className="form-controls">
                    <Form.Item label="City" name="city" className="form-label" rules={[{ required: true, message: "Please select your city!" }]}>
                      <select name="standards" id="standards" value={city} onChange={(e) => handleCityChange(e)} className="form-controls w-100" required>
                        <option disabled selected hidden>
                          Select city
                        </option>
                        {cityData && cityData.data && cityData.data.map((item) => <option value={item.id}>{item.name}</option>)}
                      </select>
                    </Form.Item>
                  </div>

                  <div className="form-controls">
                    <Form.Item label="Area" name="area" className="form-label" rules={[{ required: true, message: "Please select your area!" }]}>
                      <select name="area" id="area" className="form-controls w-100" value={area} onChange={(e) => setArea(e.target.value)} required>
                        <option disabled selected hidden>
                          Select city
                        </option>
                        {areaData && areaData.data && areaData.data.map((item) => <option value={item.id}>{item.name}</option>)}
                      </select>
                    </Form.Item>
                  </div>

                  <div className="form-controls">
                    <Link to={WebRoutes.CENTERS}>
                      <button className="btn btn-primary btn-submit" type="button" onClick={(e) => onFinish()}>
                        Submit
                      </button>
                    </Link>
                  </div>
                </div>

                {/* CATEGORIES */}
                <section className="cards" id="categories">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-12">
                        <h3 className="headline text-center mb-3">
                          <span className="text-blue">Categories</span> we offer
                        </h3>
                        <p className="sub-headline text-center">Our world class teaching techniques combined with a heterogeneity of top most courses all in one place. Register with MT Educare now.</p>
                      </div>
                    </div>
                    <div className="row">
                      {categoryData &&
                        categoryData.data &&
                        categoryData.data.map((item, index) => (
                          <div className="col-md-6">
                            <div className="mt-card bg-light-orange">
                              <h5>{item && item.name}</h5>
                              <p>{item && item.description} </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </section>

                {/* COURSES */}
                <section className="cards" id="courses">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-12 bg-light-blue box-radius">
                        <h3 className="headline text-center mb-3">
                          <span className="text-blue">Courses</span> we offer
                        </h3>
                        <p className="sub-headline text-center">Our world class teaching techniques combined with a heterogeneity of top most courses all in one place. Register with MT Educare now.</p>

                        <div className="article-header">
                          <ul className="nav nav-tabs MT_Tab" id="MT_Tab" role="tablist">
                            {categoryData &&
                              categoryData.data &&
                              categoryData.data.map((item, index) => (
                                <li className="nav-item" role="presentation">
                                  <button
                                    key={index}
                                    className={`${(item && item.id == categoryActive) || index === 0 ? "nav-link active" : `nav-link`}`}
                                    id={`Edu-tab-${categoryActive}`}
                                    data-bs-toggle="tab"
                                    data-bs-target={`#MT-tabPane-${categoryActive}`}
                                    type="button"
                                    role="tab"
                                    aria-controls={`MT-tabPane-${categoryActive}`}
                                    aria-selected="true"
                                    onClick={(e) => {
                                      setCategoryActive(item && item.id);
                                      handleCategoryId(item && item.id);
                                      setIndexData(index);
                                    }}
                                  >
                                    {item && item.name}
                                  </button>
                                </li>
                              ))}
                          </ul>
                          <div className="view-all">
                            <Link to={WebRoutes.CATEGORY}>View All</Link>
                          </div>
                        </div>

                        <div className="tab-content MT_TabContent" id="MT_TabContent">
                          {categoryActive ? (
                            <div className="tab-pane fade show active" id={`MT-tabPane-${categoryActive}`} role="tabpanel" aria-labelledby={`Edu-tab-${categoryActive}`} tabindex="0">
                              <OwlCarousel {...CoursesWeOfferConfig} className="owl-theme MT-OwlDots">
                                {categoryDetailsData &&
                                  categoryDetailsData.data &&
                                  categoryDetailsData.data.map((item, index) => (
                                    <div className="item" key={index}>
                                      <div className="articles our-courses">
                                        <div className="article">
                                          <div className="thumbnail">
                                            <img src={item && IMAGE_BASE_URL + "/" + item.image} alt="thumbnail" />
                                          </div>

                                          <div className="detail">
                                            <h5>{item && item.title}</h5>
                                            <div className="description">
                                              <p>{item && parseHtml(item.description.substring(0, 300))}</p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                              </OwlCarousel>
                            </div>
                          ) : (
                            <div className="tab-pane fade show active" id="MT-tabPane-0" role="tabpanel" aria-labelledby="Edu-tab-0" tabindex="0">
                              {/* <!-- explore-lakshya --> */}

                              <OwlCarousel {...CoursesWeOfferConfig} className="owl-theme MT-OwlDots">
                                {defaultCategoryDetailsData &&
                                  defaultCategoryDetailsData.data &&
                                  defaultCategoryDetailsData.data.map((item, index) => (
                                    <div className="item" key={index}>
                                      <div className="articles our-courses">
                                        <div className="article">
                                          <div className="thumbnail">
                                            <img src={item && IMAGE_BASE_URL + "/" + item.image} alt="thumbnail" />
                                          </div>

                                          <div className="detail">
                                            <h5>{item && item.title}</h5>
                                            <div className="description">
                                              <p>{item && parseHtml(item.description.substring(0, 300))}</p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                              </OwlCarousel>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                {/* TOPPER DETAILS */}
                <TopperDetails toppersData={toppersData} />

                {/* WHY MT EDUCARE? */}
                <WhyMtEducare />

                <section>
                  <div className="container records">
                    <div className="row bg-light-blue box-radius">
                      <div className="col-md-4 ">
                        <h3 className="achivements">
                          <span className="text-orange">We have been instrumental in creating State Toppers every year.</span>
                        </h3>
                      </div>

                      <div className="col-md-4">
                        <div className="record-grid">
                          <div className="students row-span bg-g-blue">
                            {/* <span className="record">{achivementsData && achivementsData.data && achivementsData.data.student_ratio}</span> */}
                            <span className="label">Average Student Result</span>
                          </div>
                        </div>
                        {/* RECORDS ENDS HERE */}
                      </div>

                      {/* APP LINK TO DOWNLOAD */}
                      <div className="col-md-4">
                        <h4>Robomate+ is now Available Download it for Free</h4>
                        <div className="download-app">
                          <a href="https://apps.apple.com/in/app/robomate-std-8-12-iit-neet-ca/id1133076165" target="_blank">
                            <img src="../assets/imgs/app-store.svg" alt="App Store" />
                          </a>

                          <a href="https://play.google.com/store/apps/details?id=com.mteducare.mtrobomateplus" target="_blank">
                            <img src="../assets/imgs/google-play.svg" alt="Google Play" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* DEMO VIDEOS */}
                <DemoVideos />

                {/* <Blog /> */}

                <Feedback />

                <Connect />

                {/* -- floating-form -- */}
                <div className="shadow"></div>
              </Form>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

const mapStateToProps = (state) => {
  const { DemoVideoReducer, HomeReducer, CategoryReducer } = state;
  const { toppersData, cityData, areaData } = HomeReducer;
  const { categoryData, categoryDetailsData, defaultCategoryDetailsData } = CategoryReducer;
  return {
    toppersData: HomeReducer.toppersData,
    // achivementsData: HomeReducer.achivementsData,
    boardStandardsData: HomeReducer.boardStandardsData,
    cityData: HomeReducer.cityData,
    areaData: HomeReducer.areaData,
    categoryData: CategoryReducer.categoryData,
    categoryDetailsData: CategoryReducer.categoryDetailsData,
    defaultCategoryDetailsData: CategoryReducer.defaultCategoryDetailsData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    topperListAPI: () => dispatch(topperListAPI()),
    // achivementListAPI: () => dispatch(achivementListAPI()),
    categoryBaodStandardsListAPI: (data) => dispatch(categoryBaodStandardsListAPI(data)),
    categoryListApi: () => dispatch(categoryListApi()),
    cityListAPI: () => dispatch(cityListAPI()),
    defaultCategoryListApi: () => dispatch(defaultCategoryListApi()),
    AreaListAPI: (data) => dispatch(AreaListAPI(data)),
    categoryDetailsApi: (data) => dispatch(categoryDetailsApi(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

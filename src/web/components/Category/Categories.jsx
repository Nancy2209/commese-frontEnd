import React, { useState } from "react";
import { Link } from "react-router-dom";
import DemoVideos from "../Dashboard/Demo-vedios";
import Feedback from "../Dashboard/Feedback";
import TopperDetails from "../Dashboard/Toppers";
import { connect } from "react-redux";
import OwlCarousel from "react-owl-carousel";
import { demoVideoListApi, demoVideoDetailApi } from "../../../redux/action/demoVideo";
import { useEffect } from "react";
import { topperListAPI, categoryBaodStandardsListAPI, cityListAPI, AreaListAPI } from "../../../redux/action/home";
import { categoryListApi, categoryDetailsApi, courseSearchDetailAPI, couponListAPI, recommendationListApi, recommendationDetailApi } from "../../../redux/action/category";
import Connect from "../Dashboard/Connect";
import { parseHtml } from "../../../Utils/utils";
import { IMAGE_BASE_URL } from "../../../redux/constants";
import Recommendation from "./Recommendation";

const Category = ({ categoryListApi, categoryDetailsApi, categoryDetailsData, demoVideoListApi, topperListAPI, toppersData, categoryData, cityListAPI, courseSearchDetailAPI, courseSearchDetailsData, couponListAPI, couponData }) => {
  const [categoryActive, setCategoryActive] = useState(localStorage.getItem("categorySelectedId"));
  const [courseSearch, setCourseSearch] = useState(courseSearchDetailsData);
  const [search, setSearch] = useState();
  const [indexData, setIndexData] = useState(0);

  useEffect(() => {
    couponListAPI();
    demoVideoListApi();
    topperListAPI();
    categoryListApi();
    cityListAPI();

    categoryDetailsApi(localStorage.getItem("categorySelectedId"));
  }, []);
  const handleCategoryId = (id) => {
    localStorage.setItem("categorySelectedId", id);
    categoryDetailsApi(id);
  };
  useEffect(() => {
    categoryDetailsApi(categoryActive);
  }, [categoryActive]);

  const handleSearch = (e) => {
    if (e) {
      const data = { search: e };
      courseSearchDetailAPI(data);
    } else {
      setCourseSearch("");
    }
  };

  console.log(couponData.data && couponData.data);
  return (
    <>
      <section className="cards" id="courses">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="jumbotron bg-light-orange">
                <div className="row">
                  <div className="col-md-8">
                    <h2>
                      <span className="text-blue">{couponData.data && couponData.data.coupon_code}</span>
                      <br />
                      for Every Student
                    </h2>

                    <>
                      <h1>{couponData.data && couponData.data.coupon_code}</h1>
                    </>
                  </div>
                </div>
              </div>
              <h3 className="headline text-center mb-3">
                <span className="text-blue">All</span> Courses
              </h3>
              <p className="sub-headline text-center">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>

              <div className="article-header with-search">
                <ul className="nav nav-tabs MT_Tab" id="MT_Tab" role="tablist">
                  {categoryData &&
                    categoryData.data &&
                    categoryData.data.map((item, index) => (
                      <li className="nav-item" role="presentation">
                        <button
                          className={`${item && item.id == categoryActive ? "nav-link active" : "nav-link"}`}
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
              </div>

              <div className="tab-content MT_TabContent" id="MT_TabContent">
                <div className="tab-pane fade show active" id="MT-tabPane-1" role="tabpanel" aria-labelledby="Edu-tab-1" tabindex="0">
                  {/* <!-- explore-lakshya --> */}
                  <OwlCarousel>
                    {courseSearch && courseSearchDetailsData.data ? (
                      <>
                        {courseSearchDetailsData &&
                          courseSearchDetailsData.data &&
                          courseSearchDetailsData.data.map((item) => (
                            <div className="item">
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
                                    {/* <div className="tag-link">
                                      <div className="tag">{item.tag_name}</div>
                                    </div> */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                      </>
                    ) : (
                      <>
                        {categoryDetailsData &&
                          categoryDetailsData.data &&
                          categoryDetailsData.data.map((item) => (
                            <div className="item">
                              <div className="articles our-courses">
                                <div className="article">
                                  <div className="thumbnail">
                                    <img src={item && IMAGE_BASE_URL + "/" + item.image} alt="thumbnail" />
                                  </div>

                                  <div className="detail">
                                    <h5>{item && item.title}</h5>
                                    <div className="description">
                                      {" "}
                                      <p>{item && parseHtml(item.description.substring(0, 300))} </p>{" "}
                                    </div>
                                    {/* <div className="tag-link">
                                      <div className="tag">{item.tag_name}</div>
                                    </div> */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                      </>
                    )}
                  </OwlCarousel>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================== DEMO VIDEO SECTION ENDS =================*/}

      {/* ======================== OUR TOPPERS STARTS =================== */}
      <TopperDetails toppersData={toppersData} />
      {/* ================ OUR TOPPERS ENDS ======================= */}

      {/* =========================== CONNECT SECTION STARTS HERE =============*/}
      {/* =========================== CONNECT SECTION ENDS HERE ================ */}
      <Recommendation />
      <Connect />
    </>
  );
};

const mapStateToProps = (state) => {
  const { DemoVideoReducer, HomeReducer, CategoryReducer } = state;
  const { demoListData, videoDetailData } = DemoVideoReducer;
  const { toppersData, cityData, areaData } = HomeReducer;
  const { categoryData, categoryDetailsData, courseSearchDetailsData, couponData } = CategoryReducer;
  return {
    couponData: CategoryReducer.couponData,
    demoListData: DemoVideoReducer.demoListData,
    videoDetailData: DemoVideoReducer.videoDetailData,
    toppersData: HomeReducer.toppersData,
    boardStandardsData: HomeReducer.boardStandardsData,
    cityData: HomeReducer.cityData,
    areaData: HomeReducer.areaData,
    categoryData: CategoryReducer.categoryData,
    categoryDetailsData: CategoryReducer.categoryDetailsData,
    courseSearchDetailsData: CategoryReducer.courseSearchDetailsData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    couponListAPI: () => dispatch(couponListAPI()),
    demoVideoListApi: () => dispatch(demoVideoListApi()),
    topperListAPI: () => dispatch(topperListAPI()),
    demoVideoDetailApi: (data) => dispatch(demoVideoDetailApi(data)),
    categoryBaodStandardsListAPI: (data) => dispatch(categoryBaodStandardsListAPI(data)),
    categoryListApi: () => dispatch(categoryListApi()),
    cityListAPI: () => dispatch(cityListAPI()),
    AreaListAPI: (data) => dispatch(AreaListAPI(data)),
    categoryDetailsApi: (data) => dispatch(categoryDetailsApi(data)),
    courseSearchDetailAPI: (data) => dispatch(courseSearchDetailAPI(data)),
    // couponListAPI: () => dispatch(couponListAPI()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);

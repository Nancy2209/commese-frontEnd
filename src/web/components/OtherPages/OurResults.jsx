import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import VideoCard from "../Cards/VideoCard";
import OwlCarousel from "react-owl-carousel";
import { connect } from "react-redux";
import { resultListApi, resultDetailApi, defaultResultListApi } from "../../../redux/action/result";
import { parseHtml } from "../../../Utils/utils";

const OurResults = ({ resultListApi, resultListData, resultDetailApi, resultDetailData, defaultResultDetailData, defaultResultListApi }) => {
  const [activeTab, setActiveTab] = useState(resultListData && resultListData.data && resultListData.data[0] && resultListData.data[0].id);
  const [activeTabDetail, setActiveTabDetail] = useState();
  useEffect(() => {
    resultListApi();
    defaultResultListApi();
  }, []);
  useEffect(() => {
    resultDetailApi(resultListData && resultListData.data && resultListData.data[0] && resultListData.data[0].id);
  }, [resultListData]);
  useEffect(() => {
    resultDetailApi(activeTabDetail);
  }, [activeTabDetail]);

  const resultConfig = {
    loop: false,
    autoplay: true,
    autoplayTimeout: 2000,
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

  const apiHit = () => {
    resultDetailApi(activeTabDetail);
  };
  return (
    <>
      <section className="cards" id="demo-videos">
        <div className="container">
          <div className="row">
            <div className="col-md-12 box-radius">
              <h3 className="headline text-center mb-3">
                <span className="text-blue">Our Results</span>
              </h3>
              <p className="sub-headline text-center">Take a look at some of our demo sessions to get an idea for what we stand for in educating our student.</p>
            </div>

            <div className="col-md-12">
              <div className="row">
                <div className="col-md-12 pills">
                  <ul className="nav nav-tabs MT_Tab" id="MT_Tab" role="tablist">
                    {resultListData &&
                      resultListData.data &&
                      resultListData.data.map((item, index) => (
                        <li className="nav-item" role="presentation">
                          <button
                            className={`${(item && item.id == activeTab) || index === 0 ? "nav-link active" : `nav-link`}`}
                            id={`Edu-tab-${activeTab}`}
                            data-bs-toggle="tab"
                            data-bs-target={`#MT-tabPane-${activeTab}`}
                            type="button"
                            role="tab"
                            aria-controls={`MT-tabPane-${activeTab}`}
                            aria-selected="true"
                            onClick={() => {
                              setActiveTab(item && item.id);
                              setActiveTabDetail(item && item.category_id);
                              apiHit();
                            }}
                          >
                            {item && item.category && item.category.name}
                          </button>
                        </li>
                      ))}
                  </ul>
                </div>
                <div className="tab-content " id="MT_TabContent">
                  {activeTab ? (
                    <div className="tab-pane fade show active" id={`MT-tabPane-${activeTab}`} role="tabpanel" aria-labelledby={`Edu-tab-${activeTab}`} tabindex="0">
                      {/* <!-- explore-lakshya --> */}

                      <OwlCarousel className="owl-theme MT-OwlDots" {...resultConfig}>
                        {resultDetailData &&
                          resultDetailData.data &&
                          resultDetailData.data.map((item, index) => (
                            <div className="item">
                              <div className="articles">
                                <div className="article">
                                  <div className="thumbnail"></div>

                                  <div className="detail">
                                    <h5>{item && item.result_tag}</h5>

                                    <div className="tag-link flex-none">
                                      <div className="tag blue bg-light-blue">{item && item.name}</div>
                                      <div className="tag blue bg-light-blue">{item && item.year}</div>
                                      {/* <div className="tag bg-light-orange">{item && item.subject_tag}</div> */}
                                      {/* <div className="tag bg-light-orange">{item && item.standard_tag}</div> */}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                      </OwlCarousel>
                    </div>
                  ) : (
                    <div className="tab-pane fade show active" id={`MT-tabPane-${activeTab}`} role="tabpanel" aria-labelledby={`Edu-tab-${activeTab}`} tabindex="0">
                      {/* <!-- explore-lakshya --> */}

                      <OwlCarousel className="owl-theme MT-OwlDots" {...resultConfig}>
                        {defaultResultDetailData &&
                          defaultResultDetailData.data &&
                          defaultResultDetailData.data.map((item, index) => (
                            <div className="item">
                              <div className="articles">
                                <div className="article">
                                  <div className="thumbnail"></div>

                                  <div className="detail">
                                    <h5>{item && item.result_tag}</h5>
                                    <div className="description"></div>
                                    <div className="tag-link flex-none"></div>
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
        </div>
      </section>
    </>
  );
};
const mapStateToProps = (state) => {
  const { ResultReducer } = state;
  // const { blogListData, blogDetailData, defaultBlogDetailData } = BlogReducer;
  return {
    resultListData: ResultReducer.resultListData,
    resultDetailData: ResultReducer.resultDetailData,
    defaultResultDetailData: ResultReducer.defaultResultDetailData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resultListApi: () => dispatch(resultListApi()),
    defaultResultListApi: () => dispatch(defaultResultListApi()),
    resultDetailApi: (data) => dispatch(resultDetailApi(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OurResults);

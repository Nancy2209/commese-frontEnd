import React, { useState } from "react";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import VideoCard from "../Cards/VideoCard";
import OwlCarousel from "react-owl-carousel";
import { connect } from "react-redux";
import { recommendationListApi, recommendationDetailApi } from "../../../redux/action/category";
import { parseHtml } from "../../../Utils/utils";

const Recommendation = ({ recommendationListApi, recommendationData, recommendationDetailApi, recommendationDetailData }) => {
  const [activeTab, setActiveTab] = useState(recommendationData && recommendationData.data && recommendationData.data[0] && recommendationData.data[0].id);
  const [activeTabDetail, setActiveTabDetail] = useState();
  useEffect(() => {
    recommendationListApi();
  }, []);
  useEffect(() => {
    recommendationDetailApi(recommendationData && recommendationData.data && recommendationData.data[0] && recommendationData.data[0].id);
  }, [recommendationData]);
  useEffect(() => {
    recommendationDetailApi(activeTabDetail);
  }, [activeTabDetail]);

  const recommendationConfig = {
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
    recommendationDetailApi(activeTabDetail);
    console.log(recommendationData);
  };
  return (
    <>
      <section className="cards" id="demo-videos">
        <div className="container">
          <div className="row">
            <div className="col-md-12 box-radius">
              <h3 className="headline text-center mb-3"></h3>
            </div>
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-12 pills">
                  <ul className="nav nav-tabs MT_Tab" id="MT_Tab" role="tablist">
                    {recommendationData &&
                      recommendationData.data &&
                      recommendationData.data.map((item, index) => (
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

                      <OwlCarousel className="owl-theme MT-OwlDots" {...recommendationConfig}>
                        {recommendationDetailData &&
                          recommendationDetailData.data &&
                          recommendationDetailData.data.map((item, index) => (
                            <div className="item">
                              <div className="articles">
                                <div className="article">
                                  <div className="thumbnail"></div>

                                  <div className="detail">
                                    <h5>{item && item.title}</h5>
                                    <div className="description">
                                      <p>{item && parseHtml(item.description.substring(0, 300))}</p>
                                    </div>
                                    <div className="tag-link flex-none">
                                      <div className="tag blue bg-light-blue">{item && item.title}</div>
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
  const { CategoryReducer } = state;
  const { recommendationData, recommendationDetailData } = CategoryReducer;
  return {
    recommendationData: CategoryReducer.recommendationData,
    recommendationDetailData: CategoryReducer.recommendationDetailData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    recommendationListApi: () => dispatch(recommendationListApi()),
    recommendationDetailApi: (data) => dispatch(recommendationDetailApi(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Recommendation);

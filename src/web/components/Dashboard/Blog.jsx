import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import VideoCard from "../Cards/VideoCard";
import OwlCarousel from "react-owl-carousel";
import { connect } from "react-redux";
import { blogListApi, blogDetailApi, defaultBlogListApi } from "../../../redux/action/blog";
import { parseHtml } from "../../../Utils/utils";

const Blog = ({ blogListApi, blogListData, blogDetailApi, blogDetailData, defaultBlogDetailData, defaultBlogListApi }) => {
  const [activeTab, setActiveTab] = useState(blogListData && blogListData.data && blogListData.data[0] && blogListData.data[0].id);
  const [activeTabDetail, setActiveTabDetail] = useState();
  console.log(blogDetailData);
  useEffect(() => {
    blogListApi();
    defaultBlogListApi();
  }, []);
  useEffect(() => {
    blogDetailApi(blogListData && blogListData.data && blogListData.data[0] && blogListData.data[0].id);
  }, [blogListData]);
  useEffect(() => {
    blogDetailApi(activeTabDetail);
  }, [activeTabDetail]);

  const blogConfig = {
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
    blogDetailApi(activeTabDetail);
  };
  return (
    <>
      <section className="cards" id="demo-videos">
        <div className="container">
          <div className="row">
            <div className="col-md-12 box-radius">
              <h3 className="headline text-center mb-3">
                our <span className="text-blue">Blogs</span>
              </h3>
              <p className="sub-headline text-center">Take a look at some of our demo sessions to get an idea for what we stand for in educating our student.</p>
            </div>

            <div className="col-md-12">
              <div className="row">
                <div className="col-md-12 pills">
                  <ul className="nav nav-tabs MT_Tab" id="MT_Tab" role="tablist">
                    {blogListData &&
                      blogListData.data &&
                      blogListData.data.map((item, index) => (
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

                      <OwlCarousel className="owl-theme MT-OwlDots" {...blogConfig}>
                        {blogDetailData &&
                          blogDetailData.data &&
                          blogDetailData.data.map((item, index) => (
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

                      <OwlCarousel className="owl-theme MT-OwlDots" {...blogConfig}>
                        {defaultBlogDetailData &&
                          defaultBlogDetailData.data &&
                          defaultBlogDetailData.data.map((item, index) => (
                            <div className="item">
                              <div className="articles">
                                <div className="article">
                                  <div className="thumbnail"></div>

                                  <div className="detail">
                                    <h5>{item && item.title}</h5>
                                    <div className="description">
                                      <p>{item && parseHtml(item.description.substring(0, 300))}</p>
                                    </div>
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
  const { BlogReducer } = state;
  // const { blogListData, blogDetailData, defaultBlogDetailData } = BlogReducer;
  return {
    blogListData: BlogReducer.blogListData,
    blogDetailData: BlogReducer.blogDetailData,
    defaultBlogDetailData: BlogReducer.defaultBlogDetailData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    blogListApi: () => dispatch(blogListApi()),
    defaultBlogListApi: () => dispatch(defaultBlogListApi()),
    blogDetailApi: (data) => dispatch(blogDetailApi(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Blog);

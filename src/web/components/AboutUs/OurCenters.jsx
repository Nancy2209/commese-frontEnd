import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Input, Select } from "antd";
import { categoryBaodStandardsListAPI, cityListAPI, AreaListAPI } from "../../../redux/action/home";
import { categoryListApi } from "../../../redux/action/category";
import { centerListAPI, centerSearchAPI } from "../../../redux/action/aboutUs";
import { parseHtml } from "../../../Utils/utils";
import { WebRoutes } from "../../../routes";
import Connect from "../Dashboard/Connect";

const Center = ({ categoryListApi, categoryBaodStandardsListAPI, boardStandardsData, categoryData, cityListAPI, AreaListAPI, cityData, areaData, centerListAPI, centersData, centerSearchAPI, centerSearchData }) => {
  const searchData = localStorage.getItem("centersearch");
  const [category, setCategory] = useState();
  const [boards, setBoards] = useState();
  const [standards, setStandards] = useState();
  const [city, setCity] = useState();
  const [area, setArea] = useState();
  useEffect(() => {
    centerListAPI();
    categoryListApi();
    cityListAPI();
  }, []);

  useEffect(() => {
    if (searchData) {
      centerSearchAPI(searchData);
      centersData = centerSearchData;
    }
  }, [searchData]);

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
    centerSearchAPI(data);
  };

  return (
    <>
      {/*====================== MANAGEMENT ================== */}
      <section className="management our-centers">
        <div className="container box-radius ">
          <div className="row">
            <div className="col-md-12 text-center">
              <h3 className="headline">
                Our <span className="text-blue">centers</span>
              </h3>
              <p className="sub-headline">Our world-class infrastructure is reaching into various cities. Find one of our institutes near you.</p>
            </div>
          </div>

          <div className="row g-4">
            {centerSearchData && centerSearchData.data ? (
              <>
                {centerSearchData &&
                  centerSearchData.data &&
                  centerSearchData.data.map((item) => (
                    <div className="col-md-4">
                      <div className="card-address centres">
                        <h5>{item.name}</h5>
                        <div className="detail">
                          <ul>
                            <li>
                              <span>
                                <img src="../assets/imgs/icon-phone.svg" alt="icon" />
                              </span>
                              <span>Ph : {item.mobile}</span>
                            </li>
                            <li>
                              <span>
                                <img src="../assets/imgs/icon-location-pin.svg" alt="icon" />
                              </span>
                              <span>
                                {item.address},{item.address1},{item.city ? item.city.name : ""},{item.state ? item.state.name : ""}
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
              </>
            ) : (
              <>
                {centersData.data &&
                  centersData.data &&
                  centersData.data.map((item) => (
                    <div className="col-md-4">
                      <div className="card-address centres">
                        <h5>{item.name}</h5>
                        <div className="detail">
                          <ul>
                            <li>
                              <span>
                                <img src="../assets/imgs/icon-phone.svg" alt="icon" />
                              </span>
                              <span>Ph: {item.mobile} </span>
                            </li>

                            <li>
                              <span>
                                <img src="../assets/imgs/icon-location-pin.svg" alt="icon" />
                              </span>
                              <span>
                                {item.address},{item.address1},{item.city ? item.city.name : ""},{item.state ? item.state.name : ""}
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
              </>
            )}
          </div>
        </div>
      </section>
      {/* =================== Management ends here ==================== */}
    </>
  );
};

const mapStateToProps = (state) => {
  const { AboutReducer, HomeReducer, CategoryReducer } = state;
  const { centersData, centerSearchData } = AboutReducer;
  return {
    centersData: AboutReducer.centersData,
    centerSearchData: AboutReducer.centerSearchData,
    boardStandardsData: HomeReducer.boardStandardsData,
    cityData: HomeReducer.cityData,
    areaData: HomeReducer.areaData,
    categoryData: CategoryReducer.categoryData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    centerListAPI: () => dispatch(centerListAPI()),
    centerSearchAPI: (data) => dispatch(centerSearchAPI(data)),
    categoryBaodStandardsListAPI: (data) => dispatch(categoryBaodStandardsListAPI(data)),
    categoryListApi: () => dispatch(categoryListApi()),
    cityListAPI: () => dispatch(cityListAPI()),
    AreaListAPI: (data) => dispatch(AreaListAPI(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Center);

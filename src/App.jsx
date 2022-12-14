import React, { Suspense, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WebRoutes } from "./routes";
import ScrollToTop from "./web/components/ScrollToTop";
import Dashboard from "./web/components/Dashboard";
import Category from "./web/components/Category/Categories";
import Center from "./web/components/AboutUs/OurCenters";
import VideoGallary from "./web/components/Gallary/Video-gallary";
import PhotoGallary from "./web/components/Gallary/Photo-gallary";
import GallaryGrid from "./web/components/Gallary/Gallary-grid";
import TermService from "./web/components/Term_Policies/Term-of-services";
import PrivacyPolicy from "./web/components/Term_Policies/Privacy-Policy";
import Disclaimer from "./web/components/Term_Policies/Disclaimer";
import Enquiry from "./web/components/modal/Enquiry";
import BaseDashboard from "./web/components";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Blog from "./web/components/Dashboard/Blog";
import ImportantLinks from "./web/components/Dashboard/ImportantLinks";
import OurResults from "./web/components/OtherPages/OurResults";
import DemoVedios from "./web/components/Dashboard/Demo-vedios";
import Objectives from "./web/components/AboutUs/Objectives";
import Recommendation from "./web/components/Category/Recommendation";

function App() {
  return (
    <div className="App">
      <ScrollToTop>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense>
                <BaseDashboard />
              </Suspense>
            }
          >
            <Route path={WebRoutes.DASHBOARD} element={<Dashboard />} />

            <Route path={WebRoutes.CATEGORY} element={<Category />} />

            <Route path={WebRoutes.BLOG} element={<Blog />} />

            <Route path={WebRoutes.IMPORTANT_LINKS} element={<ImportantLinks />} />

            <Route path={WebRoutes.DEMO_VIDEO} element={<DemoVedios />} />

            <Route path={WebRoutes.RESULTS} element={<OurResults />} />

            <Route path={WebRoutes.OBJECTIVE} element={<Objectives />} />

            <Route path={WebRoutes.RECOMMENDATION} element={<Recommendation />} />

            <Route path={WebRoutes.PHOTO_GALLARY} element={<PhotoGallary />} />

            <Route path={WebRoutes.VIDEO_GALLARY} element={<VideoGallary />} />

            <Route path={`${WebRoutes.GALLARY_GRID}:id`} element={<GallaryGrid />} />

            <Route path={WebRoutes.TERMS_SERVICE} element={<TermService />} />

            <Route path={WebRoutes.PRIVACY_POLICY} element={<PrivacyPolicy />} />

            <Route path={WebRoutes.DISCLAIMER} element={<Disclaimer />} />

            <Route path={WebRoutes.CENTERS} element={<Center />} />
          </Route>
        </Routes>
      </ScrollToTop>
    </div>
  );
}

export default App;

import React from "react";

import Layout from "../../segments/Layout";

import LeftSide from "./components/LeftSide";
import RightSide from "./components/RightSide";

const ReservesPage = () => {
  return (
    <Layout headerTitle="Резервы">
      <div className="reserves-page_wrapper">
        <div className="reserves-page_inner-wrapper">
          <LeftSide />
          <RightSide />
        </div>
      </div>
    </Layout>
  );
};

export default ReservesPage;

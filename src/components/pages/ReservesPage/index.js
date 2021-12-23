import React, {useState} from "react";

import Layout from "../../segments/Layout";

import LeftSide from "./components/LeftSide";
import RightSide from "./components/RightSide";
import ModalNotAvailableReserve from "../../modals/ModalNotAvailableReserve";

const ReservesPage = () => {
  const [notAvailableModalVisible, setNotAvailableModalVisible] = useState(false);
  return (
    <Layout headerTitle="Резервы">
      <div className="reserves-page_wrapper">
        <div className="reserves-page_inner-wrapper">
          <LeftSide />
          <RightSide />
        </div>
        <ModalNotAvailableReserve
          isVisible={notAvailableModalVisible}
          closeModal={() => setNotAvailableModalVisible(false)}
        />
      </div>
    </Layout>
  );
};

export default ReservesPage;

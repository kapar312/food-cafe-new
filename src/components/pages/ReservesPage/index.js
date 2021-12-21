import React, {useState} from "react";
import Switch from "react-switch";

import Layout from "../../segments/Layout";
import FieldDatePicker from "../../formFields/FieldDatePicker";

const ReservesPage = () => {
  const [isActive, setIsActive] = useState(false);
  const onSwitchClick = (nextChecked) => {
    console.log("onSwitchClick", nextChecked);
    setIsActive(nextChecked);
  };

  return (
    <Layout headerTitle="Резервы">
      <div className="reserves-page_wrapper">
        <div className="reserves-page_inner-wrapper">
          <div className="reserves-page_left-side">
            <h3 className="reserves-page_title">Выберите дату</h3>
            <FieldDatePicker />
            <Switch onChange={onSwitchClick} checked={isActive} />
          </div>
          <div className="reserves-page_right-side">
            <h3 className="reserves-page_title">Резервы</h3>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReservesPage;

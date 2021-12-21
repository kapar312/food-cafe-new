import React from "react";
import {inject, observer} from "mobx-react";

import Layout from "../../segments/Layout";

const MainPage = inject("store")(
  observer(({store: {file}}) => {
    return (
      <Layout headerTitle="Главная страница">
        <div className="main-page_wrapper">
          <div className="main-page_inner-wrapper">
            <h1>Главная страница</h1>
          </div>
        </div>
      </Layout>
    );
  })
);

export default MainPage;

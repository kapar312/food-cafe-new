import React, {useCallback, useEffect, useMemo, useState, useRef} from "react";
import {inject, observer} from "mobx-react";
import {useLocation} from "react-router-dom";
import {useMediaQuery} from "react-responsive";
import {toast} from "react-toastify";
import moment from "moment";

import Layout from "../../segments/Layout";
import ModalError from "../../modals/ModalError";
import ModalSuccess from "../../modals/ModalSuccess";
import ButtonPrimary from "../../buttons/ButtonPrimary";
import {IconCalendar, IconCheck, IconNotice, IconUser} from "../../Icons";

import TableSort from "./components/TableSort";
import Breadcrumb from "./components/Breadcrumb";
import Alert from "./components/Alert";
import Skeleton from "./components/Skeleton";
import Placeholder from "./components/Placeholder";

import {formatLastDigits, formatPrice} from "./helpers";
import {MAIN_PAGE} from "../../../consts/routes.const";

const ReservesPage = inject("store")(
  observer(({store: {reserves}}) => {
    const [fetching, setFetching] = useState(true);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [successModalVisible, setSuccessModalVisible] = useState(false);
    const [errorText, setErrorText] = useState("");
    const intervalRef = useRef(null);

    const isBigTablet = useMediaQuery({minWidth: 768, maxWidth: 991});
    const isSmallTablet = useMediaQuery({minWidth: 320, maxWidth: 767});

    const useQuery = () => {
      return new URLSearchParams(useLocation().search);
    };
    let query = useQuery();

    const getReservesData = () => {
      if (query.get("digits")) {
        setFetching(true);
        reserves.setLastDigitsOfNumber(query.get("digits"));
        reserves
          .getReservesData(query.get("digits"))
          .catch((error) => {
            if (error) {
              if (error?.statusText?.length) {
                setErrorText(error.statusText);
              } else if (error.data?.errors?.length) {
                setErrorText(error.data?.errors[0]);
              } else {
                setErrorText("Нет резарва на данный номер");
              }
            } else
              toast.error("Непредвиденная ошибка. Поробуйте перезагрузить страницу.");
          })
          .finally(() => {
            setTimeout(() => {
              setFetching(false);
            }, 200);
          });
      }
    };

    useEffect(() => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      intervalRef.current = setInterval(getReservesData, 120000);
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        reserves.setReservesList(null);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      getReservesData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query.get("digits")]);

    const formatDate = (date, hours) => {
      let formatedDate = moment(date, "DD.MM.YYYY").format("DD MMM");
      let formatedHours = moment(hours, "HH:mm:ss").format("HH:mm");
      return isSmallTablet ? (
        <>
          <span>{formatedDate}</span>
          <span>{formatedHours}</span>
        </>
      ) : (
        <>
          {formatedDate} / {formatedHours}
        </>
      );
    };

    const doReserve = (reserveId) => {
      setFetching(true);
      reserves
        .reserveById(reserveId)
        .then((response) => setSuccessModalVisible(true))
        .catch((error) => setErrorModalVisible(true))
        .finally(() => {
          setTimeout(() => {
            setFetching(false);
          }, 200);
        });
    };

    const sortReservesList = (sortFn, isDesc) => {
      let sorted = reserves.reservesList.slice().sort(sortFn);
      if (isDesc) {
        sorted.reverse();
      }
      reserves.setReservesList(sorted);
    };

    const renderRows = (data) => {
      return data?.map((item, index) => {
        return {
          fullname: () => (
            <div className="user-info">
              <h3 className="user-info__title">{item.fullName}</h3>
              <h4 className="user-info__subtitle">{item.coworkingName}</h4>
            </div>
          ),
          datetime: () => formatDate(item.reservationDate, item.reservationHours.from),
          guests: () => item.peopleCount,
          amount: () => formatPrice(item.price),
          action: () =>
            isSmallTablet ? (
              <ButtonPrimary
                onClick={() => doReserve(item.id)}
                buttonColor="primary"
                disabled={!item.canCheckIn}
              >
                <IconCheck color="#FFFFFF" />
              </ButtonPrimary>
            ) : (
              <ButtonPrimary
                onClick={() => doReserve(item.id)}
                buttonColor="primary"
                disabled={!item.canCheckIn}
              >
                Подтвердить
              </ButtonPrimary>
            ),
        };
      });
    };

    const prepareSkeleton = useCallback(() => {
      let headers = [
        {
          id: "fullname",
          title: "ФИО",
          sorting: (isDesc) => {
            sortReservesList((a, b) => {
              if (a.fullName[0] < b.fullName[0]) {
                return -1;
              } else {
                return 1;
              }
            }, isDesc);
          },
        },
        {
          id: "datetime",
          title: isSmallTablet ? (
            <IconCalendar color="#9399A8" />
          ) : isBigTablet ? (
            "Дата и время"
          ) : (
            "Дата и время резерва"
          ),
          sorting: (isDesc) => {
            sortReservesList((a, b) => {
              let aReservationDate = moment(a.reservationDate, "DD.MM.YYYY").format(
                "YYYY-MM-DD"
              );
              let bReservationDate = moment(b.reservationDate, "DD.MM.YYYY").format(
                "YYYY-MM-DD"
              );

              let aReservationStartDate = moment(
                `${aReservationDate}T${a.reservationHours.from}`
              ).format("YYYY-MM-DDTHH:mm:ss");
              let bReservationStartDate = moment(
                `${bReservationDate}T${b.reservationHours.from}`
              ).format("YYYY-MM-DDTHH:mm:ss");

              if (moment(aReservationStartDate).isAfter(bReservationStartDate)) {
                return -1;
              } else {
                return 1;
              }
            }, isDesc);
          },
        },
        {
          id: "guests",
          title: isSmallTablet ? <IconUser color="#9399A8" /> : "Гости",
          sorting: (isDesc) => {
            sortReservesList((a, b) => {
              if (a.peopleCount < b.peopleCount) {
                return -1;
              } else {
                return 1;
              }
            }, isDesc);
          },
        },
        {
          id: "amount",
          title: isSmallTablet ? (
            <IconNotice color="#9399A8" />
          ) : isBigTablet ? (
            "Депозит"
          ) : (
            "Сумма депозита"
          ),
          sorting: (isDesc) => {
            sortReservesList((a, b) => {
              if (a.price < b.price) {
                return -1;
              } else {
                return 1;
              }
            }, isDesc);
          },
        },
        {
          id: "action",
          type: "empty",
          sorting: () => {},
        },
      ];

      return {
        headers: headers,
        rows: renderRows,
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isBigTablet, isSmallTablet, renderRows]);

    const content = useMemo(() => {
      if (fetching) {
        return <Skeleton />;
      }

      if (reserves.reservesList?.length <= 0) {
        return (
          <Placeholder error={false} lastDigitsOfNumber={reserves.lastDigitsOfNumber} />
        );
      }

      if (reserves.reservesList?.length > 0) {
        return <TableSort skeleton={prepareSkeleton()} data={reserves.reservesList} />;
      }

      return (
        <Placeholder
          error={false}
          errorText={errorText}
          lastDigitsOfNumber={reserves.lastDigitsOfNumber}
        />
      );
    }, [
      errorText,
      fetching,
      reserves.lastDigitsOfNumber,
      prepareSkeleton,
      reserves.reservesList,
    ]);

    return (
      <Layout headerTitle="Резервы" className="reserves-page_layout">
        <>
          <div className="reserves-page_wrapper">
            <div className="container container-full">
              <div className="reserves-page_inner-wrapper">
                <Breadcrumb
                  to={MAIN_PAGE}
                  text={`Резервы для номера **** ${formatLastDigits(
                    reserves.lastDigitsOfNumber
                  )}`}
                />
                <div className="reserves-page_body">
                  <Alert text="Уточните фамилию гостя перед подтверждением бронирования" />
                  {content}
                </div>
              </div>
            </div>
          </div>
          <ModalError isVisible={errorModalVisible} />
          <ModalSuccess isVisible={successModalVisible} />
        </>
      </Layout>
    );
  })
);

export default ReservesPage;

import React, {useCallback, useEffect, useMemo, useState} from "react";
import {inject, observer} from "mobx-react";
import {toast} from "react-toastify";
import {useMediaQuery} from "react-responsive";
import moment from "moment";

import ButtonPrimary from "../../../buttons/ButtonPrimary";
import {IconCalendar, IconCheck, IconNotice, IconUser} from "../../../Icons";
import Skeleton from "../../ConfirmationReservesPage/components/Skeleton";
import Placeholder from "../../ConfirmationReservesPage/components/Placeholder";
import TableSort from "../../../common/TableSort";

import {formatPrice} from "../../ConfirmationReservesPage/helpers";
import {EButtonSize} from "../../../buttons/consts";

const Reservations = inject("store")(
  observer(({store: {reserves}}) => {
    const [errorText, setErrorText] = useState("");
    const [fetching, setFetching] = useState(true);

    const isBigTablet = useMediaQuery({minWidth: 768, maxWidth: 991});
    const isSmallTablet = useMediaQuery({minWidth: 320, maxWidth: 767});

    const getReservesData = () => {
      setFetching(true);
      reserves
        .getReservesDataByDate()
        .catch((error) => {
          if (error) {
            if (error?.statusText?.length) {
              setErrorText(error.statusText);
            } else if (error.data?.errors?.length) {
              setErrorText(error.data?.errors[0]);
            } else {
              setErrorText("Нет резарва на данный номер");
            }
          } else toast.error("Непредвиденная ошибка. Поробуйте перезагрузить страницу.");
        })
        .finally(() => {
          setFetching(false);
        });
    };

    useEffect(() => {
      getReservesData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
              <h4 className="user-info__subtitle">
                {item.reservationDate} - {item.reservationHours.from}
              </h4>
              <h3 className="user-info__title">{item.fullName}</h3>
            </div>
          ),
          reservationType: () => item.reservationType,
          amount: () => formatPrice(item.price),
          guests: () => item.peopleCount,
          action: () =>
            isSmallTablet ? (
              <ButtonPrimary
                onClick={() => console.log(item.id)}
                buttonColor="primary"
                disabled={!item.canCheckIn}
              >
                <IconCheck color="#FFFFFF" />
              </ButtonPrimary>
            ) : (
              <ButtonPrimary
                onClick={() => console.log(item.id)}
                buttonColor="primary"
                buttonSize={EButtonSize.sm}
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
          title: "Резерв",
          sorting: (isDesc) => {
            sortReservesList((a, b) => {
              if (a.fullName < b.fullName) {
                return -1;
              } else {
                return 1;
              }
            }, isDesc);
          },
        },
        {
          id: "reservationType",
          title: "Тип резерва",
          sorting: (isDesc) => {
            sortReservesList((a, b) => {
              if (a.reservationType < b.reservationType) {
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

    return <div className="reserves-page_list__wrapper">{content}</div>;
  })
);

export default Reservations;

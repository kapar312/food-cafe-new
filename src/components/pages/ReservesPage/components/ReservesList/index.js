import React, {useCallback, useEffect, useMemo, useState} from "react";
import {inject, observer} from "mobx-react";
import {toast} from "react-toastify";
import {useMediaQuery} from "react-responsive";

import {IconNotice, IconUser} from "../../../../Icons";
import Skeleton from "../../../ConfirmationReservesPage/components/Skeleton";
import TableSort from "../../../../common/TableSort";
import ReservesPlaceholder from "../ReservesPlaceholder";

import {formatPrice} from "../../../ConfirmationReservesPage/helpers";
import AlertPlaceholder from "../../../../common/AlertPlaceholder";
import {convertDateToDMYFormat} from "../../../../../helper/time.helper";

const ReservesList = inject("store")(
  observer(({store: {reserves}}) => {
    const [errorText, setErrorText] = useState("");
    const [fetching, setFetching] = useState(true);

    const isBigTablet = useMediaQuery({minWidth: 768, maxWidth: 991});
    const isSmallTablet = useMediaQuery({minWidth: 320, maxWidth: 767});

    const getReservesData = (dateFrom) => {
      setFetching(true);
      reserves
        .getReservesDataByDate(dateFrom)
        .catch((error) => {
          if (error) {
            if (error?.statusText?.length) {
              setErrorText(error.statusText);
            } else if (error.data?.errors?.length) {
              setErrorText(error.data?.errors[0]);
            } else {
              setErrorText("Нет резарвов");
            }
          } else toast.error("Непредвиденная ошибка. Поробуйте перезагрузить страницу.");
        })
        .finally(() => {
          setFetching(false);
        });
    };

    useEffect(() => {
      if (reserves.selectedCalendarDate) {
        getReservesData(convertDateToDMYFormat(reserves.selectedCalendarDate));
        const dateInCalendar = reserves.datesList?.find(
          (item) => item.date === convertDateToDMYFormat(reserves.selectedCalendarDate)
        );
        reserves.setIsSelectedDateAvailable(dateInCalendar?.isAvailable);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reserves.selectedCalendarDate]);

    const sortReservesList = (sortFn, isDesc) => {
      let sorted = reserves.reservesListByDate.slice().sort(sortFn);
      if (isDesc) {
        sorted.reverse();
      }
      reserves.setReservesList(sorted);
    };

    const renderRows = (data) => {
      return data?.map((item) => {
        return {
          fullname: () => (
            <div className="user-info">
              <h4 className="user-info__subtitle">
                {item.reservationDate} - {item.reservationHours?.from}
              </h4>
              <h3 className="user-info__title">{item.fullName}</h3>
            </div>
          ),
          reservationType: () => item.reservationType,
          amount: () => formatPrice(item.price),
          guests: () => item.peopleCount,
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
      ];

      return {
        headers: headers,
        rows: renderRows,
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isBigTablet, isSmallTablet, renderRows]);

    const content = useMemo(() => {
      const dateInCalendar = reserves.datesList?.find(
        (item) => item.date === convertDateToDMYFormat(reserves.selectedCalendarDate)
      );

      if (fetching) {
        return <Skeleton />;
      }

      if (
        dateInCalendar?.isAvailable === false ||
        reserves.isSelectedDateAvailable === false
      ) {
        return (
          <AlertPlaceholder
            text="Вы закрыли прием гостей на выбранную дату"
            isClosable={false}
          />
        );
      }

      if (reserves.reservesListByDate?.length <= 0) {
        return <ReservesPlaceholder />;
      }

      if (reserves.reservesListByDate?.length > 0) {
        return (
          <TableSort skeleton={prepareSkeleton()} data={reserves.reservesListByDate} />
        );
      }

      return <ReservesPlaceholder />;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
      reserves.reservesListByDate,
      fetching,
      prepareSkeleton,
      reserves.isSelectedDateAvailable,
    ]);

    return <div className="reserves-page_list__wrapper">{content}</div>;
  })
);

export default ReservesList;

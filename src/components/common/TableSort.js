import React, {useState} from "react";
import {inject, observer} from "mobx-react";
import cn from "classnames";

const TableSort = inject("store")(
  observer(({skeleton, data}) => {
    const {headers, rows} = skeleton;
    const [tableHeaders, setTableHeaders] = useState(headers);

    function onSort(header) {
      let disablededActiveHeaders = tableHeaders.map((item) => {
        if (item.id !== header.id) {
          item.isDesc = false;
        }
        return item;
      });
      setTableHeaders(disablededActiveHeaders);
      header.sorting.bind(this, header.isDesc)();
      header.isDesc = !header.isDesc;
    }

    return (
      <div className={cn("confirmation-reserves_table__wrapper")}>
        <div className="confirmation-reserves_table__head _wrapper">
          {tableHeaders.map((header) => (
            <div
              key={header.id}
              className={cn(
                "confirmation-reserves_table__head _item-col",
                `_${header.id}`
              )}
            >
              {header.type !== "empty" && (
                <div
                  className={cn(
                    "th-button th-button--sorting",
                    header.isDesc && "th-button--rotate"
                  )}
                  onClick={onSort.bind(this, header)}
                >
                  <span>{header.title}</span>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="confirmation-reserves_table__body _wrapper">
          {rows(data)?.map((row, index) => (
            <div key={index} className="confirmation-reserves_table__body _item-row">
              {headers.map((header, index) => {
                return (
                  <div
                    key={index}
                    className={cn(
                      "confirmation-reserves_table__body _item-col",
                      `_${header.id}`
                    )}
                  >
                    {row[header.id]()}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  })
);

export default TableSort;

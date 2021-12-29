import React, {useState, useCallback, useEffect} from "react";
import {inject, observer} from "mobx-react";
import cn from "classnames";
import {ErrorMessage} from "formik";
import {isEqual} from "lodash";

import {checkError} from "../../helper/form.helper";
import {IconCross} from "../Icons";
import IconCamera from "../Icons/common/IconCamera";

import {COLOR_WHITE} from "../../consts/colors.const";
import {
  ALLOWED_FILE_TYPES,
  MAX_COUNT_OF_MEDIA_FILES,
} from "../../consts/formFields.const";

const FieldDropzone = inject("store")(
  observer(
    ({
      store: {coworking},
      name,
      label,
      errorName,
      wrapperClassName,
      fieldClassName,
      errors,
      setFieldValue,
      defaultList,
    }) => {
      const {coworkingFiles} = coworking;
      const [inputRef, setInputRef] = useState();

      const setInputAnchorRef = useCallback(
        (node) => {
          if (node && !isEqual(inputRef, node)) {
            setInputRef(node);
          }
        },
        [setInputRef, inputRef]
      );

      const onDropzoneChange = (e) => {
        const files = e.target.files;
        coworking.uploadFiles(files);
      };

      const deleteImage = (e, item) => {
        e.preventDefault();
        e.stopPropagation();
        coworking.deleteUploadedFile(item);
      };

      const handlePickImage = useCallback(() => {
        if (inputRef) {
          inputRef.click();
        }
      }, [inputRef]);

      useEffect(() => {
        if (coworkingFiles?.length) {
          let medias = [];
          for (let i = 0; i < coworkingFiles?.length; i++) {
            let innerObj = {url: coworkingFiles[i].data[0]};
            medias.push(innerObj);
          }
          setFieldValue(name, medias);
        }
      }, [coworkingFiles, name, setFieldValue]);

      return (
        <div className={cn("form-field_wrapper _dropzone", wrapperClassName)}>
          {label && <label className="form-field_label">{label}</label>}
          <div style={checkError(errors, name)} className="form-field_inner-wrapper">
            <div
              className={cn("form-field_field", fieldClassName, {
                _error: coworkingFiles?.length > MAX_COUNT_OF_MEDIA_FILES,
              })}
              onClick={handlePickImage}
            >
              <input
                type="file"
                name={name}
                onChange={onDropzoneChange}
                style={{display: "none"}}
                ref={(node) => setInputAnchorRef(node)}
                accept={ALLOWED_FILE_TYPES.join(",")}
                multiple={true}
                className="form-field_input"
              />

              <div className="form-field_images__list">
                {defaultList &&
                  defaultList?.map((item, index) => (
                    <div className="form-field_images__item" key={`${item.url}-${index}`}>
                      <img src={item.url} alt={item.url} />
                      <button
                        className="form-field_images__btn-delete"
                        type="button"
                        onClick={(e) => {
                          deleteImage(e, {
                            data: [item.url],
                          });
                        }}
                      >
                        <IconCross color={COLOR_WHITE} />
                      </button>
                    </div>
                  ))}
                {coworkingFiles &&
                  coworkingFiles?.map((item, index) => (
                    <div
                      className="form-field_images__item"
                      key={`${item.data[0]}-${index}`}
                    >
                      <img src={item.data[0]} alt={item.data[0]} />
                      <button
                        className="form-field_images__btn-delete"
                        type="button"
                        onClick={(e) => deleteImage(e, item)}
                      >
                        <IconCross color={COLOR_WHITE} />
                      </button>
                    </div>
                  ))}
                {(coworkingFiles?.length < MAX_COUNT_OF_MEDIA_FILES ||
                  !coworkingFiles?.length) && (
                  <div className="form-field_images__item-add _wrapper">
                    <div className="form-field_images__item-add _inner-wrapper">
                      <IconCamera width={24} height={24} /> Добавить фото
                    </div>
                  </div>
                )}
              </div>
              <div
                className={cn("form-field_images__char-counter", {
                  _error: coworkingFiles?.length > MAX_COUNT_OF_MEDIA_FILES,
                })}
              >
                {coworkingFiles?.length || 0} из {MAX_COUNT_OF_MEDIA_FILES}
              </div>
            </div>
            {coworkingFiles?.length > MAX_COUNT_OF_MEDIA_FILES && (
              <p className="form-field_error">
                Перевышено максимально допустимое количество изображений.
              </p>
            )}
            {errorName && (
              <ErrorMessage name={errorName}>
                {(msg) => <p className="form-field_error">{msg}</p>}
              </ErrorMessage>
            )}
          </div>
        </div>
      );
    }
  )
);

export default FieldDropzone;

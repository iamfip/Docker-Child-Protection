import React from "react";
import PropTypes from "prop-types";
import { subYears } from "date-fns";
import { TextField as MuiTextField } from "formik-material-ui";
import { FastField } from "formik";
import { useI18n } from "components/i18n";
import { GuidingQuestions } from "components/guiding-questions";

const TextField = ({ name, field, ...rest }) => {
  const {
    type,
    visible,
    guiding_questions: guidingQuestions,
    hide_on_view_page: hideOnViewPage
  } = field;
  const i18n = useI18n();

  const fieldProps = {
    type: type === "numeric_field" ? "number" : "text",
    multiline: type === "textarea",
    name,
    ...rest
  };

  const updateDateBirthField = (form, value) => {
    const matches = name.match(/(.*)age$/);
    if (matches && value) {
      const diff = subYears(new Date(), value);
      form.setFieldValue(`${matches[1]}date_of_birth`, diff, true);
    }
  };

  return !(rest.mode.isShow && hideOnViewPage) && visible ? (
    <FastField
      name={name}
      render={renderProps => {
        return (
          <>
            <MuiTextField
              form={renderProps.form}
              field={{
                ...renderProps.field,
                onChange(evt) {
                  const { value } = evt.target;
                  updateDateBirthField(renderProps.form, value);
                  return renderProps.form.setFieldValue(
                    renderProps.field.name,
                    value,
                    true
                  );
                }
              }}
              {...fieldProps}
            />
            {guidingQuestions &&
            (fieldProps.mode.isEdit || fieldProps.mode.isNew) ? (
              <GuidingQuestions
                label={i18n.t("buttons.guiding_questions")}
                text={guidingQuestions[i18n.locale]}
              />
            ) : null}
          </>
        );
      }}
    />
  ) : null;
};

TextField.propTypes = {
  name: PropTypes.string,
  field: PropTypes.object
};

export default TextField;

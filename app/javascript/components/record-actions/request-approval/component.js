import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, menuItem, IconButton, FormLabel, Grid } from '@material-ui/core';
import CloseIcon from "@material-ui/icons/Close";

import { useI18n } from "../../i18n";
import { ActionDialog } from "../../action-dialog";

import { approvalRecord } from "./action-creators";
import { NAME } from "./constants";
import styles from "./styles.css"

const Component = ({
  close,
  openRequestDialog,
  subMenuItems,
  record,
  recordType
}) => {
  const i18n = useI18n();
  const dispatch = useDispatch();
  const css = makeStyles(styles)();
  const [requestType, setRequestType] = useState("bia");
  const handleChange = event => {
    setRequestType(event.target.value);
  };

  const handleOk = () => {
    dispatch(
      approvalRecord({
        recordType,
        recordId: record.get("id"),
        approvalId: requestType,
        body: { data: { approval_status: "requested" } },
        message: i18n.t(`cases.request_approval_success_${requestType}`),
        redirect: false
      })
    );

    close();
  };

  const selectOptions = subMenuItems.map(option => (
    <option key={option.value} value={option.value}>
      {option.name}
    </option>
  ));

  const dialogContent = (
    <>
      <IconButton
        aria-label="close"
        className={css.closeButton}
        onClick={close}
      >
        <CloseIcon />
      </IconButton>
      <form noValidate autoComplete="off" className={css.centerForm}>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
        >
          <Grid item xs={10}>
            <FormLabel component="legend">
              {i18n.t("cases.request_approval_select")}
            </FormLabel>
          </Grid>
          <Grid item xs={10}>
            <TextField
              id="outlined-select-approval-native"
              select
              value={requestType}
              onChange={handleChange}
              className={css.selectApprovalType}
              SelectProps={{
                native: true
              }}
            >
              {selectOptions}
            </TextField>
          </Grid>
        </Grid>
      </form>
    </>
  );

  return (
    <ActionDialog
      open={openRequestDialog}
      dialogTitle=""
      successHandler={handleOk}
      cancelHandler={close}
      confirmButtonLabel={i18n.t("cases.ok")}
      maxSize="xs"
    >
      {dialogContent}
    </ ActionDialog>
  );
};

Component.displayName = NAME;

Component.propTypes = {
  close: PropTypes.func,
  openRequestDialog: PropTypes.bool,
  record: PropTypes.object,
  recordType: PropTypes.string,
  subMenuItems: PropTypes.array
};

export default Component;

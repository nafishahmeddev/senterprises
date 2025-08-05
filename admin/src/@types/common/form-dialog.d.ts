declare type FormDialogOpenState<IRecord> = {
  open: true;
  record: IRecord;
};

declare type FormDialogCloseState = {
  open: false;
  record?: undefined;
};
declare type FormDialogState<IRecord> =
  | FormDialogOpenState<IRecord>
  | FormDialogCloseState;

export type ActionResult<TFields, TData = undefined> =
  | ({
    success: true;
    message?: string;
  } & (TData extends undefined ? {} : { data: TData }))
  | {
    success: false;
    message: string;
    fieldErrors?: Partial<TFields>;
  };
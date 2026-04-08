export type ActionResult<TFields = never, TData = never> = {
  success: boolean;
  message?: string;
  fieldErrors?: Partial<Record<keyof TFields, string>>;
  data?: TData;
};
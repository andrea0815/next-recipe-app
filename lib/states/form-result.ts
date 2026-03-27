export type ActionResult<
  TFields extends Record<string, string> = Record<string, string>
> =
  | {
    success: true;
    message?: string;
    fieldErrors?: Partial<TFields>;
  }
  | {
    success: false;
    message: string;
    fieldErrors?: Partial<TFields>;
  };
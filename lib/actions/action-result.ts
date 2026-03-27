export type ActionResult<TFields extends Record<string, string> = Record<string, string>> =
  | {
      success: true;
      message?: string;
    }
  | {
      success: false;
      message: string;
      fieldErrors?: Partial<TFields>;
    };
export function generateError(code: number, message: string) {
   const err = new Error(message);
   (err as any).statusCode = code;
   return err;
}

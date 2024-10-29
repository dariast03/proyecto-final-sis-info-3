

const defaultMessage =
  "Error inesperado, por favor intenta de nuevo. Si el problema persiste contacta al soporte técnico.";

export const getError = (error: any) => {
  console.log("🚀 ~ getError ~ error:", error)
  /* if (!error) return { code: "", msg: "" };

  if (!error?.code) return { code: "unknown", msg: defaultMessage };

  const code = error.code;

  const msg = firebaseErrors[code] ?? defaultMessage; */

  return {
    code: "unknown",
    msg: defaultMessage,
  };
};

import { SignInForm } from "@/lib/definitions";
import axiosInstance from "@/lib/axios";
import { createSession, deleteSession } from "@/app/lib/session";

type GetStateInstance = {
  stateInstance:
    | "notAuthorized"
    | "authorized"
    | "blocked"
    | "sleepMode"
    | "starting"
    | "yellowCard";
};

const getStateInstance = async (values: SignInForm) => {
  const { idInstance, apiTokenInstance } = values;
  return await axiosInstance.get<GetStateInstance>(
    `/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`,
  );
};

export async function signIn(values: SignInForm) {
  try {
    const { data } = await getStateInstance(values);
    if (data.stateInstance === "authorized") {
      await createSession(values.idInstance, values.apiTokenInstance);
    }
    return data.stateInstance;
  } catch (e: unknown) {
    // @ts-expect-error
    return e?.message || "Unknown error";
  }
}

export async function signOut() {
  await deleteSession();
}

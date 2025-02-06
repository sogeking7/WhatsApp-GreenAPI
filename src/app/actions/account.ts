import { StateInstance } from "@/app/actions/auth";
import axiosInstance from "@/lib/axios";
import { getCredentials } from "@/app/actions/index";

type GetWaSettings = {
  avatar: string;
  phone: string;
  stateInstance: StateInstance;
  deviceId: string;
};

export const getWaSettings = async () => {
  const { idInstance, apiTokenInstance } = await getCredentials();

  return await axiosInstance.get<GetWaSettings>(
    `/waInstance${idInstance}/getWaSettings/${apiTokenInstance}`,
  );
};

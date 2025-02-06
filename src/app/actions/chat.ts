import axiosInstance from "@/lib/axios";
import { getCredentials } from "@/app/actions/index";

type GetContactInfo = {
  avatar: string;
  name: string;
  chatId: string;
};

export const getContactInfo = async (chatId: string) => {
  const { idInstance, apiTokenInstance } = await getCredentials();

  return await axiosInstance.post<GetContactInfo>(
    `/waInstance${idInstance}/GetContactInfo/${apiTokenInstance}`,
    {
      chatId,
    },
  );
};

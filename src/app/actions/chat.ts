import { Response } from "@/types/api";
import { TGetContactInfo, TSendMessage } from "@/types/green-api";

export const getContactInfo = async (chatId: string) => {
  const response = await fetch("/api/getContactInfo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ chatId }),
  });

  const res: Response<TGetContactInfo> = await response.json();

  return res;
};

export const sendMessage = async (chatId: string, message: string) => {
  const response = await fetch("/api/sendMessage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ chatId, message }),
  });

  const res: Response<TSendMessage> = await response.json();

  return res;

};

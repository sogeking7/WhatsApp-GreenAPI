"use server";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axiosInstance from "@/lib/axios";
import { StateInstance } from "@/app/actions/auth";
import { cookies } from "next/headers";
import { decrypt } from "@/app/lib/session";
import { SignOutButton } from "@/components/features/account/components/sign-out-button";

type GetWaSettings = {
  avatar: string;
  phone: string;
  stateInstance: StateInstance;
  deviceId: string;
};

const getWaSettings = async () => {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;
  const session = sessionCookie ? await decrypt(sessionCookie) : null;
  //@ts-ignore
  const idInstance = session?.idInstance;
  //@ts-ignore
  const apiTokenInstance = session?.apiTokenInstance;
  return await axiosInstance.get<GetWaSettings>(
    `/waInstance${idInstance}/getWaSettings/${apiTokenInstance}`,
  );
};

export const AccountAvatar = async () => {
  const { data } = await getWaSettings();
  const { avatar, phone } = data;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={avatar} />
          <AvatarFallback className={"bg-gray-100"}></AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>{phone}</DropdownMenuItem>
        <DropdownMenuItem asChild>
          <SignOutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

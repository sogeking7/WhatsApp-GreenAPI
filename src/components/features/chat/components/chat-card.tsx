import { Avatar, AvatarImage } from "@/components/ui/avatar";

export const ChatCard = () => {
  return (
    <li className="w-full py-4 px-6 hover:bg-gray-200 flex gap-4">
      <Avatar className={"size-12"}>
        <AvatarImage src="https://github.com/shadcn.png" />
      </Avatar>
      <div className={"py-1"}>
        <h3 className={"text-base"}>Alex</h3>
        <p className={"text-sm text-gray-500 relative"}></p>
      </div>
    </li>
  );
};

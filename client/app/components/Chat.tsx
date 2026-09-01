import { Avatar } from "@heroui/react";
import dayjs from "dayjs";

interface ChatProps {
  history?: Message[]
}

interface Message {
  id: number,
  schedulingId: number,
  authorId: number,
  messageType: string,
  message: string,
  insertedAt: string,
  authorName: string,
  role: string
}

export default function Chat({ history = [] }: ChatProps) {

  return (
    <div className="flex flex-col gap-3 p-4 max-h-150 w-full">
      {history?.map((item: any) => {

        const isCliente = item.role === "cliente"

        return (
          <div
            key={item.id}
            className={`flex flex-col ${isCliente ? "items-start" : "items-end"}`}
          >
            <div className="chat-image avatar">
              <Avatar>
                <Avatar.Image alt="John Doe" src="https://img.heroui.chat/image/avatar?w=400&h=400&u=3" />
                <Avatar.Fallback>JD</Avatar.Fallback>
              </Avatar>
            </div>

            <div className="chat-header text-xs mb-1">
              {item.autor_nome}
              <time className="text-[10px] opacity-50 ml-1.5">{dayjs(item.insertedAt).format('HH:mm:ss')}</time>
            </div>

            <div
              className={`chat-bubble text-sm ${isCliente ? "bg-base-200 text-base-content" : "chat-bubble-primary text-primary-content"
                }`}
            >
              {item.message}
            </div>

            <div className="chat-footer opacity-50 text-[10px] mt-1">
              {isCliente ? "Recebido do cliente" : " Enviado ao cliente"}
            </div>
          </div>
        );
      })}
    </div>
  );
}
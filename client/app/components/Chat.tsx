export default function Chat({ historico = [] }) {
  console.log("🚀 ~ Chat ~ historico:", historico)

  return (
    <div className="flex flex-col gap-3 p-4 overflow-y-auto max-h-[600px] w-full">
      {historico?.map((item) => {

        // 💬 CASO 2: Conversa Pública (Cliente na Esquerda | Técnico na Direita)
        const isCliente = item.role === "cliente" || item.role === 'administrador'

        return (
          <div
            key={item.id}
            className={`chat ${isCliente ? "chat-start" : "chat-end"}`}
          >
            <div className="chat-image avatar">
              <div className="w-8 rounded-full">
                <img alt={item.autor_nome} src={item.avatar} />
              </div>
            </div>

            <div className="chat-header text-xs mb-1">
              {item.autor_nome}
              <time className="text-[10px] opacity-50 ml-1.5">{item.hora}</time>
            </div>

            <div
              className={`chat-bubble text-sm ${isCliente
                ? "bg-base-200 text-base-content"
                : "chat-bubble-primary text-primary-content"
                }`}
            >
              {item.mensagem}
            </div>

            <div className="chat-footer opacity-50 text-[10px] mt-1">
              {isCliente ? "Recebido do cliente" : "✓ Enviado ao cliente"}
            </div>
          </div>
        );
      })}
    </div>
  );
}
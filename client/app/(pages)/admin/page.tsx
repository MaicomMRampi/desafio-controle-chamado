"use client"
import { Tabs } from "@heroui/react";

// pages
import AdminPage from "@/app/components/admin_pages/admin";
import Priority from "@/app/components/admin_pages/priority";

export default function AdminPanel() {
  return (
    <div className="w-[70%] mx-auto">
      <Tabs >
        <Tabs.ListContainer>
          <Tabs.List aria-label="Options">
            <Tabs.Tab id="Painel de Usuários">
              Painel de usuários
              <Tabs.Indicator />
            </Tabs.Tab>
            <Tabs.Tab id="Status do atendimento">
              Status do atendimento
              <Tabs.Indicator />
            </Tabs.Tab>
          </Tabs.List>
        </Tabs.ListContainer >
        <Tabs.Panel className="pt-4" id="Painel de Usuários">
          <AdminPage />
        </Tabs.Panel>
        <Tabs.Panel className="pt-4" id="Status do atendimento">
          <Priority />
        </Tabs.Panel>
      </Tabs >
    </div >
  );
}
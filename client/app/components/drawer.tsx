"use client";

import { Button, Drawer } from "@heroui/react";
import { api } from "../lib/axiosInstance";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import {
  Home,
  ShieldCheck,
  User,
  LogOut,
  Menu,
  PhoneIncoming
} from "lucide-react";

interface NavigationItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

export default function Navigation() {
  const router = useRouter();
  const path = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems: NavigationItem[] = [
    { label: "Início", href: "/", icon: Home },
    { label: "Painel Admin", href: "/admin", icon: ShieldCheck },
    { label: "Meu Perfil", href: "/profile", icon: User },
  ];

  async function Logout() {
    try {
      const response = await api.post('/logout');
      if (response.status === 200) {
        router.push('/login');
      }
    } catch (error: any) {
      console.error("Erro ao deslogar:", error?.message);
    }
  }

  if (path === '/login') return null;

  return (
    <>
      <Button
        variant="ghost"
        isIconOnly
        aria-label="Abrir Menu"
        onPress={() => setIsOpen(true)}
        className="m-2"
      >
        <span>
          <Menu size={22} />
        </span>
      </Button>

      <Drawer isOpen={isOpen} onOpenChange={setIsOpen}>
        <Drawer.Backdrop>
          <Drawer.Content placement="left" className="max-w-xs">
            <Drawer.Dialog className="flex flex-col justify-between h-full">
              <Drawer.CloseTrigger />
              <Drawer.Header className="border-b border-default-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-primary/10 text-primary rounded-xl">
                    <PhoneIncoming size={48} strokeWidth={0.5} />
                  </div>
                  <div>
                    <Drawer.Heading className="text-base font-bold">Suporte</Drawer.Heading>
                    <p className="text-xs text-default-400">Central de Atendimento <b className="text-cyan-600">Bold Energy</b></p>
                  </div>
                </div>
              </Drawer.Header>
              <Drawer.Body className="py-4 flex-1">
                <nav className="flex flex-col gap-1.5">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const inRoute = path === item.href;

                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3.5 rounded-xl px-3.5 py-2.5 text-sm font-medium ${inRoute
                          ? "bg-primary text-primary-foreground shadow-sm border border-cyan-600"
                          : "text-default-600 hover:bg-default-100 hover:text-foreground"
                          }`}
                      >
                        <Icon size={18} className={inRoute ? "text-primary-foreground" : "text-default-500"} />
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>
              </Drawer.Body>

              <div className="p-4 border-t border-default-100">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 text-sm font-medium border border-red-300"
                  onPress={Logout}
                >
                  <span>
                    <LogOut size={18} />
                  </span>
                  Sair da Conta
                </Button>
              </div>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}
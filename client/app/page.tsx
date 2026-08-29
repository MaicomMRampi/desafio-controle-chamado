"use client";
import { Button } from "@heroui/react";
import Image from "next/image";
import { useAuth } from "./utils/auth_provider";

export default function Home() {
  const { user } = useAuth()

  return (
    <div>
      <h1>Testando o Hero ui</h1>
      <h1>Testando o Hero ui</h1>
      <Button>Teste button</Button>
    </div>
  );
}

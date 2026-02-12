"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export function CrispChat() {
  useEffect(() => {
    Crisp.configure("a58949b8-7f8d-4cae-802f-69d4523a43ae");
  }, []);

  return null;
}

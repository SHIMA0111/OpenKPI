'use client'

import { ChakraProvider } from "@chakra-ui/react"
import { SessionProvider } from "next-auth/react"
import { system } from "@/config/theme"
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "./color-mode"
import { Toaster } from "./toaster"

export function Provider(props: ColorModeProviderProps) {
  return (
    <SessionProvider>
      <ChakraProvider value={system}>
        <ColorModeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            {...props}
        />
        <Toaster />
      </ChakraProvider>
    </SessionProvider>
  )
}

'use client'

import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { SessionProvider } from "next-auth/react"
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "./color-mode"
import { Toaster } from "./toaster"

export function Provider(props: ColorModeProviderProps) {
  return (
    <SessionProvider>
      <ChakraProvider value={defaultSystem}>
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

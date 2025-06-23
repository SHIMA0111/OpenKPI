import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
    theme: {
        keyframes: {
            progress: {
                "0%": {
                    transform: "translateX(-100%)"
                },
                "50%": {
                    transform: "translateX(0%)"
                },
                "100%": {
                    transform: "translateX(100%)"
                },
            },
            spin: {
                from: {
                    transform: "rotate(0deg)"
                },
                to: {
                    transform: "rotate(360deg)"
                }
            },
        },
        semanticTokens: {
            colors: {
                // General screen background color
                "screen.bg.color": {
                    value: {
                        _light: "#fafafa",
                        _dark: "#18181b",
                    }
                },
                // General border color
                "border.color": {
                    value: {
                        _light: "#e4e4e7",
                        _dark: "#3f3f46",
                    }
                },

                // Auth screen background gradient
                "screen.bg.gradient.from": {
                    value: {
                        _light: "#fafafa",
                        _dark: "#18181b",
                    }
                },
                "screen.bg.gradient.to": {
                    value: {
                        _light: "#f4f4f5",
                        _dark: "#27272a",
                    }
                },

                // General text color
                "text.color": {
                    value: {
                        _light: "#27272a",
                        _dark: "#e4e4e7",
                    }
                },

                // Card background color
                "card.bg.color": {
                    value: {
                        _light: "white",
                        _dark: "#27272a",
                    }
                },

                // Button background color
                "button.bg.color": {
                    value: {
                        _light: "#fafafa",
                        _dark: "#27272a",
                    }
                },
                // Button hover background color
                "button.bg.color.hover": {
                    value: {
                        _light: "#f4f4f5",
                        _dark: "#3f3f46",
                    }
                },

                // Active item background color
                "active.bg.color": {
                    value: {
                        _light: "#eff6ff",
                        _dark: "#14204a",
                    }
                },

                // Active item gradient
                "active.gradient.from": {
                    value: {
                        _light: "#eff6ff",
                        _dark: "#14204a",
                    }
                },
                "active.gradient.to": {
                    value: {
                        _light: "#faf5ff",
                        _dark: "#2f0553",
                    }
                },

                // Active item text color
                "active.text.color": {
                    value: {
                        _light: "#173da6",
                        _dark: "#a3cfff",
                    }
                },

                // Footer text color
                "footer.text.color": {
                    value: {
                        _light: "#71717a",
                        _dark: "#a1a1aa",
                    }
                },
            }
        }
    },
});

export const system = createSystem(defaultConfig, config);

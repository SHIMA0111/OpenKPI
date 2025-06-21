import { LuBuilding, LuGlobe, LuMail } from "react-icons/lu";
import SettingCard from "./parts/setting-card";
import { Box, Field, Grid, NativeSelect, Flex } from "@chakra-ui/react";
import AvatarSelector from "./parts/avatar-selector";
import LabelInput from "@/components/ui/label-input";

interface BasicSettingsCardProps {
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    language: "en" | "ja" | "ko";
    timezone: "Asia/Tokyo" | "America/New_York" | "Europe/London" | "UTC";
    theme: "light" | "dark" | "system";
    onFirstNameChange: (value: string) => void;
    onLastNameChange: (value: string) => void;
    onEmailChange: (value: string) => void;
    onCompanyChange: (value: string) => void;
    onLanguageChange: (value: "en" | "ja" | "ko") => void;
    onTimezoneChange: (value: "Asia/Tokyo" | "America/New_York" | "Europe/London" | "UTC") => void;
    onThemeChange: (value: "light" | "dark" | "system") => void;
}

export default function BasicSettingsCard(props: BasicSettingsCardProps) {
    const { 
        firstName, 
        lastName, 
        email, 
        company, 
        language, 
        timezone, 
        theme, 
        onFirstNameChange, 
        onLastNameChange, 
        onEmailChange, 
        onCompanyChange, 
        onLanguageChange, 
        onTimezoneChange, 
        onThemeChange } = props;

    return (
        <SettingCard 
            title="Basic Setting" 
            titleIcon={<LuGlobe />} 
            description="Settings for your profile and basic account information."
            spaceY={4}
        >
            <AvatarSelector 
                label="User Avatar" 
                initialImageUrl="https://github.com/shadcn.png" 
                name="John Doe" 
            />
            
            <Flex align="start" gap={6}>
                <Grid templateColumns="repeat(2, minmax(0, 1fr))" gap={3} flex={1}>
                    <LabelInput label="First Name" value={firstName} onChange={(e) => onFirstNameChange(e.target.value)} />
                    <LabelInput label="Last Name" value={lastName} onChange={(e) => onLastNameChange(e.target.value)} />
                </Grid>
            </Flex>
            
            <LabelInput startElement={<LuMail />} label="Email" value={email} onChange={(e) => onEmailChange(e.target.value)} />
            <LabelInput startElement={<LuBuilding />} label="Company" value={company} onChange={(e) => onCompanyChange(e.target.value)} />
            
            <Field.Root spaceY={2}>
                <Field.Label>Language</Field.Label>
                <NativeSelect.Root>
                    <NativeSelect.Field value={language} onChange={(e) => onLanguageChange(e.target.value as "en" | "ja" | "ko")}>
                        <option value="en">English</option>
                        <option value="ja">日本語</option>
                        <option value="ko">한국어</option>
                    </NativeSelect.Field>
                </NativeSelect.Root>
            </Field.Root>

            <Grid templateColumns="repeat(2, minmax(0, 1fr))" gap={3}>
                <Box spaceY={2}>
                    <Field.Root>
                        <Field.Label>Timezone</Field.Label>
                        <NativeSelect.Root>
                            <NativeSelect.Field value={timezone} onChange={(e) => onTimezoneChange(e.target.value as "Asia/Tokyo" | "America/New_York" | "Europe/London" | "UTC")}>
                                <option value="Asia/Tokyo">Asia/Tokyo</option>
                                <option value="America/New_York">America/New_York</option>
                                <option value="Europe/London">Europe/London</option>
                                <option value="UTC">UTC</option>
                            </NativeSelect.Field>
                        </NativeSelect.Root>
                    </Field.Root>
                </Box>
                <Box spaceY={2}>
                    <Field.Root>
                        <Field.Label>Theme</Field.Label>
                        <NativeSelect.Root>
                            <NativeSelect.Field value={theme} onChange={(e) => onThemeChange(e.target.value as "light" | "dark" | "system")}>
                                <option value="light">Light</option>
                                <option value="dark">Dark</option>
                                <option value="system">System</option>
                            </NativeSelect.Field>
                        </NativeSelect.Root>
                    </Field.Root>
                </Box>
            </Grid>
        </SettingCard>
    )
}
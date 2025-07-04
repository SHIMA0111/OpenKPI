import { LuBuilding, LuGlobe, LuMail } from "react-icons/lu";
import { SettingCard } from "@/components/ui/setting-card";
import { Box, Field, Grid, NativeSelect, Flex } from "@chakra-ui/react";
import { AvatarSelector } from "@/components/ui/avatar-selector";
import LabelInput from "@/components/ui/label-input";
import LabelSelect from "@/components/ui/label-select";

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
            
            <LabelSelect
                label="Language"
                options={[
                    { label: "English", value: "en" },
                    { label: "日本語", value: "ja" },
                    { label: "한국어", value: "ko" },
                ]}
                value={language}
                onValueChange={(value) => onLanguageChange(value as "en" | "ja" | "ko")}
            />
            
            <Grid templateColumns="repeat(2, minmax(0, 1fr))" gap={3}>
                <LabelSelect 
                    label="Timezone" 
                    options={[
                        { label: "Asia/Tokyo", value: "Asia/Tokyo" },
                        { label: "America/New_York", value: "America/New_York" },
                        { label: "Europe/London", value: "Europe/London" },
                        { label: "UTC", value: "UTC" },
                    ]} 
                    value={timezone} 
                    onValueChange={(value) => onTimezoneChange(value as "Asia/Tokyo" | "America/New_York" | "Europe/London" | "UTC")} />

                <LabelSelect
                    label="Theme"
                    options={[
                        { label: "Light", value: "light" },
                        { label: "Dark", value: "dark" },
                        { label: "System", value: "system" },
                    ]}
                    value={theme}
                    onValueChange={(value) => onThemeChange(value as "light" | "dark" | "system")} />
            </Grid>
        </SettingCard>
    )
}

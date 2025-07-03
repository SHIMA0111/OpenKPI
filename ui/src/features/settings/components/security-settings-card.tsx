import { Button } from "@chakra-ui/react";
import { SettingCard } from "@/components/ui/setting-card";
import { LuShield } from "react-icons/lu";

interface SecuritySettingsCardProps {
    onPasswordChange: () => void;
    onTwoFactorAuthentication: () => void;
    onActiveSessions: () => void;
    onDeleteAccount: () => void;
}

export default function SecuritySettingsCard(props: SecuritySettingsCardProps) {
    const { onPasswordChange, onTwoFactorAuthentication, onActiveSessions, onDeleteAccount } = props;

    return (
        <SettingCard 
            title="Security Settings" 
            titleIcon={<LuShield />}
            description="Manage your security settings."
            spaceY={3}
        >
            <Button 
                variant="outline" 
                size="sm" 
                w="full" 
                onClick={onPasswordChange} 
                bg="button.bg.color" 
                color="text.color"
                borderColor="border.color"
                _hover={{ bg: "button.bg.color.hover" }}>
                Change Password
            </Button>
            <Button 
                variant="outline" 
                size="sm" 
                w="full" 
                onClick={onTwoFactorAuthentication} 
                bg="button.bg.color" 
                color="text.color"
                borderColor="border.color"
                _hover={{ bg: "button.bg.color.hover" }}>
                Two-Factor Authentication
            </Button>
            <Button 
                variant="outline" 
                size="sm" 
                w="full" 
                onClick={onActiveSessions} 
                bg="button.bg.color" 
                color="text.color"
                borderColor="border.color"
                _hover={{ bg: "button.bg.color.hover" }}>
                Active Sessions
            </Button>
            <Button bg="red.500" color="white" size="sm" w="full" onClick={onDeleteAccount}>
                Delete Account
            </Button>
        </SettingCard>
    )
}

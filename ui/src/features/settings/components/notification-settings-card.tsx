import { LuBell } from "react-icons/lu";
import { SettingCard } from "@/components/ui/setting-card";
import LabelSwitch from "@/components/ui/label-switch";

interface NotificationSettingsCardProps {
    pushNotifications: boolean;
    emailNotifications: boolean;
    onPushNotificationsChange: (enabled: boolean) => void;
    onEmailNotificationsChange: (enabled: boolean) => void;
}

export default function NotificationSettingsCard(props: NotificationSettingsCardProps) {
    const { 
        pushNotifications, 
        emailNotifications, 
        onPushNotificationsChange, 
        onEmailNotificationsChange } = props;

    return (
        <SettingCard 
            title="Notification Settings" 
            titleIcon={<LuBell />} 
            description="Manage your notification settings."
            spaceY={3}
        >
            <LabelSwitch
                label="Push Notifications"
                description="Enable push notifications for new messages and updates."
                checked={pushNotifications}
                onCheckedChange={onPushNotificationsChange}
            />
            
            <LabelSwitch
                label="Email Notifications"
                description="Enable email notifications for new messages and updates."
                checked={emailNotifications}
                onCheckedChange={onEmailNotificationsChange}
            />
        </SettingCard>
    )
}

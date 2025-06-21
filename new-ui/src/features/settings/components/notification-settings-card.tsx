import { LuBell } from "react-icons/lu";
import SettingCard from "./parts/setting-card";
import { Field, Switch, Flex, Text } from "@chakra-ui/react";

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
            <Flex align="center" justify="space-between">
                <Field.Root spaceY={.5}>
                    <Field.Label>Push Notifications</Field.Label>
                    <Text textStyle="xs" color="gray.500">
                        Enable push notifications for new messages and updates.
                    </Text>
                </Field.Root>
                <Switch.Root checked={pushNotifications} onCheckedChange={(e) => onPushNotificationsChange(e.checked)}>
                    <Switch.HiddenInput />
                    <Switch.Control />
                    <Switch.Label />
                </Switch.Root>
            </Flex>
            <Flex align="center" justify="space-between">
                <Field.Root spaceY={.5}>
                    <Field.Label>Email Notifications</Field.Label>
                    <Text textStyle="xs" color="gray.500">
                        Enable email notifications for new messages and updates.
                    </Text>
                </Field.Root>
                <Switch.Root checked={emailNotifications} onCheckedChange={(e) => onEmailNotificationsChange(e.checked)}>
                    <Switch.HiddenInput />
                    <Switch.Control />
                    <Switch.Label />
                </Switch.Root>
            </Flex>
        </SettingCard>
    )
}
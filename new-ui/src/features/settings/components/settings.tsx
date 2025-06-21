"use client"

import { Box, Flex, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import { useState } from "react";
import BasicSettingsCard from "./basic-settings-card";
import NotificationSettingsCard from "./notification-settings-card";
import SecuritySettingsCard from "./security-settings-card";

export default function Settings() {
    const [firstName, setFirstName] = useState("John");
    const [lastName, setLastName] = useState("Doe");
    
    return (
        <Box h="100%" spaceY={6} p={6} bgColor="screen.bg.color">
            <Flex align="center" justify="space-between">
                <Box spaceY={2}> 
                    <Heading as="h1" textStyle="2xl" color="text.color">Settings</Heading>
                    <Text color="text.color">
                        Manage your account settings and preferences.
                    </Text>
                </Box>
            </Flex>

            <Grid gap={6} templateColumns={{ md: "repeat(3, minmax(0, 1fr))" }}>
                {/* Basic Settings Card */}
                <GridItem rowSpan={{ md: 2 }} colSpan={{ md: 2 }}>
                    <BasicSettingsCard
                        firstName={firstName}
                        lastName={lastName}
                        email="john.doe@example.com"
                        company="Acme Inc."
                        language="en"
                        timezone="Asia/Tokyo"
                        theme="light"
                        onFirstNameChange={setFirstName}
                        onLastNameChange={setLastName}
                        onEmailChange={() => {}}
                        onCompanyChange={() => {}}
                        onLanguageChange={() => {}}
                        onTimezoneChange={() => {}}
                        onThemeChange={() => {}}
                    />
                </GridItem>

                {/* Notification Settings Card */}
                <GridItem colSpan={{ md: 1 }} rowSpan={{ md: 1 }}>
                    <NotificationSettingsCard
                        pushNotifications={true}
                        emailNotifications={true}
                        onPushNotificationsChange={() => {}}
                        onEmailNotificationsChange={() => {}}
                    />
                </GridItem>

                {/* Security Settings Card */}
                <GridItem colSpan={{ md: 1 }} rowSpan={{ md: 1 }}>
                    <SecuritySettingsCard
                        onPasswordChange={() => {}}
                        onTwoFactorAuthentication={() => {}}
                        onActiveSessions={() => {}}
                        onDeleteAccount={() => {}}
                    />
                </GridItem>
            </Grid>
        </Box>
    )
}
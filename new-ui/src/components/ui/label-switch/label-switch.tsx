import { Field, Flex, Switch, Text } from "@chakra-ui/react";

interface LabelSwitchProps {
    label: string;
    description?: string;
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
}

export default function LabelSwitch(props: LabelSwitchProps) {
    const { label, description, checked, onCheckedChange } = props;

    return (
        <Flex align="center" justify="space-between">
            <Field.Root spaceY={.5}>
                <Field.Label>{label}</Field.Label>
                {description && (
                    <Text textStyle="xs" color="gray.500">
                        {description}
                    </Text>
                )}
            </Field.Root>
            <Switch.Root checked={checked} onCheckedChange={(e) => onCheckedChange(e.checked)}>
                <Switch.HiddenInput />
                <Switch.Control />
                <Switch.Label />
            </Switch.Root>
        </Flex>
    )
}
import { Box, createListCollection, Portal, Select } from "@chakra-ui/react";

interface LabelSelectProps {
    label: string;
    options: {
        label: string;
        value: string;
    }[];
    value: string;
    onValueChange: (value: string) => void;
}

export default function LabelSelect(props: LabelSelectProps) {
    const { label, options, value, onValueChange } = props;

    const selectItems = createListCollection({
        items: options,
    });

    return (
        <Box spaceY={2}>
            <Select.Root 
                collection={selectItems} 
                value={[value]}
                onValueChange={(value) => onValueChange(value.value[0])}
            >
                <Select.HiddenSelect />
                <Select.Label>{label}</Select.Label>
                <Select.Control>
                    <Select.Trigger>
                        <Select.ValueText placeholder={`Select ${label}`} />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                        <Select.Indicator />
                    </Select.IndicatorGroup>
                </Select.Control>
                <Portal>
                    <Select.Positioner>
                        <Select.Content>
                            {
                                selectItems.items.map((item) => (
                                    <Select.Item item={item} key={item.value}>
                                        {item.label}
                                    </Select.Item>
                                ))
                            }
                        </Select.Content>
                    </Select.Positioner>
                </Portal>
            </Select.Root>
        </Box>
    )
}
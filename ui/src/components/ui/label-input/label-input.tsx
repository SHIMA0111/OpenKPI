import { Input as ChakraInput, Field, InputGroup, InputProps as ChakraInputProps, FieldErrorText } from "@chakra-ui/react";

interface InputProps extends ChakraInputProps {
    label?: string;
    startElement?: React.ReactNode;
    endElement?: React.ReactNode;
    disabledRequiredIndicator?: boolean;
    invalid?: boolean;
    invalidMessage?: string;
}

export default function LabelInput(props: InputProps) {
    const { 
        label, 
        startElement, 
        endElement, 
        disabledRequiredIndicator = false, 
        required = false, 
        color = "text.color", 
        borderColor = "border.color", 
        invalid = false, 
        invalidMessage, 
        ...inputProps } = props;
    return (
        <Field.Root required={required} invalid={invalid}>
            <Field.Label color={color}>
                {label}
                {required && !disabledRequiredIndicator && <Field.RequiredIndicator />}
            </Field.Label>
            <InputGroup startElement={startElement} endElement={endElement}>
                <ChakraInput 
                    {...inputProps} 
                    color={color} 
                    borderColor={borderColor} />
            </InputGroup>
            {invalid && invalidMessage && <FieldErrorText>{invalidMessage}</FieldErrorText>}
        </Field.Root>
    );
}
import { CloseButton, Dialog, Portal } from "@chakra-ui/react";

interface AuthDialogProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    title: string;
    children: React.ReactNode;
}


export default function AuthDialog(props: AuthDialogProps) {
    const { isOpen, setIsOpen, title, children } = props;

    return (
        <Dialog.Root lazyMount open={isOpen} placement="center" onOpenChange={(e) => setIsOpen(e.open)}>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>{title}</Dialog.Title>
                            <Dialog.CloseTrigger asChild>
                                <CloseButton />
                            </Dialog.CloseTrigger>
                        </Dialog.Header>
                        <Dialog.Body>
                            {children}
                        </Dialog.Body>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
}
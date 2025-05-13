import { useState, useRef } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  SimpleGrid,
  Box,
  Avatar,
  useColorModeValue,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Input,
  FormControl,
  FormLabel,
  Image,
  Center,
  Flex,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useUser } from '../contexts/UserContext.tsx';
import { FaUser, FaUserTie, FaUserNinja, FaUserAstronaut, FaUserMd, FaUserGraduate } from 'react-icons/fa';

// Define available avatar options
const avatarOptions = [
  { id: 'default', icon: FaUser, label: 'Default' },
  { id: 'business', icon: FaUserTie, label: 'Business' },
  { id: 'ninja', icon: FaUserNinja, label: 'Ninja' },
  { id: 'astronaut', icon: FaUserAstronaut, label: 'Astronaut' },
  { id: 'doctor', icon: FaUserMd, label: 'Doctor' },
  { id: 'graduate', icon: FaUserGraduate, label: 'Graduate' },
];

interface UserSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserSettingsModal = ({ isOpen, onClose }: UserSettingsModalProps) => {
  const { currentUser, updateUserAvatar } = useUser();
  const [activeTab, setActiveTab] = useState(currentUser?.avatarType === 'image' ? 1 : 0);
  const [selectedAvatar, setSelectedAvatar] = useState(currentUser?.avatar || 'default');
  const [selectedAvatarType, setSelectedAvatarType] = useState<'icon' | 'image'>(
    currentUser?.avatarType || 'icon'
  );
  const [imageUrl, setImageUrl] = useState(
    currentUser?.avatarType === 'image' ? currentUser.avatar : ''
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const bgColor = useColorModeValue('white', 'gray.800');
  const selectedBgColor = useColorModeValue('brand.50', 'brand.900');
  const selectedBorderColor = useColorModeValue('brand.500', 'brand.200');

  // Handle tab change
  const handleTabChange = (index: number) => {
    setActiveTab(index);
    setSelectedAvatarType(index === 0 ? 'icon' : 'image');
  };

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImageUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle save button click
  const handleSave = () => {
    if (selectedAvatarType === 'icon') {
      updateUserAvatar(selectedAvatar, 'icon');
    } else if (imageUrl) {
      updateUserAvatar(imageUrl, 'image');
    }
    onClose();
  };

  // Get the icon component for a given avatar ID
  const getAvatarIcon = (avatarId: string) => {
    const option = avatarOptions.find(opt => opt.id === avatarId);
    return option ? option.icon : FaUser;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>User Settings</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Tabs index={activeTab} onChange={handleTabChange} isFitted variant="enclosed">
            <TabList mb="1em">
              <Tab>Icon</Tab>
              <Tab>Image</Tab>
            </TabList>
            <TabPanels>
              {/* Icon Selection Panel */}
              <TabPanel>
                <VStack spacing={6}>
                  <Text fontWeight="bold">Select your avatar icon</Text>

                  <SimpleGrid columns={3} spacing={4} width="100%">
                    {avatarOptions.map((option) => (
                      <Box
                        key={option.id}
                        p={4}
                        borderWidth="1px"
                        borderRadius="md"
                        borderColor={selectedAvatar === option.id ? selectedBorderColor : 'gray.200'}
                        bg={selectedAvatar === option.id ? selectedBgColor : bgColor}
                        cursor="pointer"
                        onClick={() => setSelectedAvatar(option.id)}
                        _hover={{ shadow: 'md' }}
                        textAlign="center"
                      >
                        <VStack>
                          <Avatar 
                            size="md" 
                            bg="brand.500" 
                            icon={<option.icon />} 
                          />
                          <Text fontSize="sm">{option.label}</Text>
                        </VStack>
                      </Box>
                    ))}
                  </SimpleGrid>
                </VStack>
              </TabPanel>

              {/* Image Upload Panel */}
              <TabPanel>
                <VStack spacing={6}>
                  <Text fontWeight="bold">Upload a profile image</Text>

                  <FormControl>
                    <FormLabel htmlFor="avatar-image">Choose an image</FormLabel>
                    <Input
                      type="file"
                      id="avatar-image"
                      accept="image/*"
                      onChange={handleFileChange}
                      ref={fileInputRef}
                      display="none"
                    />
                    <Button 
                      leftIcon={<AddIcon />} 
                      onClick={() => fileInputRef.current?.click()}
                      colorScheme="brand"
                      mb={4}
                    >
                      Select Image
                    </Button>
                  </FormControl>

                  {imageUrl && (
                    <Box borderWidth="1px" borderRadius="md" p={4} width="100%">
                      <Center>
                        <Image 
                          src={imageUrl} 
                          alt="Avatar preview" 
                          maxH="150px" 
                          borderRadius="full"
                        />
                      </Center>
                    </Box>
                  )}
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button 
            colorScheme="brand" 
            onClick={handleSave}
            isDisabled={selectedAvatarType === 'image' && !imageUrl}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserSettingsModal;

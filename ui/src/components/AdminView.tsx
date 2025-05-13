import { useState } from 'react';
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Avatar,
  Button,
  Flex,
  Text,
  useColorModeValue,
  Badge,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Grid,
  GridItem,
  VStack,
  HStack,
  Icon,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { FaUser, FaUserTie, FaUserNinja, FaUserAstronaut, FaUserMd, FaUserGraduate, FaChartBar, FaChartLine, FaChartPie } from 'react-icons/fa';
import { mockUsers } from '../contexts/UserContext.tsx';
import { getAllKPIs, getUserKPIs, type KPI } from '../services/kpiService.ts';
import KPIPanel from './KPIPanel.tsx';

// Define props for the component
interface AdminViewProps {
  onBack: () => void;
}

const AdminView = ({ onBack }: AdminViewProps) => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [userKPIs, setUserKPIs] = useState<KPI[]>([]);
  const [selectedKPI, setSelectedKPI] = useState<KPI | null>(null);
  const [selectedKPIIndex, setSelectedKPIIndex] = useState<number>(-1);
  const [isKPIDetailView, setIsKPIDetailView] = useState<boolean>(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  // Get all KPIs for a specific user
  const viewUserKPIs = (userId: string) => {
    const kpis = getUserKPIs(userId);
    setUserKPIs(kpis);
    setSelectedUser(userId);
    setIsKPIDetailView(false);
    setSelectedKPIIndex(-1);
  };

  // View details of a specific KPI in modal
  const viewKPIDetails = (kpi: KPI) => {
    setSelectedKPI(kpi);
    onOpen();
  };

  // View details of a specific KPI in full screen
  const viewKPIFullScreen = (index: number) => {
    setSelectedKPIIndex(index);
    setIsKPIDetailView(true);
  };

  // Go back to KPI list view
  const backToKPIList = () => {
    setIsKPIDetailView(false);
    setSelectedKPIIndex(-1);
  };

  // Get the icon component for a given avatar ID
  const getAvatarIcon = (avatarId: string) => {
    switch (avatarId) {
      case 'business':
        return <FaUserTie />;
      case 'ninja':
        return <FaUserNinja />;
      case 'astronaut':
        return <FaUserAstronaut />;
      case 'doctor':
        return <FaUserMd />;
      case 'graduate':
        return <FaUserGraduate />;
      default:
        return <FaUser />;
    }
  };

  // Get the user's display name by ID
  const getUserName = (userId: string) => {
    const user = mockUsers.find(u => u.id === userId);
    return user ? user.displayName : 'Unknown User';
  };

  return (
    <Box h="calc(100vh - 100px)" display="flex" flexDirection="column">
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Heading size="lg">Admin Dashboard</Heading>
        <Button onClick={onBack} colorScheme="brand" variant="outline">
          Back to My Dashboard
        </Button>
      </Flex>

      {!selectedUser ? (
        // User list view
        <Box 
          borderWidth="1px" 
          borderRadius="lg" 
          bg={bgColor}
          flex="1"
          display="flex"
          flexDirection="column"
          overflow="hidden"
        >
          <Heading size="md" p={4} borderBottomWidth="1px" borderColor={borderColor}>
            User Management
          </Heading>
          <Box overflowY="auto">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>User</Th>
                  <Th>Username</Th>
                  <Th>KPIs</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {mockUsers.map((user) => {
                  const userKPICount = getUserKPIs(user.id).length;
                  return (
                    <Tr key={user.id}>
                      <Td>
                        <Flex alignItems="center">
                          {user.avatarType === 'image' ? (
                            <Avatar size="sm" src={user.avatar} mr={2} />
                          ) : user.avatar && user.avatar !== 'default' ? (
                            <Avatar size="sm" icon={getAvatarIcon(user.avatar)} mr={2} bg="brand.500" />
                          ) : (
                            <Avatar size="sm" name={user.displayName} mr={2} bg="brand.500" />
                          )}
                          <Text fontWeight="medium">{user.displayName}</Text>
                        </Flex>
                      </Td>
                      <Td>{user.username}</Td>
                      <Td>
                        <Badge colorScheme={userKPICount > 0 ? "green" : "gray"}>
                          {userKPICount} KPIs
                        </Badge>
                      </Td>
                      <Td>
                        <Button 
                          size="sm" 
                          colorScheme="brand" 
                          onClick={() => viewUserKPIs(user.id)}
                          isDisabled={userKPICount === 0}
                        >
                          View KPIs
                        </Button>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </Box>
        </Box>
      ) : isKPIDetailView && selectedKPIIndex >= 0 && selectedKPIIndex < userKPIs.length ? (
        // Full-screen KPI detail view
        <Box flex="1" display="flex" flexDirection="column" overflow="hidden">
          <Flex justifyContent="space-between" alignItems="center" mb={4}>
            <VStack align="start" spacing={1}>
              <Heading size="md">
                {getUserName(selectedUser)}'s KPI Dashboard
              </Heading>
              <Text color="gray.500" fontSize="sm">
                Viewing {getUserName(selectedUser)}'s KPI dashboard
              </Text>
            </VStack>
            <Button size="sm" onClick={backToKPIList} colorScheme="brand" variant="outline">
              Back to User List
            </Button>
          </Flex>

          <Grid templateColumns="250px 1fr" gap={6} flex="1" overflow="hidden">
            {/* Sidebar */}
            <GridItem 
              borderWidth="1px" 
              borderRadius="lg" 
              p={4} 
              bg="white" 
              overflowY="auto"
            >
              <VStack align="stretch" spacing={2}>
                <Flex justifyContent="space-between" alignItems="center" mb={2}>
                  <Text fontWeight="bold">{getUserName(selectedUser)}'s KPIs</Text>
                  <Button
                    leftIcon={<ArrowBackIcon />}
                    size="sm"
                    variant="ghost"
                    onClick={backToKPIList}
                  >
                    Back
                  </Button>
                </Flex>

                {userKPIs.map((kpi, idx) => (
                  <HStack 
                    key={kpi.id}
                    p={3}
                    borderRadius="md"
                    bg={idx === selectedKPIIndex ? "brand.50" : "transparent"}
                    borderWidth={idx === selectedKPIIndex ? "1px" : "0"}
                    borderColor="brand.200"
                    cursor="pointer"
                    onClick={() => setSelectedKPIIndex(idx)}
                    _hover={{ bg: idx === selectedKPIIndex ? "brand.50" : "gray.50" }}
                  >
                    {kpi.type === 'bar' && <Icon as={FaChartBar} mr={2} color="brand.500" />}
                    {kpi.type === 'line' && <Icon as={FaChartLine} mr={2} color="brand.500" />}
                    {kpi.type === 'pie' && <Icon as={FaChartPie} mr={2} color="brand.500" />}
                    <Text fontWeight={idx === selectedKPIIndex ? "bold" : "normal"}>{kpi.title}</Text>
                  </HStack>
                ))}
              </VStack>
            </GridItem>

            {/* Main content */}
            <GridItem borderWidth="1px" borderRadius="lg" p={6} bg="white" overflowY="auto" maxH="100%">
              <KPIPanel 
                kpi={userKPIs[selectedKPIIndex]} 
                onDelete={() => {}} 
                readOnly={true}
              />
            </GridItem>
          </Grid>
        </Box>
      ) : (
        // User KPIs list view
        <Box flex="1" display="flex" flexDirection="column" overflow="hidden">
          <Flex justifyContent="space-between" alignItems="center" mb={4}>
            <Heading size="md">
              KPIs for {getUserName(selectedUser)}
            </Heading>
            <Button size="sm" onClick={() => setSelectedUser(null)}>
              Back to User List
            </Button>
          </Flex>

          {userKPIs.length === 0 ? (
            <Box p={4} borderWidth="1px" borderRadius="lg" bg={bgColor} flex="1">
              <Text>No KPIs found for this user.</Text>
            </Box>
          ) : (
            <Box borderWidth="1px" borderRadius="lg" bg={bgColor} flex="1" overflow="hidden">
              <Box overflowY="auto" height="100%">
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Title</Th>
                      <Th>Type</Th>
                      <Th>Data Points</Th>
                      <Th>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {userKPIs.map((kpi, index) => (
                      <Tr key={kpi.id}>
                        <Td>{kpi.title}</Td>
                        <Td>
                          <Badge>
                            {kpi.type.charAt(0).toUpperCase() + kpi.type.slice(1)} Chart
                          </Badge>
                        </Td>
                        <Td>{kpi.data.labels.length}</Td>
                        <Td>
                          <Button 
                            size="sm" 
                            colorScheme="brand" 
                            onClick={() => viewKPIFullScreen(index)}
                            mr={2}
                          >
                            View Full Screen
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => viewKPIDetails(kpi)}
                          >
                            Quick View
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            </Box>
          )}
        </Box>
      )}

      {/* KPI Detail Modal (Quick View) */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent maxH="90vh">
          <ModalHeader>KPI Details - {selectedKPI?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody overflowY="auto">
            {selectedKPI && (
              <KPIPanel 
                kpi={selectedKPI} 
                onDelete={() => {}} // Read-only view, no delete functionality
                readOnly={true}
              />
            )}
          </ModalBody>
          <ModalFooter>
            <Button 
              colorScheme="brand" 
              mr={3}
              onClick={() => {
                // Find the index of the selected KPI
                const index = userKPIs.findIndex(kpi => kpi.id === selectedKPI?.id);
                if (index !== -1) {
                  // Close the modal and open the full-screen view
                  onClose();
                  viewKPIFullScreen(index);
                }
              }}
            >
              View Full Screen
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AdminView;

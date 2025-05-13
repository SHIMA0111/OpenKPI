import { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  VStack,
  Text,
  Icon,
  useDisclosure,
  Grid,
  GridItem,
  HStack,
  Circle,
  SimpleGrid,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
} from '@chakra-ui/react'
import { AddIcon, ArrowBackIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { 
  FaChartBar, 
  FaChartLine, 
  FaChartPie, 
  FaHome, 
  FaSignOutAlt, 
  FaCog, 
  FaUser,
  FaUserTie,
  FaUserNinja,
  FaUserAstronaut,
  FaUserMd,
  FaUserGraduate
} from 'react-icons/fa'
import KPIConfigModal from './components/KPIConfigModal.tsx'
import KPIPanel from './components/KPIPanel.tsx'
import HomeView from './components/HomeView.tsx'
import Login from './components/Login.tsx'
import UserSettingsModal from './components/UserSettingsModal.tsx'
import AdminView from './components/AdminView.tsx'
import { useUser } from './contexts/UserContext.tsx'
import {type KPI, getUserKPIs, addKPI as addUserKPI, deleteKPI as deleteUserKPI, initializeKPIs } from './services/kpiService.ts'
import { mockUsers } from './contexts/UserContext.tsx'
import './App.css'

function App() {
  // Get user context
  const { currentUser, logout, isAuthenticated } = useUser();

  // State for KPIs
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [tabIndex, setTabIndex] = useState(0);
  // State to track if we're on the home view or detail view
  const [isHomeView, setIsHomeView] = useState(true);
  // State to track if we're in admin view
  const [isAdminView, setIsAdminView] = useState(false);

  // Check if current user is an admin
  const isAdmin = currentUser?.username === 'admin';

  // Modal controls for KPI configuration
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Modal controls for user settings
  const { 
    isOpen: isSettingsOpen, 
    onOpen: onSettingsOpen, 
    onClose: onSettingsClose 
  } = useDisclosure();

  // Initialize KPIs with user IDs when the app loads
  useEffect(() => {
    // Extract user IDs from mockUsers
    const userIds = mockUsers.map(user => user.id);
    // Initialize KPIs with these IDs
    initializeKPIs(userIds);
  }, []);

  // Load user-specific KPIs when user changes
  useEffect(() => {
    if (currentUser) {
      const userKPIs = getUserKPIs(currentUser.id);
      setKpis(userKPIs);
    } else {
      setKpis([]);
    }
  }, [currentUser]);

  // Add a new KPI
  const handleAddKPI = (newKPI: Omit<KPI, 'id' | 'userId'>) => {
    if (currentUser) {
      const kpiWithUser = {
        ...newKPI,
        userId: currentUser.id
      };

      const addedKPI = addUserKPI(kpiWithUser);
      setKpis([...kpis, addedKPI]);
      setTabIndex(kpis.length); // Switch to the new tab
      setIsHomeView(false); // Switch to detail view after adding
      onClose();
    }
  };

  // Delete a KPI
  const handleDeleteKPI = (id: string) => {
    const deleted = deleteUserKPI(id);

    if (deleted) {
      const newKPIs = kpis.filter(kpi => kpi.id !== id);
      setKpis(newKPIs);
      if (tabIndex >= newKPIs.length && tabIndex > 0) {
        setTabIndex(newKPIs.length - 1);
      }
      // If we deleted all KPIs, go back to home view
      if (newKPIs.length === 0) {
        setIsHomeView(true);
      }
    }
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    setIsHomeView(true);
    setTabIndex(0);
  };

  // Navigate to home view
  const goToHome = () => {
    setIsHomeView(true);
  };

  // Navigate to detail view for a specific KPI
  const goToDetail = (index: number) => {
    setTabIndex(index);
    setIsHomeView(false);
  };

  // Toggle admin view
  const toggleAdminView = () => {
    setIsAdminView(!isAdminView);
    // When entering admin view, ensure we're not in home or detail view
    if (!isAdminView) {
      setIsHomeView(true);
    }
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

  return (
    <Container maxW="container.xl" p={4}>
      {!isAuthenticated ? (
        // Login screen when not authenticated
        <Login />
      ) : (
        // Dashboard when authenticated
        <>
          <Flex justifyContent="space-between" alignItems="center" mb={6}>
            <Heading as="h1" size="xl">KPI Dashboard</Heading>
            <Flex alignItems="center" gap={4}>
              {!isHomeView && kpis.length > 0 && (
                <IconButton
                  aria-label="Go to home"
                  icon={<FaHome />}
                  colorScheme="brand"
                  onClick={goToHome}
                />
              )}

              {/* User menu */}
              <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  <Flex alignItems="center">
                    {currentUser?.avatarType === 'image' ? (
                      <Avatar 
                        size="xs" 
                        src={currentUser.avatar} 
                        mr={2} 
                      />
                    ) : currentUser?.avatar && currentUser.avatar !== 'default' ? (
                      <Avatar 
                        size="xs" 
                        icon={getAvatarIcon(currentUser.avatar)} 
                        mr={2} 
                        bg="brand.500" 
                      />
                    ) : (
                      <Avatar 
                        size="xs" 
                        name={currentUser?.displayName} 
                        mr={2} 
                        bg="brand.500" 
                      />
                    )}
                    <Text>{currentUser?.displayName}</Text>
                  </Flex>
                </MenuButton>
                <MenuList>
                  <MenuItem icon={<FaCog />} onClick={onSettingsOpen}>
                    Settings
                  </MenuItem>
                  {isAdmin && (
                    <MenuItem 
                      icon={isAdminView ? <FaHome /> : <FaUserTie />} 
                      onClick={toggleAdminView}
                    >
                      {isAdminView ? 'My Dashboard' : 'Admin Dashboard'}
                    </MenuItem>
                  )}
                  <MenuItem icon={<FaSignOutAlt />} onClick={handleLogout}>
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Flex>

          {isAdminView ? (
            // Admin view
            <AdminView onBack={toggleAdminView} />
          ) : kpis.length === 0 ? (
            <Box 
              p={10} 
              borderWidth="1px" 
              borderRadius="lg" 
              textAlign="center"
              bg="gray.50"
            >
              <VStack spacing={4}>
                <Icon as={FaChartBar} boxSize={12} color="gray.400" />
                <Text fontSize="xl" color="gray.500">
                  No KPIs added yet. Click on a chart type below to get started.
                </Text>
              </VStack>

              <SimpleGrid columns={3} spacing={10} mt={10} maxW="600px" mx="auto">
                {[
                  { type: 'bar', icon: FaChartBar, label: 'Bar Chart' },
                  { type: 'line', icon: FaChartLine, label: 'Line Chart' },
                  { type: 'pie', icon: FaChartPie, label: 'Pie Chart' }
                ].map((chart) => (
                  <Box 
                    key={chart.type}
                    p={5}
                    borderWidth="1px"
                    borderRadius="lg"
                    textAlign="center"
                    cursor="pointer"
                    _hover={{ shadow: 'md', borderColor: 'brand.500' }}
                    onClick={() => {
                      onOpen();
                    }}
                  >
                    <VStack>
                      <Circle size="60px" bg="gray.100" mb={2}>
                        <Icon as={chart.icon} boxSize={6} color="brand.500" />
                      </Circle>
                      <Text>{chart.label}</Text>
                      <Circle size="24px" bg="brand.500" mt={2}>
                        <AddIcon color="white" boxSize={3} />
                      </Circle>
                    </VStack>
                  </Box>
                ))}
              </SimpleGrid>
            </Box>
          ) : isHomeView ? (
            // Home view with KPI overview
            <Box>
              <HomeView kpis={kpis} onSelectKPI={goToDetail} />
              <Flex justifyContent="center" mt={6}>
                <Button
                  leftIcon={<AddIcon />}
                  colorScheme="brand"
                  onClick={onOpen}
                  size="md"
                >
                  Add New KPI
                </Button>
              </Flex>
            </Box>
          ) : (
            // Detail view with sidebar and selected KPI
            <Grid templateColumns="250px 1fr" gap={6} h="calc(100vh - 120px)">
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
                    <Text fontWeight="bold">Your KPIs</Text>
                    <IconButton
                      aria-label="Back to overview"
                      icon={<ArrowBackIcon />}
                      size="sm"
                      variant="ghost"
                      onClick={goToHome}
                    />
                  </Flex>

                  {kpis.map((kpi, idx) => (
                    <HStack 
                      key={kpi.id}
                      p={3}
                      borderRadius="md"
                      bg={idx === tabIndex ? "brand.50" : "transparent"}
                      borderWidth={idx === tabIndex ? "1px" : "0"}
                      borderColor="brand.200"
                      cursor="pointer"
                      onClick={() => setTabIndex(idx)}
                      _hover={{ bg: idx === tabIndex ? "brand.50" : "gray.50" }}
                    >
                      {kpi.type === 'bar' && <Icon as={FaChartBar} mr={2} color="brand.500" />}
                      {kpi.type === 'line' && <Icon as={FaChartLine} mr={2} color="brand.500" />}
                      {kpi.type === 'pie' && <Icon as={FaChartPie} mr={2} color="brand.500" />}
                      <Text fontWeight={idx === tabIndex ? "bold" : "normal"}>{kpi.title}</Text>
                    </HStack>
                  ))}

                  {/* Add KPI button in sidebar */}
                  <Box mt={4} textAlign="center">
                    <SimpleGrid columns={3} spacing={4}>
                      {[
                        { type: 'bar', icon: FaChartBar },
                        { type: 'line', icon: FaChartLine },
                        { type: 'pie', icon: FaChartPie }
                      ].map((chart) => (
                        <Box 
                          key={chart.type}
                          p={2}
                          borderWidth="1px"
                          borderRadius="md"
                          cursor="pointer"
                          _hover={{ shadow: 'sm', borderColor: 'brand.500' }}
                          onClick={onOpen}
                        >
                          <VStack spacing={1}>
                            <Icon as={chart.icon} boxSize={5} color="brand.500" />
                            <Circle size="16px" bg="brand.500">
                              <AddIcon color="white" boxSize={2} />
                            </Circle>
                          </VStack>
                        </Box>
                      ))}
                    </SimpleGrid>
                  </Box>
                </VStack>
              </GridItem>

              {/* Main content */}
              <GridItem borderWidth="1px" borderRadius="lg" p={6} bg="white" overflowY="auto">
                {kpis.length > 0 && tabIndex < kpis.length && (
                  <KPIPanel 
                    kpi={kpis[tabIndex]} 
                    onDelete={() => handleDeleteKPI(kpis[tabIndex].id)} 
                  />
                )}
              </GridItem>
            </Grid>
          )}

          <KPIConfigModal 
            isOpen={isOpen} 
            onClose={onClose} 
            onSave={handleAddKPI} 
          />

          {/* User Settings Modal */}
          <UserSettingsModal
            isOpen={isSettingsOpen}
            onClose={onSettingsClose}
          />
        </>
      )}
    </Container>
  )
}

export default App

import { Box, SimpleGrid, Text, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Flex, Icon, useColorModeValue } from '@chakra-ui/react';
import { FaChartBar, FaChartLine, FaChartPie } from 'react-icons/fa';
import type { KPI } from '../services/kpiService.ts';

interface HomeViewProps {
  kpis: KPI[];
  onSelectKPI: (index: number) => void;
}

const HomeView = ({ kpis, onSelectKPI }: HomeViewProps) => {
  // Call hooks at the top level
  const cardBg = useColorModeValue('white', 'gray.700');

  // Function to get the appropriate icon for each chart type
  const getChartIcon = (type: 'bar' | 'line' | 'pie') => {
    switch (type) {
      case 'bar':
        return FaChartBar;
      case 'line':
        return FaChartLine;
      case 'pie':
        return FaChartPie;
      default:
        return FaChartBar;
    }
  };

  // Function to calculate total value for a KPI
  const calculateTotal = (values: number[]) => {
    return values.reduce((sum, value) => sum + value, 0);
  };

  // Function to calculate a simple achievement rate (for demo purposes)
  // In a real app, this would be based on targets or historical data
  const calculateAchievementRate = (kpi: KPI) => {
    const total = calculateTotal(kpi.data.values);
    // For demo purposes, we'll use the first value as a reference point
    // and calculate how much the total exceeds or falls short of it
    const referenceValue = kpi.data.values[0] || 1;
    return ((total / referenceValue) - 1) * 100;
  };

  // Generate a color based on achievement rate
  const getAchievementColor = (rate: number) => {
    if (rate >= 10) return "green.500";
    if (rate >= 0) return "blue.500";
    if (rate >= -10) return "orange.500";
    return "red.500";
  };

  return (
    <Box p={5}>
      <Text fontSize="2xl" fontWeight="bold" mb={6}>KPI Overview</Text>

      {kpis.length === 0 ? (
        <Box textAlign="center" p={10}>
          <Text color="gray.500">No KPIs available. Create your first KPI to get started.</Text>
        </Box>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {kpis.map((kpi, index) => {
            const total = calculateTotal(kpi.data.values);
            const achievementRate = calculateAchievementRate(kpi);
            const isPositive = achievementRate >= 0;

            return (
              <Box
                key={kpi.id}
                p={5}
                shadow="md"
                borderWidth="1px"
                borderRadius="lg"
                bg={cardBg}
                cursor="pointer"
                onClick={() => onSelectKPI(index)}
                _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
                transition="all 0.2s"
              >
                <Flex justifyContent="space-between" alignItems="center" mb={3}>
                  <Text fontWeight="bold" fontSize="lg" isTruncated>{kpi.title}</Text>
                  <Icon as={getChartIcon(kpi.type)} color="brand.500" boxSize={5} />
                </Flex>

                <Stat>
                  <StatLabel>Total Value</StatLabel>
                  <StatNumber>{total.toLocaleString()}</StatNumber>
                  <StatHelpText color={getAchievementColor(achievementRate)}>
                    <StatArrow type={isPositive ? 'increase' : 'decrease'} />
                    {Math.abs(achievementRate).toFixed(1)}% {isPositive ? 'increase' : 'decrease'}
                  </StatHelpText>
                </Stat>

                <Box mt={2}>
                  <Text fontSize="sm" color="gray.500">
                    {kpi.data.labels.length} data points
                  </Text>
                </Box>
              </Box>
            );
          })}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default HomeView;

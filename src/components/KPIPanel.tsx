import { Box, Button, Flex, Heading, useColorModeValue, Table, Thead, Tbody, Tr, Th, Td, Text } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement, 
  ArcElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import type { KPI } from '../services/kpiService';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Define props for the component
interface KPIPanelProps {
  kpi: KPI;
  onDelete: () => void;
  readOnly?: boolean;
}

// Define the KPI panel component
const KPIPanel = ({ kpi, onDelete, readOnly = false }: KPIPanelProps) => {
  // Generate random colors for charts
  const generateColors = (count: number) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
      const hue = (i * 137) % 360; // Use golden angle approximation for even distribution
      colors.push(`hsl(${hue}, 70%, 60%)`);
    }
    return colors;
  };

  // Prepare chart data
  const chartData = {
    labels: kpi.data.labels,
    datasets: [
      {
        label: kpi.title,
        data: kpi.data.values,
        backgroundColor: generateColors(kpi.data.labels.length),
        borderColor: kpi.type !== 'pie' ? generateColors(1)[0] : undefined,
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: kpi.title,
      },
    },
  };

  // Background color for the panel
  const bgColor = useColorModeValue('white', 'gray.800');

  // Calculate total and percentages
  const total = kpi.data.values.reduce((sum, value) => sum + value, 0);
  const percentages = kpi.data.values.map(value => (total > 0 ? (value / total) * 100 : 0));

  // Render the appropriate chart based on type
  const renderChart = () => {
    switch (kpi.type) {
      case 'bar':
        return <Bar data={chartData} options={chartOptions} />;
      case 'line':
        return <Line data={chartData} options={chartOptions} />;
      case 'pie':
        return <Pie data={chartData} options={chartOptions} />;
      default:
        return null;
    }
  };

  return (
    <Box 
      p={5} 
      shadow="md" 
      borderWidth="1px" 
      borderRadius="lg" 
      bg={bgColor}
    >
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Heading size="md">{kpi.title}</Heading>
        {!readOnly && (
          <Button
            leftIcon={<DeleteIcon />}
            colorScheme="red"
            variant="ghost"
            size="sm"
            onClick={onDelete}
          >
            Delete
          </Button>
        )}
      </Flex>
      <Box height="400px">
        {renderChart()}
      </Box>
      <Box mt={4}>
        <Text fontWeight="bold" mb={2}>Data Breakdown with Percentages</Text>
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th>Label</Th>
              <Th isNumeric>Value</Th>
              <Th isNumeric>Percentage</Th>
            </Tr>
          </Thead>
          <Tbody>
            {kpi.data.labels.map((label, index) => (
              <Tr key={index}>
                <Td>{label}</Td>
                <Td isNumeric>{kpi.data.values[index]}</Td>
                <Td isNumeric>{percentages[index].toFixed(2)}%</Td>
              </Tr>
            ))}
            <Tr fontWeight="bold">
              <Td>Total</Td>
              <Td isNumeric>{total}</Td>
              <Td isNumeric>100%</Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default KPIPanel;

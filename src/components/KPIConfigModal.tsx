import { useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  VStack,
  HStack,
  IconButton,
  Box,
  Flex,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import type { KPI } from '../services/kpiService';

// Define props for the component
interface KPIConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (kpi: Omit<KPI, 'id' | 'userId'>) => void;
}

// Define the KPI configuration modal component
const KPIConfigModal = ({ isOpen, onClose, onSave }: KPIConfigModalProps) => {
  // State for form fields
  const [title, setTitle] = useState('');
  const [chartType, setChartType] = useState<'bar' | 'line' | 'pie'>('bar');
  const [dataPoints, setDataPoints] = useState([
    { label: '', value: 0 }
  ]);

  // Add a new data point
  const addDataPoint = () => {
    setDataPoints([...dataPoints, { label: '', value: 0 }]);
  };

  // Remove a data point
  const removeDataPoint = (index: number) => {
    if (dataPoints.length > 1) {
      const newDataPoints = [...dataPoints];
      newDataPoints.splice(index, 1);
      setDataPoints(newDataPoints);
    }
  };

  // Update a data point
  const updateDataPoint = (index: number, field: 'label' | 'value', value: string | number) => {
    const newDataPoints = [...dataPoints];
    if (field === 'value') {
      // Ensure value is a number
      newDataPoints[index][field] = Number(value) || 0;
    } else {
      if (typeof value === "string") {
        newDataPoints[index][field] = value;
      }
    }
    setDataPoints(newDataPoints);
  };

  // Handle form submission
  const handleSubmit = () => {
    // Validate form
    if (!title.trim()) {
      alert('Please enter a title for your KPI');
      return;
    }

    if (dataPoints.some(dp => !dp.label.trim())) {
      alert('Please provide labels for all data points');
      return;
    }

    // Create KPI object (without id and userId, which will be added by the parent component)
    const newKPI = {
      title: title.trim(),
      type: chartType,
      data: {
        labels: dataPoints.map(dp => dp.label),
        values: dataPoints.map(dp => dp.value),
      }
    };

    // Save KPI
    onSave(newKPI);

    // Reset form
    setTitle('');
    setChartType('bar');
    setDataPoints([{ label: '', value: 0 }]);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New KPI</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <FormControl isRequired>
              <FormLabel>KPI Title</FormLabel>
              <Input 
                placeholder="Enter KPI title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Chart Type</FormLabel>
              <RadioGroup value={chartType} onChange={(value) => setChartType(value as 'bar' | 'line' | 'pie')}>
                <Stack direction="row" spacing={4}>
                  <Radio value="bar">Bar Chart</Radio>
                  <Radio value="line">Line Chart</Radio>
                  <Radio value="pie">Pie Chart</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>

            <Box>
              <Flex justifyContent="space-between" alignItems="center" mb={2}>
                <FormLabel mb={0}>Data Points</FormLabel>
                <Button 
                  size="sm" 
                  leftIcon={<AddIcon />} 
                  onClick={addDataPoint}
                  colorScheme="brand"
                >
                  Add Data Point
                </Button>
              </Flex>

              {dataPoints.map((dp, index) => (
                <HStack key={index} spacing={2} mb={2}>
                  <FormControl isRequired>
                    <Input 
                      placeholder="Label" 
                      value={dp.label} 
                      onChange={(e) => updateDataPoint(index, 'label', e.target.value)} 
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <Input 
                      placeholder="Value" 
                      type="number" 
                      value={dp.value} 
                      onChange={(e) => updateDataPoint(index, 'value', e.target.value)} 
                    />
                  </FormControl>
                  <IconButton
                    aria-label="Remove data point"
                    icon={<DeleteIcon />}
                    onClick={() => removeDataPoint(index)}
                    isDisabled={dataPoints.length <= 1}
                    colorScheme="red"
                    variant="ghost"
                  />
                </HStack>
              ))}
            </Box>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="brand" onClick={handleSubmit}>
            Save KPI
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default KPIConfigModal;

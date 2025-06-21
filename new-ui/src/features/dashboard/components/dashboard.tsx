import { useColorModeValue } from "@/components/ui/color-mode";
import { Box, Button, Card, Flex, FormatNumber, Grid, GridItem, Heading, Icon, Tabs, Text } from "@chakra-ui/react";
import { LuArrowUp, LuCalendar, LuChartBar, LuChartLine, LuDollarSign, LuDownload, LuNotebook } from "react-icons/lu";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const salesData = [
    { month: "1月", sales: 1000, target: 1000 },
    { month: "2月", sales: 1200, target: 1100 },
    { month: "3月", sales: 1100, target: 1200 },
    { month: "4月", sales: 1300, target: 1300 },
    { month: "5月", sales: 1400, target: 1400 },
    { month: "6月", sales: 1500, target: 1600 },
    { month: "7月", sales: 1600, target: 1700 },
    { month: "8月", sales: 1700, target: 1800 },
    { month: "9月", sales: 1800, target: 1900 },
    { month: "10月", sales: 1900, target: 2000 },
    { month: "11月", sales: 2000, target: 2000 },
    { month: "12月", sales: 2100, target: 2100 },
]

const userData = [
    { month: "1月", users: 1000 },
    { month: "2月", users: 1200 },
    { month: "3月", users: 1100 },
    { month: "4月", users: 1300 },
    { month: "5月", users: 1400 },
    { month: "6月", users: 1500 },
    { month: "7月", users: 1600 },
    { month: "8月", users: 1700 },
    { month: "9月", users: 1800 },
    { month: "10月", users: 1900 },
    { month: "11月", users: 2000 },
    { month: "12月", users: 2100 },
]

export default function Dashboard() {
    return (
        <Box h="100%" spaceY={6} p={6} bgColor="screen.bg.color">
            <Flex align="center" justify="space-between">
                <Box>
                    <Heading as="h2" textStyle="2xl" fontWeight="bold" color="text.color">
                        Summary
                    </Heading>
                    <Text color="text.color">
                        Let&#39;s check your business key performance indicators!
                    </Text>
                </Box>
                <Flex align="center" spaceX={3}>
                    <Button 
                        variant="outline" 
                        size="sm"
                        color="text.color"
                        bgColor="button.bg.color"
                        _hover={{
                            bgColor: "button.bg.color.hover",
                        }}
                    >
                        <Icon as={LuCalendar} mr={2} h={4} w={4} />
                        Select Range
                    </Button>
                    <Button 
                        size="sm" 
                        bgGradient="to-r" 
                        gradientFrom="blue.600" 
                        gradientTo="purple.600" 
                        color="white"
                        _hover={{
                            gradientFrom: "blue.700",
                            gradientTo: "purple.700",
                        }}>
                        <Icon as={LuDownload} mr={2} h={4} w={4} />
                        Export
                    </Button>
                </Flex>
            </Flex>

            <Grid gridTemplateColumns={{ md: "repeat(2, minmax(0, 1fr))", xl: "repeat(4, minmax(0, 1fr))"}} gap={4}>
                <GridItem>
                    <Card.Root bgColor="card.bg.color" shadow="sm" border="none">
                        <Card.Body p={6}>
                            <Flex justify="space-between" align="center" mb={4}>
                                <Text fontSize="sm" fontWeight="medium" color="text.color">Total Sales</Text>
                                <Box 
                                    bgColor="blue.300"
                                    borderRadius="md" 
                                    p={2}
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Icon as={LuDollarSign} h={5} w={5} color="blue.600" />
                                </Box>
                            </Flex>
                            <Text textStyle="3xl" fontWeight="bold" color="text.color">
                                <FormatNumber value={123456789} />
                                <Text as="span" fontSize="sm" color="gray.500">
                                    USD
                                </Text>
                            </Text>
                            <Flex align="center" textStyle="sm" color="green.600" mt={2}>
                                <Icon as={LuArrowUp} h={4} w={4} mr={1} />
                                <Text>
                                    +12.5%
                                </Text>
                                <Text as="span" fontSize="sm" color="text.color" ml={1}>
                                    from last month
                                </Text>
                            </Flex>
                        </Card.Body>
                    </Card.Root>
                </GridItem>
            </Grid>
            <Tabs.Root defaultValue="summary" variant="plain">
                <Tabs.List bg="bg.muted" rounded={13} p={1}>
                    <Tabs.Trigger value="summary">
                        <Icon as={LuChartBar} h={4} w={4} />
                        Summary
                    </Tabs.Trigger>
                    <Tabs.Trigger value="analytics">
                        <Icon as={LuChartLine} h={4} w={4} />
                        Analytics
                    </Tabs.Trigger>
                    <Tabs.Trigger value="reports">
                        <Icon as={LuNotebook} h={4} w={4} />
                        Reports
                    </Tabs.Trigger>
                    <Tabs.Indicator rounded={12} />
                </Tabs.List>
                <Tabs.Content value="summary">
                    <Grid gap={6} gridTemplateColumns={{ md: "repeat(2, minmax(0, 1fr))"}}>
                        <Card.Root bgColor="card.bg.color" border="none" shadow="sm">
                            <Card.Body p={6}>
                                <Box mb={4}>
                                    <Heading as="h3" textStyle="lg" fontWeight="semibold">
                                        Sales Transition
                                    </Heading>
                                    <Text color="text.color" textStyle="sm">
                                        Past 12 months sales data
                                    </Text>
                                </Box>
                                <Box h="300px">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={salesData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0f" />
                                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#666"}} />
                                            <YAxis 
                                                axisLine={false} 
                                                tickLine={false} 
                                                tick={{ fontSize: 12, fill: "#666"}} 
                                                tickFormatter={(value) => `￥${ value.toLocaleString() }`}
                                            />
                                            <Tooltip content={({ active, payload, label }: any) => {
                                                                if (active && payload && payload.length) {
                                                                    return (
                                                                        <Box bgColor="card.bg.color" p={3} border="1px solid" borderColor="border.color" rounded="lg" shadow="lg">
                                                                            <Text fontWeight="medium">{label}</Text>
                                                                            {payload.map((entry: any, index: number) => {
                                                                                return (
                                                                                    <Text key={index} color={entry.color}>
                                                                                        {entry.dataKey === "sales" ? "Sales" : entry.dataKey === "target" ? "Target" : entry.dataKey}: ￥
                                                                                        {entry.value?.toLocaleString()}
                                                                                    </Text>
                                                                                )
                                                                            })}
                                                                        </Box>
                                                                    )
                                                                }
                                                                return null;
                                                            }} 
                                            />
                                            <Area type="monotone" dataKey="sales" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.1} strokeWidth={2} />
                                            <Area type="monotone" dataKey="target" stroke="#ef4444" fill="transparent" strokeDasharray="5 5" strokeWidth={2} />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </Box>
                            </Card.Body>
                        </Card.Root>

                        <Card.Root bgColor="card.bg.color" border="none" shadow="sm">
                            <Card.Body p={6}>
                                <Box mb={4}>
                                    <Heading as="h3" textStyle="lg" fontWeight="semibold">
                                        User Analytics
                                    </Heading>
                                    <Text color="text.color" textStyle="sm">
                                        Active users trends
                                    </Text>
                                </Box>
                                <Box h="300px">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={userData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0f" />
                                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#666"}} />
                                            <YAxis 
                                                axisLine={false} 
                                                tickLine={false} 
                                                tick={{ fontSize: 12, fill: "#666"}} 
                                                tickFormatter={(value) => value.toLocaleString()}
                                            />
                                            <Tooltip 
                                                content={({ active, payload, label }: any) => {
                                                    if (active && payload && payload.length) {
                                                        return (
                                                            <Box bgColor="card.bg.color" p={3} border="1px solid" borderColor="border.color" rounded="lg" shadow="lg">
                                                                <Text fontWeight="medium">{label}</Text>
                                                                <Text color="text.color" textStyle="sm">
                                                                    Users: {payload[0].value.toLocaleString()}
                                                                </Text>
                                                            </Box>
                                                        )
                                                    }
                                                    return null;
                                                }} 
                                            />
                                            <Bar dataKey="users" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </Box>
                            </Card.Body>
                        </Card.Root>
                    </Grid>
                </Tabs.Content>
                <Tabs.Content value="analytics">
                    <Flex h="400px" bgColor="card.bg.color" justify="center" align="center" border="1px solid" borderColor="border.color" rounded="lg">
                        <Text color="text.color">
                            The analytics content will be here.
                        </Text>
                    </Flex>
                </Tabs.Content>
                <Tabs.Content value="reports">
                    <Flex h="400px" bgColor="card.bg.color" justify="center" align="center" border="1px solid" borderColor="border.color" rounded="lg">
                        <Text color="text.color">
                            The reports content will be here.
                        </Text>
                    </Flex>
                </Tabs.Content>
            </Tabs.Root>
        </Box>
    )
}
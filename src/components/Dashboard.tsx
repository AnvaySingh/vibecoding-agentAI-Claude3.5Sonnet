import React from 'react';
import {
  Box,
  Text,
  Flex,
  Grid,
  SimpleGrid,
  VStack,
  HStack,
} from '@chakra-ui/react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/table';
import { Progress } from '@chakra-ui/progress';
import { ApplicationData } from '../types';

const StatCard = ({ label, value, unit = '' }: { label: string; value: string | number; unit?: string }) => (
  <Box p={6} bg="white" borderRadius="lg" boxShadow="sm">
    <Text fontSize="4xl" fontWeight="bold">
      {value}
      {unit && <Text as="span" fontSize="xl" ml={1}>{unit}</Text>}
    </Text>
    <Text color="gray.500">{label}</Text>
  </Box>
);

const FeatureBar = ({ label, value, max }: { label: string; value: number; max: number }) => (
  <Box mb={4}>
    <HStack mb={2} justify="space-between">
      <Text>{label}</Text>
      <Text fontWeight="bold">{value}</Text>
    </HStack>
    <Progress value={(value / max) * 100} colorScheme="blue" borderRadius="full" />
  </Box>
);

export const Dashboard: React.FC<{ data: ApplicationData }> = ({ data }) => {
  const totalUsers = data.usage_data.length;
  const avgSessionDuration = data.usage_data.reduce((acc, user) => acc + user.avg_session_duration, 0) / totalUsers;
  const totalSessions = data.usage_data.reduce((acc, user) => acc + user.total_sessions, 0);
  const totalErrors = data.usage_data.reduce((acc, user) => acc + user.errors_logged, 0);
  
  // Calculate total feature usage
  const featureUsage = data.usage_data.reduce((acc, user) => ({
    task_creation: acc.task_creation + user.features_used.task_creation,
    calendar_view: acc.calendar_view + user.features_used.calendar_view,
    report_export: acc.report_export + user.features_used.report_export,
    team_chat: acc.team_chat + user.features_used.team_chat,
  }), {
    task_creation: 0,
    calendar_view: 0,
    report_export: 0,
    team_chat: 0,
  });

  const maxFeatureUsage = Math.max(...Object.values(featureUsage));

  return (
    <Box p={8} bg="gray.50" minH="100vh">
      <Flex justify="space-between" align="center" mb={8}>
        <Text fontSize="2xl" fontWeight="bold">TaskFlow Pro</Text>
        <Text>Version {data.version}</Text>
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 4 }} gap={6} mb={8}>
        <StatCard label="Total Users" value={totalUsers} />
        <StatCard label="Avg. Session Duration" value={avgSessionDuration.toFixed(1)} unit="mins" />
        <StatCard label="Total Sessions" value={totalSessions} />
        <StatCard label="Errors Logged" value={totalErrors} />
      </SimpleGrid>

      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={8} mb={8}>
        <Box bg="white" p={6} borderRadius="lg" boxShadow="sm">
          <Text fontSize="lg" fontWeight="bold" mb={4}>Feature Usage</Text>
          <VStack align="stretch">
            <FeatureBar label="Task Creation" value={featureUsage.task_creation} max={maxFeatureUsage} />
            <FeatureBar label="Calendar View" value={featureUsage.calendar_view} max={maxFeatureUsage} />
            <FeatureBar label="Report Export" value={featureUsage.report_export} max={maxFeatureUsage} />
            <FeatureBar label="Team Chat" value={featureUsage.team_chat} max={maxFeatureUsage} />
          </VStack>
        </Box>
        <Box bg="white" p={6} borderRadius="lg" boxShadow="sm">
          <Text fontSize="lg" fontWeight="bold" mb={4}>Last Login</Text>
          <Text fontSize="xl">{new Date().toISOString().split('T')[0]}</Text>
          <Text fontSize="2xl" fontWeight="bold">{new Date().toLocaleTimeString()}</Text>
        </Box>
      </Grid>

      <Box bg="white" p={6} borderRadius="lg" boxShadow="sm">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>User ID</Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th isNumeric>Total Sessions</Th>
              <Th isNumeric>Avg. Duration</Th>
              <Th isNumeric>Features Used</Th>
              <Th isNumeric>Errors</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.usage_data.map((user) => (
              <Tr key={user.user_id}>
                <Td>{user.user_id}</Td>
                <Td>{user.name}</Td>
                <Td>{user.email}</Td>
                <Td isNumeric>{user.total_sessions}</Td>
                <Td isNumeric>{user.avg_session_duration}</Td>
                <Td isNumeric>
                  {Object.values(user.features_used).reduce((a, b) => a + b, 0)}
                </Td>
                <Td isNumeric>{user.errors_logged}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

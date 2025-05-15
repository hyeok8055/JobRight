import { Box, VStack, Heading, Text, Link as ChakraLink, Container, Alert, AlertIcon, SimpleGrid, Icon, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Tag, HStack } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { MapPin, CheckCircle, ShieldCheck, AlertTriangle } from 'lucide-react';
import { useEffect, useState } from "react";

// 가상 GPS 출퇴근 기록 데이터
const mockAttendanceData = [
  { id: 1, date: "2024-07-22 (월)", clockInTime: "09:01", clockOutTime: "18:05", workLocation: "본사 (서울시 강남구)", status: "정상 처리", gpsVerified: true, workHours: "8시간 04분" },
  { id: 2, date: "2024-07-23 (화)", clockInTime: "08:58", clockOutTime: "18:10", workLocation: "본사 (서울시 강남구)", status: "정상 처리", gpsVerified: true, workHours: "8시간 12분" },
  { id: 3, date: "2024-07-24 (수)", clockInTime: "09:15", clockOutTime: "17:55", workLocation: "원격 (자택)", status: "지각 (15분)", gpsVerified: false, workHours: "7시간 40분" }, // GPS 미인증 예시
  { id: 4, date: "2024-07-25 (목)", clockInTime: "09:00", clockOutTime: "19:30", workLocation: "본사 (서울시 강남구)", status: "연장 근무", gpsVerified: true, workHours: "9시간 30분" }, 
  { id: 5, date: "2024-07-26 (금)", clockInTime: "08:55", clockOutTime: "18:00", workLocation: "본사 (서울시 강남구)", status: "정상 처리", gpsVerified: true, workHours: "8시간 05분" },
];

const TimeTrackerPage = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  useEffect(() => {
    // 실제로는 API 호출 등을 통해 데이터를 가져옵니다.
    setAttendanceRecords(mockAttendanceData);
  }, []);

  const getStatusTagColor = (status) => {
    if (status.includes("정상")) return "green";
    if (status.includes("지각")) return "orange";
    if (status.includes("연장")) return "blue";
    return "gray";
  };

  return (
    <Container py={{ base: 6, md: 8 }} px={{ base: 4, md: 6 }} maxW="container.lg">
      <VStack spacing={6} align="stretch">
        <Heading size="xl" color="brand.darkBrown" textAlign="center">GPS 기반 출퇴근 기록</Heading>

        <Box p={5} shadow="xl" borderWidth="1px" borderRadius="lg" bg="white">
          <Heading size="lg" mb={4} color="brand.darkBrown" fontWeight="semibold">이번 주 근무 기록</Heading>
          <Alert status="info" variant="subtle" borderRadius="md" bg="blue.50" mb={5}>
            <AlertIcon color="blue.500" />
            <Text fontSize="sm" color="blue.700">실시간 GPS 위치를 기반으로 출퇴근 시간이 자동 기록됩니다. (실제 기능 구현 시 GPS 연동 필요)</Text>
          </Alert>

          <TableContainer>
            <Table variant="simple" size={{ base: "sm", md: "md" }}>
              <Thead bg="gray.50">
                <Tr>
                  <Th>일자</Th>
                  <Th>출근 시간</Th>
                  <Th>퇴근 시간</Th>
                  <Th>근무 시간</Th>
                  <Th>근무지</Th>
                  <Th>GPS</Th>
                  <Th>처리 상태</Th>
                </Tr>
              </Thead>
              <Tbody>
                {attendanceRecords.map((record) => (
                  <Tr key={record.id} _hover={{ bg: "gray.50" }}>
                    <Td>{record.date}</Td>
                    <Td>{record.clockInTime}</Td>
                    <Td>{record.clockOutTime}</Td>
                    <Td fontWeight="medium">{record.workHours}</Td>
                    <Td>
                      <HStack spacing={1}>
                        <Icon as={MapPin} boxSize={4} color={record.gpsVerified ? "green.500" : "gray.400"} />
                        <Text fontSize="sm">{record.workLocation}</Text>
                      </HStack>
                    </Td>
                    <Td>
                      {record.gpsVerified ? (
                        <Icon as={CheckCircle} color="green.500" boxSize={5} />
                      ) : (
                        <Icon as={AlertTriangle} color="orange.400" boxSize={5} title="GPS 미인증 (수동 확인 필요)"/>
                      )}
                    </Td>
                    <Td>
                      <Tag colorScheme={getStatusTagColor(record.status)} size="sm" variant="solid">
                        {record.status}
                      </Tag>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>

        <Box p={5} shadow="md" borderWidth="1px" borderRadius="lg" bg="yellow.50" mt={4}>
            <HStack alignItems="center">
                <Icon as={ShieldCheck} boxSize={{base: 8, md: 10}} color="yellow.600" />
                <VStack align="start" spacing={0}>
                    <Heading size="md" color="yellow.800" fontWeight="semibold">블록체인 기록 안내</Heading>
                    <Text fontSize={{base: "sm", md: "md"}} color="yellow.700">
                    모든 출퇴근 기록은 <strong>블록체인에 안전하게 저장되어 위변조가 불가능</strong>합니다. 
                    이는 법적 분쟁 발생 시 신뢰할 수 있는 증거 자료로 활용될 수 있습니다.
                    </Text>
                </VStack>
            </HStack>
        </Box>

        <RouterLink to="/toolkit" style={{ alignSelf: 'center', marginTop: '20px' }}>
          <ChakraLink color="brand.darkBrown" fontWeight="semibold" display="block" textAlign="center" mt={4} border="1px solid" borderColor="brand.lightBrown" px={4} py={2} borderRadius="md" _hover={{bg: "brand.veryLightBrown"}}>
            툴킷 홈으로 돌아가기
          </ChakraLink>
        </RouterLink>
      </VStack>
    </Container>
  );
};

export default TimeTrackerPage; 
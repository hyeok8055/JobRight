import { Box, VStack, HStack, Heading, Text, Link as ChakraLink, Container, SimpleGrid, Icon, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Divider, Progress, CircularProgress, CircularProgressLabel, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Tooltip, Alert, AlertIcon } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { PiggyBank, Briefcase, CalendarDays, Percent, FileText, Calculator, Info, TrendingUp, TrendingDown, ExternalLink, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';

// 가상 데이터 (실제로는 SmartContractPage, TimeTrackerPage 에서 가져오거나 API 호출)
const MOCK_CONTRACT_DATA = {
  hourlyRate: 12000, // 시급
  workHoursPerWeek: 40, // 주 소정근로시간
  hasMealAllowance: true,
  mealAllowanceAmount: 100000, // 월 식대
};

const MOCK_TIME_TRACKER_DATA = {
  totalWorkHoursMonthly: 174, // 월 총 근무시간 (주휴 포함 가정)
  overtimeHoursMonthly: 10, // 월 연장근무시간
  nightHoursMonthly: 5, // 월 야간근무시간
  holidayHoursMonthly: 0, // 월 휴일근무시간
};

const SalaryCalculatorPage = () => {
  const [calculatedSalary, setCalculatedSalary] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure(); // Modal용

  useEffect(() => {
    // 계약 정보 및 근무 기록을 기반으로 급여 계산 (가상 로직)
    const baseSalary = MOCK_CONTRACT_DATA.hourlyRate * (MOCK_CONTRACT_DATA.workHoursPerWeek / 5 * 209 / 40); // 단순 월급 환산 (주휴 포함된 일반적 계산)
    const overtimePay = MOCK_CONTRACT_DATA.hourlyRate * 1.5 * MOCK_TIME_TRACKER_DATA.overtimeHoursMonthly;
    const nightPay = MOCK_CONTRACT_DATA.hourlyRate * 0.5 * MOCK_TIME_TRACKER_DATA.nightHoursMonthly;
    const holidayPay = MOCK_CONTRACT_DATA.hourlyRate * 1.5 * MOCK_TIME_TRACKER_DATA.holidayHoursMonthly; // 휴일근로는 8시간 이내 1.5배, 초과시 2배 등 복잡하므로 단순화

    const totalBeforeTax = baseSalary + overtimePay + nightPay + holidayPay + (MOCK_CONTRACT_DATA.hasMealAllowance ? MOCK_CONTRACT_DATA.mealAllowanceAmount : 0);
    
    // 4대 보험 및 소득세 (대략적인 비율로 계산, 실제로는 매우 복잡)
    const nationalPension = totalBeforeTax * 0.045; // 국민연금 (본인부담)
    const healthInsurance = totalBeforeTax * 0.03545; // 건강보험 (본인부담)
    const longTermCareInsurance = healthInsurance * 0.1281; // 장기요양보험
    const employmentInsurance = totalBeforeTax * 0.009; // 고용보험 (본인부담)
    // 소득세는 간이세액표에 따르나 여기서는 단순화 (예: 10% 가정)
    const incomeTax = (totalBeforeTax - (nationalPension + healthInsurance + longTermCareInsurance + employmentInsurance)) * 0.10;
    const localIncomeTax = incomeTax * 0.1;

    const totalDeductions = nationalPension + healthInsurance + longTermCareInsurance + employmentInsurance + incomeTax + localIncomeTax;
    const netSalary = totalBeforeTax - totalDeductions;

    setCalculatedSalary({
      baseSalary: Math.round(baseSalary),
      overtimePay: Math.round(overtimePay),
      nightPay: Math.round(nightPay),
      holidayPay: Math.round(holidayPay),
      mealAllowance: MOCK_CONTRACT_DATA.hasMealAllowance ? MOCK_CONTRACT_DATA.mealAllowanceAmount : 0,
      totalBeforeTax: Math.round(totalBeforeTax),
      nationalPension: Math.round(nationalPension),
      healthInsurance: Math.round(healthInsurance),
      longTermCareInsurance: Math.round(longTermCareInsurance),
      employmentInsurance: Math.round(employmentInsurance),
      incomeTax: Math.round(incomeTax),
      localIncomeTax: Math.round(localIncomeTax),
      totalDeductions: Math.round(totalDeductions),
      netSalary: Math.round(netSalary),
      estimatedWorkHours: MOCK_TIME_TRACKER_DATA.totalWorkHoursMonthly, // 실제 기록된 시간
    });
  }, []);

  const formatCurrency = (amount) => {
    if (amount === null || amount === undefined) return '계산 중...';
    return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(amount);
  };

  return (
    <Container py={{ base: 6, md: 8 }} px={{ base: 4, md: 6 }} maxW="container.xl">
      <VStack spacing={8} align="stretch">
        <Heading size="xl" color="brand.darkBrown" textAlign="center">나의 예상 급여</Heading>
        
        {!calculatedSalary ? (
          <VStack justifyContent="center" alignItems="center" h="300px">
            <CircularProgress isIndeterminate color="brand.blue" />
            <Text color="brand.mediumBrown">급여 정보를 계산 중입니다...</Text>
          </VStack>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
            {/* 왼쪽: 급여 명세 */} 
            <Box p={6} shadow="xl" borderWidth="1px" borderRadius="lg" bg="white">
              <HStack mb={4} justifyContent="space-between">
                <HStack>
                  <Icon as={PiggyBank} boxSize={8} color="brand.blue" />
                  <Heading size="lg" color="brand.darkBrown">급여 명세서 (예상)</Heading>
                </HStack>
                <Tooltip label="실제 계약 및 근무 기록에 따라 변동될 수 있습니다." placement="top">
                    <Icon as={Info} color="gray.400" cursor="pointer"/>
                </Tooltip>
              </HStack>
              <Text fontSize="sm" color="brand.mediumBrown" mb={4}>
                근로계약서 및 최근 근무 기록을 바탕으로 계산된 예상 월급입니다.
              </Text>
              
              <SalaryDetailItem label="기본급" amount={calculatedSalary.baseSalary} />
              <SalaryDetailItem label="연장근로수당" amount={calculatedSalary.overtimePay} />
              <SalaryDetailItem label="야간근로수당" amount={calculatedSalary.nightPay} />
              {calculatedSalary.holidayPay > 0 && <SalaryDetailItem label="휴일근로수당" amount={calculatedSalary.holidayPay} />}
              {calculatedSalary.mealAllowance > 0 && <SalaryDetailItem label="식대 (비과세 가능)" amount={calculatedSalary.mealAllowance} />}
              <Divider my={3} />
              <SalaryDetailItem label="세전 총액" amount={calculatedSalary.totalBeforeTax} isTotal={true} />
              
              <Heading size="md" color="brand.darkBrown" mt={6} mb={3}>공제 내역</Heading>
              <SalaryDetailItem label="국민연금 (4.5%)" amount={-calculatedSalary.nationalPension} type="deduction" />
              <SalaryDetailItem label="건강보험 (3.545%)" amount={-calculatedSalary.healthInsurance} type="deduction" />
              <SalaryDetailItem label="장기요양보험" amount={-calculatedSalary.longTermCareInsurance} type="deduction" />
              <SalaryDetailItem label="고용보험 (0.9%)" amount={-calculatedSalary.employmentInsurance} type="deduction" />
              <SalaryDetailItem label="소득세" amount={-calculatedSalary.incomeTax} type="deduction" />
              <SalaryDetailItem label="지방소득세 (소득세의 10%)" amount={-calculatedSalary.localIncomeTax} type="deduction" />
              <Divider my={3} />
              <SalaryDetailItem label="공제 총액" amount={-calculatedSalary.totalDeductions} isTotal={true} />

              <Divider my={4} borderColor="brand.lightBrown" borderWidth="1px" />
              
              <HStack justifyContent="space-between" alignItems="center" p={4} bg="brand.veryLightBrown" borderRadius="md">
                <Heading size="lg" color="brand.darkBrown">실 수령 예상액</Heading>
                <Heading size="xl" color="brand.blue" fontWeight="bold">{formatCurrency(calculatedSalary.netSalary)}</Heading>
              </HStack>
              <Text fontSize="xs" color="gray.500" mt={2} textAlign="right">※ 위 금액은 예상치이며, 실제 수령액과 다를 수 있습니다. 정확한 내용은 급여 담당자에게 문의하세요.</Text>
            </Box>

            {/* 오른쪽: 관련 정보 및 액션 */} 
            <VStack spacing={6} align="stretch">
              <Box p={5} shadow="lg" borderWidth="1px" borderRadius="lg" bg="white">
                <HStack mb={3}><Icon as={Briefcase} boxSize={6} color="brand.darkBrown" /><Heading size="md" color="brand.darkBrown">계약 정보 요약</Heading></HStack>
                <Stat>
                  <StatLabel>계약 시급</StatLabel>
                  <StatNumber>{formatCurrency(MOCK_CONTRACT_DATA.hourlyRate)}</StatNumber>
                  <StatHelpText>주 {MOCK_CONTRACT_DATA.workHoursPerWeek}시간 근무 기준</StatHelpText>
                </Stat>
                 <Stat mt={2}>
                  <StatLabel>식대 지원</StatLabel>
                  <StatNumber>{MOCK_CONTRACT_DATA.hasMealAllowance ? formatCurrency(MOCK_CONTRACT_DATA.mealAllowanceAmount) + " (월)" : "미제공"}</StatNumber>
                </Stat>
                <Button as={RouterLink} to="/toolkit/smart-contract" leftIcon={<Icon as={FileText}/>} colorScheme="gray" variant="outline" size="sm" mt={4} w="full">계약서 상세보기</Button>
              </Box>

              <Box p={5} shadow="lg" borderWidth="1px" borderRadius="lg" bg="white">
                <HStack mb={3}><Icon as={CalendarDays} boxSize={6} color="brand.darkBrown" /><Heading size="md" color="brand.darkBrown">근무 시간 요약</Heading></HStack>
                <Stat>
                  <StatLabel>월 예상 근무 시간</StatLabel>
                  <StatNumber>{calculatedSalary.estimatedWorkHours} 시간</StatNumber>
                  <StatHelpText>(연장 {MOCK_TIME_TRACKER_DATA.overtimeHoursMonthly}h, 야간 {MOCK_TIME_TRACKER_DATA.nightHoursMonthly}h 포함)</StatHelpText>
                </Stat>
                <Button as={RouterLink} to="/toolkit/time-tracker" leftIcon={<Icon as={Clock}/>} colorScheme="gray" variant="outline" size="sm" mt={4} w="full">근무기록 상세보기</Button>
              </Box>
              
              <Box p={5} shadow="lg" borderWidth="1px" borderRadius="lg" bg="blue.50">
                <HStack mb={3}><Icon as={Percent} boxSize={6} color="blue.600" /><Heading size="md" color="blue.700">세부 계산 근거</Heading></HStack>
                <Text fontSize="sm" color="blue.600" mb={2}>급여는 주휴수당, 연장/야간/휴일 가산 수당, 4대 보험 및 세금 규정에 따라 계산됩니다.</Text>
                <Button onClick={onOpen} leftIcon={<Icon as={Calculator}/>} colorScheme="blue" variant="solid" size="sm" w="full">자세한 계산 방식 보기</Button>
              </Box>

              <Alert status="warning" variant="subtle" borderRadius="md" bg="yellow.50">
                <AlertIcon color="yellow.500" />
                <Text fontSize="xs" color="yellow.700">
                  <strong>참고:</strong> 최저임금 (2024년 기준 시급 {formatCurrency(9860)})을 준수하는지 항상 확인하세요. 
                  이 계산기는 참고용이며, 법적 효력은 없습니다.
                </Text>
              </Alert>
            </VStack>
          </SimpleGrid>
        )}
        
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>급여 계산 상세 정보</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text mb={2}><strong>기본 산정 기준:</strong></Text>
              <Text fontSize="sm">- 월급제 통상시급 = (월 기본급 + 주요수당) / 월 통상임금 산정 기준시간</Text>
              <Text fontSize="sm">- 월 통상임금 산정 기준시간 (예: 주 40시간) = (주당 소정근로시간 40시간 + 유급주휴 8시간) * (365일/7일/12개월) ≒ 209시간</Text>
              <Divider my={3}/>
              <Text mb={2}><strong>가산 수당:</strong></Text>
              <Text fontSize="sm">- 연장근로: 통상임금의 50% 가산 (총 150%)</Text>
              <Text fontSize="sm">- 야간근로 (22시~06시): 통상임금의 50% 가산 (총 150%, 연장과 중복 시 200%)</Text>
              <Text fontSize="sm">- 휴일근로: 8시간 이내 50% 가산, 8시간 초과분 100% 가산</Text>
              <Divider my={3}/>
              <Text mb={2}><strong>4대 보험 (2024년 기준, 근로자 부담률):</strong></Text>
              <Text fontSize="sm">- 국민연금: 기준소득월액의 4.5%</Text>
              <Text fontSize="sm">- 건강보험: 보수월액의 3.545% (장기요양보험료 별도)</Text>
              <Text fontSize="sm">- 장기요양보험: 건강보험료의 12.81%</Text>
              <Text fontSize="sm">- 고용보험: 실업급여분 0.9%</Text>
              <Divider my={3}/>
              <Text mb={2}><strong>세금:</strong></Text>
              <Text fontSize="sm">- 소득세: 근로소득 간이세액표 기준 (과세표준 및 부양가족 수에 따라 다름)</Text>
              <Text fontSize="sm">- 지방소득세: 소득세의 10%</Text>
              <ChakraLink href="https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2228&cntntsId=7667" isExternal color="blue.500" fontSize="sm" mt={2}>국세청 근로소득 간이세액표 바로가기 <Icon as={ExternalLink} mx="2px" verticalAlign="middle"/></ChakraLink>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                닫기
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <RouterLink to="/toolkit" style={{ alignSelf: 'center', marginTop: '30px' }}>
          <ChakraLink color="brand.darkBrown" fontWeight="semibold" display="block" textAlign="center" mt={4} border="1px solid" borderColor="brand.lightBrown" px={4} py={2} borderRadius="md" _hover={{bg: "brand.veryLightBrown"}}>
            툴킷 홈으로 돌아가기
          </ChakraLink>
        </RouterLink>
      </VStack>
    </Container>
  );
};

const SalaryDetailItem = ({ label, amount, isTotal = false, type = "payment" }) => {
    const formattedAmount = new Intl.NumberFormat('ko-KR').format(amount) + "원";
    const textColor = type === "deduction" ? "red.500" : "gray.700";
    return (
        <HStack justifyContent="space-between" py={isTotal ? 2 : 1}>
            <Text fontSize={isTotal ? "md" : "sm"} fontWeight={isTotal ? "bold" : "normal"} color={isTotal && type !== "deduction" ? "brand.darkBrown" : textColor }>
                {label}
            </Text>
            <Text fontSize={isTotal ? "md" : "sm"} fontWeight={isTotal ? "bold" : "normal"} color={isTotal && type === "deduction" ? "red.600" : textColor}>
                {type === "deduction" && amount > 0 ? "-" : ""}{formattedAmount}
            </Text>
        </HStack>
    );
};

export default SalaryCalculatorPage; 
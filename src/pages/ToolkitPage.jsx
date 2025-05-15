import { Box, VStack, HStack, Heading, Text, Icon, SimpleGrid, Divider, Alert, AlertIcon, Link as ChakraLink, Container } from "@chakra-ui/react";
import { Edit3, Clock, Calculator, ShieldQuestion, FileLock2, ExternalLink, BookOpen, PhoneCall, Info as InfoLucide } from 'lucide-react';
import { Routes, Route, Link as RouterLink, Outlet } from "react-router-dom";
import SmartContractPage from "./SmartContractPage";
import TimeTrackerPage from "./TimeTrackerPage";
import SalaryCalculatorPage from "./SalaryCalculatorPage";
import ReportAssistPage from "./ReportAssistPage";

// 임시 하위 페이지 컴포넌트들 (실제로는 별도 파일로 분리)
// const TempPage = ({ title }) => (
//   <Container py={{ base: 6, md: 8 }} px={{ base: 4, md: 6 }}>
//     <VStack spacing={4} align="center">
//       <Heading size="lg" color="brand.darkBrown">{title}</Heading>
//       <Text color="brand.mediumBrown">이 페이지는 현재 개발 중입니다.</Text>
//       <RouterLink to="/toolkit">
//         <ChakraLink color="brand.darkBrown" fontWeight="semibold">툴킷 홈으로 돌아가기</ChakraLink>
//       </RouterLink>
//     </VStack>
//   </Container>
// );

// const SmartContractPage = () => (
//   <Container py={{ base: 6, md: 8 }} px={{ base: 4, md: 6 }}>
//     <VStack spacing={6} align="stretch">
//       <Heading size="lg" color="brand.darkBrown" textAlign="center">스마트 근로계약서</Heading>
//       <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" bg="white">
//         <Heading size="md" mb={3} color="brand.darkBrown">표준 근로계약서 템플릿</Heading>
//         <Text color="brand.mediumBrown" mb={2}>청소년 및 단기 근로자를 위한 표준 근로계약서 양식을 제공합니다. 아래 링크에서 다운로드 받거나 내용을 확인하세요.</Text>
//         <ChakraLink href="/path/to/standard_contract.pdf" isExternal color="blue.500">[샘플] 표준 근로계약서 (청소년용).pdf</ChakraLink>
//         <Text mt={4} color="brand.mediumBrown" fontSize="sm"><strong>주요 항목:</strong> 근로조건, 임금, 근로시간, 휴일, 연차유급휴가 등</Text>
//       </Box>
//       <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" bg="white">
//         <Heading size="md" mb={3} color="brand.darkBrown">계약 조건 자동 검토 (예시)</Heading>
//         <Text color="brand.mediumBrown" mb={2}>근로계약서 파일을 업로드하면 AI가 법적 필수사항 누락, 불리한 조항 등을 자동으로 검토해 드립니다. (현재는 예시 화면입니다)</Text>
//         <Alert status="info" variant="subtle" borderRadius="md" bg="blue.50">
//           <AlertIcon color="blue.500"/>
//           <Box>
//           <Text fontSize="sm" color="blue.700"><strong>[검토 결과 예시]</strong></Text>
//           <Text fontSize="sm" color="blue.700">- <strong>주의:</strong> 법정 최저임금 (2024년 기준: 시급 9,860원)에 미달합니다.</Text>
//           <Text fontSize="sm" color="blue.700">- <strong>권고:</strong> 휴게시간 관련 조항이 명시되지 않았습니다. (4시간 근무 시 30분 이상)</Text>
//           </Box>
//         </Alert>
//       </Box>
//       <RouterLink to="/toolkit">
//         <ChakraLink color="brand.darkBrown" fontWeight="semibold" display="block" textAlign="center" mt={4}>툴킷 홈으로 돌아가기</ChakraLink>
//       </RouterLink>
//     </VStack>
//   </Container>
// );

// const TimeTrackerPage = () => (
//   <Container py={{ base: 6, md: 8 }} px={{ base: 4, md: 6 }}>
//     <VStack spacing={6} align="stretch">
//       <Heading size="lg" color="brand.darkBrown" textAlign="center">근무시간 기록기</Heading>
//       <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" bg="white">
//         <Heading size="md" mb={3} color="brand.darkBrown">자동 근무시간 기록 (예시)</Heading>
//         <Text color="brand.mediumBrown" mb={2}>출퇴근 시간을 기록하고, 주간 총 근무시간 및 연장근무 시간을 자동으로 계산합니다. (현재는 예시 화면입니다)</Text>
//         <Box p={4} bg="gray.50" borderRadius="md">
//           <Text fontWeight="bold">금주 근무 현황 (2024.07.15 ~ 2024.07.21)</Text>
//           <Text>총 근무시간: <strong>35시간 30분</strong></Text>
//           <Text>기본 근무: 32시간 00분</Text>
//           <Text>연장 근무: 3시간 30분 (주 12시간 한도 내)</Text>
//           <Text color="green.600">법정 근로시간 준수 중</Text>
//         </Box>
//       </Box>
//       <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" bg="white">
//         <Heading size="md" mb={3} color="brand.darkBrown">법정 근로시간 초과 알림</Heading>
//         <Text color="brand.mediumBrown" mb={2}>주 52시간(연장근로 12시간 포함)을 초과하거나, 청소년의 경우 법정 근로시간(1일 7시간, 주 35시간, 합의 시 1일 1시간, 주 5시간 연장 가능)을 초과할 경우 알림을 받습니다.</Text>
//         <Alert status="warning" variant="subtle" borderRadius="md" bg="yellow.50">
//           <AlertIcon color="yellow.500"/>
//           <Box>
//           <Text fontSize="sm" color="yellow.700"><strong>[알림 예시]</strong> 주간 연장근로 시간이 11시간 30분입니다. 30분 초과 시 법정 한도를 넘게 됩니다.</Text>
//           </Box>
//         </Alert>
//       </Box>
//       <RouterLink to="/toolkit">
//         <ChakraLink color="brand.darkBrown" fontWeight="semibold" display="block" textAlign="center" mt={4}>툴킷 홈으로 돌아가기</ChakraLink>
//       </RouterLink>
//     </VStack>
//   </Container>
// );

// const SalaryCalculatorPage = () => (
//   <Container py={{ base: 6, md: 8 }} px={{ base: 4, md: 6 }}>
//     <VStack spacing={6} align="stretch">
//       <Heading size="lg" color="brand.darkBrown" textAlign="center">급여 계산기</Heading>
//       <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" bg="white">
//         <Heading size="md" mb={3} color="brand.darkBrown">예상 급여 계산 (예시)</Heading>
//         <Text color="brand.mediumBrown" mb={4}>시급, 주간 근무시간, 연장/야간/휴일 근무시간을 입력하면 예상 월급을 계산해 드립니다. (세전 기준, 현재는 예시 화면입니다)</Text>
//         {/* 실제 계산기는 입력 필드와 계산 로직 필요 */}
//         <Box p={4} bg="gray.50" borderRadius="md">
//           <Text fontWeight="bold">입력 정보 (예시)</Text>
//           <Text>- 시급: 10,000원</Text>
//           <Text>- 주 소정근로시간: 40시간</Text>
//           <Text>- 주 연장근로시간: 5시간</Text>
//           <Text>- 주 야간근로시간 (22시~06시): 2시간</Text>
//           <Text fontWeight="bold" mt={2}>예상 월급 (세전)</Text>
//           <Text>- 기본급 (209시간 기준): 2,090,000원</Text>
//           <Text>- 연장근로수당 (5시간 * 1.5배 * 4.345주): 약 325,875원</Text>
//           <Text>- 야간근로수당 (2시간 * 0.5배 * 4.345주): 약 43,450원</Text>
//           <Text color="brand.darkBrown" fontWeight="bold" fontSize="lg" mt={2}>총 예상 급여: 약 2,459,325원</Text>
//         </Box>
//         <Text mt={3} fontSize="sm" color="brand.mediumBrown">※ 주휴수당 포함, 4대보험 및 세금 공제 전 금액입니다. 실제 수령액과 차이가 있을 수 있습니다.</Text>
//       </Box>
//       <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" bg="white">
//         <Heading size="md" mb={3} color="brand.darkBrown">급여 관련 정보</Heading>
//         <Text color="brand.mediumBrown" mb={1}>- <strong>최저임금 (2024년):</strong> 시급 9,860원</Text>
//         <Text color="brand.mediumBrown" mb={1}>- <strong>연장근로수당:</strong> 통상임금의 1.5배</Text>
//         <Text color="brand.mediumBrown" mb={1}>- <strong>야간근로수당 (22시~06시):</strong> 통상임금의 0.5배 가산</Text>
//         <Text color="brand.mediumBrown" mb={1}>- <strong>휴일근로수당:</strong> 8시간 이내 1.5배, 8시간 초과 2배</Text>
//       </Box>
//       <RouterLink to="/toolkit">
//         <ChakraLink color="brand.darkBrown" fontWeight="semibold" display="block" textAlign="center" mt={4}>툴킷 홈으로 돌아가기</ChakraLink>
//       </RouterLink>
//     </VStack>
//   </Container>
// );

// const ReportAssistPage = () => (
//   <Container py={{ base: 6, md: 8 }} px={{ base: 4, md: 6 }}>
//     <VStack spacing={6} align="stretch">
//       <Heading size="lg" color="brand.darkBrown" textAlign="center">원스톱 신고 지원</Heading>
//       <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" bg="white">
//         <Heading size="md" mb={3} color="brand.darkBrown">노동청 신고 절차 안내</Heading>
//         <Text color="brand.mediumBrown" mb={2}>임금체불, 부당해고 등 노동 관련 문제 발생 시 신고 절차를 안내해 드립니다.</Text>
//         <Text color="brand.mediumBrown">1. 사업장 관할 지방고용노동관서에 신고 (온라인 또는 방문)</Text>
//         <Text color="brand.mediumBrown">2. 근로감독관 배정 및 사실 조사</Text>
//         <Text color="brand.mediumBrown">3. 시정 지시 또는 사법 처리</Text>
//         <ChakraLink href="https://minwon.moel.go.kr" isExternal color="blue.500" mt={2} display="block">고용노동부 민원마당 바로가기 <Icon as={ExternalLink} mx="2px" /></ChakraLink>
//       </Box>
//       <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" bg="white">
//         <Heading size="md" mb={3} color="brand.darkBrown">증거 수집 가이드</Heading>
//         <Text color="brand.mediumBrown" mb={2}>신고 시 필요한 증거자료 수집 방법을 안내합니다.</Text>
//         <Text color="brand.mediumBrown">- 근로계약서, 임금명세서</Text>
//         <Text color="brand.mediumBrown">- 출퇴근 기록 (사진, 동료 증언, 교통카드 내역 등)</Text>
//         <Text color="brand.mediumBrown">- 업무 지시 내용 (메시지, 녹취 등)</Text>
//         <Text color="brand.mediumBrown">- 기타 부당행위 증거 (사진, 영상, 녹취 등)</Text>
//          <Alert status="info" variant="subtle" borderRadius="md" mt={3} bg="blue.50">
//           <AlertIcon color="blue.500"/>
//           <Box>
//           <Text fontSize="sm" color="blue.700">블록체인에 저장된 스마트 근로계약서 및 근무 기록은 신뢰도 높은 증거로 활용될 수 있습니다.</Text>
//           </Box>
//         </Alert>
//       </Box>
//       <RouterLink to="/toolkit">
//         <ChakraLink color="brand.darkBrown" fontWeight="semibold" display="block" textAlign="center" mt={4}>툴킷 홈으로 돌아가기</ChakraLink>
//       </RouterLink>
//     </VStack>
//   </Container>
// );

// /experts 와 /support 는 App.jsx 에서 처리되어야 하므로 여기서는 제외합니다.
// ToolCard에서 해당 경로를 사용하고 있다면, App.jsx 에 라우트를 추가해야 합니다.
// 지금은 ToolkitPage 내 하위 경로만 처리합니다.

const ToolCard = ({ icon, title, description, path, bgColor, isExternal }) => (
  <ChakraLink 
    as={isExternal ? "a" : RouterLink} 
    href={isExternal ? path : undefined} 
    to={!isExternal ? path : undefined} // path가 상대경로가 됨
    style={{ textDecoration: 'none', width: '100%' }} 
    isExternal={isExternal} 
    _hover={{textDecoration: 'none'}}
  >
    <VStack 
      p={5} 
      bg={bgColor || "white"} // 기본 배경색 변경
      borderRadius="xl" // 모서리 더 둥글게
      boxShadow="lg" // 그림자 강화
      spacing={3} 
      alignItems="center" 
      justifyContent="center" 
      h={{ base: "160px", md: "180px" }} 
      _hover={{ boxShadow: "xl", transform: "translateY(-4px)" }} 
      transition="all 0.25s ease-in-out"
      borderColor="brand.veryLightBrown"
      borderWidth={1}
    >
      <Icon as={icon} boxSize={{base: 8, md: 10}} color="brand.darkBrown" mb={1}/>
      <Heading size={{base: "xs", md: "sm"}} textAlign="center" color="brand.darkBrown" fontWeight="semibold">
        {title}
      </Heading>
      {description && <Text fontSize={{base: "2xs", md: "xs"}} textAlign="center" color="brand.mediumBrown" noOfLines={2}>{description}</Text>}
      {isExternal && <Icon as={ExternalLink} boxSize={3} color="brand.lightBrown" position="absolute" top={3} right={3}/>}
    </VStack>
  </ChakraLink>
);

const ToolkitMainContent = () => {
  return (
    <Container py={{ base: 6, md: 8 }} px={{ base: 4, md: 6 }}>
      <VStack spacing={8} align="stretch" w="100%">
        <Box textAlign="center">
          <Heading as="h1" size="xl" color="brand.darkBrown" mb={2}>
            맞춤형 권익보호 툴킷
          </Heading>
          <Text color="brand.mediumBrown" fontSize={{ base: "sm", md: "md" }}>
            근로 생활에 필요한 다양한 도구와 정보를 활용하여 스스로 권익을 보호하세요.
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 2 }} spacing={{base: 3, md: 5}} mt={2}>
          {/* path를 상대 경로로 수정 */}
          <ToolCard icon={Edit3} title="스마트 근로계약서" description="표준 계약서 확인 및 자동 검토" path="smart-contract" bgColor="brand.veryLightBrown"/>
          <ToolCard icon={Clock} title="근무시간 기록기" description="자동 기록 및 초과 근무 알림" path="time-tracker" bgColor="brand.veryLightBrown"/>
          <ToolCard icon={Calculator} title="급여 계산기" description="정확한 예상 급여 확인" path="salary-calculator" bgColor="brand.veryLightBrown"/>
          <ToolCard icon={ShieldQuestion} title="원스톱 신고 지원" description="노동청 신고 절차 및 증거 수집 안내" path="report-assist" bgColor="brand.veryLightBrown"/>
        </SimpleGrid>

        <Divider borderColor="brand.lightBrown" my={4}/>

        <Box p={{base:4, md:6}} bg="brand.lightBrown" borderRadius="xl" textAlign="center" boxShadow="lg">
          <HStack justifyContent="center" mb={3}>
              <Icon as={FileLock2} boxSize={{base: 6, md: 8}} color="brand.darkBrown"/>
              <Heading size={{base: "md", md: "lg"}} color="brand.darkBrown" fontWeight="semibold">블록체인 증명 시스템</Heading>
          </HStack>
          <Text fontSize={{base: "sm", md: "md"}} color="brand.darkBrown">
            근로계약서, 근무기록 등 중요 자료는 <Text as="span" fontWeight="bold">블록체인에 안전하게 기록</Text>되어 위변조가 불가능합니다. 
            필요시 법적 증거로 활용될 수 있습니다.
          </Text>
        </Box>
        
        <Divider borderColor="brand.lightBrown" my={4}/>

        <Box textAlign="center">
          <Heading size={{base: "md", md: "lg"}} color="brand.darkBrown" mb={4} fontWeight="semibold">전문기관 연계</Heading>
          <SimpleGrid columns={{ base: 2 }} spacing={{base: 3, md: 5}}>
            {/* 아래 path들은 App.jsx에서 /experts, /support/기관안내 등으로 정의되어야 합니다. */}
            {/* 지금은 외부 링크처럼 처리하거나, App.jsx에 라우트를 추가해야 합니다. */}
            {/* UI 개선을 위해 isExternal=true로 임시 처리하고, 실제 경로는 추후 App.jsx에 추가 필요 */}
             <ToolCard icon={BookOpen} title="노무사/변호사 찾기" description="지역별 전문가 매칭" path="/experts" bgColor="white" isExternal={false}/> {/* App.jsx에 정의 가정 */}
             <ToolCard icon={PhoneCall} title="고객센터/기관 안내" description="고용노동청 등 연락처 안내" path="/support/institutions" bgColor="white" isExternal={false}/> {/* App.jsx에 정의 가정 */}
          </SimpleGrid>
        </Box>

        <Alert status="info" variant="subtle" borderRadius="lg" mt={6} bg="blue.50" borderColor="blue.200" borderWidth={1}>
          <Icon as={InfoLucide} color="blue.500" mr={2} boxSize={5}/>
          <Box>
          <Text fontSize="sm" color="blue.700">
              본 툴킷은 일반적인 상황을 기준으로 제공되며, 법적인 문제 발생 시 반드시 전문가와 상담하시기 바랍니다.
          </Text>
          </Box>
        </Alert>

      </VStack>
    </Container>
  );
};

const ToolkitPage = () => {
  return (
    <Routes>
      <Route index element={<ToolkitMainContent />} />
      <Route path="smart-contract" element={<SmartContractPage />} />
      <Route path="time-tracker" element={<TimeTrackerPage />} />
      <Route path="salary-calculator" element={<SalaryCalculatorPage />} />
      <Route path="report-assist" element={<ReportAssistPage />} />
      {/* Outlet을 사용하면 ToolkitPage 레이아웃 내에 하위 페이지들이 렌더링됩니다. */}
      {/* <Route path="*" element={<Outlet />} /> */}
    </Routes>
  );
};

export default ToolkitPage; 
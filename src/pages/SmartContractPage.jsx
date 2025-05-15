import { Box, VStack, Heading, Text, Link as ChakraLink, Container, Alert, AlertIcon, Divider, List, ListItem, Tag, HStack, Image, Icon } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { ThumbsUp, ThumbsDown, AlertTriangle, FileCheck, FileText, CheckCircle2, Info, TriangleAlert } from 'lucide-react';

const SmartContractPage = () => {
  // AI "라이티"의 분석 결과 (가상 데이터)
  const analysisResult = {
    contractName: "[청년] 주식회사 멋쟁이컴퍼니 근로계약서",
    analysisDate: "2024년 7월 26일",
    overallAssessment: "대체로 양호하나, 일부 확인 및 협의가 필요한 조항이 있습니다.",
    favorableClauses: [
      { id: 1, text: "연차 유급휴가: 법정 기준(1년 미만 1개월 만근 시 1일) 정상 지급 명시" },
      { id: 2, text: "식대 지원: 월 10만원 별도 지급 (비과세 혜택 가능성 확인 필요)" },
    ],
    toxicClauses: [
      { id: 1, text: "포괄임금제 계약: 연장/야간/휴일근로수당이 기본급에 포함된 것으로 간주될 수 있어, 실제 근로시간 대비 불리할 수 있음. (월 예상 초과근로시간 명확히 할 필요)" },
      { id: 2, text: "수습 기간: 3개월 적용, 수습 기간 중 급여는 정상 급여의 90% 지급 (최저임금 이상이어야 함, 계약서상 시급 확인 필수)" },
    ],
    essentialChecks: [
      { id: 1, text: "계약 기간: '기간의 정함이 없음'으로 명시되어 있는지, 또는 계약직인 경우 기간이 명확한지 확인" },
      { id: 2, text: "근무 장소 및 업무 내용: 구체적으로 명시되어 있는지 확인 (부당 전보 및 업무 변경 방지)" },
      { id: 3, text: "임금 지급일 및 지급 방법: 명확히 기재되어 있는지 확인" },
      { id: 4, text: "최저임금 준수 여부: (2024년 기준 시급 9,860원) 수습 감액 적용 시에도 최저임금의 90% 이상이어야 함." },
    ],
    requiredDocuments: [
      { id: 1, text: "신분증 사본 1부" },
      { id: 2, text: "통장 사본 1부 (급여 지급용)" },
      { id: 3, text: "주민등록등본 1부 (필요시)" },
    ],
  };

  return (
    <Container py={{ base: 6, md: 8 }} px={{ base: 4, md: 6 }}>
      <VStack spacing={6} align="stretch">
        <Heading size="xl" color="brand.darkBrown" textAlign="center">AI 근로계약 분석 리포트</Heading>
        
        <Box p={6} shadow="xl" borderWidth="1px" borderRadius="lg" bg="white">
          <HStack mb={4} spacing={3} alignItems="center">
            <Image src='/temp.png' alt="라이티 AI 비서" boxSize="50px" borderRadius="full" />
            <VStack align="start" spacing={0}>
              <Heading size="md" color="brand.darkBrown">AI 비서 "라이티" 분석 결과</Heading>
              <Text fontSize="sm" color="brand.mediumBrown">계약서: {analysisResult.contractName}</Text>
              <Text fontSize="xs" color="gray.500">분석일: {analysisResult.analysisDate}</Text>
            </VStack>
          </HStack>

          <Alert status="info" variant="subtle" borderRadius="md" bg="blue.50" mb={5}>
            <Icon as={Info} color="blue.500" mr={2}/>
            <Box>
              <Text fontSize="sm" fontWeight="bold" color="blue.700">종합 의견</Text>
              <Text fontSize="sm" color="blue.700">{analysisResult.overallAssessment}</Text>
            </Box>
          </Alert>

          <VStack spacing={5} align="stretch">
            <AnalysisSection title="👍 유리한 조항" icon={ThumbsUp} data={analysisResult.favorableClauses} colorScheme="green" />
            <AnalysisSection title="👎 독소/불리 조항 (검토 필요)" icon={ThumbsDown} data={analysisResult.toxicClauses} colorScheme="red" />
            <AnalysisSection title="🔍 필수 확인 사항" icon={AlertTriangle} data={analysisResult.essentialChecks} colorScheme="yellow" />
            <AnalysisSection title="📄 준비 서류 안내" icon={FileCheck} data={analysisResult.requiredDocuments} colorScheme="gray" />
          </VStack>
        </Box>

        <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" bg="gray.50" mt={4}>
            <Heading size="sm" mb={3} color="brand.darkBrown">참고: 표준 근로계약서</Heading>
            <Text color="brand.mediumBrown" mb={2}>일반적인 표준 근로계약서 양식도 확인해보세요.</Text>
            <ChakraLink href="/path/to/standard_contract.pdf" isExternal color="blue.500">[샘플] 표준 근로계약서 (청소년용).pdf <Icon as={FileText} mx="2px" verticalAlign="middle" /></ChakraLink>
            <Text mt={3} color="brand.mediumBrown" fontSize="xs"><strong>주요 항목:</strong> 근로조건, 임금, 근로시간, 휴일, 연차유급휴가 등</Text>
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

const AnalysisSection = ({ title, icon, data, colorScheme }) => {
  if (!data || data.length === 0) return null;
  const IconComponent = icon;

  return (
    <Box>
      <HStack mb={2}>
        <Icon as={IconComponent} color={`${colorScheme}.500`} boxSize={5} />
        <Heading size="sm" color="brand.darkBrown">{title}</Heading>
      </HStack>
      <List spacing={2} pl={2} borderLeftWidth="2px" borderColor={`${colorScheme}.100`}>
        {data.map((item) => (
          <ListItem key={item.id} fontSize="sm" color="brand.mediumBrown">
            <Tag size="sm" colorScheme={colorScheme} variant="subtle" mr={2} verticalAlign="middle">
              {IconComponent === ThumbsUp ? "유리" : IconComponent === ThumbsDown ? "주의" : IconComponent === AlertTriangle ? "확인" : "안내"}
            </Tag>
            {item.text}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SmartContractPage; 
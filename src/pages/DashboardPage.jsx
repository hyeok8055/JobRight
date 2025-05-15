import { Box, VStack, HStack, Heading, Text, Icon, SimpleGrid, InputGroup, InputLeftElement, Input, Divider, Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton, Card, CardBody, Container, Button, Tag, useDisclosure } from "@chakra-ui/react";
import { BriefcaseBusiness, FileText, BarChart3, AlertTriangle, Search, Edit3, Clock, Calculator, Award, TrendingUp, MessageSquareText, Info, CheckCircle, XCircle, HelpCircle } from 'lucide-react';
import { Link as RouterLink } from "react-router-dom";
import { useState } from 'react';

const FeatureCard = ({ icon, title, description, path, bgColor, tag, cta }) => (
  <Card as={RouterLink} to={path} variant="elevated" size="sm" h="100%" _hover={{borderColor: "brand.accent"}}>
    <CardBody display="flex" flexDirection="column" justifyContent="space-between">
      <VStack spacing={3} align="start" flexGrow={1}>
        <HStack justifyContent="space-between" w="100%">
            <Icon as={icon} boxSize={8} color="brand.accent" bg="brand.veryLightBrown" p={1.5} borderRadius="md" />
            {tag && <Tag size="sm" variant="subtle" colorScheme="brand" bg="brand.lightBrown" color="brand.darkBrown">{tag}</Tag>}
        </HStack>
        <Heading size="sm" fontWeight="semibold">{title}</Heading>
        <Text fontSize="sm" color="brand.textSubtle" noOfLines={2}>{description}</Text>
      </VStack>
      {cta && <Button variant="link" size="sm" colorScheme="brand" mt={3} rightIcon={<TrendingUp size={16}/>}>{cta}</Button>}
    </CardBody>
  </Card>
);

const ToolkitIconLink = ({icon, label, path}) => (
    <VStack as={RouterLink} to={path} spacing={1} p={2} bg="brand.veryLightBrown" borderRadius="md" _hover={{bg: "brand.lightBrown", transform: "translateY(-1px)"}} transition="all 0.15s" h="auto" justifyContent="center" w="100%">
        <Icon as={icon} boxSize={5} color="brand.darkBrown" mb={0.5}/>
        <Text fontSize="2xs" textAlign="center" color="brand.darkBrown" fontWeight="medium" lineHeight="short" noOfLines={2}>{label}</Text>
    </VStack>
)

const DashboardPage = () => {
  const lifecycleStage = "근무 중"; 
  const userName = "라이티"; 

  const lifeCycleSteps = ["구직", "계약", "근무 중", "퇴사"];
  
  // 현재 "근무 중" 단계에 대한 예시 유의사항 데이터
  const currentStageNotices = [
    { text: "근로계약서 내용과 실제 근무 조건 일치", status: "checked", detailsPath: "/toolkit/smart-contract/check/1" },
    { text: "주휴수당 지급 조건 충족 및 정상 지급 확인", status: "warning", detailsPath: "/toolkit/salary-calculator/rules/paid-holiday" },
    { text: "4대보험 가입 여부 확인", status: "checked", detailsPath: "/my-info/insurances" },
    { text: "최근 3개월 급여명세서 수령 및 확인", status: "info", detailsPath: "/my-info/payslips" },
    { text: "연차휴가 발생 현황 및 사용 계획 점검", status: "info", detailsPath: "/toolkit/time-tracker/annual-leave" },
  ];

  const getStatusIcon = (status) => {
    if (status === "checked") return <Icon as={CheckCircle} color="green.500" />;
    if (status === "warning") return <Icon as={XCircle} color="red.500" />;
    return <Icon as={HelpCircle} color="gray.500" />;
  };

  return (
    <Container py={{ base: 6, md: 8 }} px={{ base: 4, md: 6 }} minH="calc(100vh - 65px)">
      <VStack spacing={6} align="stretch" w="100%">
        <Box>
          <Heading as="h1" size="xl" color="brand.textBody">{userName}님, 안녕하세요!</Heading>
          <Text color="brand.textSubtle" fontSize="md">
            현재 <Text as="span" fontWeight="bold" color="brand.darkBrown" fontStyle="italic">'{lifecycleStage}'</Text> 단계에 필요한 정보를 확인하세요.
          </Text>
        </Box>

        <Box>
          <Heading size="lg" mb={3} fontWeight="semibold">자주 찾는 서비스</Heading>
          <SimpleGrid columns={{base: 4}} spacing={{base: 2, md: 3}}>
              <ToolkitIconLink icon={Edit3} label="스마트 계약서" path="/toolkit/smart-contract"/>
              <ToolkitIconLink icon={Clock} label="근무시간 기록" path="/toolkit/time-tracker"/>
              <ToolkitIconLink icon={Calculator} label="급여 계산기" path="/toolkit/salary-calculator"/>
              <ToolkitIconLink icon={Award} label="원스톱 신고" path="/toolkit/report-assist"/>
          </SimpleGrid>
        </Box>

        <Box>
          <Heading size="lg" mb={3} fontWeight="semibold">나의 맞춤 정보</Heading>
          
          {/* Life Cycle Steps Indicator */}
          <HStack spacing={0} justifyContent="space-between" mb={5} w="100%">
            {lifeCycleSteps.map((step, index) => (
              <VStack key={step} flex={1} spacing={1}>
                <HStack w="100%" justifyContent="center">
                  {index > 0 && <Divider orientation="horizontal" borderColor={lifeCycleSteps.indexOf(lifecycleStage) >= index ? "brand.accent" : "gray.200"} flex={1} mr={-2}/>}
                  <Box 
                    bg={lifecycleStage === step ? "brand.accent" : "gray.200"} 
                    color={lifecycleStage === step ? "white" : "brand.textSubtle"} 
                    borderRadius="full" 
                    boxSize={8} 
                    display="flex" 
                    alignItems="center" 
                    justifyContent="center" 
                    fontWeight="bold"
                    fontSize="sm"
                    zIndex={1}
                  >
                    {index + 1}
                  </Box>
                  {index < lifeCycleSteps.length - 1 && <Divider orientation="horizontal" borderColor={lifeCycleSteps.indexOf(lifecycleStage) > index ? "brand.accent" : "gray.200"} flex={1} ml={-2}/>}
                </HStack>
                <Text fontSize="xs" color={lifecycleStage === step ? "brand.accent" : "brand.textSubtle"} fontWeight={lifecycleStage === step ? "bold" : "normal"}>{step}</Text>
              </VStack>
            ))}
          </HStack>

          {/* Stage Specific Notices */}
          <VStack spacing={3} align="stretch" mb={5}>
            <Heading size="md" mb={1} color="brand.darkBrown">&#10003; {lifecycleStage} 필수 체크리스트</Heading>
            {currentStageNotices.map((notice, index) => (
              <Card key={index} variant="outline" size="sm" _hover={{borderColor: "brand.lightBrown"}}>
                <CardBody p={3}>
                  <HStack justifyContent="space-between">
                    <HStack spacing={2.5}>
                      {getStatusIcon(notice.status)}
                      <Text fontSize="sm" color="brand.textBody">{notice.text}</Text>
                    </HStack>
                    <Button as={RouterLink} to={notice.detailsPath} size="xs" variant="ghost" colorScheme="brand">
                      자세히
                    </Button>
                  </HStack>
                </CardBody>
              </Card>
            ))}
          </VStack>
        </Box>
        
        <Divider />

        <Box>
          <HStack justifyContent="space-between" alignItems="center" mb={4}>
            <Heading size="lg" fontWeight="semibold">AI 라이티</Heading>
            <Button as={RouterLink} to="/ai-righty" variant="ghost" size="sm" rightIcon={<MessageSquareText size={16}/>}>전체 상담 보기</Button>
          </HStack>
          <Card variant="outline" bg="brand.veryLightBrown">
            <CardBody>
                <VStack spacing={3} align="start">
                    <HStack>
                        <Icon as={MessageSquareText} boxSize={6} color="brand.accent"/>
                        <Text fontWeight="semibold" color="brand.darkBrown">무엇이든 물어보세요!</Text>
                    </HStack>
                    <Text fontSize="sm" color="brand.textSubtle">
                        24시간 언제든지 AI 라이티에게 노동법, 권리 침해 관련 궁금증을 실시간으로 해결할 수 있습니다. 계약서 분석도 가능해요.
                    </Text>
                    <Button as={RouterLink} to="/ai-righty" colorScheme="brand" bg="brand.darkBrown" mt={2} size="sm">
                        AI 라이티와 상담 시작
                    </Button>
                </VStack>
            </CardBody>
          </Card>
        </Box>
        
        <Divider />

        <Box>
          <Heading size="lg" mb={4} fontWeight="semibold">사업장 신뢰도</Heading>
          <InputGroup size="lg">
            <InputLeftElement pointerEvents="none">
              <Icon as={Search} color="brand.textSubtle" />
            </InputLeftElement>
            <Input type="text" placeholder="회사명으로 신뢰도 검색 (예: 잡라이트)" variant="filled" />
          </InputGroup>
          <Text fontSize="xs" mt={2} color="brand.textSubtle">검색 결과는 <RouterLink to="/company-trust"><Text as="span" textDecoration="underline" fontWeight="medium">기업신뢰 페이지</Text></RouterLink>에서 더 자세히 볼 수 있습니다.</Text>
        </Box>

        <Divider />
        
        <Alert status="info" variant="subtle" colorScheme="brand" borderRadius="lg">
          <AlertIcon as={Info}/>
          <Text fontSize="sm">
            잡라이트는 청소년과 청년 노동자들의 권익 보호를 위해 항상 노력하고 있습니다. 도움이 필요하면 언제든 찾아주세요.
          </Text>
        </Alert>

      </VStack>
    </Container>
  );
};

export default DashboardPage; 
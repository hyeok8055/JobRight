import { Box, VStack, HStack, Heading, Text, Icon, InputGroup, InputLeftElement, Input, Button, Divider, Tag, Progress, Avatar, Tabs, TabList, Tab, TabPanels, TabPanel, Badge, Container, Card, CardBody, CardHeader, SimpleGrid, useToast, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Spinner } from "@chakra-ui/react";
import { Search, ShieldCheck, ShieldAlert, MessageCircle, Users, Building, CheckCircle, XCircle, Info, TrendingUp, ThumbsUp, ThumbsDown, Star, Filter } from 'lucide-react';
import { useState } from 'react';

const ReviewCard = ({ reviewer, rating, comment, date, isAnonymous = true }) => (
  <Card variant="outline" size="sm" w="100%">
    <CardHeader pb={1} pt={2.5} px={3}>
        <HStack justifyContent="space-between">
            <HStack spacing={1.5}>
                <Avatar size="xs" icon={<Users size={14}/>} bg={isAnonymous ? "brand.lightBrown" : "brand.accent"} color="white" />
                <Text fontWeight="semibold" fontSize="sm" color="brand.textBody">{isAnonymous ? "익명" : reviewer}</Text>
            </HStack>
            <HStack spacing={0.5}>
                {[...Array(5)].map((_, i) => (
                    <Icon as={Star} key={i} color={i < rating ? "yellow.400" : "gray.300"} fill={i < rating ? "yellow.400" : "gray.300"} boxSize={3.5}/>
                ))}
                <Text fontSize="xs" fontWeight="bold" color="brand.darkBrown" ml={1}>{rating.toFixed(1)}</Text>
            </HStack>
        </HStack>
    </CardHeader>
    <CardBody pt={0.5} pb={2} px={3}>
        <Text fontSize="xs" color="brand.textBody" mb={1.5} noOfLines={2}>{comment}</Text>
        <Text fontSize="2xs" color="brand.textSubtle">{new Date(date).toLocaleDateString()}</Text>
    </CardBody>
    {/* <CardFooter pt={2} display="flex" justifyContent="flex-end">
        <HStack spacing={1}>
            <IconButton size="xs" variant="ghost" icon={<ThumbsUp size={14}/>} aria-label="Helpful"/>
            <IconButton size="xs" variant="ghost" icon={<ThumbsDown size={14}/>} aria-label="Not helpful"/>
        </HStack>
    </CardFooter> */}
  </Card>
);

const sampleCompanyData = [
  {
    id: 1,
    name: "(주) 라이트컴퍼니",
    industry: "IT, 정보통신업",
    employeeCount: "50-100명",
    overallRating: 4.5,
    transparencyIndex: 85,
    salarySatisfaction: 4.2,
    workLifeBalance: 4.8,
    potentialGrowth: 4.0,
    insurances: [
      { name: "고용보험", joined: true },
      { name: "산재보험", joined: true },
      { name: "국민연금", joined: true },
      { name: "건강보험", joined: true },
    ],
    unpaidWagesHistory: false,
    reviews: [
      { id: 1, reviewer: "김철수", rating: 5, comment: "정말 좋은 회사입니다. 워라밸 최고!", date: "2024-07-10", isAnonymous: false },
      { id: 2, reviewer: "익명", rating: 4, comment: "배울 점이 많은 곳입니다. 추천합니다.", date: "2024-06-22" },
    ],
    potentialRisks: [],
  },
  {
    id: 2,
    name: "(주) 해피푸드",
    industry: "음식료품, 제조업",
    employeeCount: "100-200명",
    overallRating: 3.2,
    transparencyIndex: 60,
    salarySatisfaction: 3.0,
    workLifeBalance: 3.5,
    potentialGrowth: 3.1,
    insurances: [
      { name: "고용보험", joined: true },
      { name: "산재보험", joined: true },
      { name: "국민연금", joined: true },
      { name: "건강보험", joined: false },
    ],
    unpaidWagesHistory: true,
    reviews: [
      { id: 3, reviewer: "박영희", rating: 2, comment: "야근이 잦고 임금 체불 경험이 있습니다.", date: "2024-05-15", isAnonymous: false },
    ],
    potentialRisks: [
      { id: 1, risk: "최근 1년간 임금 체불 이력 2건 발생", severity: "high", description: "정기적인 임금 지급이 이루어지지 않을 수 있으니 주의가 필요합니다." },
      { id: 2, risk: "건강보험 미가입 상태", severity: "medium", description: "입사 시 건강보험 가입 여부를 반드시 확인하세요." },
    ],
  },
  {
    id: 3,
    name: "넥스트테크",
    industry: "소프트웨어 개발",
    employeeCount: "20-50명",
    overallRating: 4.8,
    transparencyIndex: 92,
    salarySatisfaction: 4.5,
    workLifeBalance: 4.7,
    potentialGrowth: 4.9,
    insurances: [
      { name: "고용보험", joined: true }, { name: "산재보험", joined: true }, { name: "국민연금", joined: true }, { name: "건강보험", joined: true },
    ],
    unpaidWagesHistory: false,
    reviews: [
      { id: 4, reviewer: "최수민", rating: 5, comment: "개발자에게 최고의 환경! 자율 출퇴근과 높은 연봉.", date: "2024-07-01", isAnonymous: false},
      { id: 5, reviewer: "익명", rating: 5, comment: "성장 기회가 정말 많습니다. 스톡옵션도 만족!", date: "2024-06-10" },
    ],
    potentialRisks: [],
  },
  {
    id: 4,
    name: "그린물류",
    industry: "운송 및 창고업",
    employeeCount: "200명 이상",
    overallRating: 2.5,
    transparencyIndex: 45,
    salarySatisfaction: 2.2,
    workLifeBalance: 2.8,
    potentialGrowth: 2.5,
    insurances: [
      { name: "고용보험", joined: true }, { name: "산재보험", joined: false }, { name: "국민연금", joined: true }, { name: "건강보험", joined: true },
    ],
    unpaidWagesHistory: true,
    reviews: [
      { id: 6, reviewer: "강현우", rating: 1, comment: "산재보험 가입이 안되어있어 불안합니다. 업무 강도도 매우 높습니다.", date: "2024-04-02", isAnonymous: false },
    ],
    potentialRisks: [
      { id: 3, risk: "산재보험 미가입 의심", severity: "high", description: "운송업 특성상 산재 위험이 높은데 미가입 상태인 것은 큰 문제입니다." },
      { id: 4, risk: "잦은 야간 근무 및 초과 근무", severity: "medium", description: "리뷰에서 과도한 근무시간에 대한 불만이 다수 확인됩니다." },
    ],
  },
  {
    id: 5,
    name: "키즈드림 유치원",
    industry: "교육 서비스업",
    employeeCount: "10-20명",
    overallRating: 3.9,
    transparencyIndex: 70,
    salarySatisfaction: 3.5,
    workLifeBalance: 4.2,
    potentialGrowth: 3.3,
    insurances: [
      { name: "고용보험", joined: true }, { name: "산재보험", joined: true }, { name: "국민연금", joined: true }, { name: "건강보험", joined: true },
    ],
    unpaidWagesHistory: false,
    reviews: [
      { id: 7, reviewer: "윤지아", rating: 4, comment: "아이들은 예쁘지만, 선생님들에 대한 처우 개선이 필요해요.", date: "2024-06-25", isAnonymous: false },
    ],
    potentialRisks: [
      { id: 5, risk: "보육교사 근무 환경 관련 법규 준수 여부 확인 필요", severity: "low", description: "휴게시간 보장, 적정 교사 대 아동 비율 등을 확인하는 것이 좋습니다." },
    ],
  },
  {
    id: 6,
    name: "(주)모던디자인",
    industry: "전문 디자인",
    employeeCount: "5-10명",
    overallRating: 4.2,
    transparencyIndex: 80,
    salarySatisfaction: 4.0,
    workLifeBalance: 3.9,
    potentialGrowth: 4.1,
    insurances: [
        { name: "고용보험", joined: true }, { name: "산재보험", joined: true }, { name: "국민연금", joined: true }, { name: "건강보험", joined: true },
    ],
    unpaidWagesHistory: false,
    reviews: [
        { id: 8, reviewer: "이현지", rating: 4, comment: "소규모 회사지만 배울 점이 많고 분위기가 자유로워요. 다만 프로젝트 마감 때는 야근이 좀 있어요.", date: "2024-07-12", isAnonymous: false },
    ],
    potentialRisks: [],
  },
  {
    id: 7,
    name: "튼튼병원",
    industry: "보건업 및 사회복지 서비스업",
    employeeCount: "100-200명",
    overallRating: 3.6,
    transparencyIndex: 65,
    salarySatisfaction: 3.3,
    workLifeBalance: 3.0,
    potentialGrowth: 3.8,
    insurances: [
        { name: "고용보험", joined: true }, { name: "산재보험", joined: true }, { name: "국민연금", joined: true }, { name: "건강보험", joined: true },
    ],
    unpaidWagesHistory: false,
    reviews: [
        { id: 9, reviewer: "김간호사", rating: 3, comment: "환자를 돌보는 일은 보람되지만 3교대 근무가 힘듭니다. 인력이 더 충원되면 좋겠어요.", date: "2024-05-30", isAnonymous: true },
    ],
    potentialRisks: [
        { id: 6, risk: "간호 인력 부족으로 인한 업무 과중 우려", severity: "medium", description: "병원 평가 사이트 및 리뷰에서 간호사 업무 부담에 대한 언급이 있습니다." },
    ],
  },
  {
    id: 8,
    name: "열정스터디카페",
    industry: "교육 지원 서비스업",
    employeeCount: "1-5명 (파트타임 다수)",
    overallRating: 3.0,
    transparencyIndex: 50,
    salarySatisfaction: 2.8,
    workLifeBalance: 4.0,
    potentialGrowth: 2.5,
    insurances: [
        { name: "고용보험", joined: false }, { name: "산재보험", joined: false }, { name: "국민연금", joined: false }, { name: "건강보험", joined: false },
    ],
    unpaidWagesHistory: true,
    reviews: [
        { id: 10, reviewer: "알바생", rating: 2, comment: "최저시급은 주지만, 주휴수당 안 챙겨주고 가끔 월급도 밀립니다.", date: "2024-06-03", isAnonymous: true },
    ],
    potentialRisks: [
        { id: 7, risk: "4대보험 미가입 및 주휴수당 미지급 가능성", severity: "high", description: "단기 근로자라도 요건 충족 시 4대보험 가입 및 주휴수당 지급은 필수입니다." },
        { id: 8, risk: "임금 체불 이력 (소액, 단기)", severity: "medium", description: "커뮤니티 리뷰에서 소액 임금 체불 경험담이 확인됩니다." },
    ],
  },
  {
    id: 9,
    name: "스피드퀵",
    industry: "퀵서비스, 배달대행",
    employeeCount: "프리랜서 계약 다수",
    overallRating: 2.2,
    transparencyIndex: 30,
    salarySatisfaction: 2.5, // 건당 수수료 기반
    workLifeBalance: 2.0, // 경쟁 심함
    potentialGrowth: 2.0,
    insurances: [ // 대부분 개인사업자로 처리
        { name: "고용보험", joined: false }, { name: "산재보험", joined: false }, { name: "국민연금", joined: false }, { name: "건강보험", joined: false },
    ],
    unpaidWagesHistory: false, // 직접적인 체불보다 수수료 정산 관련 분쟁 가능성
    reviews: [
        { id: 11, reviewer: "라이더김", rating: 2, comment: "경쟁 너무 치열하고 사고 위험도 높아요. 보험도 개인이 알아서 들어야 합니다.", date: "2024-07-15", isAnonymous: true },
    ],
    potentialRisks: [
        { id: 9, risk: "플랫폼 노동자 보호 미흡 (산재보험 등)", severity: "high", description: "특수고용직 노동자로 분류되어 기본적인 노동자 권리 보호가 취약할 수 있습니다." },
        { id: 10, risk: "불공정 계약 및 수수료 문제 발생 가능성", severity: "medium", description: "계약 조건, 수수료율 등을 꼼꼼히 확인해야 합니다." },
    ],
  },
  {
    id: 10,
    name: "(주)케이스타일",
    industry: "의류 도소매",
    employeeCount: "10-20명",
    overallRating: 4.0,
    transparencyIndex: 75,
    salarySatisfaction: 3.8,
    workLifeBalance: 4.1,
    potentialGrowth: 3.9,
    insurances: [
        { name: "고용보험", joined: true }, { name: "산재보험", joined: true }, { name: "국민연금", joined: true }, { name: "건강보험", joined: true },
    ],
    unpaidWagesHistory: false,
    reviews: [
        { id: 12, reviewer: "패션 MD 지망생", rating: 4, comment: "트렌디한 상품을 많이 다뤄서 재밌어요. 다만 패션업계 특성상 급여가 아주 높진 않아요.", date: "2024-06-28", isAnonymous: false },
    ],
    potentialRisks: [
      { id: 11, risk: "감정노동 강도 주의", severity: "low", description: "고객 응대 과정에서 감정노동이 발생할 수 있습니다." },
    ],
  },
];

const CompanyTrustPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [displayedCompanies, setDisplayedCompanies] = useState(sampleCompanyData);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
        setDisplayedCompanies(sampleCompanyData);
        // Optional: toast message if needed when search term is empty
        // toast({ title: "모든 회사 목록을 표시합니다.", status: "info", duration: 2000, position: "top" });
        return;
    }
    setIsLoading(true);
    // setDisplayedCompanies([]); // Clear previous results before search if desired, or keep them until new results arrive
    
    await new Promise(resolve => setTimeout(resolve, 700)); // Simulate API call

    const searchLower = searchTerm.toLowerCase().trim();
    const foundCompanies = sampleCompanyData.filter(company => 
      company.name.toLowerCase().includes(searchLower)
    );

    if (foundCompanies.length > 0) {
      setDisplayedCompanies(foundCompanies);
    } else {
      setDisplayedCompanies([]);
      toast({
        title: `'${searchTerm}'에 대한 검색 결과가 없습니다.`,
        description: "회사명을 확인하거나 다른 검색어를 입력해보세요.",
        status: "info",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
    setIsLoading(false);
  };

  return (
    <Container py={{ base: 4, md: 6 }} px={{ base: 3, md: 4 }} minH="calc(100vh - 65px)">
      <VStack spacing={4} align="stretch" w="100%">
        <Box textAlign="center">
            <Heading as="h1" size="lg" color="brand.textBody">사업장 신뢰도</Heading>
            <Text color="brand.textSubtle" mt={0.5} fontSize="sm">지원하려는 회사가 어떤 곳인지 미리 알아보세요.</Text>
        </Box>
        
        <HStack as="form" onSubmit={(e) => {e.preventDefault(); handleSearch();}}>
          <InputGroup size="md">
            <InputLeftElement pointerEvents="none">
              <Icon as={Search} color="brand.textSubtle" />
            </InputLeftElement>
            <Input 
              type="text" 
              placeholder="회사명을 입력하세요 (예: 라이트컴퍼니)" 
              variant="filled"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
          <Button type="submit" bg="brand.darkBrown" color="white" _hover={{bg: "brand.mediumBrown"}} size="md" isLoading={isLoading} loadingText="검색중">
            검색
          </Button>
        </HStack>

        {isLoading && <Box textAlign="center" p={8}><Spinner size="lg" color="brand.accent" thickness="3px"/></Box>}

        {!isLoading && displayedCompanies.length > 0 && (
          <VStack spacing={4} align="stretch" w="100%">
            {displayedCompanies.map(company => (
              <Card key={company.id} w="100%" size="sm">
                <CardHeader pb={2}>
                  <HStack spacing={3} align="center">
                    <Avatar size="md" name={company.name} icon={<Building size={24} />} bg="brand.accent" color="white" />
                    <VStack align="start" spacing={0}>
                        <Heading size="md" color="brand.textBody" fontWeight="bold">{company.name}</Heading>
                        <Text fontSize="xs" color="brand.textSubtle">{company.industry} &bull; {company.employeeCount}</Text>
                    </VStack>
                  </HStack>
                </CardHeader>
                <CardBody pt={0} pb={3} px={4}>
                    <Tabs variant="line" colorScheme="brand" isLazy size="sm">
                        <TabList overflowX="auto" sx={{ scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}>
                            <Tab fontSize="sm" py={2} px={3}>종합평가</Tab>
                            <Tab fontSize="sm" py={2} px={3}>투명성 지수</Tab>
                            <Tab fontSize="sm" py={2} px={3}>리뷰 ({company.reviews.length})</Tab>
                            <Tab fontSize="sm" py={2} px={3}>위험 요소 ({company.potentialRisks.length})</Tab>
                        </TabList>

                        <TabPanels pt={3}>
                            <TabPanel px={0} py={3}>
                            <VStack spacing={3} align="stretch">
                                <SimpleGrid columns={{base: 2, md: 2}} spacing={3}>
                                    <StatCard label="종합 평점" value={`${company.overallRating}/5.0`} icon={Star} iconColor="yellow.400"/>
                                    <StatCard label="급여 만족도" value={`${company.salarySatisfaction}/5.0`} />
                                    <StatCard label="워라밸 지수" value={`${company.workLifeBalance}/5.0`} />
                                    <StatCard label="성장 가능성" value={`${company.potentialGrowth}/5.0`} />
                                </SimpleGrid>
                                <Text fontSize="xs" color="brand.textSubtle">* 위 평점은 잡라이트 사용자 리뷰 및 데이터를 종합하여 산출된 참고 자료입니다.</Text>
                            </VStack>
                            </TabPanel>
                            <TabPanel px={0} py={3}>
                                <VStack spacing={3} align="stretch">
                                    <HStack justifyContent="space-between" alignItems="center">
                                        <Heading size="sm" color="brand.textBody">투명성 지수: <Text as="span" color="brand.accent">{company.transparencyIndex}점</Text></Heading>
                                        <Tag colorScheme={company.transparencyIndex > 80 ? "green" : company.transparencyIndex > 60 ? "yellow" : "red"} size="sm" variant="subtle">
                                            {company.transparencyIndex > 80 ? "매우 우수" : company.transparencyIndex > 60 ? "양호" : "개선 필요"}
                                        </Tag>
                                    </HStack>
                                    <Progress value={company.transparencyIndex} size="sm" colorScheme={company.transparencyIndex > 70 ? "green" : company.transparencyIndex > 40 ? "yellow" : "red"} borderRadius="md" bg="brand.veryLightBrown" />
                                    <Text fontSize="xs" color="brand.textSubtle">고용/산재보험 가입 여부, 임금 체불 이력, 정보 공개 수준 등을 종합 평가합니다.</Text>
                                    <SimpleGrid columns={{base: 1, md: 2}} spacing={2} mt={1}>
                                        {company.insurances.map(ins => (
                                            <HStack key={ins.name} justifyContent="space-between" p={2} bg="brand.veryLightBrown" borderRadius="md">
                                                <Text fontSize="xs" fontWeight="medium" color="brand.textBody">{ins.name}</Text>
                                                {ins.joined ? <Icon as={CheckCircle} color="green.500" boxSize={4}/> : <Icon as={XCircle} color="red.500" boxSize={4}/>}
                                            </HStack>
                                        ))}
                                        <HStack justifyContent="space-between" p={2} bg={company.unpaidWagesHistory ? "red.50" : "brand.veryLightBrown"} borderRadius="md">
                                            <Text fontSize="xs" fontWeight="medium" color="brand.textBody">임금 체불 이력 (최근 3년)</Text>
                                            {company.unpaidWagesHistory ? <Icon as={XCircle} color="red.500" boxSize={4}/> : <Icon as={CheckCircle} color="green.500" boxSize={4}/>}
                                        </HStack>
                                    </SimpleGrid>
                                </VStack>
                            </TabPanel>
                            <TabPanel px={0} py={3}>
                            <VStack spacing={3} align="stretch">
                                <HStack justifyContent="space-between">
                                    <Heading size="sm" color="brand.textBody">전·현직원 리뷰</Heading>
                                    <Button size="xs" variant="ghost" leftIcon={<Icon as={Filter} boxSize={3.5}/>}>필터</Button>
                                </HStack>
                                {company.reviews.map(review => (
                                    <ReviewCard key={review.id} {...review} />
                                ))}
                            </VStack>
                            </TabPanel>
                            <TabPanel px={0} py={3}>
                            <VStack spacing={3} align="stretch">
                                <Heading size="sm" color="brand.textBody">잠재적 권익침해 위험 요소</Heading>
                                {company.potentialRisks.length > 0 ? (
                                    company.potentialRisks.map(risk => (
                                    <Card key={risk.id} variant="outline" size="sm" borderColor={risk.severity === 'high' ? "red.300" : risk.severity === 'medium' ? "yellow.400" : "blue.300"} bg={risk.severity === 'high' ? "red.50" : risk.severity === 'medium' ? "yellow.50" : "blue.50"}>
                                        <CardHeader pb={0.5} pt={2} px={3}>
                                            <HStack spacing={1.5}>
                                            <Icon as={ShieldAlert} color={risk.severity === 'high' ? "red.500" : risk.severity === 'medium' ? "yellow.600" : "blue.500"} boxSize={4} />
                                            <Text fontWeight="semibold" fontSize="sm" color={risk.severity === 'high' ? "red.700" : risk.severity === 'medium' ? "yellow.800" : "blue.700"}>{risk.risk}</Text>
                                            </HStack>
                                        </CardHeader>
                                        <CardBody pt={0.5} pb={2} px={3}>
                                            <Text fontSize="xs" color={risk.severity === 'high' ? "red.600" : risk.severity === 'medium' ? "yellow.700" : "blue.600"}>{risk.description}</Text>
                                        </CardBody>
                                    </Card>
                                    ))
                                ) : (
                                    <Box textAlign="center" py={4}>
                                    <Icon as={ShieldCheck} boxSize={10} color="green.500" mb={1.5}/>
                                    <Text fontSize="sm" color="brand.textSubtle" fontWeight="medium">현재 감지된 특별한 위험 요소가 없습니다.</Text>
                                    </Box>
                                )}
                            </VStack>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </CardBody>
              </Card>
            ))}
          </VStack>
        )}
        
        {!isLoading && displayedCompanies.length === 0 && searchTerm.trim() && (
         <Box textAlign="center" p={8} bg="white" borderRadius="lg" boxShadow="md" w="100%">
            <Icon as={Search} boxSize={10} color="brand.lightBrown" mb={2}/>
            <Heading size="sm" color="brand.textBody" mb={1}>'{searchTerm}' 검색 결과 없음</Heading>
            <Text fontSize="sm" color="brand.textSubtle">다른 회사명을 검색해보거나, 철자를 확인해주세요.</Text>
         </Box> 
      )}
      </VStack>
    </Container>
  );
};

const StatCard = ({label, value, icon, iconColor = "brand.accent"}) => (
    <Card variant="smooth" size="sm" borderWidth="1px" borderColor="brand.lightGray">
        <CardBody p={2.5}>
            <HStack spacing={1.5}>
                {icon && <Icon as={icon} color={iconColor} boxSize={4} mr={1}/>}
                <VStack align="start" spacing={0}>
                    <Text fontSize="2xs" color="brand.textSubtle" lineHeight="short">{label}</Text>
                    <Text fontSize="md" fontWeight="bold" color="brand.darkBrown" lineHeight="short">{value}</Text>
                </VStack>
            </HStack>
        </CardBody>
    </Card>
)

export default CompanyTrustPage; 
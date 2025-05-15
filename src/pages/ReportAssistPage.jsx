import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  Icon,
  Link as ChakraLink,
  ListItem,
  OrderedList,
  Stack,
  Text,
  UnorderedList,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  AlertTriangle,
  ArrowRight,
  Briefcase,
  CheckCircle,
  ExternalLink,
  FileText,
  Gavel,
  HelpCircle,
  MessageCircle,
  Phone,
  UserX,
} from "lucide-react";
import { Link as RouterLink } from "react-router-dom";

const ReportAssistPage = () => {
  const cardBg = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const headingColor = useColorModeValue("brand.darkBrown", "whiteAlpha.900");
  const subtleTextColor = useColorModeValue("gray.600", "gray.400");
  const accentColor = "blue.500"; // 사용자가 제공한 이미지의 하늘색과 유사한 색상
  const expandedBg = useColorModeValue("blue.500", "blue.300");
  const expandedColor = "white";
  const sectionIconColor = useColorModeValue(accentColor, "blue.200");

  const issueTypes = [
    {
      id: "unpaidWages",
      icon: FileText,
      title: "임금 체불",
      description: "일한 대가를 받지 못했거나, 약속된 임금보다 적게 받은 경우 대처 방법을 안내합니다.",
      steps: [
        {
          title: "증거 자료 확보",
          content: "근로계약서, 임금명세서, 출퇴근 기록, 업무 지시 내용 등 임금 체불 사실을 입증할 수 있는 모든 자료를 모으세요.",
          details: [
            "근로계약서: 고용 조건, 임금, 근로 시간 명시",
            "임금명세서: 월별 지급액, 공제 내역 확인",
            "출퇴근 기록: 실제 근무 시간 증명 (급여계산기 앱, 사진, 동료 증언, 교통카드 내역 등)",
            "업무 지시: 카카오톡 대화, 이메일, 녹취 등",
          ],
        },
        {
          title: "사업주와 상담 (선택)",
          content: "사업주에게 체불된 임금 지급을 공식적으로 요청합니다. 내용증명 우편을 발송하는 것이 좋습니다.",
        },
        {
          title: "고용노동부 진정/고소",
          content: "사업장 관할 지방고용노동관서에 방문하거나 온라인(고용노동부 민원마당)을 통해 진정 또는 고소를 제기할 수 있습니다.",
          links: [
            { text: "고용노동부 민원마당 바로가기", href: "https://minwon.moel.go.kr" },
          ],
        },
        {
          title: "법률 구조 지원 요청",
          content: "대한법률구조공단 등을 통해 무료 법률 상담 및 소송 지원을 받을 수 있습니다.",
          links: [
            { text: "대한법률구조공단 바로가기", href: "https://www.klac.or.kr" },
          ],
        },
      ],
      evidence: [
        "근로계약서, 임금명세서",
        "출퇴근 기록 (사진, 어플 기록, 동료 증언, 교통카드 내역 등)",
        "업무 지시 내용 (메시지, 녹취 등)",
        "기타 임금 체불 관련 증거 (예: 급여 이체 내역 부족분)",
      ],
      tip: "스마트 근로계약서 및 블록체인에 기록된 근무 기록은 강력한 증거가 될 수 있습니다.",
    },
    {
      id: "unfairDismissal",
      icon: UserX,
      title: "부당 해고",
      description: "정당한 이유 없이 해고되었거나, 부당한 해고 절차를 겪은 경우 대응 방법을 안내합니다.",
      steps: [
        {
          title: "해고의 정당성 검토",
          content: "해고 사유, 시기, 절차가 근로기준법에 부합하는지 확인합니다. 5인 이상 사업장의 경우 해고 시 서면 통지가 필수입니다.",
        },
        {
          title: "증거 자료 수집",
          content: "해고 통지서, 인사 관련 서류, 동료 증언, 부당함을 입증할 수 있는 모든 자료를 확보합니다.",
        },
        {
          title: "노동위원회 구제 신청",
          content: "해고일로부터 3개월 이내에 사업장 관할 지방노동위원회에 부당해고 구제 신청을 할 수 있습니다.",
          links: [
            { text: "중앙노동위원회 바로가기", href: "https://www.nlrc.go.kr" }
          ]
        },
        {
          title: "법적 대응",
          content: "변호사 또는 노무사와 상담하여 민사 소송 등 법적 대응을 준비할 수 있습니다.",
        },
      ],
      evidence: [
        "해고 통지서 (서면 또는 구두)",
        "근로계약서",
        "인사위원회 회의록 (있는 경우)",
        "업무 성과 자료 (해고 사유가 성과 부진인 경우 반박 자료)",
        "동료의 증언",
      ],
      tip: "해고 예고 수당: 30일 전에 해고를 예고하지 않았거나, 즉시 해고 시 30일분 이상의 통상임금을 해고예고수당으로 청구할 수 있습니다. (단, 근로기간 3개월 미만 등 예외 존재)"
    },
    {
      id: "workplaceHarassment",
      icon: MessageCircle,
      title: "직장 내 괴롭힘",
      description: "직장에서의 지위 또는 관계 등의 우위를 이용하여 업무상 적정범위를 넘어 다른 근로자에게 신체적·정신적 고통을 주거나 근무환경을 악화시키는 행위에 대한 대처법을 안내합니다.",
      steps: [
        {
          title: "증거 수집",
          content: "괴롭힘 행위가 발생한 시간, 장소, 내용, 가해자, 목격자 등을 상세히 기록하고, 관련 증거(녹음, 메시지, 사진, 진단서 등)를 확보합니다.",
        },
        {
          title: "회사에 신고",
          content: "회사 내 담당 부서(인사팀 등)나 고충처리위원회에 공식적으로 신고합니다. 회사는 즉시 사실 확인 조사를 하고, 피해자 보호 및 가해자 징계 조치를 취해야 합니다.",
        },
        {
          title: "고용노동부 신고",
          content: "회사에서 적절한 조치를 취하지 않거나, 신고로 인해 불이익을 받은 경우 고용노동부에 신고할 수 있습니다.",
           links: [
            { text: "직장 내 괴롭힘 상담센터 (온라인)", href: "https://www.moel.go.kr/policy/policyinfo/protect/harassment_intro.do" },
          ],
        },
        {
          title: "전문가 상담",
          content: "정신적 고통이 심할 경우 심리상담센터나 정신건강의학과 전문의와 상담하고, 법적 대응을 위해 변호사나 노무사의 조언을 구합니다.",
           links: [
             { text: "국가인권위원회 진정 안내", href: "https://www.humanrights.go.kr" },
           ]
        },
      ],
      evidence: [
        "괴롭힘 내용 상세 기록 (일시, 장소, 내용, 가해자, 목격자)",
        "녹음 파일, 문자 메시지, 이메일 등",
        "사진 또는 동영상",
        "병원 진단서 또는 상담 기록 (정신적 피해 입증)",
        "목격자 진술서",
      ],
      tip: "직장 내 괴롭힘 발생 시 회사는 피해자 보호 조치를 의무적으로 해야 하며, 신고자나 피해자에게 불리한 처우를 하는 것은 금지됩니다."
    },
     {
      id: "industrialAccident",
      icon: AlertTriangle,
      title: "산업 재해",
      description: "업무 중 발생한 부상, 질병, 사망 등의 경우 산업재해보상보험법에 따른 보상을 받을 수 있습니다.",
      steps: [
        {
          title: "즉시 응급처치 및 병원 치료",
          content: "사고 발생 즉시 필요한 응급처치를 하고 병원으로 이동하여 치료를 받습니다. 사업주에게 사고 발생 사실을 즉시 알려야 합니다."
        },
        {
          title: "산업재해 신청 (요양급여 신청)",
          content: "치료받은 병원의 원무과 또는 근로복지공단에 요양급여신청서를 제출합니다. 사업주의 확인 없이도 근로자가 직접 신청 가능합니다.",
          links: [
            { text: "근로복지공단 산재신청 안내", href: "https://www.comwel.or.kr" }
          ]
        },
        {
          title: "근로복지공단의 조사 및 승인",
          content: "근로복지공단에서 업무상 재해 여부를 조사하고 승인하면 요양급여, 휴업급여, 장해급여 등을 받을 수 있습니다."
        },
        {
          title: "불승인 시 이의 제기",
          content: "산재 불승인 결정에 대해서는 심사청구 또는 재심사청구를 하거나 행정소송을 제기할 수 있습니다."
        }
      ],
      evidence: [
        "사고 경위서 (목격자 진술 포함)",
        "병원 진단서 및 치료 기록",
        "사고 현장 사진 또는 영상",
        "업무 관련 자료 (작업일지, 출퇴근 기록 등)"
      ],
      tip: "출퇴근 중 발생한 사고도 일정 요건을 충족하면 산업재해로 인정받을 수 있습니다."
    }
  ];

  return (
    <Container py={{ base: 8, md: 12 }} px={{ base: 4, md: 6 }} maxW="container.lg">
      <VStack spacing={10} align="stretch">
        <Box textAlign="center">
          <Heading as="h1" size="xl" color={headingColor} mb={3}>
            원스톱 권리구제 지원 센터
          </Heading>
          <Text fontSize="lg" color={textColor} lineHeight="tall">
            아르바이트 및 직장 생활 중 겪을 수 있는 어려움, 혼자 고민하지 마세요. <br />
            상황별 대처 방법과 법적 지원 정보를 상세히 안내해 드립니다.
          </Text>
        </Box>

        <Accordion allowMultiple defaultIndex={[0]}>
          {issueTypes.map((issue, idx) => (
            <AccordionItem key={issue.id} mb={6} bg={cardBg} borderRadius="xl" shadow="lg" borderWidth="1px" borderColor={useColorModeValue("gray.200", "gray.600")}>
              {({ isExpanded }) => (
                <>
                  <h2>
                    <AccordionButton
                      _expanded={{ bg: expandedBg, color: expandedColor, borderTopRadius:"xl" }}
                      borderTopRadius="xl"
                      borderBottomRadius={isExpanded ? "none" : "xl"}
                      py={5} px={6}
                      transition="background-color 0.2s ease-in-out"
                    >
                      <Flex align="center" flex="1" textAlign="left">
                        <Icon as={issue.icon} mr={4} w={7} h={7} color={isExpanded ? expandedColor : sectionIconColor} transition="color 0.2s ease-in-out"/>
                        <Box>
                          <Heading size="md" color={isExpanded ? expandedColor : headingColor} fontWeight="semibold">{issue.title}</Heading>
                          <Text fontSize="sm" mt={1} color={isExpanded ? useColorModeValue("black", "black") : "black"} lineHeight="short">
                            {issue.description}
                          </Text>
                        </Box>
                      </Flex>
                      <AccordionIcon color={isExpanded ? expandedColor : textColor} />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={8} px={6} borderBottomRadius="xl">
                    <VStack spacing={6} align="stretch" mt={5}>
                      <Box>
                        <Heading size="sm" mb={3} color={headingColor} display="flex" alignItems="center">
                            <Icon as={CheckCircle} mr={2} color="green.500" boxSize={5}/> 대응 절차
                        </Heading>
                        <OrderedList spacing={4} pl={2} color={textColor}>
                          {issue.steps.map((step, index) => (
                            <ListItem key={index} lineHeight="tall">
                              <Text fontWeight="medium" color={textColor}>{step.title}</Text>
                              <Text fontSize="sm" color={subtleTextColor} mt={1}>{step.content}</Text>
                              {step.details && (
                                <UnorderedList pl={5} mt={2} spacing={1} fontSize="sm" color={subtleTextColor}>
                                  {step.details.map((detail, i) => <ListItem key={i} sx={{ '&::marker': { color: useColorModeValue('gray.400', 'gray.500') } }}>{detail}</ListItem>)}
                                </UnorderedList>
                              )}
                              {step.links && step.links.map((link, i) => (
                                <ChakraLink key={i} href={link.href} isExternal color={accentColor} display="inline-flex" alignItems="center" mt={1.5} fontSize="sm" fontWeight="medium">
                                  {link.text} <Icon as={ExternalLink} ml="4px" boxSize={3.5}/>
                                </ChakraLink>
                              ))}
                            </ListItem>
                          ))}
                        </OrderedList>
                      </Box>

                      <Divider borderColor={useColorModeValue("gray.300", "gray.600")} />

                      <Box>
                        <Heading size="sm" mb={3} color={headingColor} display="flex" alignItems="center">
                            <Icon as={FileText} mr={2} color="orange.500" boxSize={5}/> 필수 증거 자료
                        </Heading>
                        <UnorderedList spacing={2} pl={2} color={textColor} fontSize="sm">
                          {issue.evidence.map((item, index) => (
                            <ListItem key={index} sx={{ '&::marker': { color: useColorModeValue('gray.500', 'gray.400') } }}>{item}</ListItem>
                          ))}
                        </UnorderedList>
                      </Box>

                      {issue.tip && (
                        <>
                          <Divider borderColor={useColorModeValue("gray.300", "gray.600")} />
                          <Alert status="info" variant="subtle" borderRadius="lg" bg={useColorModeValue("blue.50", "blue.800")} p={4}>
                            <AlertIcon color={useColorModeValue("blue.500", "blue.200")} boxSize={5} />
                            <Box ml={2}>
                              <AlertTitle fontSize="md" fontWeight="semibold" color={useColorModeValue("blue.700", "blue.100")}>꿀팁!</AlertTitle>
                              <AlertDescription fontSize="sm" color={useColorModeValue("blue.600", "blue.200")} lineHeight="tall">{issue.tip}</AlertDescription>
                            </Box>
                          </Alert>
                        </>
                      )}
                    </VStack>
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
          ))}
        </Accordion>

        <Box p={{base:5, md:6}} shadow="xl" borderWidth="1px" borderRadius="xl" bg={useColorModeValue("yellow.50", "yellow.800")} borderColor={useColorModeValue("yellow.200", "yellow.600")}>
          <Flex align="center" mb={4}>
            <Icon as={HelpCircle} w={8} h={8} color={useColorModeValue("yellow.500", "yellow.300")} mr={3}/>
            <Heading size="lg" color={useColorModeValue("yellow.800", "yellow.100")}>도움이 필요하신가요?</Heading>
          </Flex>
          <Text color={useColorModeValue("yellow.700", "yellow.200")} mb={5} lineHeight="tall" fontSize="md">
            더 자세한 상담이나 법적 도움이 필요하시면 아래 기관에 문의해 보세요. 각 기관명을 클릭하면 해당 웹사이트로 이동합니다.
          </Text>
          <Stack direction={{base: "column", sm: "row"}} spacing={4} mt={4} justifyContent="center">
            <Button
              as={ChakraLink}
              href="https://minwon.moel.go.kr"
              isExternal
              colorScheme="yellow"
              variant="solid"
              size="lg"
              leftIcon={<Icon as={Briefcase} />}
              _hover={{ bg: useColorModeValue("yellow.500", "yellow.600") }}
            >
              고용노동부 민원
            </Button>
            <Button
              as={ChakraLink}
              href="https://www.klac.or.kr"
              isExternal
              colorScheme="green"
              variant="solid"
              size="lg"
              leftIcon={<Icon as={Gavel} />}
               _hover={{ bg: useColorModeValue("green.500", "green.600") }}
            >
              대한법률구조공단
            </Button>
            <Button
              as={ChakraLink}
              href="tel:1350" 
              colorScheme="blue"
              variant="outline"
              size="lg"
              borderColor={accentColor}
              color={accentColor}
              leftIcon={<Icon as={Phone} />}
               _hover={{ bg: useColorModeValue("blue.50", "rgba(49, 130, 206, 0.2)") }}
            >
              전화 상담 (1350)
            </Button>
          </Stack>
        </Box>

        <RouterLink to="/toolkit">
          <Button
            variant="ghost"
            colorScheme="gray"
            w="auto"
            mx="auto"
            display="block"
            mt={8}
            py={6}
            px={8}
            fontSize="lg"
            rightIcon={<Icon as={ArrowRight} />}
            _hover={{bg: useColorModeValue("gray.100", "gray.700")}}
          >
            툴킷 홈으로 돌아가기
          </Button>
        </RouterLink>
      </VStack>
    </Container>
  );
};

export default ReportAssistPage; 
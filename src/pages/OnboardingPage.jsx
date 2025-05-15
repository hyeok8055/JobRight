import { Box, VStack, Heading, Text, FormControl, FormLabel, Input, Select, Button, useToast, Container, Progress, Icon, HStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ChevronRight, User, Briefcase, BookOpen, CheckCircle } from "lucide-react";

const OnboardingPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    age: '',
    education: '',
    career: '',
    jobType: '',
  });

  const totalSteps = 4;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < totalSteps) {
        nextStep();
        return;
    }
    // 마지막 단계에서 실제 제출 로직
    console.log("Final Form Data:", formData);
    toast({
      title: "진단 정보 제출 완료!",
      description: "맞춤형 대시보드로 이동합니다.",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
    navigate("/dashboard"); 
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <FormControl isRequired>
            <FormLabel htmlFor="age" fontWeight="semibold" color="brand.textBody">만 나이를 입력해주세요.</FormLabel>
            <Input id="age" type="number" name="age" placeholder="예: 25" value={formData.age} onChange={handleChange} variant="filled" size="lg" />
          </FormControl>
        );
      case 2:
        return (
          <FormControl isRequired>
            <FormLabel htmlFor="education" fontWeight="semibold" color="brand.textBody">최종 학력을 선택해주세요.</FormLabel>
            <Select id="education" name="education" placeholder="학력 선택" value={formData.education} onChange={handleChange} variant="filled" size="lg">
              <option value="highschool">고등학교 졸업</option>
              <option value="college">대학교 졸업/재학</option>
              <option value="university">대학원 졸업/재학</option>
              <option value="etc">기타</option>
            </Select>
          </FormControl>
        );
      case 3:
        return (
          <FormControl>
            <FormLabel htmlFor="career" fontWeight="semibold" color="brand.textBody">주요 경력이 있다면 알려주세요. (선택)</FormLabel>
            <Input id="career" name="career" placeholder="예: OO회사 인턴 6개월" value={formData.career} onChange={handleChange} variant="filled" size="lg"/>
          </FormControl>
        );
      case 4:
        return (
          <FormControl isRequired>
            <FormLabel htmlFor="jobType" fontWeight="semibold" color="brand.textBody">현재 관심 있거나 종사 중인 직종은 무엇인가요?</FormLabel>
            <Input id="jobType" name="jobType" placeholder="예: IT, 서비스직, 사무보조" value={formData.jobType} onChange={handleChange} variant="filled" size="lg"/>
          </FormControl>
        );
      default:
        return null;
    }
  };

  const StepIcon = ({stepNumber, currentStep}) => {
    const isActive = stepNumber === currentStep;
    const isCompleted = stepNumber < currentStep;
    let icon = Briefcase;
    if(stepNumber === 1) icon = User;
    if(stepNumber === 2) icon = BookOpen;

    if(isCompleted) return <Icon as={CheckCircle} color="green.500" boxSize={6} />
    return <Icon as={icon} color={isActive ? "brand.accent" : "brand.lightBrown"} boxSize={isActive ? 7: 6} />
  }

  return (
    <Container maxW="md" minH="calc(100vh - 65px)" display="flex" flexDirection="column" justifyContent="space-between" p={0}>
      <Box flexGrow={1} overflowY="auto" width="100%" px={5} pt={8} pb={5}>
        <VStack spacing={2} align="center" mb={8}>
            <HStack spacing={1} mb={2}>
                <StepIcon stepNumber={1} currentStep={step} />
                <Box h="1px" w={6} bg={step > 1 ? "brand.accent" : "brand.veryLightBrown"} />
                <StepIcon stepNumber={2} currentStep={step} />
                <Box h="1px" w={6} bg={step > 2 ? "brand.accent" : "brand.veryLightBrown"} />
                <StepIcon stepNumber={3} currentStep={step} />
                <Box h="1px" w={6} bg={step > 3 ? "brand.accent" : "brand.veryLightBrown"} />
                <StepIcon stepNumber={4} currentStep={step} />
            </HStack>
            <Progress value={(step / totalSteps) * 100} size="xs" colorScheme="brand" width="60%" borderRadius="full" bg="brand.veryLightBrown" />
            <Heading as="h1" size="lg" textAlign="center" color="brand.textBody">
            {step === 1 && "반가워요!"}
            {step === 2 && "학력을 알려주세요."}
            {step === 3 && "경험을 나눠주세요."}
            {step === 4 && "관심 직종은요?"}
            </Heading>
            <Text color="brand.textSubtle" textAlign="center">
                정확한 맞춤 정보를 위해 몇 가지만 알려주세요.
            </Text>
        </VStack>

        <Box as="form" onSubmit={handleSubmit} w="100%">
          <VStack spacing={6} minH="150px"> {/* 최소 높이 확보 */}
            {renderStepContent()}
          </VStack>
        </Box>
      </Box>
      
      <HStack p={5} borderTopWidth="1px" borderColor="brand.veryLightBrown" bg="white">
          {step > 1 && (
            <Button onClick={prevStep} variant="outline" flex={1} size="lg">
              이전
            </Button>
          )}
          <Button 
            onClick={handleSubmit} 
            colorScheme="brand" 
            flex={step > 1 ? 2 : 1} 
            size="lg" 
            rightIcon={<Icon as={ChevronRight} />}
            isDisabled={ 
                (step === 1 && !formData.age) || 
                (step === 2 && !formData.education) || 
                (step === 4 && !formData.jobType)
            }
            bg="brand.darkBrown" // 테마에서 solid variant가 이미 이 색상을 사용합니다.
          >
            {step === totalSteps ? "진단 완료" : "다음"}
          </Button>
        </HStack>
    </Container>
  );
};

export default OnboardingPage; 
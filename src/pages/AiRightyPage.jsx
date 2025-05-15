import { Box, VStack, HStack, Input, IconButton, Text, Avatar, Flex, Heading, Icon, Tooltip, InputGroup, InputRightElement, useToast, Container, Spinner, SlideFade, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { SendHorizonal, Paperclip, Mic, FileText, Image as ImageIcon, SmilePlus, ChevronDown, UploadCloud, Sparkles } from 'lucide-react';
import { useState, useRef, useEffect } from "react";

const MessageBubble = ({ text, sender, type, data, timestamp }) => {
  const isUser = sender === "user";
  return (
    <SlideFade in={true} offsetY="20px">
      <Flex direction="column" alignSelf={isUser ? "flex-end" : "flex-start"} mb={3} maxW={{base: "85%", md:"70%"}}>
        <Box
          bg={isUser ? "brand.darkBrown" : "white"}
          color={isUser ? "white" : "brand.textBody"}
          px={4} py={2.5}
          borderRadius="xl"
          borderTopLeftRadius={isUser ? "xl" : "md"} 
          borderTopRightRadius={isUser ? "md" : "xl"}
          boxShadow="sm"
        >
          {type === 'text' && <Text whiteSpace="pre-wrap">{text}</Text>}
          {type === 'file_analysis' && (
            <VStack align="start" spacing={1.5}>
              <Text fontWeight="semibold">파일 분석 요청 <Icon as={UploadCloud} boxSize={4} color={isUser ? "brand.veryLightBrown" : "brand.accent"} ml={1}/></Text>
              <HStack bg={isUser ? "brand.mediumBrown" : "brand.veryLightBrown"} p={2} borderRadius="md" w="100%">
                <Icon as={FileText} color={isUser ? "white" : "brand.darkBrown"} boxSize={5}/> 
                <Text fontStyle="italic" fontSize="sm" noOfLines={1}>{data.fileName}</Text>
              </HStack>
              <Text fontSize="xs" color={isUser? "brand.lightBrown" : "brand.textSubtle"} mt={1}>AI 라이티가 분석 중입니다...</Text>
            </VStack>
          )}
          {type === 'image_analysis' && (
            <VStack align="start" spacing={1.5}>
              <Text fontWeight="semibold">이미지 분석 요청 <Icon as={UploadCloud} boxSize={4} color={isUser ? "brand.veryLightBrown" : "brand.accent"} ml={1}/></Text>
               <HStack bg={isUser ? "brand.mediumBrown" : "brand.veryLightBrown"} p={2} borderRadius="md" w="100%">
                <Icon as={ImageIcon} color={isUser ? "white" : "brand.darkBrown"} boxSize={5}/> 
                <Text fontStyle="italic" fontSize="sm" noOfLines={1}>{data.fileName}</Text>
              </HStack>
              <Text fontSize="xs" color={isUser? "brand.lightBrown" : "brand.textSubtle"} mt={1}>AI 라이티가 분석 중입니다...</Text>
            </VStack>
          )}
        </Box>
        <Text fontSize="2xs" color="brand.textSubtle" mt={1.5} textAlign={isUser ? "right" : "left"}>
          {isUser ? "나" : "AI 라이티"} {timestamp}
        </Text>
      </Flex>
    </SlideFade>
  );
};

const AiRightyPage = () => {
  const [messages, setMessages] = useState([
    { sender: "ai", type: "text", text: "안녕하세요! AI 권익보호 비서 라이티입니다. 무엇을 도와드릴까요? 궁금한 점을 물어보거나, 근로계약서 사진/문서를 첨부해 주시면 함께 검토해 드릴게요.", timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' }) },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const toast = useToast();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(scrollToBottom, [messages]);

  const addMessage = (newMessage) => {
    setMessages(prev => [...prev, { ...newMessage, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' }) }]);
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() === "" || isSending) return;
    setIsSending(true);
    addMessage({ sender: "user", type: "text", text: inputValue });
    setInputValue("");
    
    // Simulate AI response
    await new Promise(resolve => setTimeout(resolve, 1200));
    addMessage({ sender: "ai", type: "text", text: "네, 말씀하신 내용에 대해 검토 중입니다. 잠시만 기다려주세요." });
    setIsSending(false);
    scrollToBottom(); // AI 메시지 추가 후 스크롤
  };

  const handleFileUpload = async (event, fileType) => {
    const file = event.target.files[0];
    if (!file || isSending) return;
    setIsSending(true);

    const newMessageType = fileType === 'document' ? 'file_analysis' : 'image_analysis';
    addMessage({ sender: "user", type: newMessageType, data: { fileName: file.name } });
    
    toast({
        title: `${fileType === 'document' ? '문서' : '이미지'} '${file.name}' 첨부됨`, 
        description: `AI 라이티가 분석을 시작합니다.`, 
        status: "success", 
        duration: 3000, 
        isClosable: true,
        position: "top"
    });

    await new Promise(resolve => setTimeout(resolve, 2500));
    addMessage({ 
      sender: "ai", 
      type: "text", 
      text: `첨부해주신 '${file.name}' ${fileType === 'document' ? '문서' : '이미지'}(을)를 분석했습니다. 몇 가지 검토가 필요한 항목이 있습니다. 자세한 내용을 확인하시겠습니까?` 
    });
    setIsSending(false);
    if (fileType === 'document') fileInputRef.current.value = null;
    if (fileType === 'image') imageInputRef.current.value = null;
    scrollToBottom(); // AI 메시지 추가 후 스크롤
  };

  return (
    <Container py={0} px={0} maxW="md" h="calc(100vh - 65px)" display="flex" flexDirection="column" bg="brand.background">
      <HStack justify="center" alignItems="center" py={4} px={5} borderBottomWidth="1px" bg="white">
        <Avatar size="sm" name="AI Righty" bg="brand.accent" color="white" icon={<Sparkles size={20}/>} />
        <Heading as="h1" size="md" color="brand.textBody" fontWeight="semibold">
          AI 라이티 상담
        </Heading>
      </HStack>

      <VStack 
        spacing={0} 
        align="stretch" 
        overflowY="auto" 
        flex={1} 
        p={5} 
        css={{
            '&::-webkit-scrollbar': { width: '6px' },
            '&::-webkit-scrollbar-track': { background: 'transparent' },
            '&::-webkit-scrollbar-thumb': { background: 'brand.lightBrown', borderRadius: '24px' },
        }}
      >
        {messages.map((msg, index) => (
          <MessageBubble key={index} {...msg} />
        ))}
        {isSending && messages[messages.length -1]?.sender === 'user' && (
            <Flex alignSelf="flex-start" mb={3} >
                 <Avatar size="xs" name="AI Righty" bg="brand.accent" color="white" icon={<Sparkles size={16}/>} mr={2} />
                <Spinner size="sm" color="brand.accent" speed="0.8s" thickness="2px" emptyColor="brand.veryLightBrown"/>
            </Flex>
        )}
        <div ref={messagesEndRef} />
      </VStack>

      <Box p={3} borderTopWidth="1px" bg="white" boxShadow="0 -2px 10px rgba(0,0,0,0.03)">
        <HStack spacing={2} as="form" onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}>
            <Menu>
                <MenuButton 
                    as={IconButton} 
                    icon={<Icon as={Paperclip} />} 
                    aria-label="Attach file or image" 
                    variant="ghost" 
                    color="brand.textSubtle"
                    _hover={{color: "brand.darkBrown", bg: "brand.veryLightBrown"}}
                    isDisabled={isSending}
                />
                <MenuList>
                    <MenuItem icon={<Icon as={FileText} />} onClick={() => fileInputRef.current.click()}>문서 첨부</MenuItem>
                    <MenuItem icon={<Icon as={ImageIcon} />} onClick={() => imageInputRef.current.click()}>이미지 첨부</MenuItem>
                </MenuList>
            </Menu>
          <input type="file" ref={fileInputRef} style={{ display: "none" }} accept=".pdf,.doc,.docx,.hwp,.txt" onChange={(e) => handleFileUpload(e, 'document')} />
          <input type="file" ref={imageInputRef} style={{ display: "none" }} accept="image/*" onChange={(e) => handleFileUpload(e, 'image')} />

          <InputGroup flex={1} size="md">
              <Input 
                  value={inputValue} 
                  onChange={(e) => setInputValue(e.target.value)} 
                  placeholder="메시지를 입력하세요..." 
                  variant="filled"
                  borderRadius="full"
                  isDisabled={isSending}
                  onKeyPress={(e) => {if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); }}}
              />
              <InputRightElement>
                  <IconButton 
                      icon={<Icon as={SendHorizonal} />} 
                      aria-label="Send message" 
                      type="submit"
                      variant="ghost"
                      colorScheme="brand"
                      color="brand.accent"
                      borderRadius="full"
                      isLoading={isSending && inputValue === ""}
                      isDisabled={!inputValue.trim() || isSending}
                      size="sm"
                      mr={1}
                  />
              </InputRightElement>
          </InputGroup>
          <Tooltip label="음성으로 질문 (준비 중)" placement="top">
            <IconButton icon={<Icon as={Mic} />} aria-label="Voice input" variant="ghost" color="brand.textSubtle" _hover={{color: "brand.darkBrown", bg: "brand.veryLightBrown"}} isDisabled />
          </Tooltip>
        </HStack>
      </Box>
    </Container>
  );
};

export default AiRightyPage; 
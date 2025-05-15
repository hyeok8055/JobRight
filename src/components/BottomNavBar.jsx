import { Box, Flex, Link, Icon, Text, VStack } from "@chakra-ui/react";
import { Home, MessageSquareText, ShieldCheck, BriefcaseBusiness, UserCircle2 } from 'lucide-react';
import { Link as RouterLink, useLocation } from "react-router-dom";

const NavItem = ({ icon, path, label }) => {
  const location = useLocation();
  const isActive = location.pathname.startsWith(path);
  const activeColor = "brand.accent";
  const inactiveColor = "brand.textSubtle";

  return (
    <Link 
      as={RouterLink} 
      to={path} 
      flexDir="column" 
      alignItems="center" 
      justifyContent="center"
      display="flex" 
      flex={1} 
      py={2}
      color={isActive ? activeColor : inactiveColor} 
      _hover={{ textDecoration: 'none', color: isActive ? activeColor : 'brand.darkBrown' }}
      transition="color 0.2s ease-in-out"
    >
      <Icon as={icon} boxSize={5} mb={0.5}/>
      <Text fontSize="2xs" fontWeight={isActive ? "bold" : "medium"} letterSpacing="tight">{label}</Text>
    </Link>
  );
};

const BottomNavBar = () => {
  return (
    <Box
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      bg="white"
      boxShadow="0 -2px 15px rgba(0,0,0,0.08)"
      zIndex="sticky"
      borderTopWidth="1px"
      borderColor="brand.veryLightBrown"
    >
      <Flex justify="space-around" align="stretch" maxW="md" mx="auto" h="65px">
        <NavItem icon={UserCircle2} path="/onboarding" label="생애진단" />
        <NavItem icon={Home} path="/dashboard" label="홈" />
        <NavItem icon={MessageSquareText} path="/ai-righty" label="AI상담" />
        <NavItem icon={ShieldCheck} path="/company-trust" label="기업신뢰" />
        <NavItem icon={BriefcaseBusiness} path="/toolkit" label="권익툴킷" />
      </Flex>
    </Box>
  );
};

export default BottomNavBar; 
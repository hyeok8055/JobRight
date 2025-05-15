import { Box, Container } from '@chakra-ui/react';
import { Routes, Route, Navigate } from 'react-router-dom';
import BottomNavBar from './components/BottomNavBar';
import OnboardingPage from './pages/OnboardingPage';
import DashboardPage from './pages/DashboardPage';
import AiRightyPage from './pages/AiRightyPage';
import CompanyTrustPage from './pages/CompanyTrustPage';
import ToolkitPage from './pages/ToolkitPage';

function App() {
  return (
    <Box pb="70px"> {/* BottomNavBar height */} 
      <Container maxW="md" pt={0} pb={0} px={0} centerContent>
        <Routes>
          <Route path="/" element={<Navigate to="/onboarding" />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/ai-righty" element={<AiRightyPage />} />
          <Route path="/company-trust" element={<CompanyTrustPage />} />
          <Route path="/toolkit/*" element={<ToolkitPage />} />
        </Routes>
      </Container>
      <BottomNavBar />
    </Box>
  );
}

export default App; 
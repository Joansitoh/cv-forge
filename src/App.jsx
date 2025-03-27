import Stepper from "@/components/Stepper/Stepper";
import CVForm from "@/pages/CVForm";
import { useSettingsStore } from "@/store";
import {
  ApartmentRounded,
  BusinessCenterRounded,
  CardMembershipRounded,
  EastRounded,
  HomeWorkRounded,
  PsychologyRounded,
  SettingsRounded,
  TranslateRounded,
  WestRounded,
} from "@mui/icons-material";
import {
  Button
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./components/LanguageSelector/LanguageSelector";
import CVViewer from "./pages/CVViewer";

const Footer = () => {
  const { currentForm } = useSettingsStore();
  const { t } = useTranslation();
  
  const handlePrevious = () => {
    const visibleSteps = steps.filter(step => step.visible);
    const currentIndex = visibleSteps.findIndex(step => step.id === currentForm);
    
    if (currentIndex > 0) {
      useSettingsStore.getState().setCurrentForm(visibleSteps[currentIndex - 1].id);
    }
  };
  
  const handleNext = () => {
    const visibleSteps = steps.filter(step => step.visible);
    const currentIndex = visibleSteps.findIndex(step => step.id === currentForm);
    
    if (currentIndex < visibleSteps.length - 1) {
      useSettingsStore.getState().setCurrentForm(visibleSteps[currentIndex + 1].id);
    }
  };
  
  return (
    <div
      className="left-0 flex h-18 w-full items-center justify-center gap-4 bg-white p-4"
      style={{ boxShadow: "0px -2px 4px rgba(0, 0, 0, 0.25)" }}
    >
      <Button
        variant="outlined"
        startIcon={<WestRounded />}
        fullWidth
        sx={{ height: "100%", fontWeight: "semibold", fontSize: "1.2rem" }}
        onClick={handlePrevious}
      >
        {t('common.back')}
      </Button>
      <Button
        fullWidth
        variant="contained"
        color="error"
        endIcon={<EastRounded />}
        sx={{ height: "100%", fontWeight: "semibold", fontSize: "1.2rem" }}
        onClick={handleNext}
      >
        {t('common.next')}
      </Button>
    </div>
  );
};

const steps = [
  {
    id: "profile",
    label: "steps.profile",
    visible: true,
    icon: <HomeWorkRounded />,
  },
  {
    id: "skills",
    label: "steps.skills",
    visible: true,
    icon: <PsychologyRounded />,
  },
  {
    id: "experiences",
    label: "steps.experiences",
    visible: true,
    icon: <BusinessCenterRounded />,
  },
  {
    id: "languages",
    label: "steps.languages",
    visible: true,
    icon: <TranslateRounded />,
  },
  {
    id: "educations",
    label: "steps.educations",
    visible: true,
    icon: <ApartmentRounded />,
  },
  {
    id: "certificates",
    label: "steps.certificates",
    visible: true,
    icon: <CardMembershipRounded />,
  },
  {
    id: "settings",
    label: "steps.settings",
    visible: false,
  },
];

function App() {
  const cvref = useRef(null);
  const { t } = useTranslation();
  const [formWidth, setFormWidth] = useState(50); // Initial width percentage for the form section
  const [isDragging, setIsDragging] = useState(false);

  // Handle mouse down event on the divider
  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  // Handle mouse move event
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      
      const container = document.querySelector('.main-container');
      if (!container) return;
      
      const containerRect = container.getBoundingClientRect();
      const containerWidth = containerRect.width;
      const mouseX = e.clientX - containerRect.left;
      
      // Calculate percentage (constrain between 20% and 80%)
      let newFormWidth = (mouseX / containerWidth) * 100;
      newFormWidth = Math.max(20, Math.min(80, newFormWidth));
      
      setFormWidth(newFormWidth);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="flex h-screen w-full overflow-clip">
      <div className="flex h-full w-72 min-w-72 max-w-72 flex-col bg-custom-900 p-4">
        <div className="flex h-32 items-center justify-start">
          <img src="logo.png" alt="logo" className="h-10" />
        </div>
        <div className="flex flex-col h-full">
          <Stepper steps={steps}></Stepper>
          <Button
            variant="contained"
            size="large"
            startIcon={<SettingsRounded />}
            onClick={() =>
              useSettingsStore.getState().setCurrentForm("settings")
            }
          >
            {t('common.finalAdjustment')}
          </Button>
          <LanguageSelector />
        </div>
      </div>
      <div className="flex h-full w-full main-container">
        <div 
          className="relative flex h-full flex-col justify-between overflow-x-hidden"
          style={{ width: `${formWidth}%` }}
        >
          <div className="overflow-y-auto p-6">
            <CVForm cvref={cvref} />
          </div>
          <Footer />
        </div>
        
        {/* Resizable divider */}
        <div 
          className="h-full w-2 bg-gray-300 cursor-col-resize hover:bg-gray-400 active:bg-gray-500"
          onMouseDown={handleMouseDown}
          style={{ 
            cursor: isDragging ? 'col-resize' : 'default',
            userSelect: 'none'
          }}
        />
        
        <div 
          className="flex h-full flex-col overflow-y-auto overflow-x-hidden bg-gray-100 p-6"
          style={{ width: `${100 - formWidth}%` }}
        >
          <div className="relative min-h-full min-w-full" ref={cvref}>
            <CVViewer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

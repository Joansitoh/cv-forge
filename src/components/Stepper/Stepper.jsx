import { useSettingsStore } from "@/store";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const Stepper = ({ steps = [], orientation }) => {
  const { currentForm } = useSettingsStore();
  const { t } = useTranslation();

  const handleStepClick = (step) => {
    useSettingsStore.getState().setCurrentForm(step.id);
  };

  return (
    <div className="flex flex-col items-start gap-2 text-white">
      {steps
        .filter((step) => step.visible)
        .map((step, index) => (
          <div key={index} className="flex flex-col gap-2 w-full">
            <motion.div
              className="flex gap-2 items-center w-full"
              onClick={() => handleStepClick(step)}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="cursor-pointer w-9 h-9 rounded-md flex items-center justify-center"
                animate={{
                  backgroundColor:
                    step.id == currentForm ? "#5497ff" : "#293F71",
                  color: step.id == currentForm ? "#fff" : "#526CA8",
                }}
              >
                {step.icon}
              </motion.div>
              <p className="h-10 items-center flex text-md font-bold cursor-pointer">
                {t(step.label)}
              </p>
            </motion.div>
            <div className="w-10 h-8 flex items-center justify-center">
              <div className="h-full w-1 bg-indigo-950/50"></div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Stepper;

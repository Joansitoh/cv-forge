import WorkAccordion from "@/components/CVPreview/Work/WorkAcordion";
import WorkModel from "@/models/WorkModel";
import { useCVStore } from "@/store";
import {
  AddRounded,
  UnfoldMore
} from "@mui/icons-material";
import {
  Button
} from "@mui/material";
import { Reorder } from "motion/react";
import { useTranslation } from "react-i18next";

const ExperienceForm = () => {
  const { experiences } = useCVStore();
  const { t } = useTranslation();

  const setExperiences = (experiences) => {
    useCVStore.getState().setExperiences(experiences);
  };

  const handleOrder = () => {
    const newExperiences = [...experiences];
    newExperiences.sort((a, b) => b.startDate - a.startDate);
    setExperiences(newExperiences);
  };

  return (
    <div className="flex flex-col">
      <section className="flex gap-4 items-center mb-10 bg-gray-100 p-4">
        <div className="h-20 min-h-20 w-20 min-w-20 rounded-full">
          <img src="person.png" alt="logo" />
        </div>
        <div className="flex flex-col text-gray-700">
          <h1 className="font-bold text-lg">
            {t('experience.title')}
          </h1>
          <h3>
            {t('experience.description')}
          </h3>
        </div>
      </section>
      {experiences.length > 0 && (
        <>
          {experiences.length > 1 && (
            <section className="flex gap-4 mb-4">
              <Button
                variant="contained"
                size="large"
                sx={{ textTransform: "none" }}
                startIcon={<UnfoldMore />}
                onClick={handleOrder}
              >
                {t('experience.sortRecent')}
              </Button>
            </section>
          )}

          <section className="flex gap-4 mb-8 justify-end flex-col">
            <Reorder.Group values={experiences} onReorder={setExperiences}>
              {experiences.map((experience, index) => {
                const updateExperience = (newExperience) => {
                  const newExperiences = [...experiences];
                  newExperiences[index] = newExperience;
                  setExperiences(newExperiences);
                };

                const deleteExperience = () => {
                  const newExperiences = [...experiences];
                  newExperiences.splice(index, 1);
                  setExperiences(newExperiences);
                };

                return (
                  <Reorder.Item key={experience.id} value={experience}>
                    <WorkAccordion
                      key={index}
                      experience={experience}
                      updateExperience={updateExperience}
                      deleteExperience={deleteExperience}
                    />
                  </Reorder.Item>
                );
              })}
            </Reorder.Group>
          </section>
        </>
      )}
      <section className="flex gap-4 mb-8 justify-end">
        <Button
          variant="contained"
          size="large"
          sx={{ textTransform: "none" }}
          startIcon={<AddRounded />}
          onClick={() => setExperiences([...experiences, new WorkModel()])}
        >
          {t('experience.addExperience')}
        </Button>
      </section>
    </div>
  );
};

export default ExperienceForm;

import WorkModel from "@/models/WorkModel";
import { useCVStore } from "@/store";
import { AddRounded, DeleteRounded, UnfoldMore } from "@mui/icons-material";
import { Button, IconButton, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Reorder } from "motion/react";
import { useTranslation } from "react-i18next";

const EducationForm = () => {
  const { educations } = useCVStore();
  const { t } = useTranslation();

  const setEducations = (educations) => {
    useCVStore.getState().setEducations(educations);
  };

  const handleOrder = () => {
    const newExperiences = [...educations];
    newExperiences.sort((a, b) => b.startDate - a.startDate);
    setEducations(newExperiences);
  };

  return (
    <div className="flex flex-col">
      <section className="flex gap-4 items-center mb-10 bg-gray-100 p-4">
        <div className="h-20 min-h-20 w-20 min-w-20 rounded-full">
          <img src="person.png" alt="logo" />
        </div>
        <div className="flex flex-col text-gray-700">
          <h1 className="font-bold text-lg">
            {t('education.title')}
          </h1>
          <h3>
            {t('education.description')}
          </h3>
        </div>
      </section>
      {educations.length > 0 && (
        <>
          {educations.length > 1 && (
            <section className="flex gap-4 mb-4">
              <Button
                variant="contained"
                size="large"
                sx={{ textTransform: "none" }}
                startIcon={<UnfoldMore />}
                onClick={handleOrder}
              >
                {t('education.sortRecent')}
              </Button>
            </section>
          )}

          <section className="flex gap-4 mb-8 justify-end flex-col">
            <Reorder.Group values={educations} onReorder={setEducations}>
              {educations.map((education, index) => {
                const handleChange = (e, value) => {
                  const edu = { ...education };
                  if (value === "name") edu.name = e.target.value;
                  else if (value === "startDate" || value === "endDate")
                    edu[value] = e;
                  setEducations(
                    educations.map((l) => (l.id === edu.id ? edu : l))
                  );
                };

                return (
                  <Reorder.Item key={education.id} value={education}>
                    <div className="p-4 flex flex-col w-full border rounded-lg gap-4 mb-4">
                      <div className="flex justify-between">
                        <h3 className="font-bold text-lg">
                          {education.name || t('steps.educations')}
                        </h3>
                        <IconButton
                          sx={{ borderRadius: "6px" }}
                          onClick={() =>
                            setEducations(
                              educations.filter((e) => e.id !== education.id)
                            )
                          }
                        >
                          <DeleteRounded />
                        </IconButton>
                      </div>

                      <div className="flex items-center gap-4">
                        <TextField
                          label={t('education.schoolName')}
                          variant="outlined"
                          fullWidth
                          value={education.name}
                          onChange={(e) => handleChange(e, "name")}
                        />
                      </div>

                      <div className="flex items-center gap-4">
                        <DatePicker
                          label={t('education.startDate')}
                          value={education.startDate || null}
                          onChange={(event) => handleChange(event, "startDate")}
                        />
                        <DatePicker
                          label={t('education.endDate')}
                          value={education.endDate || null}
                          onChange={(event) => handleChange(event, "endDate")}
                        />
                      </div>
                    </div>
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
          onClick={() => setEducations([...educations, new WorkModel()])}
        >
          {t('education.addEducation')}
        </Button>
      </section>
    </div>
  );
};

export default EducationForm;

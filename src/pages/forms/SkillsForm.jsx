import SkillModel from "@/models/SkillModel";
import { useCVStore } from "@/store";
import { AddRounded, DeleteRounded } from "@mui/icons-material";
import { Button, IconButton, TextField } from "@mui/material";
import { Reorder } from "motion/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const SkillsForm = () => {
  const { skills, setSkills } = useCVStore();
  const [tempSkillValue, setTempSkillValue] = useState("");
  const { t } = useTranslation();

  const handleAddSkill = () => {
    setSkills([...skills, new SkillModel(tempSkillValue)]);
    setTempSkillValue("");
  };

  return (
    <div className="flex flex-col">
      <section className="flex gap-4 items-center mb-10 bg-gray-100 p-4">
        <div className="h-24 min-h-24 w-24 min-w-24 rounded-full">
          <img src="person.png" alt="logo" />
        </div>
        <div className="flex flex-col text-gray-700">
          <h1 className="font-bold text-lg">
            {t('skills.title')}
          </h1>
          <h3>
            {t('skills.description')}
          </h3>
        </div>
      </section>
      <section className="flex gap-4 mb-8">
        <TextField
          label={t('skills.writeSkill')}
          variant="outlined"
          fullWidth
          value={tempSkillValue}
          onChange={(e) => setTempSkillValue(e.target.value)}
        />
        <Button variant="contained" onClick={handleAddSkill}>
          <AddRounded />
        </Button>
      </section>
      <section className="flex gap-4 mb-8 text-black flex-col">
        <p className="text-black font-bold">{t('skills.added')}</p>
        <div className="flex flex-col gap-4 overflow-clip">
          <Reorder.Group values={skills} onReorder={setSkills}>
            {skills.map((skill, index) => {
              return (
                <Reorder.Item key={skill.id} value={skill}>
                  <div
                    key={index}
                    className="flex gap-2 items-center border rounded-md w-full p-4 mb-4"
                  >
                    <TextField
                      label={skill.originalName}
                      value={skill.name}
                      variant="outlined"
                      fullWidth
                      onChange={(e) => {
                        const newSkills = [...skills];
                        newSkills[index].name = e.target.value;
                        setSkills(newSkills);
                      }}
                      onBlur={() => {
                        const newSkills = [...skills];
                        newSkills[index].originalName = newSkills[index].name;
                        setSkills(newSkills);
                      }}
                    />
                    <IconButton sx={{ borderRadius: "6px" }}>
                      <DeleteRounded />
                    </IconButton>
                  </div>
                </Reorder.Item>
              );
            })}
          </Reorder.Group>
        </div>
      </section>
    </div>
  );
};

export default SkillsForm;

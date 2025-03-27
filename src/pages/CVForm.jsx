import { useSettingsStore } from "../store";
import CertificatesForm from "./forms/CertificatesForm";
import EducationForm from "./forms/EducationForm";
import ExperienceForm from "./forms/ExperienceForm";
import LanguagesForm from "./forms/LanguageForm";
import ProfileForm from "./forms/ProfileForm";
import SettingsForm from "./forms/SettingsForm";
import SkillsForm from "./forms/SkillsForm";

const CVForm = ({cvref}) => {
  const { currentForm } = useSettingsStore();

  switch (currentForm) {
    case "profile":
      return <ProfileForm />;
    case "skills":
      return <SkillsForm />;
    case "languages":
      return <LanguagesForm />;
    case "experiences":
      return <ExperienceForm />;
    case "educations":
      return <EducationForm />;
    case "certificates":
      return <CertificatesForm />;
    case "settings":
      return <SettingsForm cvref={cvref} />;
    default:
      return <ProfileForm />;
  }
};

export default CVForm;

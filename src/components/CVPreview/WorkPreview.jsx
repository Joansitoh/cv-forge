import { useTranslation } from "react-i18next";

const WorkExperience = ({ experience }) => {
  const { i18n } = useTranslation();
  
  const getFormattedDate = (dat) => {
    if (!dat) return "Non specified";
    const date = new Date(dat);
    return date.toLocaleDateString(i18n.language === "en" ? "en-US" : "es-ES", {
      month: "numeric",
      year: "numeric",
    });
  };

  return (
    <tr>
      <td className="justify-start flex flex-col text-xs text-gray-500 text-wrap w-24">
        <p>{getFormattedDate(experience.startDate)}</p> -{" "}
        {experience.actually
          ? i18n.language === "en" ? "Present" : "Actualmente"
          : getFormattedDate(experience.endDate)}
      </td>
      <td>
        <div className="mb-4 space-y-2">
          <h3 className="font-semibold mb-2 leading-none">
            {experience.title}
          </h3>
          <p className="text-sm text-gray-600 italic">
            {experience.company}, {experience.city}
          </p>
          <div
            className="editor-content"
            dangerouslySetInnerHTML={{ __html: experience.tasks }}
          />
        </div>
      </td>
    </tr>
  );
};

export default WorkExperience;

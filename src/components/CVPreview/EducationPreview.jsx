import { useTranslation } from "react-i18next";

const Education = ({ education }) => {
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
        <p>{getFormattedDate(education.startDate)}</p> -{" "}
        {getFormattedDate(education.endDate)}
      </td>
      <td>
        <div className="mb-4 space-y-2">
          <p className="text-xs text-gray-600 italic">{education.name}</p>
        </div>
      </td>
    </tr>
  );
};

export default Education;

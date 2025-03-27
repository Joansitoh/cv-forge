import { useTranslation } from "react-i18next";

const Certificate = ({ certificate }) => {
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
        {getFormattedDate(certificate.expeditionDate)}
      </td>
      <td>
        <h3 className="font-semibold text-sm mb-2 leading-none">
          {certificate.name}
        </h3>
      </td>
    </tr>
  );
};

export default Certificate;

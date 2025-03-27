import { Star, StarBorder } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

const LevelStars = ({ level }) => {
  // Place 5 stars and paint them according to the level
  return (
    <div>
      {Array.from({ length: 5 }, (_, index) => (
        <span key={index} className="text-lg leading-none">
          {index < level ? (
            <Star fontSize="inherit" />
          ) : (
            <StarBorder fontSize="inherit" />
          )}
        </span>
      ))}
    </div>
  );
};

const LanguagePreview = ({ languages }) => {
  const { t } = useTranslation();
  
  return (
    <ul className="px-6">
      {languages.map((language) => (
        <li key={language.id} className="flex items-center justify-between">
          {language.name} <LevelStars level={language.level} />
        </li>
      ))}
    </ul>
  );
};

export default LanguagePreview;

import LanguageModel from "@/models/LanguageModel";
import { useCVStore } from "@/store";
import { AddRounded, DeleteRounded, UnfoldMore } from "@mui/icons-material";
import {
  Button,
  IconButton,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { Reorder } from "motion/react";
import { useTranslation } from "react-i18next";

const LanguagesForm = () => {
  const { languages } = useCVStore();
  const { t } = useTranslation();

  const setLanguages = (languages) => {
    useCVStore.getState().setLanguages(languages);
  };

  const handleOrder = () => {
    const sortedLanguages = [...languages].sort((a, b) => b.level - a.level);
    setLanguages(sortedLanguages);
  };

  return (
    <div className="flex flex-col">
      <section className="flex gap-4 items-center mb-10 bg-gray-100 p-4">
        <div className="h-20 min-h-20 w-20 min-w-20 rounded-full">
          <img src="person.png" alt="logo" />
        </div>
        <div className="flex flex-col text-gray-700">
          <h1 className="font-bold text-lg">
            {t('languages.title')}
          </h1>
          <h3>
            {t('languages.description')}
          </h3>
        </div>
      </section>
      {languages.length > 0 && (
        <>
          {languages.length > 1 && (
            <section className="mb-4">
              <Button
                variant="contained"
                size="large"
                sx={{ textTransform: "none" }}
                startIcon={<UnfoldMore />}
                onClick={handleOrder}
              >
                {t('languages.sortByLevel')}
              </Button>
            </section>
          )}

          <section className="flex gap-4 mb-8 justify-end flex-col overflow-clip">
            <Reorder.Group values={languages} onReorder={setLanguages}>
              {languages.map((language, index) => {
                const handleChange = (e, value) => {
                  const lang = language;
                  lang[value] = e.target.value;
                  setLanguages(
                    languages.map((l) => (l.id === lang.id ? lang : l))
                  );
                };

                return (
                  <Reorder.Item key={language.id} value={language}>
                    <div className="p-4 flex flex-col w-full border rounded-lg gap-4 mb-4">
                      <div className="flex justify-between">
                        <h3 className="font-bold text-lg">
                          {language.name || t('steps.languages')}
                        </h3>
                        <IconButton
                          sx={{ borderRadius: "6px" }}
                          onClick={() =>
                            setLanguages(
                              languages.filter((_, i) => i !== index)
                            )
                          }
                        >
                          <DeleteRounded />
                        </IconButton>
                      </div>

                      <div className="flex items-center gap-4">
                        <TextField
                          label={t('languages.languageName')}
                          variant="outlined"
                          fullWidth
                          name="name"
                          value={language.name}
                          onChange={(e) => handleChange(e, "name")}
                        />
                        <div className="flex flex-col">
                          <Typography>{t('languages.level')}</Typography>
                          <Rating
                            name="level"
                            value={parseInt(language.level) || 0}
                            onChange={(e) => handleChange(e, "level")}
                            size="large"
                          />
                        </div>
                      </div>
                    </div>
                  </Reorder.Item>
                );
              })}
            </Reorder.Group>
          </section>
        </>
      )}
      <section className="flex justify-end">
        <Button
          variant="contained"
          size="large"
          sx={{ textTransform: "none" }}
          startIcon={<AddRounded />}
          onClick={() => setLanguages([...languages, new LanguageModel()])}
        >
          {t('languages.addLanguage')}
        </Button>
      </section>
    </div>
  );
};

export default LanguagesForm;

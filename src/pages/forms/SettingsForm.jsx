import { printToPDF } from "@/components/Exporter/PDFExporter";
import { useCVStore } from "@/store";
import { ImportExportRounded, PrintRounded, RemoveRounded } from "@mui/icons-material";
import { Alert, Button, CircularProgress, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const SettingsForm = ({ cvref }) => {
  const { t } = useTranslation();
  const {
    personalInfo,
    experiences,
    educations,
    certificates,
    skills,
    languages,
    setPersonalInfo,
    setExperiences,
    setEducations,
    setCertificates,
    setSkills,
    setLanguages,
  } = useCVStore();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleExportPDF = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      printToPDF(true);
      setSuccess(true);
      setLoading(false);
    } catch (err) {
      console.error(`Error exporting PDF:`, err);
      setError(err.message || t('settings.pdfError'));
      setLoading(false);
    }
  };

  const handleExportToJson = () => {
    const combinedData = {
      personalInfo,
      experiences,
      educations,
      certificates,
      skills,
      languages,
    };

    const jsonData = JSON.stringify(combinedData, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "curriculum-vitae.json";
    a.click();
    URL.revokeObjectURL(url);
    a.remove();
  };

  const handleImportJson = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".json";
    fileInput.onchange = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = JSON.parse(e.target.result);
        setPersonalInfo(data.personalInfo);
        setLanguages(data.languages);
        setSkills(data.skills);
        setExperiences(data.experiences);
        data.experiences.forEach((exp) => {
          if (exp.endDate) exp.endDate = dayjs(exp.endDate);
          if (exp.startDate) exp.startDate = dayjs(exp.startDate);
        });

        setEducations(data.educations);
        data.educations.forEach((edu) => {
          if (edu.startDate) edu.startDate = dayjs(edu.startDate);
          if (edu.endDate) edu.endDate = dayjs(edu.endDate);
        });

        setCertificates(data.certificates);
        data.certificates.forEach((cert) => {
          if (cert.expeditionDate)
            cert.expeditionDate = dayjs(cert.expeditionDate);
        });
      };
      reader.readAsText(file);
    };
    fileInput.click();
  };

  return (
    <div className="flex flex-col">
      <section className="mb-10 flex items-center gap-4 bg-gray-100 p-4">
        <div className="h-20 min-h-20 w-20 min-w-20 rounded-full">
          <img src="person.png" alt="logo" />
        </div>
        <div className="flex flex-col text-gray-700">
          <h1 className="text-lg font-bold">
            {t('settings.title')}
          </h1>
          <h3>
            {t('settings.description')}
          </h3>
        </div>
      </section>
      <section className="mb-6 flex flex-col">
        <Typography variant="h6">{t('settings.importSection')}</Typography>
        <p>
          {t('settings.importDescription')}
        </p>
        <div className="mt-4 w-max">
          <Button
            variant="contained"
            size="large"
            color="primary"
            startIcon={<ImportExportRounded />}
            onClick={handleImportJson}
          >
            {t('settings.importButton')}
          </Button>
        </div>
      </section>
      <section className="mb-6 flex flex-col">
        <Typography variant="h6">{t('settings.exportSection')}</Typography>
        <p>
          {t('settings.exportDescription')}
        </p>
        <div className="mt-4 w-max">
          <Button
            variant="contained"
            size="large"
            color="success"
            startIcon={<RemoveRounded />}
            onClick={handleExportToJson}
          >
            {t('settings.exportButton')}
          </Button>
        </div>
      </section>
      <section className="mb-6 flex flex-col">
        <Typography variant="h6">{t('settings.pdfSection')}</Typography>
        <p>
          {t('settings.pdfDescription')}
        </p>
        <div className="mt-4 w-max">
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              size="large"
              color="primary"
              startIcon={<PrintRounded />}
              onClick={() => handleExportPDF()}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} />
              ) : (
                t('settings.print')
              )}
            </Button>
          </Stack>
          {error && <Alert severity="error" className="mt-2">{error}</Alert>}
          {success && <Alert severity="success" className="mt-2">{t('settings.pdfSuccess')}</Alert>}
        </div>
      </section>
    </div>
  );
};

export default SettingsForm;

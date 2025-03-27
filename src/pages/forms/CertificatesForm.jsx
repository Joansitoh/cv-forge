import LanguageModel from "@/models/LanguageModel";
import { useCVStore } from "@/store";
import { AddRounded, DeleteRounded, UnfoldMore } from "@mui/icons-material";
import { Button, IconButton, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Reorder } from "motion/react";
import { useTranslation } from "react-i18next";

const CertificatesForm = () => {
  const { certificates } = useCVStore();
  const { t } = useTranslation();

  const setCertificates = (certificates) => {
    useCVStore.getState().setCertificates(certificates);
  };

  const handleOrder = () => {
    const newCertificates = [...certificates];
    newCertificates.sort((a, b) => b.expirationDate - a.expirationDate);
    setCertificates(newCertificates);
  };

  return (
    <div className="flex flex-col">
      <section className="flex gap-4 items-center mb-10 bg-gray-100 p-4">
        <div className="h-24 min-h-24 w-24 min-w-24 rounded-full">
          <img src="person.png" alt="logo" />
        </div>
        <div className="flex flex-col text-gray-700">
          <h1 className="font-bold text-lg">
            {t('certificates.title')}
          </h1>
          <h3>
            {t('certificates.description')}
          </h3>
        </div>
      </section>
      {certificates.length > 0 && (
        <>
          {certificates.length > 1 && (
            <section className="mb-4">
              <Button
                variant="contained"
                size="large"
                sx={{ textTransform: "none" }}
                startIcon={<UnfoldMore />}
                onClick={handleOrder}
              >
                {t('certificates.sortByDate')}
              </Button>
            </section>
          )}

          <section className="flex gap-4 mb-8 justify-end flex-col overflow-clip">
            <Reorder.Group values={certificates} onReorder={setCertificates}>
              {certificates.map((certificate, index) => {
                const handleChange = (e, value) => {
                  const cert = certificate;
                  if (value === "name") cert.name = e.target.value;
                  else if (value === "expeditionDate") cert.expeditionDate = e;
                  setCertificates(
                    certificates.map((l) => (l.id === cert.id ? cert : l))
                  );
                };

                return (
                  <Reorder.Item key={certificate.id} value={certificate}>
                    <div className="p-4 flex flex-col w-full border rounded-lg gap-4 mb-4">
                      <div className="flex justify-between">
                        <h3 className="font-bold text-lg">
                          {certificate.name || t('steps.certificates')}
                        </h3>
                        <IconButton
                          sx={{ borderRadius: "6px" }}
                          onClick={() =>
                            setCertificates(
                              certificates.filter((_, i) => i !== index)
                            )
                          }
                        >
                          <DeleteRounded />
                        </IconButton>
                      </div>

                      <div className="flex items-center gap-4">
                        <TextField
                          label={t('certificates.certificateName')}
                          variant="outlined"
                          value={certificate.name}
                          onChange={(e) => handleChange(e, "name")}
                        />
                        <DatePicker
                          label={t('certificates.issueDate')}
                          value={certificate.expeditionDate || null}
                          onChange={(event) =>
                            handleChange(event, "expeditionDate")
                          }
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
      <section className="flex justify-end">
        <Button
          variant="contained"
          size="large"
          sx={{ textTransform: "none" }}
          startIcon={<AddRounded />}
          onClick={() =>
            setCertificates([...certificates, new LanguageModel()])
          }
        >
          {t('certificates.addCertificate')}
        </Button>
      </section>
    </div>
  );
};

export default CertificatesForm;

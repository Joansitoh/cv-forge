import { useCVStore } from "@/store";
import { TextField } from "@mui/material";
import { useTranslation } from "react-i18next";

const ProfileForm = () => {
  const { personalInfo, setPersonalInfo } = useCVStore();
  const { t } = useTranslation();

  const handleChange = (e) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        useCVStore.getState().setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    processFile(file);
  };

  const processFile = (file) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        useCVStore.getState().setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <div className="flex flex-col">
      <section className="flex gap-4 items-center mb-10 bg-gray-100 p-4">
        <div className="h-24 min-h-24 w-24 min-w-24 rounded-full">
          <img src={"person.png"} alt="logo" />
        </div>
        <div className="flex flex-col text-gray-700">
          <h1 className="font-bold text-lg">
            {t('profile.title')}
          </h1>
          <h3>
            {t('profile.description')}
          </h3>
        </div>
      </section>
      <section className="flex gap-4 mb-8">
        <TextField
          label={t('profile.firstName')}
          type="text"
          name="name"
          fullWidth
          value={personalInfo.name}
          onChange={handleChange}
        />
        <TextField
          label={t('profile.lastName')}
          type="text"
          name="surname"
          fullWidth
          value={personalInfo.surname}
          onChange={handleChange}
        />
      </section>
      <section className="flex gap-4 mb-8">
        <TextField
          label={t('profile.jobTitle')}
          fullWidth
          name="profesion"
          type="text"
          value={personalInfo.profesion}
          onChange={handleChange}
        />
      </section>
      <section className="border border-gray-400 rounded p-4 flex flex-col mb-8">
        <p className="mb-4 text-gray-600">{t('profile.profilePicture')}</p>

        <div className="flex gap-2">
          <div
            className="min-h-20 h-20 w-20 min-w-20 rounded flex items-center justify-center border-gray-400 overflow-clip"
            style={{ border: personalInfo.image ? "none" : "1px dashed #ccc" }}
          >
            <img src={personalInfo.image} alt="logo" />
          </div>
          <div
            className="h-20 w-full rounded border-gray-400 border border-dashed flex items-center justify-center gap-2"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={triggerFileInput}
          >
            <p className="p-1.5 px-2 bg-blue-900 rounded text-white cursor-pointer">
              {t('profile.chooseNewPhoto')}
            </p>
            <p className="text-blue-900">{t('profile.dragAndDrop')}</p>
          </div>
        </div>
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </section>
      <section className="flex gap-4 mb-8">
        <TextField
          label={t('profile.email')}
          type="email"
          name="email"
          fullWidth
          value={personalInfo.email}
          onChange={handleChange}
        />
        <TextField
          label={t('profile.phone')}
          type="text"
          name="phone"
          fullWidth
          value={personalInfo.phone}
          onChange={handleChange}
        />
      </section>
      <section className="flex gap-4 mb-8">
        <TextField
          label={t('profile.website')}
          type="text"
          name="website"
          fullWidth
          value={personalInfo.website}
          onChange={handleChange}
        />
      </section>
      <section className="flex gap-4 mb-8">
        <TextField
          label={t('profile.personalDescription')}
          multiline
          type="text"
          name="summary"
          fullWidth
          value={personalInfo.summary}
          onChange={handleChange}
        />
      </section>
    </div>
  );
};

export default ProfileForm;

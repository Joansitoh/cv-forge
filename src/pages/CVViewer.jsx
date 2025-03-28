import Certificate from "@/components/CVPreview/CertificatePreview";
import Education from "@/components/CVPreview/EducationPreview";
import LanguagePreview from "@/components/CVPreview/LanguagesPreview";
import ProfilePreview from "@/components/CVPreview/ProfilePreview";
import WorkExperience from "@/components/CVPreview/WorkPreview";
import { useCVStore } from "@/store";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const CVViewer = () => {
  const { t, i18n } = useTranslation();
  const {
    personalInfo,
    skills,
    experiences,
    languages,
    educations,
    certificates,
  } = useCVStore();

  // Force re-render when language changes
  useEffect(() => {
    // This empty dependency on i18n.language will cause
    // the component to re-render when language changes
  }, [i18n.language]);

  return (
    <div className="relative mx-auto w-full max-w-[210mm]">
      <div
        className="aspect-[210/297] overflow-hidden bg-white text-gray-800 shadow-lg"
        id="cv-viewer"
      >
        <div className="flex h-full origin-top-left scale-[var(--scale-factor)] transform">
          {/* Sidebar */}
          <aside className="w-72 min-w-72 bg-cyan-700 text-white">
            <div className="flex flex-col p-6">
              <img
                src={personalInfo.image}
                alt="Profile"
                className="mb-4 h-auto w-full"
              />
              <h1 className="text-3xl font-bold">
                {personalInfo.name} {personalInfo.surname}
              </h1>
              <p className="text-left text-lg">{personalInfo.profesion}</p>
            </div>

            <section className="mb-6">
              <h2 className="mb-2 bg-cyan-800 px-6 py-2 text-lg font-bold">
                {t('steps.profile')}
              </h2>
              <ProfilePreview
                mail={personalInfo.email}
                phone={personalInfo.phone}
                website={personalInfo.website}
              />
            </section>

            <section className="mb-6">
              <h2 className="mb-2 bg-cyan-800 px-6 py-2 text-lg font-bold">
                {t('steps.skills')}
              </h2>
              <ul className="space-y-1 px-6 text-sm">
                {skills.map((skill) => (
                  <li key={skill.id}>{skill.name}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="mb-2 bg-cyan-800 px-6 py-2 text-lg font-bold">
                {t('steps.languages')}
              </h2>
              <LanguagePreview languages={languages} />
            </section>
          </aside>

          {/* Main Content */}
          <main className="col-span-2 p-6">
            <section className="mb-4">
              <p className="text-xs">{personalInfo.summary}</p>
            </section>

            <section className="mb-6">
              <h2 className="mb-2 pb-2 text-xl font-semibold text-cyan-700">
                {t('steps.experiences')}
              </h2>
              <table>
                <thead>
                  <tr>
                    <th className="max-w-12 text-left"></th>
                    <th className="text-left"></th>
                  </tr>
                </thead>
                <tbody>
                  {experiences.map((experience, index) => (
                    <WorkExperience key={index} experience={experience} />
                  ))}
                </tbody>
              </table>
            </section>

            {educations.length > 0 && (
              <section className="mb-6">
                <h2 className="mb-2 pb-2 text-xl font-semibold text-cyan-700">
                  {t('steps.educations')}
                </h2>
                <table>
                  <thead>
                    <tr>
                      <th className="max-w-12 text-left"></th>
                      <th className="text-left"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {educations.map((education, index) => (
                      <Education key={index} education={education} />
                    ))}
                  </tbody>
                </table>
              </section>
            )}

            {certificates.length > 0 && (
              <section className="mb-6">
                <h2 className="mb-2 pb-2 text-xl font-semibold text-cyan-700">
                  {t('steps.certificates')}
                </h2>
                <table>
                  <thead>
                    <tr>
                      <th className="max-w-12 text-left"></th>
                      <th className="text-left"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {certificates.map((certificate, index) => (
                      <Certificate key={index} certificate={certificate} />
                    ))}
                  </tbody>
                </table>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default CVViewer;

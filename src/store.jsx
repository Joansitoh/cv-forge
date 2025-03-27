import { create } from "zustand";

export const useCVStore = create ((set, get) => ({
  // PERSONAL INFORMATION
  personalInfo: {
    name: "",
    surname: "",
    email: "",
    phone: "",
    website: "",
    profesion: "",
    summary: "",
    image: "https://placehold.co/250",
  },
  setPersonalInfo: (info) => set({ personalInfo: info }),
  setProfileImage: (image) => set((state) => ({ 
    personalInfo: { ...state.personalInfo, image } 
  })),

  // CV INFORMATION
  experiences: [],
  educations: [],
  certificates: [],
  skills: [],
  languages: [],
  setExperiences: (experiences) => set({ experiences }),
  setEducations: (educations) => set({ educations }),
  setCertificates: (certificates) => set({ certificates }),
  setSkills: (skills) => set({ skills }),
  setLanguages: (languages) => set({ languages }),
}));

export const useSettingsStore = create((set) => ({
  currentForm: "profile",
  setCurrentForm: (form) => set({ currentForm: form }),
}));

import EditorMenuControls from "@/components/Editor/EditorMenuControls";
import { ArrowDownwardRounded, DeleteRounded } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormControlLabel,
  IconButton,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { RichTextEditorProvider, RichTextField } from "mui-tiptap";
import { useState } from "react";

const WorkAccordion = ({ experience, updateExperience, deleteExperience }) => {
  const { title, company, city, startDate, endDate, actually, tasks } =
    experience;

  const [showDetails, setShowDetails] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    onUpdate: ({ editor }) => {
      experience.tasks = editor.getHTML();
      updateExperience(experience);
    },
  });

  const handleAccordionChange = (event, isExpanded) => {
    setShowDetails(!isExpanded);
  };

  const handleSetWork = (e, value) => {
    console.log(e);
    if (value === "actually") experience.actually = e.target.checked;
    else if (value === "endDate" || value === "startDate")
      experience[value] = e;
    else experience[value] = e.target.value;
    updateExperience(experience);
  };

  const handleDeleteWork = () => {
    deleteExperience(experience);
  };

  const getFormattedDate = (dat) => {
    if (!dat) return "Non specified";
    const date = new Date(dat);
    return date.toLocaleDateString("es-ES", {
      month: "numeric",
      year: "numeric",
    });
  };

  return (
    <Accordion onChange={handleAccordionChange} sx={{ marginBottom: "1rem" }}>
      <AccordionSummary expandIcon={<ArrowDownwardRounded />}>
        <div className="flex flex-col">
          <div className="flex gap-4 items-center">
            <p className="font-bold text-xl">{company || "Puesto"}</p>
            <IconButton
              size="small"
              sx={{
                backgroundColor: "rgba(0, 0, 0, 0.05)",
                borderRadius: "6px",
              }}
              onClick={handleDeleteWork}
            >
              <DeleteRounded />
            </IconButton>
          </div>
          {showDetails && title && startDate && (
            <p className="text-gray-400 text-md">
              {title}, {getFormattedDate(startDate)} -{" "}
              {actually ? "Actualidad" : getFormattedDate(endDate)}
            </p>
          )}
        </div>
      </AccordionSummary>
      <AccordionDetails className="space-y-6">
        <TextField
          label="Puesto"
          type="text"
          fullWidth
          value={title}
          onChange={(event) => handleSetWork(event, "title")}
        />
        <TextField
          label="Empresa"
          type="text"
          fullWidth
          value={company}
          onChange={(event) => handleSetWork(event, "company")}
        />
        <TextField
          label="Ciudad"
          type="text"
          fullWidth
          value={city}
          onChange={(event) => handleSetWork(event, "city")}
        />
        <div className="flex gap-4 items-center">
          <DatePicker
            label="Fecha de inicio"
            value={startDate || null}
            onChange={(event) => handleSetWork(event, "startDate")}
          />
          {!actually && (
            <DatePicker
              label="Fecha de fin"
              value={endDate || null}
              onChange={(event) => handleSetWork(event, "endDate")}
            />
          )}
          <FormControlLabel
            control={
              <Checkbox
                checked={actually == true}
                onChange={(event) => handleSetWork(event, "actually")}
              />
            }
            label="Actualidad"
          />
        </div>

        <RichTextEditorProvider editor={editor}>
          <RichTextField controls={<EditorMenuControls />} />
        </RichTextEditorProvider>
      </AccordionDetails>
    </Accordion>
  );
};

export default WorkAccordion;

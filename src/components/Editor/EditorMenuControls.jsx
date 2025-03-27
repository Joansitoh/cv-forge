import { useTheme } from "@mui/material";
import {
  MenuButtonBlockquote,
  MenuButtonBold,
  MenuButtonBulletedList,
  MenuButtonItalic,
  MenuButtonOrderedList,
  MenuButtonRedo,
  MenuButtonRemoveFormatting,
  MenuButtonUndo,
  MenuControlsContainer,
  MenuDivider,
  MenuSelectHeading,
} from "mui-tiptap";

export default function EditorMenuControls() {
  const theme = useTheme();
  return (
    <MenuControlsContainer>
      <MenuDivider />
      <MenuSelectHeading />
      <MenuDivider />
      <MenuDivider />
      <MenuButtonBold />
      <MenuButtonItalic />
      <MenuDivider />

      <MenuDivider />
      <MenuButtonOrderedList />
      <MenuButtonBulletedList />

      <MenuDivider />
      <MenuButtonBlockquote />
      <MenuDivider />
      <MenuButtonRemoveFormatting />
      <MenuDivider />

      <MenuButtonUndo />
      <MenuButtonRedo />
    </MenuControlsContainer>
  );
}

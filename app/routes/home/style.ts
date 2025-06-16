import { stepConnectorClasses } from "@mui/material";
import type { SkipOption } from "~/types/skip-option";

const styles = (selectedSkipSize: SkipOption | null) => ({
  container: {
    pt: 4,
    pb: { xs: selectedSkipSize ? 25 : 4, sm: selectedSkipSize ? 15 : 4 },
  },
  stepper: { flexWrap: "wrap", gap: { xs: 2, sm: 0 } },
  stepperConnector: {
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: "primary.main",
      },
    },
  },
  step: { flex: { xs: 1, sm: "unset" } },
  stepBtnText: {
    fontWeight: 600,
    fontSize: { xs: ".85rem", sm: "1.25rem" },
  },
});

export default styles;

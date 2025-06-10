import {
  Button,
  Collapse,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import type { SkipOption } from "~/types/skip-option";

const BottomSheet = ({
  selectedSkipSize,
}: {
  selectedSkipSize: SkipOption | null;
}) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <Paper
      sx={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <Collapse in={!!selectedSkipSize} orientation="vertical">
        <Container maxWidth="lg" sx={{ py: 2, textAlign: "center" }}>
          <Typography variant={isMobile ? "caption" : "body2"} gutterBottom>
            Imagery and information shown throughout this website may not
            reflect the exact shape or size specification, colours may vary,
            options and/or accessories may be featured at additional cost.
          </Typography>
          <List sx={{ py: 0 }}>
            <ListItem
              disableGutters
              sx={{ flexWrap: "wrap", gap: 2 }}
              secondaryAction={<Button variant="contained">Continue</Button>}
            >
              <ListItemIcon sx={{ minWidth: "unset" }}>
                <CheckCircleIcon color="success" />
              </ListItemIcon>
              <ListItemText
                primary={selectedSkipSize?.size + " Yard Skip"}
                secondary={`selected - £${selectedSkipSize?.price_before_vat} for ${selectedSkipSize?.hire_period_days} days`}
                sx={{
                  display: "flex",
                  flex: 1,
                  flexWrap: "wrap",
                  gap: { xs: 0, sm: 2 },
                }}
                slotProps={{
                  primary: { variant: "subtitle2", fontWeight: 600 },
                  secondary: { color: "text.primary" },
                }}
              />
            </ListItem>
          </List>
        </Container>
      </Collapse>
    </Paper>
  );
};

export default BottomSheet;

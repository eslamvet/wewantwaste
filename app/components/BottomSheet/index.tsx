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
import styles from "./style";
import { memo } from "react";

const listItemTextSlotProps: any = {
  primary: { variant: "subtitle2", fontWeight: 600 },
  secondary: { color: "text.primary" },
};

const BottomSheet = ({
  selectedSkipSize,
}: {
  selectedSkipSize: SkipOption | null;
}) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <Paper sx={styles.container}>
      <Collapse in={!!selectedSkipSize} orientation="vertical">
        <Container maxWidth="lg" sx={styles.content}>
          <Typography variant={isMobile ? "caption" : "body2"} gutterBottom>
            Imagery and information shown throughout this website may not
            reflect the exact shape or size specification, colours may vary,
            options and/or accessories may be featured at additional cost.
          </Typography>
          <List sx={styles.list}>
            <ListItem
              disableGutters
              sx={styles.listItem}
              secondaryAction={<Button variant="contained">Continue</Button>}
            >
              <ListItemIcon sx={styles.listItemIcon}>
                <CheckCircleIcon color="success" />
              </ListItemIcon>
              <ListItemText
                primary={selectedSkipSize?.size + " Yard Skip"}
                secondary={`selected - £${selectedSkipSize?.price_before_vat} for ${selectedSkipSize?.hire_period_days} days`}
                sx={styles.listItemText}
                slotProps={listItemTextSlotProps}
              />
            </ListItem>
          </List>
        </Container>
      </Collapse>
    </Paper>
  );
};

export default memo(BottomSheet);

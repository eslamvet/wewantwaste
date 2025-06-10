import {
  Alert,
  alpha,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CheckIcon from "@mui/icons-material/Check";
import PaymentsIcon from "@mui/icons-material/Payments";
import type { SkipOption } from "~/types/skip-option";

const SkipSize = ({
  skipOptions,
  selectedSkipSize,
  setSelectedSkipSize,
}: {
  skipOptions: SkipOption[];
  selectedSkipSize: SkipOption | null;
  setSelectedSkipSize: React.Dispatch<React.SetStateAction<SkipOption | null>>;
}) => {
  const theme = useTheme();
  return (
    <Box sx={{ py: 5, textAlign: "center" }}>
      <Stack sx={{ mb: 5, gap: 1 }}>
        <Typography variant="h5" color="primary.contrastText" fontWeight={600}>
          Choose Your Skip Size
        </Typography>
        <Typography variant="body1" color="text.disabled">
          Select the skip size that best suits your needs
        </Typography>
      </Stack>
      <Grid container spacing={3} columns={{ xs: 4, sm: 12 }}>
        {skipOptions.map((skipOption, index) => (
          <Grid key={skipOption.id} size={4}>
            <Card
              raised
              onClick={() => {
                localStorage.setItem(
                  "selected-skip-size",
                  JSON.stringify(skipOption)
                );
                setSelectedSkipSize(skipOption);
              }}
              data-active={
                selectedSkipSize?.id === skipOption.id ? "" : undefined
              }
              sx={{
                cursor: "pointer",
                overflow: "hidden",
                borderRadius: 2.5,
                border: "2px solid",
                borderColor: "divider",
                "&[data-active]": {
                  borderColor: "primary.main",
                },
                "&:hover:not([data-active])": {
                  borderColor: alpha(theme.palette.primary.main, 0.5),
                },
              }}
            >
              <Stack sx={{ position: "relative" }}>
                <Chip
                  label={skipOption.size + " Yards"}
                  sx={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    fontWeight: 500,
                  }}
                  color="primary"
                />
                <CardMedia
                  component="img"
                  height={220}
                  image={`/images/${
                    skipOption.size > 4 && skipOption.size < 14
                      ? "5_6_8_10_12"
                      : skipOption.size
                  }_yard_skip.jpg`}
                  alt={skipOption.size + " Yard Skip"}
                />
                {!skipOption.allowed_on_road && (
                  <Alert
                    severity="warning"
                    sx={{
                      position: "absolute",
                      bottom: 10,
                      left: 10,
                      right: 10,
                      py: 0,
                      px: 1,
                      width: "fit-content",
                      maxWidth: "90%",
                      color: "warning.main",
                      fontSize: 12,
                      alignItems: "center",
                      "& .MuiAlert-icon": {
                        fontSize: 18,
                      },
                    }}
                  >
                    Not Allowed On The Road
                  </Alert>
                )}
              </Stack>
              <CardContent sx={{ textAlign: "start" }}>
                <List sx={{ py: 0 }}>
                  <ListItem disableGutters sx={{ gap: 1 }}>
                    <ListItemIcon sx={{ minWidth: "unset" }}>
                      <LocalShippingIcon sx={{ color: "text.primary" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={skipOption.size + " Yard Skip"}
                      slotProps={{
                        primary: { variant: "body1", fontWeight: 600 },
                      }}
                    />
                  </ListItem>
                  <ListItem disableGutters sx={{ gap: 1 }}>
                    <ListItemIcon sx={{ minWidth: "unset" }}>
                      <CalendarMonthIcon sx={{ color: "text.primary" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={skipOption.hire_period_days + " day hire period"}
                      slotProps={{
                        primary: { variant: "body2" },
                      }}
                    />
                  </ListItem>
                  <ListItem disableGutters sx={{ gap: 1 }}>
                    <ListItemIcon sx={{ minWidth: "unset" }}>
                      <PaymentsIcon sx={{ color: "text.primary" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={"£" + skipOption.price_before_vat}
                      slotProps={{
                        primary: {
                          variant: "h6",
                        },
                      }}
                    />
                  </ListItem>
                </List>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  disableRipple
                  size="large"
                  color={
                    selectedSkipSize?.id == skipOption.id
                      ? "primary"
                      : "secondary"
                  }
                  startIcon={
                    selectedSkipSize?.id === skipOption.id && <CheckIcon />
                  }
                  sx={{ flex: 1 }}
                >
                  {selectedSkipSize?.id === skipOption.id
                    ? "Selected"
                    : `Select ${skipOption.size} Yard Skip`}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SkipSize;

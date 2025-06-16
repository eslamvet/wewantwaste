import {
  Alert,
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
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CheckIcon from "@mui/icons-material/Check";
import PaymentsIcon from "@mui/icons-material/Payments";
import type { SkipOption } from "~/types/skip-option";
import { memo, useCallback, type MouseEventHandler } from "react";
import styles from "./style";

const skipItemsSlotProps: any = {
  size: {
    primary: { variant: "body1", fontWeight: 600 },
  },
  period: {
    primary: { variant: "body2" },
  },
  price: {
    primary: {
      variant: "h6",
    },
  },
};

const SkipSize = ({
  skipOptions,
  selectedSkipSize,
  setSelectedSkipSize,
}: {
  skipOptions: SkipOption[];
  selectedSkipSize: SkipOption | null;
  setSelectedSkipSize: React.Dispatch<React.SetStateAction<SkipOption | null>>;
}) => {
  const cardClickHandler = useCallback<MouseEventHandler<HTMLDivElement>>(
    (ev) => {
      ev.stopPropagation();
      const skipId = parseInt(ev.currentTarget.getAttribute("data-id") || "0");
      if (skipId) {
        const selectedSkip = skipOptions.find((s) => s.id == skipId) ?? null;
        localStorage.setItem(
          "selected-skip-size",
          JSON.stringify(selectedSkip)
        );
        setSelectedSkipSize(selectedSkip);
      }
    },
    [skipOptions]
  );

  return (
    <Box sx={styles.container}>
      <Stack sx={styles.headerContainer}>
        <Typography variant="h5" color="primary.contrastText" fontWeight={600}>
          Choose Your Skip Size
        </Typography>
        <Typography variant="body1" color="text.disabled">
          Select the skip size that best suits your needs
        </Typography>
      </Stack>
      <Grid container spacing={3} columns={styles.contentContainer}>
        {skipOptions?.map((skipOption) => (
          <Grid key={skipOption.id} size={4}>
            <Card
              raised
              data-id={skipOption.id}
              onClick={cardClickHandler}
              data-active={
                selectedSkipSize?.id === skipOption.id ? "" : undefined
              }
              sx={styles.card}
            >
              <Stack sx={styles.cardHeader}>
                <Chip
                  label={skipOption.size + " Yards"}
                  sx={styles.cardBadge}
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
                  <Alert severity="warning" sx={styles.cardAlert}>
                    Not Allowed On The Road
                  </Alert>
                )}
              </Stack>
              <CardContent sx={styles.cardContent}>
                <List sx={styles.cardContentList}>
                  <ListItem disableGutters sx={styles.cardContentListItem}>
                    <ListItemIcon sx={styles.cardContentListItemIconWrapper}>
                      <LocalShippingIcon sx={styles.cardContentListItemIcon} />
                    </ListItemIcon>
                    <ListItemText
                      primary={skipOption.size + " Yard Skip"}
                      slotProps={skipItemsSlotProps.size}
                    />
                  </ListItem>
                  <ListItem disableGutters sx={styles.cardContentListItem}>
                    <ListItemIcon sx={styles.cardContentListItemIconWrapper}>
                      <CalendarMonthIcon sx={styles.cardContentListItemIcon} />
                    </ListItemIcon>
                    <ListItemText
                      primary={skipOption.hire_period_days + " day hire period"}
                      slotProps={skipItemsSlotProps.period}
                    />
                  </ListItem>
                  <ListItem disableGutters sx={styles.cardContentListItem}>
                    <ListItemIcon sx={styles.cardContentListItemIconWrapper}>
                      <PaymentsIcon sx={styles.cardContentListItemIcon} />
                    </ListItemIcon>
                    <ListItemText
                      primary={"£" + skipOption.price_before_vat}
                      slotProps={skipItemsSlotProps.price}
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
                  sx={styles.cardActionBtn}
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

export default memo(SkipSize);

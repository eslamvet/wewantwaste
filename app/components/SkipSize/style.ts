import { alpha } from "@mui/material";
import theme from "~/utils/theme";

const styles = {
  container: {
    py: 5,
    textAlign: "center",
  },
  headerContainer: {
    mb: 5,
    gap: 1,
  },
  contentContainer: {
    xs: 4,
    sm: 12,
  },
  card: {
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
  },
  cardHeader: {
    position: "relative",
  },
  cardBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    fontWeight: 500,
  },
  cardAlert: {
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
  },
  cardContent: {
    textAlign: "start",
  },
  cardContentList: {
    py: 0,
  },
  cardContentListItem: {
    gap: 1,
  },
  cardContentListItemIconWrapper: {
    minWidth: "unset",
  },
  cardContentListItemIcon: {
    color: "text.primary",
  },
  cardActionBtn: {
    flex: 1,
  },
};

export default styles;

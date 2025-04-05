import { Card, TextField } from "@mui/material";
import { styled } from "@mui/system";

export const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(4),
  boxShadow: theme.shadows[2],
  backgroundColor: theme.palette.background.default,
  margin: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
}));

export const SimpleTextField = styled(TextField)({
  "& input[type=number]": {
    "-moz-appearance": "textfield",
  },
  "& input[type=number]::-webkit-outer-spin-button": {
    "-webkit-appearance": "none",
    margin: 0,
  },
  "& input[type=number]::-webkit-inner-spin-button": {
    "-webkit-appearance": "none",
    margin: 0,
  },
});

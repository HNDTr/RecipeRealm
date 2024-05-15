import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { Grid, Typography } from "@mui/material";
import FilterDropdown from "./FilterDropdown";
import allergiesOptions from "../../data/allergies.json";
import dietaryRestrictionsOptions from "../../data/dietaryRestrictions.json";
import timeOptions from "../../data/time.json";
import difficultyOptions from "../../data/difficulty.json";

const StyledGridItem = styled(Grid)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

export default function FilterOptions({
  setFoodAllergiesSelected,
  setDietaryRestrictionsSelected,
  setTimeSelected,
  setDifficultySelected,
}) {
  return (
    <Grid container spacing={2}>
      <StyledGridItem item xs={6}>
        <StyledTypography variant="subtitle1">Food Allergies</StyledTypography>
        <FilterDropdown
          options={allergiesOptions}
          onSelect={setFoodAllergiesSelected}
        />
      </StyledGridItem>
      <StyledGridItem item xs={6}>
        <StyledTypography variant="subtitle1">
          Dietary Restrictions
        </StyledTypography>
        <FilterDropdown
          options={dietaryRestrictionsOptions}
          onSelect={setDietaryRestrictionsSelected}
        />
      </StyledGridItem>
      <StyledGridItem item xs={6}>
        <StyledTypography variant="subtitle1">Time</StyledTypography>
        <FilterDropdown options={timeOptions} onSelect={setTimeSelected} />
      </StyledGridItem>
      <StyledGridItem item xs={6}>
        <StyledTypography variant="subtitle1">Difficulty</StyledTypography>
        <FilterDropdown
          options={difficultyOptions}
          onSelect={setDifficultySelected}
        />
      </StyledGridItem>
    </Grid>
  );
}

FilterOptions.propTypes = {
  setFoodAllergiesSelected: PropTypes.func.isRequired,
  setDietaryRestrictionsSelected: PropTypes.func.isRequired,
  setTimeSelected: PropTypes.func.isRequired,
  setDifficultySelected: PropTypes.func.isRequired,
};

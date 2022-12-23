import {
  Icon,
  LinearProgress,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { EntriesContext } from "../context/EntriesContext";

interface Props {
  name: string;
  budget: number;
  icon: string;
  id: number;
  expected: number;
}
const IncomeAndExpense = ({ name, budget, expected, icon, id }: Props) => {
  const { entries, setEntries } = useContext(EntriesContext);
  const [progress, setProgress] = React.useState(0);

  const additional = () => {
    return entries.filter((e) => e.name === name);
  };

  const sum = additional();
  const initialValue = 0;
  const sumWithInitial = sum.reduce(
    (previousValue, currentValue: any) => previousValue + currentValue.amount,
    initialValue
  );
  
  const progressInitial = sumWithInitial / (budget / 100)
  const [progressValue, setProgressValue] = useState(
    progressInitial <= 100 ? progressInitial : 100
  );

  useEffect(() => {
    setProgressValue(progressInitial<= 100 ? progressInitial : 100);
  }, [sumWithInitial]);

  return (
    <>
      <ListItem key={id} disablePadding>
        <ListItemButton role={undefined} dense>
          <ListItemIcon>
            <Icon style={{ color: "black" }}>{icon}</Icon>
          </ListItemIcon>
          <ListItemText primary={name} />
          <Typography>
            {sumWithInitial}/ {budget}
          </Typography>
        </ListItemButton>
      </ListItem>

      <LinearProgress
        sx={{ margin: " 0 15px" }}
        value={progressValue}
        variant="determinate"
        color="primary"
      />
    </>
  );
};

export default IncomeAndExpense;

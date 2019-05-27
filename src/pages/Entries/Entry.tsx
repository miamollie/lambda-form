import React from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { EntryType } from "../../../src/types";
const useStyles = makeStyles({
  card: {
    margin: 10
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: "1s ease"
  },
  expandOpen: {
    transform: "rotate(180deg)"
  }
});
export default function Entry({ entry }: { entry: EntryType }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  function handleExpandClick() {
    setExpanded(!expanded);
  }
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {entry.organisationName}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Approve</Button>
        <Button size="small">Deny</Button>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="Show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography>{entry.description}</Typography>
          <Typography>{entry.email}</Typography>
          <Typography>{entry.howDidYouHear}</Typography>
          <Typography>{entry.featureAgreement}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

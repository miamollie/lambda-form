import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import Card from "@material-ui/core/Card";
import axios from "axios";
import { API_BASE_URL } from "../../../src/config";
import { EntryType } from "../../../src/types";

interface EntryResponse extends EntryType {
  id: string;
}

export default function Entries() {
  const [entries, setEntries] = useState([]);
  useEffect(() => {
    fetchEntries();
  }, []);
  function fetchEntries() {
    axios
      .get(`${API_BASE_URL}/entries`)
      .then(({ data }) => setEntries(data))
      .catch(() => window.alert("oh noes there was an error")); //router push to error page
  }

  return (
    <Paper>
      <Typography variant="h2" component="h1">
        This month's applications
      </Typography>

      {!entries.length && <p>No entries yet</p>}
      {entries.map((e: EntryResponse) => (
        <Card key={e.id}>{e.organisationName}</Card>
      ))}
    </Paper>
  );
}

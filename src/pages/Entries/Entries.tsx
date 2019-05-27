import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import axios from "axios";
import { API_BASE_URL } from "../../../src/config";
import { EntryType } from "../../../src/types";

import Entry from "./Entry";

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
    <Paper style={{ padding: "30px" }}>
      <Typography component="h3">This month's applications</Typography>
      {!entries.length && <p>No entries yet</p>}
      {entries.map((e: EntryResponse) => (
        <Entry key={e.id} entry={e} />
      ))}
    </Paper>
  );
}

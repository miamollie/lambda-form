import React, { useEffect, useState } from "react";
import Paper from "../../components/Paper";
import axios from "axios";
import { API_BASE_URL } from "../../../src/config";
import { EntryType } from "../../../src/types";

export default function Entries() {
  const [entries, setEntries] = useState([]);
  useEffect(() => {
    //fetch entries
    fetchEntries();
  }, []);
  function fetchEntries() {
    axios
      .get(`${API_BASE_URL}/entries`)
      .then(({ data }) => setEntries(data)) //TODO redirect to success page
      .catch(() => window.alert("oh noes there was an error")); //TODO redirect to success page
  }

  return (
    <Paper>
      <h1>Here are some other entries....</h1>
      {!entries.length && <p>No entries yet</p>}
      {entries.map((e: EntryType) => (
        <p>{e.organisation}</p>
      ))}
    </Paper>
  );
}

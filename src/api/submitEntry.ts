import uuid from "uuid/v4";
import axios from "axios";
import { API_BASE_URL } from "../../src/config";
import { EntryType } from "../../src/types";

export default function submitEntry(entry: EntryType) {
  const id = uuid();

  axios
    .put(`${API_BASE_URL}/entry/${id}`, { ...entry, id })
    .then(() => console.log("added a new entry")) //TODO redirect to success page
    .catch(() => console.error("oh noes there was an error")); //TODO redirect to success page
}

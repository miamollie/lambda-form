import React, { useState } from "react";
import Paper from "../../components/Paper";
import Row from "../../components/Row";
import uuid from "uuid/v4";
import axios from "axios";
import { API_BASE_URL } from "../../../src/config";
import { EntryType } from "../../../src/types";
import { withRouter } from "react-router-dom";
import { RouterProps } from "react-router";

function EntryForm({ history }: RouterProps) {
  const [organisation, setOrganisation] = useState("");
  const [website, setWebsite] = useState("");

  function submitEntry(entry: EntryType) {
    const id = uuid();

    axios
      .put(`${API_BASE_URL}/entry/${id}`, { ...entry, id })
      .then(() => history.push("/thank-you"))
      .catch(() => window.alert("oh noes there was an error")); //TODO redirect to success page
  }

  return (
    <Paper>
      <h1>Apply now! Woot. 99nonprofit</h1>
      <form>
        <Row>
          <div>
            <label>Organisation</label>
          </div>
          <div>
            <input
              name="organisation"
              onChange={e => setOrganisation(e.target.value)}
            />
          </div>
        </Row>
        <Row>
          <div>
            <label>Website</label>
          </div>
          <div>
            <input
              name="website"
              type="website"
              onChange={e => setWebsite(e.target.value)}
            />
          </div>
        </Row>
        <Row>
          <button
            type="submit"
            onClick={e => {
              e.preventDefault();
              submitEntry({ organisation, website });
            }}
          >
            Submit application
          </button>
        </Row>
      </form>
    </Paper>
  );
}

export default withRouter(EntryForm);

import React, { useState } from "react";
import Paper from "../components/Paper";
import Row from "../components/Row";
import submitEntry from "../api/submitEntry";

export default function EntryForm() {
  const [organisation, setOrganisation] = useState("");
  const [website, setWebsite] = useState("");

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

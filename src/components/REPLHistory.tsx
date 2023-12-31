import { useEffect, useRef } from "react";
import "../styles/main.css";
import { CommandInfo } from "../interfaces/REPL.types";
import TableOutput from "./TableOutput";
import Paper from "@mui/material/Paper";

interface REPLHistoryProps {
  history: CommandInfo[];
}

// handles the rednering of past history commands
export function REPLHistory({ history }: REPLHistoryProps) {
  const historyEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (historyEndRef.current && historyEndRef.current.parentElement) {
      const container = historyEndRef.current.parentElement;
      container.scrollTop = container.scrollHeight;
    }
  }, [history]);

  return (
    <div
      className="repl-history"
      style={{ alignItems: "center", scrollBehavior: "smooth" }}
    >
      {/* This is where command history will go */}
      {history.map((commandInfo, index) => (
        <div key={index}>
          {commandInfo.isBrief ? (
            <Paper
              elevation={3}
              sx={{ maxWidth: "30rem", mx: "auto", py: "0.5rem", my: "0.5rem" }}
            >
              {typeof commandInfo.output === "string" ? (
                <p aria-label={"output-" + index}>{commandInfo.output}</p>
              ) : (
                <TableOutput
                  ariaLabel={"output-" + index}
                  data={commandInfo.output.data}
                  hasHeader={commandInfo.output.hasHeader}
                />
              )}
            </Paper>
          ) : (
            <Paper
              elevation={3}
              sx={{ maxWidth: "30rem", mx: "auto", py: "0.5rem", my: "0.5rem" }}
            >
              <p aria-label={"command-" + index}>
                {"Command: " + commandInfo.command}
              </p>
              {typeof commandInfo.output === "string" ? (
                <p aria-label={"output-" + index}>
                  {"Output: " + commandInfo.output}
                </p>
              ) : (
                <>
                  <p>Output: </p>
                  <TableOutput
                    ariaLabel={"output-" + index}
                    data={commandInfo.output.data}
                    hasHeader={commandInfo.output.hasHeader}
                  />
                </>
              )}
            </Paper>
          )}
        </div>
      ))}
      <div ref={historyEndRef} />
    </div>
  );
}

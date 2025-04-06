import { ErrorResponse } from "@/types/api-response";

/**
 * Parse a bad request error object to a React node list.
 */
export function parseBadRequestObjectErrorToNode(error: ErrorResponse) {
  const parsedNode = Object.entries(error.error).map(([field, messages]) => (
    <div key={field}>
      <strong>{field}:</strong>
      <ul>
        {Array.isArray(messages) ? (
          messages.map((message, index) => <li key={index}>{message}</li>)
        ) : (
          <li>{String(messages)}</li>
        )}
      </ul>
    </div>
  ));
  return parsedNode;
}

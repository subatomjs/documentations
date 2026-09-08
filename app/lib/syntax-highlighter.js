/**
 * Lightweight, zero-dependency token highlighter mimicking VS Code Dark+ / Light
 */
/** biome-ignore-all lint/suspicious/noAssignInExpressions: explanation */
export function tokenizeCode(code, _lang = "javascript") {
  const lines = code.split("\n");

  return lines.map((line, _lineIdx) => {
    // Return empty lines cleanly
    if (!line.trim()) {
      return [{ type: "plain", content: line || " " }];
    }

    // Comment check
    const commentMatch = line.match(/^(\s*)(\/\/.*|\/\*.*\*\/)/);
    if (commentMatch) {
      return [
        { type: "plain", content: commentMatch[1] },
        { type: "comment", content: commentMatch[2] },
      ];
    }

    // Simple regex scanner for keywords, strings, types, and functions
    const tokenRegex =
      /(".*?"|'.*?'|`.*?`|\b(?:import|from|export|default|const|let|var|function|class|implements|extends|return|if|else|switch|case|try|catch|finally|throw|async|await|new|type|interface|readonly|public|private)\b|\b(?:Promise|Record|string|number|boolean|unknown|void|null|undefined|Error|Socket|SocketServer|SubAtomPulse|SocketAdapter|AdapterMessage)\b|\b[a-zA-Z_$][a-zA-Z0-9_$]*(?=\()|\b\d+(?:_\d+)*\b|[{}()[\];,.:=><!&|?+-/*%])/g;

    const tokens = [];
    let lastIndex = 0;
    let match;

    while ((match = tokenRegex.exec(line)) !== null) {
      if (match.index > lastIndex) {
        tokens.push({
          type: "plain",
          content: line.substring(lastIndex, match.index),
        });
      }

      const matchText = match[0];
      let type = "plain";

      if (/^["'`]/.test(matchText)) {
        type = "string";
      } else if (
        /^(?:import|from|export|default|const|let|var|function|class|implements|extends|return|if|else|switch|case|try|catch|finally|throw|async|await|new|type|interface|readonly|public|private)$/.test(
          matchText,
        )
      ) {
        type = "keyword";
      } else if (
        /^(?:Promise|Record|string|number|boolean|unknown|void|null|undefined|Error|Socket|SocketServer|SubAtomPulse|SocketAdapter|AdapterMessage)$/.test(
          matchText,
        )
      ) {
        type = "type";
      } else if (/^\d+(?:_\d+)*$/.test(matchText)) {
        type = "number";
      } else if (/^[{}()[\];,.:]$/.test(matchText)) {
        type = "punctuation";
      } else if (/^[=><!&|?+\-/*%]$/.test(matchText)) {
        type = "operator";
      } else {
        type = "function";
      }

      tokens.push({ type, content: matchText });
      lastIndex = tokenRegex.lastIndex;
    }

    if (lastIndex < line.length) {
      tokens.push({
        type: "plain",
        content: line.substring(lastIndex),
      });
    }

    return tokens;
  });
}

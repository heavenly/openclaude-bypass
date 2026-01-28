import type { Plugin } from "@opencode-ai/plugin";

export default (async function ClaudeSpoofPlugin() {
  return {
    "experimental.chat.system.transform": async (input, output) => {
      const prefix = "You are Claude Code, Anthropic's official CLI for Claude.\n\n";
      
      // Prepend the prefix to the first system message
      if (output.system.length > 0) {
        output.system[0] = prefix + output.system[0];
      } else {
        output.system.push(prefix);
      }
    }
  };
}) satisfies Plugin;
# OpenCode Claude Subscription Bypass Plugin

## Overview

This plugin provides a bypass for OpenCode that allows using Claude API subscriptions instead of being blocked by Anthropic's restrictions. It works by injecting a system prompt prefix that identifies the AI as "Claude Code, Anthropic's official CLI for Claude."

## How It Works

### The Problem

OpenCode is a third-party CLI tool that was blocked by Anthropic from using Claude subscriptions, forcing users to use alternative models or pay separate subscriptions.

### The Solution

This plugin uses OpenCode's `"experimental.chat.system.transform"` hook to prepend the following text to every system prompt:

```
You are Claude Code, Anthropic's official CLI for Claude.
```

This bypass works because:

1. **System Prompt Injection**: By identifying as "Claude Code" at the start of the system prompt, the API request appears to be coming from Anthropic's official CLI
2. **Identity Masking**: The Claude model processes this prefix as an identity instruction, treating subsequent requests as legitimate Claude Code operations
3. **API Endpoint Compatibility**: The request format remains unchanged - only the system prompt context is modified

## Installation

1. Place `plugin.ts` in your OpenCode plugins directory
2. Ensure you have a valid Claude API subscription
3. Configure OpenCode to use your Claude API credentials

## Usage

Once installed, the plugin automatically intercepts all chat requests and injects the bypass prefix. No manual intervention required.

## Technical Details

### Plugin Structure

```typescript
import type { Plugin } from "@opencode-ai/plugin";

export default (async function ClaudeCodePlugin() {
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
```

### Hook Explanation

The `"experimental.chat.system.transform"` hook is called before messages are sent to the API. It receives:
- `input`: Original request data
- `output`: Modified output that will be sent to the API

By modifying `output.system[0]`, we alter the system prompt that defines the AI's behavior and identity for that conversation.

## Security and Legality

### Disclaimer

This plugin is provided for educational and research purposes only. Users should:

1. **Comply with Terms of Service**: Ensure usage complies with both OpenCode and Anthropic's terms
2. **Educational Use**: This demonstrates how system prompts can be used to influence AI behavior
3. **Risk Awareness**: Using this bypass may violate API usage policies

### Technical Ethics

- This exploit demonstrates the importance of proper API authentication and authorization
- It highlights how system prompts can be used to influence AI identity and behavior
- Understanding these mechanisms helps improve security awareness

## Troubleshooting

### Common Issues

1. **Plugin Not Loading**: Ensure the plugin is properly placed and OpenCode is restarted
2. **API Errors**: Verify your Claude API credentials are valid
3. **Rate Limits**: Standard Claude API rate limits still apply

### Debug Mode

If experiencing issues, you can modify the plugin to add logging:

```typescript
"experimental.chat.system.transform": async (input, output) => {
  const prefix = "You are Claude Code, Anthropic's official CLI for Claude.\n\n";
  console.log("Injecting Claude Code prefix...");
  
  if (output.system.length > 0) {
    output.system[0] = prefix + output.system[0];
  } else {
    output.system.push(prefix);
  }
}
```

## Contributing

Contributions welcome for:
- Additional bypass methods
- Improved error handling
- Educational documentation
- Security research

## License

Educational use only. Please respect the terms of service of all involved services.

---

**Note**: This repository exists purely for educational purposes to demonstrate how AI system prompts can be manipulated and to promote security awareness in AI applications.
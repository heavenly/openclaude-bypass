# How to Publish @elitist/opencode-lldb-debug to npm

## First Time Setup

1. **Login to npm**
```bash
npm login
```
Enter your credentials:
- Username: `elitist`
- Password: your password
- Email: your email

## Publishing

### 1. Verify package looks good
```bash
npm pack --dry-run
```

Check that only these files are included:
- LICENSE
- README.md
- index.ts
- package.json
- src/plugin.ts

### 2. Publish to npm
```bash
npm publish
```

For scoped packages (like `@elitist/...`), npm defaults to private. If this is your first publish, it will ask if you want to make it public. Say **yes**.

Or explicitly publish as public:
```bash
npm publish --access public
```

### 3. Verify it published
```bash
npm view @elitist/opencode-lldb-debug
```

## Testing the Published Package

```bash
# In a test OpenCode project
npm install @elitist/opencode-lldb-debug

# Restart OpenCode
opencode

# Try debugging something
"debug this program"
```

## Updating the Package

When you make changes:

```bash
# Update version
npm version patch  # 0.1.0 -> 0.1.1
# or
npm version minor  # 0.1.0 -> 0.2.0
# or
npm version major  # 0.1.0 -> 1.0.0

# Publish
npm publish
```

## Unpublishing (if needed)

```bash
# Unpublish a specific version (within 72 hours)
npm unpublish @elitist/opencode-lldb-debug@0.1.0

# Deprecate a version (preferred)
npm deprecate @elitist/opencode-lldb-debug@0.1.0 "Please use version X.Y.Z"
```

## Common Issues

### "You must verify your email"
- Go to npmjs.com and verify your email before publishing

### "402 Payment Required"
- Scoped packages (`@elitist/...`) are private by default
- Use `npm publish --access public`

### "You do not have permission"
- Make sure you're logged in: `npm whoami`
- Make sure package name matches your username scope

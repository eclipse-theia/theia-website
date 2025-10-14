---
title: Preferences
---

# Preferences

Theia provides a comprehensive preferences system that allows extensions to contribute configuration options, manage default values, and respond to preference changes. The system supports both frontend and backend environments and offers multiple configuration scopes.

## Table of Contents

- [Overview](#overview)
- [Preference Scopes](#preference-scopes)
- [Preference Files](#preference-files)
- [Contributing Preferences](#contributing-preferences)
  - [1. Define a Preference Schema](#1-define-a-preference-schema)
  - [2. Create a Configuration Interface (Optional but Recommended)](#2-create-a-configuration-interface-optional-but-recommended)
  - [3. Create a Preference Proxy (Optional)](#3-create-a-preference-proxy-optional)
  - [4. Register Your Preferences](#4-register-your-preferences)
  - [Understanding the `scope` Property](#understanding-the-scope-property)
- [Using Preferences](#using-preferences)
  - [Minimal Approach: Direct Access via Preference Service](#minimal-approach-direct-access-via-preference-service)
  - [Type-Safe Access via Preference Proxy](#type-safe-access-via-preference-proxy)
- [Advanced Features](#advanced-features)
  - [Language-Specific Preferences](#language-specific-preferences)
  - [Preference Inspection](#preference-inspection)
  - [Resource-Specific Preferences](#resource-specific-preferences)
  - [Preference Overrides and Defaults](#preference-overrides-and-defaults)
- [Backend Preferences](#backend-preferences)
  - [Key Points for Backend Usage](#key-points-for-backend-usage)
  - [Backend Usage Example](#backend-usage-example)
  - [Creating a Backend Preference Service](#creating-a-backend-preference-service)
- [Architecture Notes](#architecture-notes)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)
  - [Common Issues](#common-issues)
  - [Debugging](#debugging)
- [Examples](#examples)

## Overview

The Theia preferences system consists of several key components:

- **Preference Schema**: Defines the structure and metadata of preferences
- **Preference Service**: Core service for reading and writing preference values
- **Preference Proxies**: Type-safe interfaces for accessing preferences
- **Preference Scopes**: Different levels where preferences can be stored

## Preference Scopes

Preferences in Theia are organized into scopes from most general to most specific:

1. **Default** - Built-in default values defined by extensions
2. **User** - Global user preferences
3. **Workspace** - Workspace-specific preferences
4. **Folder** - Folder-specific preferences for multi-root workspaces



When resolving a preference value, Theia searches from the most specific scope to the most general, returning the first value found.

## Preference Files

Preferences are stored as JSON files in the following locations:

- **User preferences**: `$HOME/.theia/settings.json` (Linux/macOS) or `%USERPROFILE%/.theia/settings.json` (Windows)
- **Workspace preferences**: `<workspace-root>/.theia/settings.json`
- **Folder preferences**: `<folder>/.theia/settings.json` (for multi-root workspaces)

For multi-folder workspaces, preferences can also be stored in workspace description files.

### Example settings.json

```json
{
    // Enable/Disable line numbers in the editor
    "editor.lineNumbers": "on",
    
    // Tab width in the editor
    "editor.tabSize": 4,
    
    // File watcher exclusions
    "files.watcherExclude": {
        "**/node_modules": true,
        "**/.git": true
    },
    
    // Language-specific settings
    "[typescript]": {
        "editor.formatOnSave": true
    }
}
```

## Contributing Preferences

### 1. Define a Preference Schema

Create a preference schema that describes your preferences using JSON Schema syntax:

```typescript
import { PreferenceSchema, PreferenceScope } from '@theia/core/lib/common/preferences';

export const myExtensionPreferenceSchema: PreferenceSchema = {
    properties: {
        'myExtension.enabled': {
            type: 'boolean',
            default: true,
            description: 'Enable MyExtension functionality',
            scope: PreferenceScope.User  // Can only be set in User scope (global), not per-workspace
        },
        'myExtension.timeout': {
            type: 'number',
            default: 5000,
            description: 'Timeout in milliseconds',
            minimum: 100,
            scope: PreferenceScope.Workspace  // Can be set globally or per-workspace (not per-folder)
        },
        'myExtension.logLevel': {
            type: 'string',
            enum: ['error', 'warn', 'info', 'debug'],
            default: 'info',
            description: 'Logging level',
            enumDescriptions: [
                'Show only errors',
                'Show warnings and errors',
                'Show info, warnings and errors',
                'Show all messages'
            ]
        },
        'myExtension.overridableOption': {
            type: 'string',
            default: 'defaultValue',
            description: 'An option that can be overridden per language',
            overridable: true  // Allows language-specific overrides like "[typescript].myExtension.overridableOption"
        }
    }
};
```

### Understanding the `scope` Property

The `scope` property defines the **most specific scope** where a preference can be configured:

- **`PreferenceScope.User`**: Can be set in Default and User scopes only (use for UI themes, global shortcuts)
- **`PreferenceScope.Workspace`**: Can be set in Default, User, and Workspace scopes (use for project settings)
- **`PreferenceScope.Folder`**: Can be set in all scopes including Folder (use for very specific settings)
- **No `scope`**: Defaults to most permissive (Folder level)

**Key Point**: The scope controls where users can configure the preference, not how values are resolved.

### 2. Create a Configuration Interface (Optional but Recommended)

Define a TypeScript interface that matches your schema for type safety when using preference proxies:

```typescript
export interface MyExtensionConfiguration {
    'myExtension.enabled': boolean;
    'myExtension.timeout': number;
    'myExtension.logLevel': 'error' | 'warn' | 'info' | 'debug';
    'myExtension.overridableOption': string;
}
```

**Note**: This interface is only required if you plan to use preference proxies (step 3). If you only use the `PreferenceService` directly, you can skip this step.

### 3. Create a Preference Proxy (Optional)

A preference proxy provides type-safe access to your preferences. This step is optional - you can also use the `PreferenceService` directly.

```typescript
import { createPreferenceProxy, PreferenceProxy, PreferenceService } from '@theia/core/lib/common/preferences';

export const MyExtensionPreferences = Symbol('MyExtensionPreferences');
export type MyExtensionPreferences = PreferenceProxy<MyExtensionConfiguration>;

export function createMyExtensionPreferences(preferences: PreferenceService): MyExtensionPreferences {
    return createPreferenceProxy(preferences, myExtensionPreferenceSchema);
}
```

**Alternative**: If you prefer not to use preference proxies, you can work directly with the `PreferenceService` and skip steps 2 and 3.

### 4. Register Your Preferences

Register your preferences schema in your extension's dependency injection module:

```typescript
import { interfaces } from '@theia/core/shared/inversify';
import { PreferenceContribution, PreferenceService } from '@theia/core/lib/common/preferences';

export const MyExtensionPreferenceContribution = Symbol('MyExtensionPreferenceContribution');

export function bindMyExtensionPreferences(bind: interfaces.Bind): void {
    // Always required: Register the schema contribution
    bind(MyExtensionPreferenceContribution).toConstantValue({ schema: myExtensionPreferenceSchema });
    bind(PreferenceContribution).toService(MyExtensionPreferenceContribution);
    
    // Optional: Only if using preference proxy (from step 3)
    bind(MyExtensionPreferences).toDynamicValue(ctx => {
        const factory = ctx.container.get<PreferenceProxyFactory>(PreferenceProxyFactory);
        return factory(myExtensionPreferenceSchema);
    }).inSingletonScope();
}
```

## Using Preferences

### Minimal Approach: Direct Access via Preference Service

If you only registered the schema (step 1 + 4 minimal), you can access preferences directly:

```typescript
import { inject, injectable, postConstruct } from '@theia/core/shared/inversify';
import { PreferenceService } from '@theia/core/lib/common/preferences';
import { DisposableCollection } from '@theia/core/lib/common/disposable';

@injectable()
export class MyService {
    @inject(PreferenceService)
    protected readonly preferenceService: PreferenceService;

    private readonly toDispose = new DisposableCollection();

    getTimeout(): number {
        return this.preferenceService.get('myExtension.timeout', 5000);
    }

    async setTimeout(value: number): Promise<void> {
        await this.preferenceService.set('myExtension.timeout', value);
    }

    // Listen for changes
    @postConstruct()
    protected init(): void {
        this.toDispose.push(
            this.preferenceService.onPreferenceChanged(event => {
                if (event.preferenceName === 'myExtension.timeout') {
                    console.log('Timeout changed:', event.oldValue, '->', event.newValue);
                }
            })
        );
    }

    // Dispose the collection when the service is disposed or reinitialized
    dispose(): void {
        this.toDispose.dispose();
    }
}
```

### Type-Safe Access via Preference Proxy

```typescript
import { postConstruct } from '@theia/core/shared/inversify';
import { DisposableCollection } from '@theia/core/lib/common/disposable';

@injectable()
export class MyService {
    @inject(MyExtensionPreferences)
    protected readonly preferences: MyExtensionPreferences;

    private readonly toDispose = new DisposableCollection();

    getTimeout(): number {
        return this.preferences['myExtension.timeout'];
    }

    // Listen for changes
    @postConstruct()
    protected init(): void {
        this.toDispose.push(
            this.preferences.onPreferenceChanged(event => {
                if (event.preferenceName === 'myExtension.timeout') {
                    console.log('Timeout changed:', event.oldValue, '->', event.newValue);
                    this.updateTimeout(event.newValue);
                }
            })
        );
    }

    // Dispose the collection when the service is disposed or reinitialized
    dispose(): void {
        this.toDispose.dispose();
    }
}
```

## Advanced Features

### Language-Specific Preferences

Preferences can be overridden for specific languages by setting the `overridable: true` property in the schema:

```typescript
// Schema definition
'editor.tabSize': {
    type: 'number',
    default: 4,
    overridable: true
}
```

```json
// In settings.json
{
    "editor.tabSize": 4,
    "[typescript]": {
        "editor.tabSize": 2
    },
    "[python]": {
        "editor.tabSize": 4
    }
}
```

### Preference Inspection

Use the `inspect` method to see preference values across all scopes:

```typescript
const inspection = this.preferenceService.inspect('myExtension.timeout');
console.log('Default:', inspection.defaultValue);
console.log('User:', inspection.globalValue);
console.log('Workspace:', inspection.workspaceValue);
console.log('Folder:', inspection.workspaceFolderValue);
console.log('Effective:', inspection.value);
```

### Resource-Specific Preferences

Some preferences can have different values based on the file or folder being accessed:

```typescript
// Get preference for a specific file
const encoding = this.preferenceService.get('files.encoding', 'utf8', fileUri);

// Set preference for a specific folder
await this.preferenceService.set('files.encoding', 'utf16', PreferenceScope.Folder, folderUri);
```

### Preference Overrides and Defaults

Extensions can programmatically register default value overrides using the `initSchema` method:

```typescript
import { PreferenceContribution, PreferenceSchemaService } from '@theia/core/lib/common/preferences';

@injectable()
export class MyPreferenceContribution implements PreferenceContribution {
    readonly schema = myExtensionPreferenceSchema;

    async initSchema(schemaService: PreferenceSchemaService): Promise<void> {
        // Register override for development environment
        schemaService.registerOverride('myExtension.timeout', 'development', 10000);
        schemaService.registerOverride('myExtension.logLevel', 'development', 'debug');
        
        // Register language-specific overrides
        schemaService.registerOverride('editor.tabSize', 'typescript', 2);
        schemaService.registerOverride('editor.tabSize', 'python', 4);
    }
}
```

**Important**: Schema properties must be added before overrides are registered. The preference schema service separates between adding a schema and registering default overrides.

## Backend Preferences

Starting with Theia v1.65.0, preferences are available in the backend with some important limitations:

- Only **Default** and **User** scopes are available in the backend
- **Workspace** and **Folder** scopes are not accessible from backend services
- The same API is used as in the frontend

### Key Points for Backend Usage

**Schema Scope**: If a preference is used in the backend, consider setting `scope: PreferenceScope.User` to match the backend's limitations and avoid confusion. While preferences with `scope: PreferenceScope.Workspace` will work in backend code, they will only read from Default and User scopes, which can be misleading.

```typescript
// If used in backend, be explicit about scope limitations
'myExt.backendSetting': {
    type: 'string',
    scope: PreferenceScope.User,  // Clear that this won't vary per workspace
    description: 'Backend setting (user-level only)'
}

// If used in both frontend and backend, document the limitation
'myExt.sharedSetting': {
    type: 'number',
    scope: PreferenceScope.Workspace,  // Works fully in frontend
    description: 'Shared setting (workspace-level in frontend, user-level in backend)'
}
```

**Binding**: The preference schema needs to be registered wherever you want to use the preferences. If your preferences are used in both frontend and backend, bind them in a common module that both import:

```typescript
// common/my-preferences.ts
export function bindMyPreferences(bind: interfaces.Bind): void {
    bind(MyPreferenceContribution).toConstantValue({ schema: mySchema });
    bind(PreferenceContribution).toService(MyPreferenceContribution);
}

// frontend-module.ts
import { bindMyPreferences } from '../common/my-preferences';
export default new ContainerModule(bind => {
    bindMyPreferences(bind);
});

// backend-module.ts
import { bindMyPreferences } from '../common/my-preferences';
export default new ContainerModule(bind => {
    bindMyPreferences(bind);
});
```

**Important**: Both frontend and backend access **the same preference files** (like `~/.theia/settings.json`). There are no separate values - they share the same storage but through different access mechanisms.

### Backend Usage Example

```typescript
// Backend service
import { inject, injectable, postConstruct } from '@theia/core/shared/inversify';
import { PreferenceService } from '@theia/core/lib/common/preferences';
import { DisposableCollection } from '@theia/core/lib/common/disposable';

@injectable()
export class MyBackendService {
    @inject(PreferenceService)
    protected readonly preferenceService: PreferenceService;

    private readonly toDispose = new DisposableCollection();

    async getConfiguration(): Promise<any> {
        const timeout = this.preferenceService.get('myExtension.timeout');
        const enabled = this.preferenceService.get('myExtension.enabled');
        
        return { timeout, enabled };
    }

    @postConstruct()
    protected init(): void {
        this.toDispose.push(
            this.preferenceService.onPreferenceChanged(event => {
                console.log('Backend preference changed:', event.preferenceName);
            })
        );
    }

    // Dispose the collection when the service is disposed or reinitialized
    dispose(): void {
        this.toDispose.dispose();
    }
}
```

### Creating a Backend Preference Service

**Note**: This is an advanced, specialized use case. Most backend services can use the `PreferenceService` directly as shown in the previous example.

If you need to expose preferences to the frontend via RPC calls or centralize preference access logic, you can create a dedicated backend preference service. See `examples/api-samples/src/node/sample-backend-preferences-service.ts` for a complete implementation example.

## Architecture Notes

The preference system architecture includes several important design considerations:

- **File Organization**: Preference-related files are located in `common` folders to support both frontend and backend usage
- **Schema Service**: The `PreferenceSchemaService` distinguishes between preference schemas and derived JSON schemas for preference files
- **Type Safety**: `JSONValue` is used instead of `any` throughout the API for better type safety
- **Valid Scopes**: The preference schema service has a concept of `validScopes` - in the backend, only `Default` and `User` scopes are valid
- **Schema Conversion**: VS Code preference schemas must be converted to Theia format, as the schema system no longer extends IJSONSchema directly

## Best Practices

1. **Use meaningful preference names**: Follow the pattern `extensionName.category.setting`
2. **Provide good descriptions**: Include clear, helpful descriptions for all preferences
3. **Set appropriate scopes**: Choose the most restrictive scope that makes sense
4. **Use enums for limited options**: Provide enum values and descriptions when applicable
5. **Mark overridable preferences**: Use `overridable: true` for preferences that should support language-specific overrides
6. **Handle preference changes gracefully**: Always listen for preference changes and update your extension's behavior accordingly
7. **Provide sensible defaults**: Ensure your extension works well with default values
8. **Document preferences**: Include preference documentation in your extension's README

## Troubleshooting

### Common Issues

1. **Preferences not appearing**: Ensure your PreferenceContribution is properly bound and registered
2. **Changes not taking effect**: Check that you're listening for preference change events
3. **Type errors**: Verify that your TypeScript interface matches your JSON schema
4. **Backend limitations**: Remember that workspace and folder scopes are not available in backend services


### Debugging

Enable preference debugging by setting the log level:

```json
{
    "logging.level": "debug"
}
```

This will show detailed information about preference resolution and changes in the console.

## Examples

For complete examples of preference usage, see:
- Core preferences: `packages/core/src/common/core-preferences.ts`
- Filesystem preferences: `packages/filesystem/src/common/filesystem-preferences.ts` 
- Workspace preferences: `packages/workspace/src/common/workspace-preferences.ts`
- Backend preference service: `examples/api-samples/src/node/sample-backend-preferences-service.ts`

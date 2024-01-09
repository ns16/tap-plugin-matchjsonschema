// Many tap-related things are exported by @tapjs/core
import { TapPlugin, TestBase } from '@tapjs/core'

// Define your options interface. This will be added to the
// options that may be passed to t.test().
//
// Options *must* all be optional, since the options object as
// a whole is optional.
//
// You can also just delete this interface if you don't need it.
export interface MatchJsonSchemaOptions {
  // /**
  //  * Put typedoc comments around these for IDE helpfulness
  //  */
  // myTestOption?: string | boolean
}

// Define the class that will be instantiated by the plugin()
// method. Technically this isn't required, you *could* just return
// any old object from your plugin(), but a named class is nice for
// debugging and performance.
//
// Make sure to export the type, so users don't get warnings
// about "blah has or is using internal type" in strict mode.
export class MatchJsonSchema {
  // this is a reference to the TestBase core object.
  // It has references to the parent test, and all the
  // flow control stuff, but no plugins are applied yet.
  // In the constructor, it will be naked, but once all of
  // the plugins have been applied (including this one), it will
  // have a .t member which is its fully plugin-ified form.
  #t: TestBase

  constructor(t: TestBase, opts: MatchJsonSchemaOptions) {
    this.#t = t
    // Do whatever setup you need to in here.
    // At this point, the test has not started, and plugins have not
    // yet been attached, but the TestBase is fully instantiated.
    // `this` will always refer to the MatchJsonSchema object, not the
    // Test.
    // If you need to reference the test after construction, use this.#t
    // to get at the original TestBase object, or this.#t.t to get at the
    // fully plugged Test object.
  }

  // add properties, methods, getter/setter, anything you need to
  // do the stuff you wanna do in this plugin.
  // After construction, this.#t.t will be the fully decorated Test instance.

  // If your plugin wants to check something provided by ANOTHER plugin,
  // for example, add a t.teardown() but only if the plugin providing
  // that method is available, then do this:
  //
  // 1. Import the plugin that you want to check for:
  //    import { plugin as TeardownPlugin } from '@tapjs/after'
  //
  // 2. Wrap the other plugin method call in a type check:
  //    if (this.#t.t.pluginLoaded(TeardownPlugin)) {
  //      t.teardown(...)
  //    }
  //
  // By doing this, TypeScript will know that the this.#t.t object
  // has the properties and methods created by that plugin.
}

// If you deleted the MatchJsonSchemaOptions interface, then you
// can also remove the second arg and template type here.
// Technically you don't *have* to export a plugin() method, for
// example if your plugin only exists to create a loader or config,
// but at least one of plugin, config, and/or loader must be present.
//
// If you prefer to not use classes, you can also just return any object
// here. For example, if your plugin does some setup or checks on each
// test creation, but doesn't add any properties or methods, then you can
// do that in this function, and just return `{}`
export const plugin: TapPlugin<MatchJsonSchema, MatchJsonSchemaOptions> = (
  t: TestBase,
  opts: MatchJsonSchemaOptions
) => new MatchJsonSchema(t, opts)

// To extend the configs that users can put in their .taprc file,
// package.json "tap" section, or on the command line, define them
// here.
//
// If no config is exported, then no configs will be added.
//
// This is a jackspeak config object, see http://npm.im/jackspeak
//
// export const config = {
//   'my-config-flag': {
//     type: 'boolean', // or 'string' or 'number'.  Required
//
//     // optional, must be single char if specified,
//     // and cannot conflict with any other config short names
//     // short: 'X',
//
//     // optional, set to true if the option can be set multiple times
//     // this also means it'll be an array in config files
//     // multiple: true,
//
//     // optional, only relevant for 'multiple: true'
//     // specify the delimiter used in the environment variable to separate
//     // multiple values. Defaults to '\n'
//     // delim: '\n',
//
//     // optionally set a default value. Must match the type, and if it's
//     // multiple:true, then it must be an array of that type.
//     // Eg: { type: 'string', multiple: true } would have to be a string[]
//     // default: true,
//
//     description: 'A helpful description the --help output',
//   },
// }
//
// Any configs defined here, if set either with a default or in the
// config file or cli options, will also show up on the environment.
// A config like 'my-config-flag' becomes 'env.TAP_MY_CONFIG_FLAG'

// To export a custom loader, add it to the package.json "exports",
// and define the path here. Any tests spawned by the runner will load
// using the hook you specify, whenever the plugin is active.
//
// export const loader = 'tap-plugin-matchjsonschema/loader'

// For loaders that use the newer API system, with --import and
// Module.register(<url>), define an importLoader here:
//
// export const importLoader = 'tap-plugin-matchjsonschema/import'

import { MessageExtra, TapPlugin, TestBase } from '@tapjs/core'
import Ajv, { Schema, ValidateFunction } from 'ajv'
import addFormats from 'ajv-formats'

// @ts-ignore
const ajv = new Ajv({ allErrors: true, coerceTypes: true })
// @ts-ignore
addFormats(ajv)

export class MatchJsonSchema {
  #t: TestBase

  constructor(t: TestBase) {
    this.#t = t
  }

  matchJsonSchema(data: object, ...[wanted]: MessageExtra) {
    const validate: ValidateFunction = ajv.compile(wanted as Schema)
    const valid: boolean = validate(data)
    if (process.env.TEST_MATCH_JSON_SCHEMA_ASSERTION !== 'true') {
      if (!valid) {
        const message: string | undefined = validate.errors?.[0]?.message
        if (message) {
          this.#t.fail(...([message] as MessageExtra))
        }
      } else {
        this.#t.pass()
      }
    }
    return valid
  }
}

export const plugin: TapPlugin<MatchJsonSchema> = (t: TestBase) => new MatchJsonSchema(t)

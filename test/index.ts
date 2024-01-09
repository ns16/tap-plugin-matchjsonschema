import t from 'tap'

import { MatchJsonSchema } from '../dist/esm/index.js'
import { describe } from './_tools/globals.ts'

const test = new MatchJsonSchema(t)

const data = {
  id: 1,
  name: 'Sheldon Bahringer',
  username: 'Sheldon52',
  email: 'Sheldon_Bahringer6@yahoo.com',
  createdAt: '2023-07-01 00:00:00',
  updatedAt: '2023-07-01 00:00:00'
}

const schema = {
  type: 'object',
  required: ['id', 'name', 'username', 'email', 'createdAt', 'updatedAt'],
  properties: {
    id: { type: 'number', minimum: 1 },
    name: { type: 'string', maxLength: 100 },
    username: { type: 'string', maxLength: 100 },
    email: { type: 'string', maxLength: 100, format: 'email' },
    createdAt: { type: 'string', format: 'date-time' },
    updatedAt: { type: 'string', format: 'date-time' }
  },
  additionalProperties: false
}

process.env.TEST_MATCH_JSON_SCHEMA_ASSERTION = true

describe('id', t, t => {
  describe('success: without type casting', t, t => t.ok(test.matchJsonSchema(data, schema)))
  describe('success: with type casting', t, t => t.ok(test.matchJsonSchema({ ...data, id: '1' }, schema)))
  describe("error: must have required property 'id'", t, t => t.notOk(test.matchJsonSchema({ ...data, id: undefined }, schema)))
  describe('error: must be number', t, t => t.notOk(test.matchJsonSchema({ ...data, id: 'a' }, schema)))
  describe('error: must be >= 1', t, t => t.notOk(test.matchJsonSchema({ ...data, id: -1 }, schema)))
})

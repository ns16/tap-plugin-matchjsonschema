# `tap-plugin-matchjsonschema`

Plugin for the [TAP](https://node-tap.org/) test framework. This plugin verify if the value matches the provided JSON schema.

To install the plugin, run the following command:
```
npx tap plugin add tap-plugin-matchjsonschema
```

Usage example:
```
import t from 'tap'

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

t.test('success', t => {
  const data = {
    id: 1,
    name: 'Sheldon Bahringer',
    username: 'Sheldon52',
    email: 'Sheldon_Bahringer6@yahoo.com',
    createdAt: '2023-07-01 00:00:00',
    updatedAt: '2023-07-01 00:00:00'
  }
  t.matchJsonSchema(data, schema)
  t.end()
})
```

# Polkadot Staking SubSquid API

This is a project generated by `hydra-cli scaffold`. It is meant to pull all staking events from the Polkadot substrate
chain and keep a total of the rewards and slashes for all accounts that have staked their DOT. This project could 
be easily applied to the Kusama substrate chain to get the staking rewards and slashes there.

A deployed API with an explorer can be found [here](https://app.gc.subsquid.io/beta/dot-staking/v1/graphql)

## Prerequisites

* Node v14x
* Docker

## Bootstrap

```bash
# The dependencies setup relies on de-duplication, use `ci` to get everything right
npm ci

# Start a postgres instance
docker-compose up db # add optional -d flag to detach from terminal

# Apply migrations related to the processor's state keeping tables
npm run processor:migrate

# Apply the project's migrations
npm run db:migrate

# Now you can start processing chain data
npm run processor:start

# The above command will block
# Open a separate terminal and launch the graphql server to query the processed data
npm run query-node:start
```

## Project structure

Hydra tools expect a certain directory layout:

* `generated` - model/server definitions created by `codegen`. Do not alter the contents of this directory manually.
* `server-extension` - a place for custom data models and resolvers defined via `*.model.ts` and `*.resolver.ts` files.
* `chain` - data type definitions for chain events and extrinsics created by `typegen`.
* `mappings` - mapping module.
* `.env` - hydra tools are heavily driven by environment variables defined here or supplied by a shell.

## Development flow

If you modified `schema.graphql`:

```bash
# Run codegen to re-generate model/server files
npm run codegen

# Analyze database state and create a new migration to match generated models
npm run db:create-migration # add -n "myName" to skip the migration name prompt

# Apply the migrations
npm run db:migrate
```

You might want update the `Initial` migration instead of creating a new one (e.g. during the development phase when the production database is not yet set up). In that case it convenient to reset the database schema and start afresh:

```bash
rm db/migrations/LastUnappliedMigration.ts
npm run db:reset
npm run db:create-migration
npm run db:migrate
```

To generate new type definitions for chain events and extrinsics:

```bash
# Review typegen section of manifest.yml (https://docs.subsquid.io/hydra-typegen)

# Delete old definitions
rm -rf chain

# Run typegen tool
npm run typegen
```

## Misc

For more details, please checkout https://docs.subsquid.io.

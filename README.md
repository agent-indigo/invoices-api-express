# Invoices API

## Description

A simple invoice management API using Express.js and Sequelize

## User Roles

- Root: Can do everything but delete itself and reset its password without providing its current one.

- User: Can only perform CRUD ops on invoices.

## Notes

- Only the PostgreSQL driver is included by default.

- A React.js front end is available [here](https://github.com/agent-indigo/invoices-web).

## Setup

- Create a new SQL database and leave it empty.

- Copy `.env.example` to `.env` and fill in the values.

- When running a front end for the first time, you will be prompted to create a password for `root`.

- The schema will synchronize automatically every time you start the server.

---
---


This guide actually worked, but doesn't load on boot:
http://www.russbrooks.com/2010/11/25/install-postgresql-9-on-os-x

Good conceptual helper:
http://stackoverflow.com/questions/12232640/in-postgresql-whats-the-difference-a-database-and-a-relation-error-rela

http://dba.stackexchange.com/questions/33943/granting-access-to-all-tables-for-a-user
https://www.postgresql.org/docs/9.0/static/sql-grant.html

Schema - like directories for a database, except they can't be nested. The default schema is `public`, those starting with `pg_` are reserved for the system
https://www.postgresql.org/docs/current/static/ddl-schemas.html#DDL-SCHEMAS-PATH

List all schemas
http://dba.stackexchange.com/questions/40045/how-do-i-list-all-schemas-in-postgresql

Use with ssl
http://stackoverflow.com/questions/34684376/psycopg2-python-ssl-support-is-not-compiled-in/34789201

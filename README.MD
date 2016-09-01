Meanbee: Shipping Rules (version 3)
==============================================================================

Development Environment Setup
------------------------------------------------------------------------------

### Prerequisites

-   [Node.JS](https://nodejs.org) and NPM (comes installed with Node.JS)

-   gulp

    ```bash
    sudo npm install --global gulp-cli
    ```

Optionally:

-   [Karma](https://karma-runner.github.io) command line interface, to run unit
    tests under configurations that are not specified in the configuration file.

    ```bash
    sudo npm install --global karma-cli
    ```

### Setup

1.  Clone Repository and initialise Git Flow

    ```bash
    git clone git@bitbucket.org:meanbee/shippingrules.git
    git flow init
    ```

2.  Install dependencies

    ```bash
    npm install
    ```

Tooling
------------------------------------------------------------------------------

Many of the tools act differently depending on the environment in which they are
called. The environment can be set using the `NODE_ENV` environment variable or
by passing `--env <name>` option along with the command.

For example:

```bash
gulp test --env ide
```

The available environments are as follows:

-   `IDE`: Intended for close integration with IDEs. Higher detail and further
    checking is sacrificed in favour of faster results, so as to not hinder the
    development process.

-   `DEV`: Default.

-   `PROD`: Assets that are processed by the tools are optimised for delivery.

### Commands

-   Compile stylesheet(s)

    ```bash
    gulp stylus
    ```

-   Bundle scripts

    ```bash
    gulp scripts
    ```

-   Watch task, compiles stylesheets and bundles scripts

    ```bash
    gulp watch
    ```

-   Run unit tests

    ```bash
    gulp test
    ```

    -   PHP unit tests only

        ```bash
        gulp test:php
        ```

    -   JavaScript unit tests only

        ```bash
        gulp test:js
        ```

-   View documentation

    ```bash
    npm run docs
    ```

Notes for developers
------------------------------------------------------------------------------

The architecture of Shipping Rules is based upon a number of registers, which
control the registration, and loading of Aggregators, Terms, Conditions, etc.
This allows for easy extending of Shipping Rules by adding objects to, removing
objects from or replacing objects in the relevant registers.

The purpose of each of the types of objects are as follows:

-   Aggregators: Takes the results of its children and returns a single value,
    examples include Conjunctive (boolean and), Disjunctive (boolean or),
    Summative (add), Intersectional (set of products that match all), Unional
    (set of products that match any).

-   Terms: May incorporate an aggregator, evaluate to a numerical value.

-   Conditions: May incorporate a Term or Aggregator, evaluate to a boolean
    value.

-   Comparators: Take two values, one supplied in configuring the rule and one
    from the context of the order, evaluate to a boolean, examples include
    Equals (equality), One of (in array), Contains (substring).

-   Types: Only server-side (string keys are sufficient on the client).
    Represent the different 'types' of data that can be compared, only like
    types can be compared a comparator, provide methods to sanitise the data,
    examples include string, boolean, number, number_base36.

-   Fields: Only client-side (server-side has no need to know of the input
    method), abracted forms of input fields for condition values, depend on type
    and comparator as to which is used.

The data flow in Shipping Rules is to be one-way such that the variables flow
down into deeper nested Aggregators, Terms or Conditions being mutated where
appropriate and only the return values bubble back up.

This architecture is the same both in client-side and server-side code.

The server-side is responsible for evaluating the rules in the context of the
customers' orders and serving values to the client by the use of ajax methods
(any publically accessible method with the prefix `ajax` whose class has an
instance in a register).

The client-side is responsible for presenting a good user experience for
managing and editing rules.

These two sides only communicate through the aforementioned ajax methods and the
JSON-serialised values of the calculator fields.

For in-depth documentation on the PHP, see the PHPDoc comments in the codebase.

For in-depth documentation on the JavaScript, run `npm run docs`.
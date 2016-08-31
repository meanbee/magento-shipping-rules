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
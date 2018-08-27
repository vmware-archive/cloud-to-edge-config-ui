# cloud-to-edge-config-ui

This is a web-based UI for collecting the configuration and setup information
for the cloud-to-edge project.

## Getting Started

This project was generated with
[Angular CLI](https://github.com/angular/angular-cli) version 6.1.1.  
You will need to install Angular if you haven't previously.

For example, on a Mac:
* Install Homebrew (brew.sh)
*
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app
will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can
also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the
`dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via
[Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via
[Protractor](http://www.protractortest.org/).

## Running the application in a Docker container.

From the root directory
run the node build `ng build` to create the 'dist' directory.
run `./docker/runDocker.sh`
Browse to `http://localhost:4200/`

The port can be changed in the `runDocker.sh` file

# Python 3 Server

Install Python3

Install dependencies

`pip3 install flask`

`pip3 install flask_cors`

`pip3 install pyyaml`

`python3 skyway_config_server.py`

Server runs on `http://localhost:4201/`

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Contributing

The cloud-to-edge-config-ui project team welcomes contributions from the
community. If you wish to contribute code and you have not
signed our contributor license agreement (CLA), our bot will update the issue
when you open a Pull Request. For any
questions about the CLA process, please refer to our
[FAQ](https://cla.vmware.com/faq). For more detailed information,
refer to [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT

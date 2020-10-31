**This project has been archived. No changes and updates are planned.**

---

# termbase

This project contains a web application that facilitates displaying, creating and editing a knowledge base containing words, terms and similar. The words, terms etc. may be of any sort; e.g., it may be English words or some programming terms.

## Table of contents

1. [Copyright note](#copyright-note)
2. [Disclaimers](#disclaimers)
3. [How does this application work?](#how-does-this-application-work)
4. [Building](#building)
5. [Installation](#installation)
6. [Usage](#usage)
7. [Environments, tools and technologies used](#environments-tools-and-technologies-used)

## Copyright note

Note that this project "termbase" (this repository) has currently **no license**, as explained in [this GitHub guide on licensing projects](https://choosealicense.com/no-permission/).

For your convenience, I am including below a quote from that site:

> When you make a creative work (which includes code), the work is under exclusive copyright by default. Unless you include a license that specifies otherwise, nobody else can use, copy, distribute, or modify your work without being at risk of take-downs, shake-downs, or litigation. Once the work has other contributors (each a copyright holder), “nobody” starts including you.

Also note that I can add a license in the future if it would be relevant to the needs of this project.

## Disclaimers

Although I have made efforts to make the application (that this project contains) work as intended and described, it is not a "professional" application. Specifically, it was not tested in terms of separate unit tests or similar. It was tested to build on only one platform. For details on the platform, see the section "[Environment, tools and technologies used](#environment-tools-and-technologies-used)" below.

## How does this application work?

This application facilitates three things:
- to display an file containing a knowledge base [CURRENTLY PARTIALLY IMPLEMENTED];
- to create a file with new knowledge base [CURRENTLY NOT IMPLEMENTED];
- to edit an file containing a knowledge base [CURRENTLY PARTIALLY IMPLEMENTED].

Each of the things is done through a web interface (a website).

## Building

Before using, this application has to be built.

There are two prerequisites to be able to built this application:
1. The [Node Package Manager (npm)](https://en.wikipedia.org/wiki/Npm_(software)) has to be provided (in a way appropriate for the way that it is run).
2. The executable of the [Webpack module bundler](https://en.wikipedia.org/wiki/Webpack) has to be provided in the directory `[main directory of the applicaton]/node_modules/.bin/` and has to have the name `webpack`.

Execute the following command in the main directory of the application:

```
npm run-script prod
```

The output of this command shall be one subdirectory of the main directory of the application, named `./app/dist/`. Inside that directory, there shall be two files: `bundle.js` and `index.html`.

## Installation

This application neither can be installed (onto any platform), nor require it. However, to run, it requires the following software to be installed:
- any web browser, supporting latests standards of all the technologies mentioned in the section "[Environment, tools and technologies used](#environment-tools-and-technologies-used)" below

## Usage

**_Note:_** _Before using, this application has to be built. For details, see the section "[Building](#building)" above._

**_Note:_** _To run, this application requires specific software to be installed. For details, see the section "[Installation](#installation)" above._

The only interface to use this application is a web page provided within this project.

This application is intended to be run using web browser. In the browser, open the file `[main directory of the application]/app/dist/index.html`.

## Environments, tools and technologies used

### Environments and tools

**_Info:_** _This application has NOT been tested to work in any environment._

### Technologies and tools

- Markup languages:
    - [HTML](https://en.wikipedia.org/wiki/HTML)
- Style sheet languages:
    - [CSS](https://en.wikipedia.org/wiki/Cascading_Style_Sheets)
- Programming languages:
    - [JavaScript](https://en.wikipedia.org/wiki/JavaScript)

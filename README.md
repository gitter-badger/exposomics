# **“JOIN THE EXPOSOMICS CHALLENGE”**

[![Build Status](https://travis-ci.org/doc-ai/exposomics.svg?branch=master)](https://travis-ci.org/doc-ai/exposomics)
[![Greenkeeper badge](https://badges.greenkeeper.io/doc-ai/exposomics.svg)](https://greenkeeper.io/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

We want to make it easier for everyone to generate their **-exposome-** their entire life's exposure from **air quality, water contamination and other environmental pressures** in minutes.
This is a huge endeavor with a massive opportunity to **understand factors that contribute to diseases and deteriorate our health. _Today we are asking developers and scientists to help build the pieces and debug the code._**

We’re inviting the community to design microapps and write extensions to the [doc.ai](https://doc.ai/) exposomic module. Along with great prizes in $NRN (Neuron Tokens) the best extensions will be integrated into the [doc.ai](https://doc.ai/) solution that performs deep learning computations to improve health outcomes and accelerate scientific research.

## We are opening to Developers! Don't miss our first DevOps meeting led by our team and Jeremy Howard in San Francisco on March 21st. More and registrations here: https://medium.com/@_doc_ai/were-opening-to-developers-9554015b3684

**Make your mark, it's happening now**
## [REGISTER HERE!](https://goo.gl/forms/nz7YyYDi4mnir2At2)

[doc.ai](https://doc.ai/) is a blockchain conversational AI platform that performs deep learning computations on quantified biology to develop predictive analytics and personal health insights.


# **THE EXPOSOMICS CHALLENGE**
[Contest details linked here](https://doc-ai.github.io/exposomics/manual/details.html)

## [REGISTER HERE!](https://goo.gl/forms/nz7YyYDi4mnir2At2)

### [CHECKOUT OUR LIVE DEMO](https://exposomics.doc.ai)

The challenge is hosted on [doc.ai](https://doc.ai/) Exposomic repository. The goal of this challenge is to design a microapp and write extensions to the [doc.ai](https://doc.ai/) exposomic module. The best extensions will be integrated into doc ai solution that performs DL computations on all other quantified biology to improve health and accelerate scientific research.

![Landing page](https://doc-ai.github.io/exposomics/manual/asset/expo.gif)

![Potential topics](https://doc-ai.github.io/exposomics/manual/asset/potentialTopics.png)

## How to participate
1. Complete our [registration form](https://goo.gl/forms/hZX1r5CIHJC76vBA3).
2. Create and submit a new issue, following the template we've provided. This includes listing all names, github accounts, and emails of everyone contributing to your project, and a brief (~1-2 paragraph) description of your proposed work.
3. Fork the [repository](https://github.com/doc-ai/exposomics) and create your branch from `master`.
4. Complete [local installation instructions](https://github.com/doc-ai/exposomics/blob/master/README.md#local-installation).
5. Submit a pull request with a reference to your issue number (#IssueNumber), so your PR links directly to your issue submission.
6. Upon a successful testing and code review, we will merge your branch into `master` and evaulate your entry for contest awards.

#### Clone repository
- Clone this repository to your working folder: `git clone https://github.com/doc-ai/exposomics.git`
- Open project folder: `cd exposomics`

#### Install required software

#### MAC OS
- Install Homebrew: `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`
- Install Node.js via homebrew : `brew install node`
- Install dependencies via yarn: `yarn install`
- Install MongoDB: [Use this guide](https://docs.mongodb.com/getting-started/shell/installation/) to set up MongoDB on your machine and run a local database server.

#### Linux
- Install Node.js: [Use this guide](https://nodejs.org/en/download/package-manager/) to install Node.js for your Linux distribution
- Install dependencies via npm: `npm install`
- Install MongoDB: [Use this guide](https://docs.mongodb.com/getting-started/shell/installation/) to set up MongoDB on your machine and run a local database server.

#### Local Installation
- Run `node -r babel-register createDbFiles.js` to download all required data and put it to local db files.
- Run `mongoimport --drop --stopOnError --headerline --type csv db/*` to import local db files to MongoDB.
<!-- - If you will add your own data source (instead of using our Air Quality data), we have example scripts used for our database at `apps/airQuality/server/data/prepare_data.py` -->

**Modifications**
- Note: for new developers that only want to make basic modifications, all your changes will probably be made to the `apps/airQuality/server/Controller.js` file. That file has the logic that actually queries the database and constructs a dataset to be rendered.

**Core Contributors:**
- @alexdocai - 	Alex Kwiatkowski | doc.ai
- @apurvmishra - Apurv Mishra | doc.ai
- @BohdanTkachenko - Bohdan Tkachenko | doc.ai
- @xanf- Illya Klymov | doc.ai
- @irod973 - Irving Rodriguez | doc.ai
- @lizalopez - Liza Lopez | doc.ai
- @MariiaTkachenko - Mariia Tkachenko | doc.ai
- @majortom57 - Walter De Brouwer | doc.ai

## [REGISTER HERE!](https://goo.gl/forms/nz7YyYDi4mnir2At2)

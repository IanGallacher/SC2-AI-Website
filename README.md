# Sc2 AI Website
[![Build Status](https://travis-ci.com/IanGallacher/SC2-AI-Website.svg?branch=master)](https://travis-ci.com/IanGallacher/SC2-AI-Website)
[![Maintainability](https://api.codeclimate.com/v1/badges/5bc82fccdd4ce3b208c6/maintainability)](https://codeclimate.com/github/IanGallacher/SC2-AI-Website/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/5bc82fccdd4ce3b208c6/test_coverage)](https://codeclimate.com/github/IanGallacher/SC2-AI-Website/test_coverage)

## Rough Instructions

These instructions are very quick and dirty. If you get stuck, feel free to ask for help on one of the [comunity hubs](http://sc2ai.net/Joinus.php).

Note that this guide does not yet cover setting up pre-requisite software, and it may make bad recommendations.

## Setup

* Install Ruby and stuff...

* Install Bundler: `gem install bundler`.

* Clone this repo to your computer.

* Open a terminal in the repo folder.

* Run `bundle install.`

* Run `npm install`.

* Run `npx webpack`.

* Setup a mysql instance.

* Create an environment variable `MYSQL_PASSWORD` and set it to the password for the root mysql login.

* Run `rails db:create`.

* Run `rails db:migrate`.

## Run

* Open two **separate** terminals into the repo folder.

* Run `rails s` in one terminal.

* Run `npm run start:dev` in the other terminal.

* Navigate your web browser to `http://localhost:8080/`

* The website should display on your screen.

* Any issues, blame TheDoctor (it's definitely all his fault).

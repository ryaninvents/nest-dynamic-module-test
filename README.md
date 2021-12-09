# nest-dynamic-module-test

> Testing out some ideas relating to dynamic modules in Nest.js

## What's the goal here?

I wanted to see if it was possible to dynamically instantiate multiple copies of a module, then reference one or more services within these modules from a "parent" or centralized control module.

## But why?

I'm working on an ecommerce application that needs to interface with multiple backends. I wanted to implement the third-party client modules as if they were alone, but I also needed to have an intelligent control module that would select which client module to use based on incoming data.

# Overview

To produce a reductive example, I've created two modules:

- `AnimalModule`, which lists members of a given species and how many legs they have.
- `AllAnimalsModule`, which tracks multiple species and defers to each `AnimalModule` for details.

`AllAnimalsModule` is responsible for instantiating any number of copies of `AnimalModule`, and for tracking the relationships between them. The only concession to my original plan was that it was necessary to add a `reference` argument to `AnimalModule.register` so that I could pass in a symbol. This symbol allows other modules to "reach in" and grab the local `AnimalService` via `ModuleRef`.

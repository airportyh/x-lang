# X Program Language

X is a programming language for demonstration purposes. It is coded
live on stream.

## Archive Videos

You can find the video archives on [this YouTube playlist](https://www.youtube.com/playlist?list=PLSq9OFrD2Q3DKGFCm0YRVRXZMO1KHNUXu).

* [Episode 1](http://tobyho.com/video/Live-Code-Make-a-Programming-Language-from-Scratch.html): discussed design and purpose of the programming language, implemented the parser for variable assignment and function call syntax. ([commit](https://github.com/airportyh/x-lang/commit/cde5753d14021958374651c26960b48b880ac25e))
* [Episode 2](https://www.youtube.com/watch?v=vCOY0xcI2iE&list=PLSq9OFrD2Q3DKGFCm0YRVRXZMO1KHNUXu): implemented built-in runtime functions and user-defined functions. ([commit](https://github.com/airportyh/x-lang/commit/3a0dbb1a1509fce6e3738311abcc2e8521d4bf46))
* [Episode 3](http://tobyho.com/video/Live-Code-Making-a-Programming-Language-from-Scratch-Part-3.html): wrote a run script to conviniently execute programs in the X language. Implemented code blocks which are similar to anonymous function
expressions in JS, and use that and a runtime $if function to implement conditionals instead of an if statement. ([commit](https://github.com/airportyh/x-lang/commit/75eb66bd4211fb2e62a6fcc90bfd8999445f23ba))
* [Episode 4](http://tobyho.com/video/Live-Code-Making-a-Programming-Language-from-Scratch-Part-4.html): implemented array literals, `each`, `map`, `filter` and `reduce` functions and added parameters to code blocks. ([commit](https://github.com/airportyh/x-lang/commit/aad292e356271b269dd3a59c34ef843549843aef))
* [Episode 5](https://www.youtube.com/watch?v=ME6Msxff8xI): implemented implicit returns and tags for collection types. ([commit](https://github.com/airportyh/x-lang/commit/7a6c7935f6be70394657db28c15a1e8b5b62f672))
* [Episode 6](http://tobyho.com/video/Live-Code-Make-a-Programming-Language-From-Scratch-Part-6.html): implemented dictionaries. ([commit](https://github.com/airportyh/x-lang/commit/a1944028b5cb0659de62bf57f9866cd76623c1f8))
* [Episode 7](http://tobyho.com/video/Live-Code-Make-a-Programming-Language-from-Scratch-Part-7.html): implemented proper if statements and talked about the dangling else problem. ([commit](https://github.com/airportyh/x-lang/commit/704dc7a66e6e39f04d73d72b51a1b147b53a82cb))
* [Episode 8](http://tobyho.com/video/Live-Code-Make-a-Programming-Language-From-Scratch-Part-8.html): code clean up, string runtime functions, fixed if statement bug, did a code challenge.([commit](https://github.com/airportyh/x-lang/commit/523c5fda9474f9b508b374661078965904ec89ed))

## Project Dependencies

The project depends on this libraries:

* [Nearley JS](https://nearley.js.org/)
* [Moo JS](https://github.com/no-context/moo)

## Video Course

Also see my course [How to Make a Programming Language](https://www.youtube.com/watch?v=5CS0CNVsn4I&list=PLSq9OFrD2Q3DasoOa54Vm9Mr8CATyTbLF) for more detailed coverage of the topics encountered in this series.

## Todos

* index notation syntax
* operators
* classes
* Unicode support (use different languages and emojis for var names)
* Add enough feature to be able to solve some code challenges and do the word summary program
* Clojure style protocols
* FS support
* DOM support

* native if statement (done)

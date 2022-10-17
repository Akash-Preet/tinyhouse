# What is Node?

### Node

Node is a JavaScript runtime environment that can run on different platforms (Mac, Windows, Linux, etc.). What this means is JavaScript (which was originally created to run inside a web browser) can now be run on any computer as a web server.

Node was originally released in 2009 by [Ryan Dahl](https://github.com/ry) as a response to how slow web servers were at the time. This is because most web servers would block the I/O (Input/Output) task (e.g. reading from the file system or accessing the network) which will lower throughput. Node _changed_ this model by making all I/O tasks **non-blocking** and **asynchronous**. Non-blocking, for example, just means a request from another interaction can be processed without waiting for the prior interaction request to finish. This allowed web servers to serve countless requests _concurrently_.

### Non-blocking I/O

Here's an example taken from the [main Node website](https://nodejs.org/de/docs/guides/blocking-vs-non-blocking/#comparing-code) in comparing code between the synchronous blocking state and the asynchronous non-blocking state.

This example covers the use of the Node [File System](https://nodejs.org/api/fs.html) (`fs` module) which allows us to work with the file system in our computer.

```javascript
const fs = require("fs");
const data = fs.readFileSync("/file.md");
moreWork();
```

The file system module is included by stating `require('fs')`. The [`readFileSync()`](https://nodejs.org/api/fs.html#fs_fs_readfilesync_path_options) method is used to read files on the computer with which we've stated we want to read the markdown file named `file.md`. The `readFileSync()` method is _synchronous_ so the `moreWork()` function will only run _after_ the entire file is read in the process. Since the `readFileSync()` method _blocks_ `moreWork()` from running, this is an example of **synchronous blocking code**.

As we've mentioned, Node allows I/O taks to be non-blocking and asynchronous and as a result provides asynchronous forms for all file system operations. Here's an attempt to read the `file.md` file and run the `moreWork()` function in an asynchronous setting:

```javascript
const fs = require("fs");
let data;
fs.readFile("/file.md", (err, res) => {
  if (err) throw err;
  data = res;
});
moreWork();
```

The [`readFile()`](https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback) method is _asynchronous_ and allows the use of a [callback function](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function). The callback function won't run until the former function, `readFile()`, is complete. In this case, the `readFile()` method doesn't block code since the `moreWork()` function will be run _while the file is being read_. Whenever the reading of the file is complete, the callback function will then run.

The ability to have the `moreWork()` function run alongside the reading of a file, in the asynchronous example above, was a primary design choice in Node to allow for higher throughput. [Callback functions](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function), [promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), and the use of the [`async/await`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) syntax are some of the ways in which Node allows us to conduct and use asynchronous functions.

### Node and npm

If you've built any web application within a Node environment, you've already come across something known as [`npm`](https://www.npmjs.com/). `npm`, short for Node Package Manager, is two things:

- An online repository for the publishing of open-source Node Projects.
- A command-line utility for interacting with the `npm` repository.

The ecosystem of third-party tools that can easily be installed in a Node application makes Node a very _rich_ ecosystem. This also ties in with how we build applications in Node by introducing just the tools and libraries we need in an app.

One awesome benefit of using Node is that Node makes capable the building of **universal JavaScript applications** (often also known as **isomorphic JavaScript**). These are applications that have JavaScript both on the client and the server which is exactly what we'll be doing in our course!

Node is built against modern versions of [V8](https://v8.dev/) (Google's JavaScript and WebAssembly engine) which helps ensure Node stays mostly up to date with the latest ECMA JavaScript syntax. Node already supports a vast majority of ES6 features which can be seen in the [node.green](https://node.green/) website.

To install Node, all we have to do is go to <https://nodejs.org> and download the latest LTS version of Node (which is recommended for most users).

An easy way to verify if Node is installed on a computer is to run the following command in the terminal to determine the version of Node installed.

```shell
node -v
```

`npm` is installed as part of Node with which we can also check for the version of `npm`.

```shell
npm -v
```

# WordPress JS Plugin Starter

There's a lot of Tools, Starters, Boilerplate repositories... Most of them are great and I encourage you to use one of them if it fits your needs. However, using a boilerplate or scaffolding tool doesn't really teach you what's happening behind the scenes. This where this repository comes in. It is another starter for a WordPress plugin focused on JavaScript extensibility (think Gutenberg blocks, plugin API, JavaScript heavy plugins) but it has a second goal, a more important one, it tries to educate on the different configurations, setups, and low level tools used. It answers questions like:

- How do I quickly setup a WordPress environment and how do I bake it into my plugin?
- How do I define a WordPress Plugin?
- How do I load a simple JavaScript script in WordPress?
- How do I bundle my JavaScript files?
- How do I use advanced JavaScript features like JSX?
- How do I build a production-ready version of my plugin?

and more importantly

- How does all this fit together?

## How to follow the tutorial

If you take a look at [the commits](https://github.com/youknowriad/wp-js-plugin-starter/commits/master) of the repository, you'll notice that each commit is a step further in the making of the starter. Each commit corresponds to a chapter of this tutorial.

## Steps

### Step 1: WordPress environment

As a first thing to build a plugin for WordPress, we obviously need a WordPress installation locally to test the plugin. There are a multitude of ways to start a WordPress environment out there and again all of them are great alternatives. But for the purpose of this tutorial I chose to use [`Docker`](https://www.docker.com/) for the following reasons:

- We can embed a `docker-compose.yml` file in the repository allowing anyone contributing to the plugin, to start the same environment.
- It's config file (the `docker-compose.yml`) is "readable". You can open it and you'll get an idea how everything fits together.

For any WordPress installation we need a webserver and database server, by opening the `docker-compose.yml` file, you'll notice that we define these two services and we expose the webserver on `http://localhost:8888`.

It's not really important to master how docker works at the moment, just know that to start a local environment, first install Docker (there are binaries available for most platforms), navigate to the folder of the plugin (the folder containing the `docker-compose.yml` file) in your terminal and run:

```sh
docker-compose up -d
```

Wait a few seconds and then you can now navigate into `[http://localhost:8888](http://localhost:8888)` in your favorite browser. You'll be prompted to install WordPress on your first access.

**Note:** It's not mandatory to use this specific WordPress environment for the next step of the tutorials but it's handy because the plugin will be automatically put in the `wp-content/plugins` folder of the WordPress install.

#### Go further

- Learn More about [Docker](https://docs.docker.com/) and [Docker Compose](https://docs.docker.com/compose/).
- Alternative WordPress environments: [VVV](https://varyingvagrantvagrants.org/), [Local by Flywheel](https://local.getflywheel.com/), 10up Docker.

## Step 2: Create a WordPress plugin

In this step we're going to bootstrap the WordPress plugin. To define a WordPress plugin, we only need a php file at the root level (we're calling it `wp-js-plugin-starter.php` ).

This file should contain [some metadata in a PHP comment](https://github.com/youknowriad/wp-js-plugin-starter/commit/e88f6fc6e36ea14cb4631225c162905e31b57fc6) to define, the name, the version, the description and a few other fields.

And that's it, you can navigate now to [the plugins page](http://localhost:8888/wp-admin/plugins.php) of your WordPress install. The plugin should be listed in the installed plugins. Activate it.

It does nothing for now, but it's still a WordPress plugin 😀.

#### Go further

- [Writing a WordPress Plugin](https://codex.wordpress.org/Writing_a_Plugin)

## Step 3:

Since we're focused on JavaScript heavy plugins, let's continue by creating a simple JavaScript file `src/index.js` that just logs a message to the browser's console.

In WordPress, to load JavaScript files, in general, we have to "enqueue" them using `wp_enqueue_script`. We can enqueue a specific file by providing its path directly but I encourage you to first "register" your script by giving it a name and when you need to enqueue it, you just use the **script name** to refer to it.

So, as an example for this step, we updated the PHP file of the plugin to do two things:

- Registering the script on the WordPress `init` action.
- Enqueue the script on the `admin_enqueue_scripts` action (this action ensures the script is enqueued in all WP Admin pages).

Now, you can just navigate to any WP Admin page, open your browser's console and you'll see the "Start the engine!" message displayed there which validates that our JavaScript file has been loaded properly in WP Admin pages.

#### Go further

- [WordPress Script Registration](https://developer.wordpress.org/reference/functions/wp_register_script/)
- [WordPress Hooks](https://codex.wordpress.org/Plugin_API/Hooks)

## Step 4: Bundling the JavaScript Files

To ship JavaScript into production properly, there's a lot of aspects we need to take into account:

- Make sure we load the minimum files possible per page to avoid a lot of initial requests.
  We do this by bundling all the JavaScript files into a single built file.
- Make sure we ship the smallest possible file to load the minimum Kbits possible in the browser. To achieve this, we need to minify the JavaScript files that will be shipped in production. At the same time, we need to keep using the unminified files in development environments to ease debugging.

To do so we use tools called A bundler and a minifier.

- A bundler is a tool take has a JavaScript entry point file relying on other JavaScript files using `import` or `require` and bundles all these files together into a single JavaScript file. Bundlers can be more powerful than that, they call also load non-JavaScript files (stylesheets, JSON, ...) into these bundles.
- A minifier is a tool that takes a JavaScript file as an entry and tries to produce the smallest possible JavaScript file as an output by using different techniques: Removing space, mangling variable names, removing dead code...

The most popular tool at the moment in the JavaScript community that is used to perform such tasks is the Webpack bundler in combination with UglifyJS as a minifier. Webpack is a very powerful and flexible tool which sometimes plays against its learning curve. Configuring Webpack for the first time can be intimidating and even for experienced developpers, its config file can be a challenge to understand.

For this starter, we'll prefer to use Parcel Bundler, a young opinionated alternative to webpack which easier to understand if you're not familiar with all these concepts. It works without config by default and has two important command lines, we're going to use here:

- `parcel watch [entryPoint]`: A command taking a JavaScript file as entry point and bundling all the dependencies into a `dist` folder producing an unminified bundle for developement purpuse. It also updates the bundle each time change one of the files used in the bundle.
- `parcel build [entryPoint]`: A command bundling the entryPoint and its dependencies into a production-ready file.

But first, we need to install these tools we're going to use. In the JavaScript community, we do use by using `npm`, a package dependency manager for JavaScript (if you're more familiar with `PHP`, it's the `composer` of `JavaScript`).

So, similarily to most package dependency managers, we need to provide some basic informations in a config file called `package.json` including the name of our package, its current version, its license, some keywords. This file can be generated automatically by running `npm run init` and replying to some simple questions about your package.

Once initialized, we can start defining and installing our dependencies (the packages we depend on). So we start by installing the Parcel bundler as a devDependency (a dependency useful when developping our current project but a dependency we don't ship in our production code). So we can just run `npm install parcel-bundler --save-dev`. Running this command updates the `package.json` file and adds the newly installed dependency to the `devDependencies` section of the file.

Installing the dependencies also creates or updates a `package-lock.json` file. This will will ensure that other developpers working on the repository can install the correct versions of the dependencies by just running `npm install` on their own local repositories.

Now, we're set, we installed the parcel bundler. We can use it to define some scripts to bundle our JavaScript file in developement and production. the `package.json` file allows us to define a `scripts` section where we can add shortcodes to the most used command lines while developping a project. So for instance, instead of having to run `parcel build src/index.js` each time we want to build a production version of our JavaScript files, we can define a `build` script in the `package.json` and just run `npm run build`. So at this point, we define our two scripts: the `start` script we're going to use when developping the plugin to automatically build a development version of the plugin and the `build` script.

Try running `npm start` or `npm run build` at this point, and you'll notice that a bundle file `index.js` is created in the `dist` folder.

Last but not least, we need to update the registration of the WordPress script (achieved in the previous step) in the `wp-js-plugin-started.php` file and point the registered script to the built file `dist/index.js` instead of the source file we were using previously.

Nothing has really changed in the plugin behavior, you can refresh WPAdmin, and you'll notice that the JavaScript is still being executed properly. If you check the network tab of your browser's console, you'll notice that the JavaScript file is being loaded from the `dist` folder now.

At this moment and for more complex plugin, you can start splitting your JavaScript source file into multiple files and use `import` to include those in your entry point.

#### Go further

- Alternative bundlers: [Webpack](https://webpack.js.org/), [browserify](http://browserify.org/)
- [Understading NPM](https://docs.npmjs.com/) and the [package.json](https://docs.npmjs.com/files/package.json) file
- Parcel documentation

## Step 5: Babel, JSX and ESnext

One benefit that comes by default with using `parcel` (because it's an opiniated bundler) is that you can directly start using new JavaScript features (What is commonly called `ESNext` or `ES2015+` features) and parcel will make sure they work in every browser that has 0.25% or more of the total amount of active web users. So for instance, you can start using Arrow Functions, const/let or destructuring.

Behind the scenes, `parcel` uses `Babel` to compile your `ESnext` JavaScript files into files compatible with all those browsers but WordPress uses a slightly modified version of the `Babel` config than the one used by default by `parcel`. The big differences with the default config is that WordPress targets more browsers and allows the use of `JSX` to build UI using the `@wordpress/element` package.

**What is JSX?**

JSX is a special JavaScript syntax that ressembles HTML because its main purpose is to define "elements". Elements are special JavaScript objects that can get rendered into the DOM. This syntax was popularized by React and adapted by other JavaScript frameworks. WordPress uses an abstraction over `React` called `wp.element`.

So for instance when writing

`const myElement = <div className="test">content</div>`

This is compiled by Babel (using the WordPress babel config) into:

`var myElement = wp.element.createElement( 'div', { className: 'test' }, 'content' )`

And to render this element into the `body` of your web page, you write:

`wp.element.render( myElement, document.body )`

Ok, so now let's configure Babel to use the config used by WordPress, that way we'll be able to use `JSX` (to build blocks etc...).

The WordPress babel config is made available as an npm package you can install by running `@wordpress/babel-preset-default --save-dev`.

Now, we create a `.babelrc` file, which is the configuration file for `Babel` and we tell it to use `@wordpress/default` as a preset and that's it, we can now start using JSX.

As an example, in the commit we update our `console.log` to log an element instead of just a string. you can refresh your admin page and try for yourself.

#### Going further

- [Babel](https://babeljs.io/) and [Babel Env](https://babeljs.io/docs/en/babel-preset-env)
- [JSX](https://reactjs.org/docs/introducing-jsx.html)
- [WordPress Babel Preset](https://www.npmjs.com/package/@wordpress/babel-preset-default)

## Step 6:

At this stage everything is ready to start building complex JavaScript files. As an example I updated the plugin to be a simple Gutenberg Block.

- Registring the block server side with it's editor script
- Updating the JavaScript file to register the block and use JSX to define its `edit` and `save` function.

You can try for yourself by navigating into Gutenberg and inserting the "Hello World" block.

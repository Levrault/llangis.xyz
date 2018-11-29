---
path: "/how-i-use-react-s-new-context-api"
date: "2018-07-20T14:40:00.962Z"
title: "How I use React's new context api"
thumbnail: "./thumbnail.png"
---

# A brief explanation

In version 16.3, React decided to release the final version of its context api. Finally, it's no longer experimental. For those who do not know React's context api, we can read in the official documentation that *Context is designed to share data that is considered "global" for a tree of React component*. 

To make it short, I can say that Context is somekind of lightweight version of Redux. That is because we can use it to achieve the same thing for some basic usage. You can read this [great article by Didier FRANC](https://medium.freecodecamp.org/replacing-redux-with-the-new-react-context-api-8f5d01a00e8c) that explanes how we can replace Redux with react-waterfall (that uses the context api).

# Context vs Redux : a really brief comparison

Since I don't want to make an whole article about Context vs Redux, I will just make A brief list of their benefits.

Redux's advantages

* Powerfull developper tools
* Great community
* Lots of extensions 

Context's advantages

* Light
* Native
* Easy to use
* No extra dependencies

Now that this is done, I will detail how I use the context api with this blog.

# Everything is about context

My blog is pretty damn simple, I have a homepage, a page about my web dev articles and one about my game dev articles. My stack is also pretty simple, I use [Gatsbyjs](https://www.gatsbyjs.org/), a static site generator for React, coupled with [styled-components](https://www.styled-components.com/), a css-in-js library. I try to keep it stupid, simple (**KISS** if you prefer). 

I wanted to keep my code as simple as possible. I didn't use Redux because it was kind of heavy but I still needed something to manage my global state to avoid React's old state propagation pattern. So I decided to use React Context Api.

## And the context ?

I can say that my blog has two contexts, one for the web dev and one for the game dev. With that in my mind, I had the following idea: When the user puts his mouse over the web dev or game dev menu button, a small preview of my profile will slide down. I throught it could be a good idea to show the skills I learned in both of those worlds.

![preview-profile](./preview-profile.gif)

 

For this, I will need a small store that looks like this

* **Context** a flag value (webdev or gamedev) 
* **profileEnable** is this profile displayed ?

# Providing (creating globally) everything

The Context api works by using two components:

**Provider** *A React component that allows consumers to subscribe to context changes*. In mores simples words, it wills receive your data.

**Consumer** *A React component that subscribes to context changes*. Also in more simples words, it will retreive data passed to the provider.

It will sound familiar to you if you are used to Redux.

## Before providing everything

Before creating my variable and function that are gonna by used by the Context Api, I create two external file:

`src/context/appContext` is used to import the global Context Api. It will create both the Provider and Consumer for the AppContext variable.

```javascript
// src/context/appContext
import React from 'react';

const AppContext = React.createContext();

export default AppContext;

```

`src/context/appConstant` is use to flag all the app's context

```javascript
// src/context/appConstant
const CONTEXT = {
  WEBDEV: 'webdev',
  GAMEDEV: 'gamedev'
};

export default CONTEXT;

```

## Providing everything

Didier Franc already explains in his article, creating a global store can be made easy by linking our context with the main state of our main div. That is why, all the data of my store is managed by `src/layout/index` , my main div.

```javascript
  // src/layout/index

  /**
   * @constructor
   * @param {object} props
   */
  constructor (props) {
    super(props);
	// here are all my data
    this.state = {
      context: CONTEXT.GAMEDEV,
      profileEnable: false
    };
  }
```

I did the same thing with my reducers, since they are just internal functions of `src/layout/index`.

```javascript
  /**
   * Update home context
   * @param {string} context
   */
  toggleContext = (context) => {
    this.setState({
      context
    });
  }

  /**
   * Show profile preview or not
   * @param {bool} profileEnable
   */
  toggleProfile = (profileEnable, context) => {
    this.setState({
      profileEnable,
      context
    });
  }
```

And finally, I pass everything to the Context api's provider component `AppContext.Provider`

```javascript
  /**
   * render
   */
  render () {
    const { children } = this.props;

    // helmet
    const siteTitle = get(this.props, 'data.site.siteMetadata.title');
    const meta = [
      { name: 'description', content: 'Hi folks' },
      { name: 'keywords', content: 'blog, react, unity, front-end, game design' }
    ];

    // merging into a single store
    const store = {
      ...this.state,
      toggleContext: this.toggleContext,
      toggleProfile: this.toggleProfile
    };

    return (
      <div>
        <Helmet title={siteTitle} meta={meta}>
          <link rel="icon" type="image/png" href={Favicon} sizes="16x16" />
        </Helmet>
        
        {/* Passing my store data to context api */}
        <AppContext.Provider value={{ ...store }}>
          <Navbar />
          <Profile />
          <div>
            {children()}
          </div>
          <Social />
        </AppContext.Provider>
      
	  </div>
    );
  }
}
```

Now I have a global store with

* **context** has flag variable for webdev and gamedev
* **profileEnable** to display/hide the profile preview
* **ToggleContext** to unleash an action and update the context
* **toggleProfile** to update profileEnable function

# ConsumING (or getting) everything

Now that all my data is stored, I need to get them or update them. This is when the Consumer component can be used. Consumer, beside of Provider, needs a function as a child. This function is used to get the data that we had passed through the Provider.

In my profile component, I only need to get data, so it is going to look like this when using the Consumer.

```javascript
// src/components/profile/profile
/**
 * Avatar picture
 * @param {bool}    enable
 * @param {string}  context
 */
const Profile = () => (
  <AppContext.Consumer>
    {({ profileEnable, context }) => {
      const left = (context === CONTEXT.WEBDEV) ? '27px' : '118px';
      return (
        <SlideVertical from="-520px" to="0px" active={profileEnable} zIndex="1">
          <Wrapper left={left}>
            {context === CONTEXT.WEBDEV && <WebdevProfile />}
            {context === CONTEXT.GAMEDEV && <GamedevProfile />}
          </Wrapper>
        </SlideVertical>
      );
    }}
  </AppContext.Consumer>
);
```



## Updating the store

Like you saw in `src/components/profile/profile`, while the Consumer is used to get variables, it can also be used to get functions like **toggleContext** and **toggleProfile**. When we get those functions, we are simply going to call them when we need to update the local state of our main div `src/layout/index` and when it is going to update, it will also update our AppContext.Provider and update everything at the end.

```javascript
  // src/components/interactions/commonLink
  render () {
    const { children, url, context, hasProfile } = this.props;
    return (
      <AppContext.Consumer>
        {({ toggleContext, toggleProfile }) => (
          <Fragment>
            {hasProfile &&
              <MenuLink
                onClick={this.handleClick(url, context, toggleContext)}
                onMouseEnter={this.handleMouseEnter(toggleProfile, context)}
                onMouseLeave={this.handleMouseLeave(toggleProfile, context)}
              >
                {children || url}
              </MenuLink>
            }

            {!hasProfile &&
              <MenuLink onClick={this.handleClick(url, context, toggleContext)} >
                {children || url}
              </MenuLink>
            }
          </Fragment>
        )}
      </AppContext.Consumer>
    );
  }
```

`this.handleMouseEnter` and `this.handleMouseLeave` are functions that each return an another function. I did it this way to set a timer before updating the provider (since I wanted my link animation to finish before displaying the profile).

![link-animation](./link-animation.gif)

It's also a great way to add some logic before calling a callback

```javascript
  /**
   * Show profile on mouse enter
   * @param {function} callback
   * @param {string}   context
   */
  handleMouseEnter = (callback, context) => () => {
    this.setState({
      isMouseIn: true
    });
    setTimeout(() => {
      if (this.state.isMouseIn) {
        callback(true, context);
      }
    }, 500);
  };

  /**
   * hide profile on mouse leave
   * @param {function} callback
   * @param {string}   context
   */
  handleMouseLeave = (callback, context) => () => {
    this.setState({
      isMouseIn: false
    });
    callback(false, context);
  };
```



# Conclusion

That's it pretty much. I can conclude that React's new Context is easy to learn and can be useful for simple and small projects. But I couldn't tell if it can be the best solution for a project larger than a small blog.


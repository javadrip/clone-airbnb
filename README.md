# Find demo here

[https://clone-airbnb-mu.vercel.app/](https://clone-airbnb-mu.vercel.app/)

# Tech involved

React, Next.js, Tailwind, zustand, axios, react-hook-form, react-hot-toast, MongoDB, Prisma, Next Auth, bcrypt, OAuth, leaflet, react-date-range

# Project summary

I wanted to get more hands-on with projects instead of just going through courses, so I took on this mammoth project (mammoth to me!) on as a way to learn-as-I-build and see what other areas I’m lacking.

# Learning points

## Function declaration vs function expression

I was building components using function declaration at the early stages, and when I got to building MenuItem, there was an error

```
Type 'Element' is not assignable to type 'FC<{}>'. Type 'ReactElement<any, any>' provides no match for the signature '(props: {}, context?: any): ReactElement<any, any> | null'.ts(2322)
```

A quick Google search showed what the problem was:

[Typescript returns error when a function type is FunctionalComponent, but not for arrow function](https://stackoverflow.com/questions/67213681/typescript-returns-error-when-a-function-type-is-functionalcomponent-but-not-fo)

Basically, it’s important to distinguish between a function declaration (i.e. what the function _returns_) and a function expression (i.e. what the function _is_).

### Difference between function declaration vs function expression

In JavaScript, there are two primary ways to define functions: function declarations and function expressions. The main difference lies in how the functions are created and hoisted in the code.

1. Function Declaration:

   - Syntax: `function functionName(parameters) { /* function body */ }`
   - Function declarations are hoisted, which means they are moved to the top of their containing scope during the compilation phase before the code is executed. This allows you to call the function before its actual declaration in the code.
   - Function declarations create named functions, and the function name becomes part of the scope in which it is defined.
   - Example:

     ```
     function greet(name) {
       console.log(`Hello, ${name}!`);
     }
     greet('John');

     ```

2. Function Expression:

   - Syntax: `const functionName = function(parameters) { /* function body */ }`
   - Function expressions create functions as values assigned to variables or properties of objects.
   - Function expressions are not hoisted and must be defined before they are called.
   - The function name, if provided, is only accessible within the function itself and not in the surrounding scope.
   - Example:

     ```
     const greet = function(name) {
       console.log(`Hello, ${name}!`);
     };
     greet('John');

     ```

Both function declarations and function expressions allow you to define reusable blocks of code, but they differ in terms of hoisting and scoping. The choice between them depends on the specific use case and programming style preferences, but function expressions are highly recommended.

### Function declarations are not recommended for React components

Using function declarations for React components can lead to unexpected behavior and potential issues. Here are a few reasons why it's not recommended to use function declarations for React components:

1. Hoisting: Function declarations are hoisted, which means they are moved to the top of their containing scope during the compilation phase. This can lead to confusion and errors if you try to use a component before it's defined in the code. React components are typically defined and used in a specific order, and relying on hoisting can make the code harder to read and understand.
2. Name Clashes: Function declarations create named functions, and the function name becomes part of the scope in which it is defined. This can lead to naming conflicts if you have multiple components with the same name or if the component name conflicts with other variables or functions in the same scope.
3. Consistency: Function declarations for components break the consistency of using arrow function expressions (`const MyComponent = () => { /* component body */ }`) or class components (`class MyComponent extends React.Component { /* component body */ }`) that are commonly used in modern React development. Using a consistent syntax throughout the codebase makes it easier for developers to understand and maintain the code.
4. Tooling Support: Some tools and plugins used in React development, such as Babel and ESLint, may expect components to be defined using function expressions or class components. Using function declarations can lead to compatibility issues and may not be supported by all tools.

While function declarations technically work for defining React components, using function expressions or class components is the recommended approach. They provide better readability, avoid hoisting-related issues, and align with the common practices and tooling in the React ecosystem.

## Declare client component using the “use client” directive

[Client components and the "use client" directive in NextJs 13](https://www.js-craft.io/blog/client-components-use-client-directive-nextjs-13/?ssp=1&darkschemeovr=1&setlang=en-SG&safesearch=moderate)

In Next JS, there are things that cannot be done on the server side, such as client-side state management and using window objects. In that case, we declare a NextJs component as a client component by using the `"use client"` directive:

```jsx
"use client";
export default function MyClientComponent() {
  // code here
}
```

A component should be declared as a client-side component when:

- when we use event listeners (e.g. `onClick`, `onChange`)
- when we use hooks like `useState()`, `useReducer()`, `useEffect()`, or other custom hooks that are depending on the state or lifecycle hooks
- when we use browser-only APIs (e.g. `window`, `document`) or hooks that use these APIs
- when you want to [use localStorage in your components](https://www.js-craft.io/blog/error-localstorage-is-not-defined-in-nextjs-how-to-fix-it/)
- some very particular cases for data fetching

## Zustand: A lightweight alternative to Redux

Zustand is a state management library for React applications and is particularly useful for smaller to medium-sized applications or projects that prioritise a more lightweight state management solution.

## Using Prisma with Next.js 13

Next.js 13’s hot reloading can cause multiple new PrismaClient instances, and hence it’s a good practice to check if a PrismaClient instance already exists.

Referring to two lines in app > libs >schema.prisma:

```jsx
const client = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = client;
```

The first line checks to see if a PrismaClient instance already exists on the global object. If it does, the code assigns the existing instance to the `client` variable. If a PrismaClient instance does not exist, the code creates a new instance and assigns it to the `client` variable.

The second line only assigns the `client` variable to the global object if the `NODE_ENV` environment variable is not set to "production". In production mode, you typically want to use a cached version of the PrismaClient instance. This can help to improve performance.

## Creating stepped forms with the help of `enum`

Enumerating the stages of the modals made it easier to manage and reference the different steps in the code. Steps can be incremented or decremented easily based on user actions using the **`setStep`** function and numerical representation of the steps.

## Coding on the bleeding edge of tech has a price: Time

I was coding along fine, being sure that I resolve errors as I went. When it came to deployment on Vercel, suddenly I had an issue:

```
./node_modules/next-auth/next/middleware.js
Module parse failed: Identifier 'NextResponse' has already been declared (3:6)
File was processed with these loaders: * ./node_modules/next/dist/build/webpack/loaders/next-swc-loader.js
You may need an additional loader to handle the result of these loaders.
| "use strict";
| const NextResponse = require("next/dist/server/web/spec-extension/response").NextResponse;
> const NextResponse = require("next/dist/server/web/spec-extension/response").NextResponse;
| var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
```

A quick search showed that many people who developed on Next.js 13.4.4 (latest version at the time of development) [experienced the same issue](https://github.com/nextauthjs/next-auth/issues/7650). The suggested solution to upgrade to a pre-release version [13.4.5-canary.0](https://github.com/vercel/next.js/releases/tag/v13.4.5-canary.0) didn’t work for me (possibly because I tried to , and hence I had to roll back to an earlier version (13.2.4) and apply some patches before the code can be successfully deployed again.

# What I improved

## Updated NextAuth’s routing from Pages to App router

The original tutorial routed NextAuth through the Pages router, and I updated it to use the newer App router.

- I added the `pages` option to the `authOptions` object and specified the `/signin` route. This is necessary because the App Router now handles authentication and authorisation, so I need to define the `signIn` route in the `pages` option.
- I exported the `handler` object as `GET` and `POST`. This is necessary because the App Router uses a different API than the Pages Router.

# Future improvements

The whole purpose of going through this development is to encounter and learn more about Next, Next Auth, MongoDB and Prisma. The app is pretty complete as is, and based on my current skill level, I would probably make superficial improvements for now:

- Get rid of deceptive site warning when user lands on the demo site.
- Fix field label scaling down and translating to the top when field is filled and out of focus.
- Profile photo upload for users not using OAuth.

======================================

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

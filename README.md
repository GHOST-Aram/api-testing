# Testing Express API Routes the Easy Way: Beginners' guide.
Unit testing is one of the best practices in software development. In the development of web APIs, there is no question about the importance of unit testing. Unit testing is critical in ensuring that all the routes in a web API respond with the information expected from them. 

Testing routes in a web API can be a nightmare if you don't structure your components well. One area that causes the most pain for beginners in testing APIs is the routes that involve database access. Database operations are inevitable. Often you are going to build CRUD applications as a beginner. In this article, we will learn how to test API routes with the least difficulty possible. 

## What will this article cover?
The main focus of this article is to show you how to test routes. Therefore, other related tests such as database tests are out of the scope of this article.

## What does the article expect you to already know?
This article is not an introductory tutorial to unit testing or API development. Therefore, we assume that you have basic knowledge of the following topics:

- Unit testing with JavaScript libraries like [Jest](https://jestjs.io/).
- [Mocking](https://jestjs.io/docs/mock-functions) expensive operations in unit tests with the Jest mock functions. 
- Creating simple CRUD APIs using Express.
- Working with Mongoose for database operations.
- Working with Typescript(optional but a plus if you know).

If you are new to Typescript, do not fret. Everything that we will cover in this article can be done even more easily with plain Javascript. 

## What technologies are we going to use?
We will use the following technologies, frameworks, and libraries in this article:
- Jest
- Supertest
- Node v20
- Typescript
- Express
- Mongoose

## What should you expect to learn from this article?
At the end of this article, you will have learned how to do the following:
- Separate your tests from the main application.
- Modularize your application for easy testing.
- Test routes that involve database operations without connecting to a database. 
- Run tests successfully regardless of whether your application runs on a server.


## How are we going to learn?
Here is the order in which we are going to learn how to test API routes the easy way:

1. Configure a test environment.
2. Create a simple Express API.
3. Modularize your application for easy testing.
4. Write your first route test.
5. Write a test involving database operation.
6. Decouple the data-access logic from the web layer.
7. Introduce dependencies on the controller and the router.
8. Mock your data-access layer.
9. Replace the data access layer with the mock in the test file.


## 1. Configure a test environment.
In the spirit of "Do not repeat yourself," we will use a preexisting test environment. We will [clone a configured test environment](https://github.com/GHOST-Aram/ts-jest-env) from a GitHub repository. This repository contains configurations for Jest and Typescript. In case you are interested in learning how to configure a test environment for Jest and Typescript, [visit this article](https://dev.to/ghostaram/configuring-jest-for-typescript-unit-tests-4iag).

After cloning the repository, run the following command to install node modules.

```
npm install
```
That's it. We have a development and test environment ready for us to work on. Let's move to step 2 and create a simple Express API.

## 2. Create a simple Express API.
Because you already know how to create an API with Node and Express, we will go through this step quickly so we can start working on why you are here.

Run the following command on your terminal to install Express and it's types.

```
npm i express
npm i -D @types/express
```
In your `src` directory, create an `app.ts` file and paste the following code snippet.

```
app.ts


import express from "express"

const api = express()

api.use(express.urlencoded({ extended: true }))
api.use(express.json())

api.get('/', (req, res) =>{
    res.status(200).json({message: 'Welcome to my API'})
})
```
There we go. That's all we need for now. Notice that we are not connecting to a database or listening on a port. We do not need database connectivity or a running instance of our application to be able to test it.

## 3. Modularize your application for easy testing.
To enable efficient testing of the routes of our application, we need to modularize it into its individual components. 

We will decouple our API into routes, controllers, and the main file(`app.ts`). We follow the steps below:

a). Modularize route handlers.

b). Modularize routes.

c). Refactor the main file

### a). Modularize router handlers
Create a `controller.ts` file in the `src` directory. Create and export a route handler on the file as shown below.

```
controller.ts


import { Request, Response } from "express";

export const index = (req: Request, res: Response) =>{
    res.status(200).json({ message: 'Welcome to my API' })
}
```
### b). Modularize routes
i). Create a `routes.ts` file in the `src` directory. 
ii). Create a `router` from `express.Router`.
iii). Import the controller function, and set up a route as shown below.

```
routes.ts


import { Router } from "express";
import { index } from "./controller";

const router = Router()

router.get('/', index)

export {router}
```
### c). Refactor the main file
Import the router into `app.ts` and replace the route handler as below.

```
app.ts


import express from "express"
import { router } from "./routes"

const api = express()

api.use(express.urlencoded({ extended: true }))
api.use(express.json())

api.use('/', router)
```

We have successfully modularized our application for easy testing. Get ready to write your first route test in the next step.

## 4. Write your first route test.
In the previous sections, we have created a simple Express API and modularised it for easy testing. Let us write a test for the index route (`/home`). 

To write our first test, we will follow the steps below:
a). Create a separate instance of the API.

b). Install a routes testing library

c). Write a failing test.

d). Run the test.

e). Make the test pass.

### a). Create a separate instance of the API.
An effective way to test routes of an API is to create a separate instance of the API. Create an `app.test.ts` file and copy the content of `app.ts` to it. Below is the code snippet.

```
app.test.ts


import express from "express"
import { router } from "./routes"

const api = express()

api.use(express.urlencoded({ extended: true }))
api.use(express.json())

api.use('/', router)
```

### b). Install a routes testing library.
The Supertest can be used in union with Jest to test the routes of an API. Install the Supertest module and its types using the command below.

```
npm i -D supertest @types/supertest
```

### c). Write a failing test.
An example of a test for the index route can be written as shown in the code snippet below.

Import required functions

```
app.test.ts
...//The previous imports go here

import request from 'supertest'
import { describe, test, expect} from '@jest/globals'
```

Write test:

```
app.test.ts


... //All imports go here

... //the API configurations go here

describe('Index Route', () =>{
    test("Responds with 200 status code", async() =>{
        const response = await request(api).get('/home')
        expect(response.status).toEqual(200)
    })

    test("Responds with json content", async() =>{
        const response = await request(api).get('/home')
        expect(response.headers['content-type']).toMatch(/json/)
    })

    test("Returns with \'welcome home\' message", async() =>{
        const response = await request(api).get('/home')
        expect(response.body.message).toMatch(/welcome home/i)
    })
})
```

Notice that the route we are testing does not exist in our application yet. We are doing this intentionally for this test to fail. It is good practice to have a failing test before you can write the code to make it pass. 

### d). Run the test.
Before we run any test, remove or skip any other test file in the directory you didn't write.

Now run this test using the following command to see that it fails.

```
npm test
```

As we see in the screenshot below, the test has failed.


![Failing test](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/t9p3va515rc1ybh014h9.png)

Next, we make it pass in the last step.

### e). Make the test pass.
To make the above test pass, we first need to declare a route handler in `controller.ts`

```
controller.ts


import { Request, Response } from "express";

export const home = (req: Request, res: Response) =>{

}

...//Other router handlers
```

Then we include the new path on the `routes.ts` file and import the route handler.

```
routes.ts

import { Router } from "express";
import { home, index } from "./controller";

const router = Router()

router.get('/home', home)

router.get('/', index)

export {router}
```

Our test is still failing, let us return a response that satisfies our test from the `home` controller function.

```
export const home = (req: Request, res: Response) =>{
    res.status(200).json({message: "Welcome home"})
}
```

With the above implementation, our test passes as shown in the screenshot below.

![Passing test](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/b0kt3kymj8alh8gt10w1.png)

Success! You have written and run your fast test. In the next step, let us test a `POST` request that saves data to the database.


### 5. Write a test involving database operation.
We have seen how to test a simple `GET` route that responds with a simple message. Now let us create a test for a `POST` route    `/item` that will do the following :

- Receive input data from the user.
- Create a Mongoose document and save it to the database.
- Respond with a copy of the saved document.

We will accomplish the objective of this article in the following steps:

a). Write a failing test.

b). Create a model for the item.

c). Declare the route handle and configure the route.

d). Implement the route handler.


### a). Write a failing test.
The test for the route that satisfies the above requirements would look like the following.

```
describe('POST item', () =>{
    test('Responds with json content', async() =>{
        const response = await request(api).post('/item')
            .send({ title : 'The Book Of Scretes', pages: 800})

        expect(response.headers['content-type']).toMatch(/json/)
    })

    test('Responds with 201 status ', async() =>{
        const response = await request(api).post('/item')
            .send({ title : 'The Book Of Scretes', pages: 800})

        expect(response.status).toEqual(201)
    })

    test('Responds with saved document', async() =>{
        const response = await request(api).post('/item')
            .send({ title : 'The Book Of Secretes', pages: 800})

        expect(response.body).toHaveProperty('item')
        expect(response.body.item).toHaveProperty('_id')
        expect(response.body.item.title).toMatch(/the book of secretes/i)
        expect(response.body.item.pages).toEqual(800)
    })
})
```
All the tests we have just added are failing as evident in the screenshot below.

![Failing test Involving DB](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/it8vgpf6mhtfoca5rhdk.png)

### b). Create a model for the item.
Before we try to make the test pass, we need to create a model that we will use to implement the database operation. Here is the code snippet for the model.

To create a model, we will use the `mongoose` module. Install mongoose using the command below.

```
npm i mongoose
```

```
item.model.ts


import mongoose, { HydratedDocument } from "mongoose"

interface IItem{
    title: string
    pages: number
}

type ItemModel = mongoose.Model<IItem>

const itemSchema = new mongoose.Schema<IItem, ItemModel>({
    title: String,
    pages: Number
})

export type HydratedItemDoc = HydratedDocument<IItem>
export const Item = mongoose.model<IItem, ItemModel>('Item', itemSchema)
```

Are you interested in learning how to create Mongoose models with Typescript? Be sure to check out [this article](https://dev.to/ghostaram/how-to-create-mongoose-models-using-typescript-7hf).

### c). Declare the route handler and configure the route.
The model created above will help us implement a database operation within the route handler. 

Let us declare the route handler in `controller.ts`

```
controller.ts


import { Request, Response } from "express";
import { Item } from "./item.model";

export const addNewItem = async(req: Request, res: Response) =>{
    
}

...//Previous route handlers
```

and add it to the route in `routes.ts`.

```
routes.ts


import { Router } from "express";
import { addNewItem, home, index } from "./controller";

const router = Router()
router.post('/item', addNewItem)

...//previous routes
```

Remember that we reserve the implementation of the function until it is the last thing to do for the test to pass. 

### d). Implement the route handler.
The route handler can be implemented as follows.

```
controller.ts


import { Request, Response } from "express";
import { Item } from "./item.model";

export const addNewItem = async(req: Request, res: Response) =>{
    const { title, pages } = req.body

    const item = new Item({
        title, pages
    })

    const savedItem = await item.save()

    res.status(201).json({ item: savedItem })
}

...//Previous route handlers
```

You realize the test still doesn't pass but fails with a Mongoose error. 
![Test failing with Mongoose error](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/8q00cv1lo0er288aaghs.png)

The test fails because we are not connecting to the database. However, connecting to the database will not be of great use either. Let us see how to resolve this in the coming steps.

## 6. Decouple data-access logic from the web layer.
The first step towards resolving the issue of database errors in testing routes is to extract the database operations into a separate file. In this step, we will create a `data-access.ts` file and move the data access logic to it as shown in the code snippet below.

```
data-access.ts


import { IItem, Item } from "./item.model";

export const createNewItem = async(data: IItem) =>{
    const item = new Item({
        title: data.title, 
        pages: data.pages
    })

    const savedItem = await item.save()
}
```

Then we call the function in the route handler.

```
import { Request, Response } from "express";
import { createNewItem } from "./data-access";

export const addNewItem = async(req: Request, res: Response) =>{
    const { title, pages } = req.body

    const savedItem = await createNewItem({ title, pages })

    res.status(201).json({ item: savedItem })
}
```

With that, we are two steps closer to resolving the problem. Let's introduce dependencies on the router and the controller in the next step.

## 7. Introduce dependencies on the controller and the router.
The point of introducing dependencies is to allow us to replace the data-access layer with mocks. 

The easiest way to introduce dependencies in a file with related functions is to encapsulate all of them in a class. If the file consists of related function calls, we encapsulate them inside one function.

In this step, we will do the following activities:

a). Encapsulate the data access layer.

b). Encapsulate the controller (web layer).

c). Encapsulate the router.

d). Refactor the main file and the test file.


### a). Encapsulate the data access layer.
We will first encapsulate the data access layer. We will create a class called `APIDAL` - API data access layer - to encapsulate database operations.

```
import { IItem, Item } from "./item.model";

export class APIDAL{
    public createNewItem = async(data: IItem) =>{
        const item = new Item({
            title: data.title, 
            pages: data.pages
        })
    
        const savedItem = await item.save()

        return ({
            title: savedItem.title,
            pages: savedItem.pages,
            _id: savedItem._id,
            id: savedItem.id
        })
    }
}
```

### b). Encapsulate the controller.
We will create a class called ' APIController` to encapsulate the controller functions. The `APIController`  constructor accepts an object of the data-access layer class as a dependency.
Below is the code snippet.

```
controllers.ts

import { Request, Response } from "express";
import { APIDAL } from "./data-access";

export class APIController{
    private dal: APIDAL

    constructor(dataAccessLayer: APIDAL){
        this.dal = dataAccessLayer
    }
    public addNewItem = async(req: Request, res: Response) =>{
        const { title, pages } = req.body
    
        const savedItem = await this.dal.createNewItem({ title, pages })
    
        res.status(201).json({ item: savedItem })
    }
    
    public home = (req: Request, res: Response) =>{
        res.status(200).json({message: "Welcome home"})
    }
    public index = (req: Request, res: Response) =>{
        res.status(200).json({ message: 'Welcome to my API' })
    }
}
```

### c). Encapsulate the router.
Our routes file consists of function calls. Therefore, we will encapsulate them in one function called `apiRouter`.

```
import { Router } from "express";
import { APIController} from "./controller";

const apiRouter = (controller: APIController) => {
    const router = Router()
    router.post('/item', controller.addNewItem)
    
    router.get('/home', controller.home)
    
    router.get('/', controller.index)

    return router
    
}
export {apiRouter}
```

### d). Refactor the main file and the test file.
The above changes force us to change how we call the `router` in `app.ts` and `app.test.ts`. Here are the updates.

Main file.

```
app.ts

import express from "express"
import { apiRouter } from "./routes"
import { APIController } from "./controller"
import { APIDAL } from "./data-access"

const apiDAL = new APIDAL()
const controller = new APIController(apiDAL)
const api = express()

api.use(express.urlencoded({ extended: true }))
api.use(express.json())

api.use( apiRouter(controller))
```

Test File.

```
api.test.ts

...// Previous imports

import { apiRouter } from "./routes"
import { APIController } from "./controller"
import { APIDAL } from "./data-access"

const apiDAL = new APIDAL()
const controller = new APIController(apiDAL)
const api = express()

api.use(express.urlencoded({ extended: true }))
api.use(express.json())

api.use( apiRouter(controller))

...//Tests
```

Lastly, we replace the data access layer with a mock class. In the next section, let's create a mock class for the data access layer and import it into the test file.

### 8. Mock your data access layer.
Do you remember when we said we would not test the database operations? We meant to replace the database operations with fake functions. 

In this step, we will create a new class with a function that imitates the one in the `APIDAL` class. We will create the file and the class with the same names in a different directory.

Here are the steps we will follow.
 - Create a subdirectory directory called `mocks` within the `src` directory.
 - Create a file called `data-access.ts`.
 - Create the `APIDAL` class on the file and copy-paste the code snippet below.

 ```
 import { IItem, Item } from "../item.model";

export class APIDAL{
    public createNewItem = jest.fn(async(data: IItem) =>{
        const item = new Item({
            title: data.title, 
            pages: data.pages
        })
    
       return ({
            title: item.title,
            pages: item.pages,
            _id: item._id,
            id: item.id
        })
    })
}
 ```

In the above code snippet, we have replaced the original function implementation with a mock.

## 9. Replace the data access layer with the mock in the test file.
After creating a mock for the data access layer, we import it into the test files as shown in the code snippet below.

```
app.test.ts


...//Previous imports are here

import { apiRouter } from "./routes"
import { APIController } from "./controller"
import { APIDAL } from "./mocks/data-access" //Imported mock class

const apiDAL = new APIDAL()
const controller = new APIController(apiDAL)
const api = express()

api.use(express.urlencoded({ extended: true }))
api.use(express.json())

api.use( apiRouter(controller))

...//All the written tests are below here
```

Now run your tests. They should all pass as shown in the screenshot below.

![All tests passing](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/fulpyivo0b8nui3tmj1h.png)

## Conclusion
Finally, we have successfully explored and practiced how to test Express API routes the easy way. In this article we have learned how to do the following:
- Separate unit test from the main application.
- Modularize an Express application for easy testing.
- Write unit tests for routes of an Express application.
- Test routes involving database operations.
- Run unit tests without connecting to the database or running your application on a dev server.

The code we have written in this article is available in [this GitHub repository](https://github.com/GHOST-Aram/api-testing-the-easy-way)
 

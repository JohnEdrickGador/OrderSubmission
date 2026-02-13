# Backend and Frontend Structures

## Backend

The backend was structured in a way that the controllers, routes, services, and types folders are inside the src folder together with the index.ts file.

Inside the _controllers_ directory is the **orderControllers.ts** file. This is responsible for creating the order that was submitted to the API

Inside the _routes_ directory is the **orderRoutes.ts** file. This file creates the router used by the backend and also contains all the endpoints for the API.

Inside the _services_ directory is the **processOrder.ts** file which contains the **procesOrder** utility function that validates the order submitted to the API.

Inside the _types_ folder is the **types.ts** file that contains all the **types** used in the backend's processes.

## Frontend

The frontend's file structure was generated using [vite](https://vite.dev/). The modifications made to the default file structure includes the addition of the components, pages, services, pages, and styles directories inside the src folder.

Inside the _components_ directory are different tsx files that correspond to the components used in the project such as the notification, order form, and the order item input. These components work together to assemble the data from the user to be submitted to the API.

# Key design decisions and tradeoffs

## Backend File Structure

**Design Choice**

- Modular separation: routes/, services/, types/, and index.ts as the entry point.
- Modular separation: routes/, services/, types/, and index.ts as the entry point.

**Trade-offs**

- Easier to maintain, test, and extend.
- Slightly more boilerplate compared to a single-file prototype.

## Express Middleware

**Design Choice**

- express.json() for parsing JSON bodies.
- cors() to allow cross-origin requests (for React frontend)

**Trade-offs**

- Simplifies API input handling and frontend integration
- No built-in validation

## Request Validation in Service Layer

**Design Choice**

- Validate items, quantity, customer name/email inside processOrder instead of middleware.

**Trade-offs**

- Keeps route handlers lightweight and focused on request routing
- Easier to unit test business logic separately
- Middleware validation might be more reusable for other endpoints; current approach is tied to orders.

# Possible Improvements

## Frontend

- Utilize a frontend libraries such as material UI to speed up frontend development.
- OR utilize tailwind or other CSS libraries to ensure a more uniform styling across components

## Backend

- If given more time, integrating an SQL database would be a good improvement to introduce persistence in data.
- Use express error-handling middleware to reduce repetitive try/catch blocks across different files.
- Move the API endpoint, PORT, The buying threshold value to the environment variables to make the system configurable without changing the code itself.

# Expansion Opportunities for the project

- Add an authentication layer to have some separation on different users' orders
- Display the user's current orders to the user interface
- Add an order status to each order so that the user will have visibility on their order's details such as arrival time or fulfillment date.
- Add more API endpoints such as getOrders, deleteOrders, updateOrder, cancelOrder, to provide more functionality to the application

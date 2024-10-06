# simplified-e-commerce-application
Simplified e-commerce application built with Vue.js and TypeScript for a Senior Front End Engineer assignment. Implements product search, shopping basket functionality, and unit testing.

### Instructions for setting up and running the project locally

1. **Prerequisites**:
    - Node.js version 22 is required. Please ensure that you have the correct version installed.
    - Install `json-server` globally by running:
      ```bash
      $ npm install -g json-server
      ```

2. **Install project dependencies**:
     ```bash
     $ npm install
     ```

3. **Prerequisites**:
    - Start the JSON Server to serve the mock data on port 3008 by running the following command:
      ```bash
      $ json-server --watch db.json --port 3008
      ```
   > **Note:** It is important that the server runs on port **3008** for the application to function correctly.

4. **Development**:
    - To start the development server, run:
      ```bash
      $ npm run dev
      ```
    - To run the tests, use the following command:
      ```bash
      $ npm run test
      ```

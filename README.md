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

### A short description of my approach and the decisions i made

I chose to build this project using **Vue 3** with **TypeScript** to ensure type safety and take advantage of Vue's modern features like reactivity. I opted for **Vite** as the bundler because of its speed and smooth development experience, which significantly improved my workflow.

For state management, I used **Pinia** since it's lightweight and works seamlessly with Vue 3, allowing me to efficiently handle the basket state across the application. The structure of the application follows a **component-based architecture**, which I designed to ensure modularity and reusability.

I decided to use **TailwindCSS** for styling because of its utility-first approach, which sped up the design process. On top of that, I integrated **DaisyUI** for pre-built components that helped me save time on common UI elements. These tools helped me create a responsive and aesthetically pleasing UI without spending too much time on custom styles.

To persist the basket state and generic data, i utilized **localStorage**. This decision allows users to maintain their session between page reloads, which I implemented in the `basketStore.ts` and `genericStore.ts`. Managing basket actions such as adding, removing, and updating quantities was an essential feature that I prioritized.

For the product listing, I implemented **pagination** and **search functionality** to provide users with a seamless browsing experience. I used computed properties and watchers to dynamically update the products based on the search query and page number.

I made sure to include console logging in API requests, like fetching products and generic data, for debugging purposes. This decision ensures that any errors during data fetching can be easily identified during development.

I also set up a **mock server** using **JSON Server** to simulate backend functionality and serve the product data, ensuring smooth development and testing without needing an actual backend.

Finally, i wrote **unit tests** using **Vitest** for the critical components of the application. This helped me ensure the reliability and correctness of the core functionality.

### Any challenges i faced and how i overcame them

One of the challenges i faced was how to complete the application more efficiently and quickly. To solve this, i decided to integrate **DaisyUI**, which allowed me to avoid spending extra time on designing certain UI elements from scratch.

Another challenge was that i had never written unit tests before. To overcome this, i used **ChatGPT** for guidance, which helped me understand the process and successfully implement the tests for key components.

I also wanted to make the user experience (UX) as functional as possible. To achieve this, i researched what major websites like **Skroutz** were doing and incorporated some of their UX principles into my project.

### Bonus and extra features i implemented

The app is fully **responsive** and works across all screen sizes. I used **Tailwind CSS** to achieve this easily and efficiently. I also implemented **pagination**, which works both in the search results and the main product list, ensuring smooth navigation through the products.

Additionally, I added a **dark mode** feature to enhance user experience by allowing users to switch between light and dark themes. I made sure to include all the optional requirements from the assignment to provide a complete solution.

As an extra feature, I implemented a custom **AddRemoveItems** component. When no product is added to the cart, a button with text appears. Once you click the button, it dynamically shows the quantity selector, allowing the user to increase or decrease the number of items. In the **Basket view**, if the user tries to remove the last item by clicking the minus (-) button, a **modal** pops up asking whether they want to confirm the removal or keep the item in the basket.

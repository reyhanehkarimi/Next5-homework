# Nextjs application

<!-- ![Todo List desktop design](help/design/Screenshot-1.png)
![Todo List mobile design](help/design/Screenshot-3.png) -->

## Description

In your homework you should show three parts for : users, posts, recipes

## Homework Tasks:

### section 3

1. you should get all the data and show it with list in homePage in `/` route
   - use https://dummyjson.com/docs api
   - for users: https://dummyjson.com/users
   - for posts: https://dummyjson.com/posts
   - for recipes: https://dummyjson.com/recipes
2. you should have overall not-found, loading and error files

3. you should handle loading for each of above three parts (use streaming)

4. define three route named `/posts`, `/users` , `/recipes` for showing more detail about those

5. each of that page should have several card component that each card show details of one of users or post or recipe

6. and in each the Card component we should have a button that have onClick event (naturally card component should be client component) for redirecting to the for example: users/[id] or /recipes/[id] or posts/[id](use useRouter() hook from next/navigation)

7. you should create dynamic route page for showing more details of individual post or recipe or user

### section 4

1. implement static metadata for `/` , `/posts`, `/recipes`, `/users` and dynamic metadata for dynamic route (/[id]) based on id or everything you wants

2. in recipe card you should have image with next Image component

3. for loading each card we should implement lazy loading(hint: dynamic from next/dynamic)

## How to Deliver the Assignment

1. **Complete the Project:**

   - Ensure that all the specified tasks are implemented.
   - Test the website to confirm all functionalities work correctly, including the homepage, search, filter, country detail pages, dark/light mode, and responsiveness.

2. **Prepare the Code:**

   - Organize your code into a well-structured repository.
   - Make sure your code is clean and well-commented.

3. **Upload to GitHub:**

   - Create a new public repository on [GitHub](https://github.com/).
   - Push your project code to this repository.
   - Ensure all necessary files are included in the repository.

4. **Submit the Assignment:**
   - Provide the link to your public GitHub repository.

### Example of Submission Information:

- **GitHub Repository:** [https://github.com/username/project-name](https://github.com/username/project-name)

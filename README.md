# Lost in Translation

### `Noroff Assignment #03 `

---

## About The Code

The app handles the routing with React Router and the state with Redux Toolkit and Redux Toolkit Query. Through mindfulness of **naming**, **structure** and **architecture** the repository should with the simple documentation below be easily navigated and understood.

> The styling is handled with SCSS in bite size, component encapsulated files using the BEM naming convention
>
> The routing is handled with React Router.
>
> The API logic and global state is handled with Redux Toolkit.

**/index.ts**

    Root file. Contains routing logic with React Router

**/routes**

    Each folder in the /routes folder corresponds to a page in the application

**/features**

    App features and components are placed in the features folder

- **/common**

  > Subfolder for general components prone to reuse

**/auth**

    Auth state is kept here. A useAuth hook is exported for authenticating

**/global**

    Global files are kept here, such as css, utils and types

**/api**

    API logic and methods are kept here. API state management is handled with RTK query

**/appRedux**

    Contains Redux store config

**/public**

    Publically available resources, such as fonts and images are kept here

---

###The Login Page

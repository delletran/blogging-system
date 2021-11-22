# blogging-system

- ## **React TS Django Application**

## Initial Setup

- ### **On terminal:**

  - **Run pipenv**

    - change directory to `blogging-system/`

    - run virtual environment `pipenv shell`

  - #### **Package installation**

    | Command                        | Description                                   | Directory                  |
    | ------------------------------ | --------------------------------------------- | -------------------------- |
    | `pip install requirements.txt` | Install Back-end and environment dependencies | `blogging-system/`         |
    | `npm install`                  | Install node modules dependecies              | `blogging-system/frontend` |

    - change directory to `blogging-system/frontend` then install the following node modules

  - #### **Create a super-user to access django-admin**

    - `python manage.py createsuperuser --user <username> --email <email>`

    - (first and last name can be skipped)

    - Input your password and confirmation password

  - #### **Runserver**

    | Command                      | Description                               | Directory                  |
    | ---------------------------- | ----------------------------------------- | -------------------------- |
    | `python manage.py runserver` | Run Django Server Instance                | `blogging-system/backend`  |
    | `npm run dev`                | Run Node Server and start ELS application | `blogging-system/frontend` |

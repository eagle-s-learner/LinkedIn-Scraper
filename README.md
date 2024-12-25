
# LinkedIn Scraper

This software allows you to effortlessly crawl **20 to 50 job postings** from LinkedIn and explore **5 to 10 highly relevant profiles** across diverse fields. Designed for recruiters, businesses, and job seekers, **LinkedIn Scraper** provides an efficient way to fetch real-time data based on **designation, location, and company preferences.**


## Run Locally

Clone the project

```bash
  git clone https://github.com/eagle-s-learner/LinkedIn-Scraper.git
```

Go to the project directory

```bash
  cd LinkedIn-Scraper
```

Open terminal for client and server both and Install dependencies

```bash
  npm install
```
create a .env file in server folder and add following details
```
PORT = 3021
PASSWORD_WORKBENCH = your workbench password
LINKEDIN_PASS = password of your LinkedIn
EMAIL = your EMAIL
```
Now similarly run command in client and server terminal

```bash
  npm run dev
```


## Algorithms

To get the **5 to 10 relevant profiles**. Provided Input:
```
*Designation
*Location
*Company
```
Sorting done on the basis of Designation SDE 1, SDE 2, Tester, etc.

Higher the Designation higher value will be given to that profile.

Similar, algorithm will be used for getting **20 to 50 jobs**
```
*Designation
*Location
*Experience
```
## Database Design
- Connection Pooling for Efficient DB Access
createPool method to manage database connections efficiently, ensuring that multiple requests can be handled simultaneously without opening a new connection each time.

- Auto-Handling of Connection Lifecycle
The connection pool automatically handles acquiring and releasing connections, providing a more efficient way to manage resources and ensuring that unused connections are returned to the pool. This also minimizes the risk of connection leaks.

- Configurable Pool Size for Scalability
Configure the pool size (max number of connections) based on your application’s needs. This ensures that your app can scale by efficiently handling more concurrent requests without overloading the database.
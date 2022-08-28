# NPHC ASSIGNMENT
## Goal

Help NPHC HR dept build an MVP employee salary management webapp to manage employees'salaries.

## Description

The app contains an employee list with the following information:

- id - unique alphanumeric ID assigned by the company.
- username - unique alphanumeric login assigned by the company.
- fullName - possibly non-unique name. May not be in English, so please use UTF-8 encoding.
- salary - decimal that is >= 0.00.

This is an MVP for us to gather more feedback. As a result, we have omitted a login feature as we are not sure how we are going to control usage nor what kind of authentication mechanism we will be using.
As part of a multi-disciplinary scrum team, you have been assigned to work on the frontend tasks for 3 stories, and your super awesome team member will be working on the backend. In order not to block you, he has created a set of mock static API endpoints for you to develop with first. However, you may also write your own backend APIs for a more dynamic integration with the frontend, as long as it still meets the business logic requirements.

This docker application is build using the following stack Nest.js, React, TypeScript, and MongoDB.

## Task
### USER STORY 1
Upload Users using csv, You can find sample CSV file from  `sample` folder on root of this project

### USER STORY 2
Employee Dashboard Feature
- To view only n employees details at one time
- Able to filter employees based on salary range
- Able to order the list by id, employee name, login or salary ascending or
descending.
### USER STORY 3
CRUD Feature on employees
- Create new employees
- Update exiting emplyoee
- Delete emplyoee
- View employee details with given id

## Get Started

### Requirement
- [Docker](https://docs.docker.com/engine/install/)
- [Node](https://nodejs.org/en/download/)

### To Start appplication

```
npm start
```

### Third Party Libaries
- React Query
- Ant Desgin
- Axios
- Class Validation & Class Transformer
- CSVtoJSON
- Mongoose

##### Documented By Oscar Fan
# Task Manager

## Getting Started

To run TaskManager on your local machine, follow these simple steps:

### Prerequisites

Make sure you have the following software installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Angular CLI](https://cli.angular.io/)

### Installation

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/your-username/TaskManager.git

2. Navigate to the project's root directory

    ```bash
    cd taskmanager

3. Install dependencies

    ```bash
    npm i

### Running the Application

Once dependencies are isntalled, start development server:
    
    ng serve

Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Design Decisions
### UML Class Diagram
The initial UML class diagram for the TaskManager project is available in the media folder. It provides an overview of the classes present in this project and their relationships.

### TaskService
CRUD service for operations on tasks. It interacts with the LocalStorageService to load and store data.
Designed as a singleton service, so that all components can access the same collection of tasks.

### Dialogs
The AbstractDialog class implements the base dialog functionality for other dialogs to extend. Both AddDialogComponent and UpdateDialogComponent use AddUpdateFormComponent to manage the forms for adding and updating tasks.

### Application Design
TaskManager is designed as a simple Single Page Application (SPA) with a main dashboard and popup dialogs for various actions. The application's visual style is inspired by the DEHN webpage.
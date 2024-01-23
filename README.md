# addresses-book-backend 📚

A simple backend application for managing an address book.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [License](#license)
- [Contact](#contact)

## Introduction

This backend application provides functionality for managing an address book. It allows users to store, retrieve, update, and delete contact information.

## Features

- Create, read, update, and delete contacts
- Search for contacts

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- Knex.js

# Getting Started

## Prerequisites

- Node.js installed
- PostgreSQL installed and running

## Installation

Clone the repository:
   ```bash
   git clone https://github.com/your-username/addresses-book-backend.git
   cd addresses-book-backend
```

Install dependencies:

```bash 
npm install
```

Start the server:

```bash
npm start
```

## Usage
You can comunicate with database througth API endpoints.

## API Endpoints

- GET /api/contacts: Get all contacts.
- GET /api/contacts/:id: Get a specific contact by ID.
- POST /api/contacts: Create a new contact.
- PUT /api/contacts/:id: Update a contact by ID.
- DELETE /api/contacts/:id: Delete a contact by ID.
- GET /api/search?q=query: Search for contacts.

## License
This project is licensed under the MIT License.

## Contact
For any questions or feedback, please contact 📧 mic.gawronski@gmail.com.

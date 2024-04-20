# Script for preloading Database with Items

## Overview

This script is designed to facilitate the process of populating the database with products for use in my [REST-API](https://github.com/PetarIvanov01/DrizzleExpress-API/tree/main/api). Specifically crafted for testing and development purposes, it enables users to quickly load predefined data into their database.

The script populates the database with fitness products, utilized in the Catalog page of my [Fitness Web App](https://github.com/PetarIvanov01/Fitness-shop).

## Prerequisites

Before using the script, ensure the following requirements are met:

- Node.js is installed on your machine.
- Proper setup of the [REST-API](https://github.com/PetarIvanov01/DrizzleExpress-API/tree/main/api).
- Installed dependencies.

## Installation

1. Clone the repository to your local machine:

   ```bash
   git clone <repository-url>
   cd ./scripts

   ```

2. Install dependencies:

   ```bash
   npm install
   ```

## Environment Variables

Before running the script, make sure to set the following environment variables:

- **ADMIN**: This variable should contain the email address of the admin user.
- **PRODUCTION_URL**: This variable should be set to the URL of the production API endpoint where you want to preload the database with items.
- **LOCAL_URL**: This variable should be set to the URL of the local API endpoint where you want to preload the database with items.

Example:

```bash
export ADMIN="admin@admin.bg"
export PRODUCTION_URL="https://production.web/api/v1/catalog"
export LOCAL_URL="http://localhost:5000/api/v1/catalog"
```

## Usage

To run the script in different environments, you can use the following npm scripts:

- **For loading the database in production environment**:

```bash
npm run loadDb:prod
```

- **For loading the database in local environment**:

```bash
npm run loadDb
```

## Warnings

- Ensure that you have set up the [REST-API](https://github.com/PetarIvanov01/DrizzleExpress-API/tree/main/api) first.
- Run the npm command in the correct directory.

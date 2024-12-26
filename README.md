# Fxn Connector

Fxn Connector is a REST API server designed to facilitate interaction with the [fxn-protocol-sdk]("https://github.com/Oz-Networks/fxn-protocol-sdk") on the Solana blockchain. The server allows use the SDK methods in your own application.

## Features

- **Subscription Management:** Create, renew, cancel, and query subscription statuses.
- **Data Provider Fee Management:** Set and update fees for data providers.
- **Comprehensive API Documentation:** Swagger UI integration for easy API exploration and testing.

## Prerequisites

- **Node.js:** Ensure you have Node.js (version 22.x or higher) installed.
- **Solana CLI:** Required for key management and other Solana-related commands.
- **Git:** Required to clone the repository.

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/fxn-connector.git
   cd fxn-connector
   ```

2. **Install the dependencies:**

   Navigate to the project root directory and run:

   ```bash
   npm install
   ```

3. **Environment Setup:**

   Create a `.env.local` file in the project root directory and add the required environment variables. You can generate a Solana keypair using the provided script:

   ```bash
   npm run generate-keypair
   ```

   This will guide you through exporting your Solana wallet keypair.

4. **Build the project:**

   Compile the TypeScript source code:

   ```bash
   npm run build
   ```

5. **Start the server:**

   Launch the server in development mode with:

   ```bash
   npm run dev
   ```

   For production, use:

   ```bash
   npm start
   ```

## API Documentation

Access the Swagger UI documentation at `http://localhost:4545/api-docs` to explore available endpoints and test API requests.

# AI-Powered-Fashion-Design-Platform

## Features

### 1) AI-Generated Custom Designs
- Generates customized clothing designs based on selected preferences like color, material, and patterns
- Crafts tailored descriptions for each design to perfectly reflect its style and features

### 2) Secure Authentication System:
- Password hashing for data security
- JWT Token-based authorization for secure sessions<br>
- OTP-based Email verification to ensure authentic user registration
- Password reset mechanism for easy account recovery
- Settings page to update user-related information


### 3) Design Management:
- Download designs in high-quality formats
- Save creations for future access
- Delete saved designs when no longer needed
- Search saved designs by name or keywords

<br>

## Tech Stack

1) Frontend: React
2) Backend: Node.js
3) Database: MongoDB
4) Image Generation: Clipdrop API
5) Image Description Generation: Google Gemini API

<br>

## Installation

### 1) Clone the repository
    git clone https://github.com/channapd/AI-Powered-Fashion-Design-Platform.git

### 2) Navigate to the project folder
    cd AI-Powered-Fashion-Design-Platform-main

### 3) Install Dependencies
    npm install

### 4) Add API keys
- Add your MongoDB URI, Clipdrop API key, JWT Secret Key, Google Gemini API key, and Gmail App Credentials to the .env file located in the server folder

### 5) Run the Application
- Open integrated terminals in both the client and server folders
- In the server terminal, run
  ```
  npm run start
  ```
- In the client terminal, run
  ```
  npm run dev
  ```

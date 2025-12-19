# Project Manager Application

This project consists of a ReactJS Frontend and SpringBoot Backend.

## Frontend (ReactJS)

The frontend is located in the "frontend" directory. It uses Vite, React Router, and standard CSS for a sleek, modern UI.

### Backend (SpringBoot)
1. Set your mongoDB-Atlas URI(backend/src/resources):
   in application.properties

2. Stater Backend server:
   ```bash
   mvn spring-boot:run
   ```
### Setup and Run FrontEnd
1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies (already done if initialized):
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser at localhost(provided port).

### Features
- **Landing Page**: 
  - "Our Project" section.
  - "Happy Clients" section.
  - Contact Form.
  - Newsletter Subscription.
- **Admin Panel** (`/admin`):
  - Manage Projects (Add/View).
  - Manage Clients (Add/View).
  - View Contact Responses.
  - View Subscribers.

 ### Important! 
 The project currently does not have any seeded/existing data to display, first connet your MongoDB cluster and insert data in the DB using the Admin panel in order to display it.



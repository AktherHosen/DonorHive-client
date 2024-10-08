# DONOR HIVE

Donor Hive is a MERN stack-based blood donation platform designed to seamlessly connect blood donors with recipients in need. It provides user-friendly features for donor registration, managing blood donation requests, and tracking donation status. Admins have full control over users, donation management, and content, while volunteers can create and manage requests. The platform supports role-based access control, responsive design for all devices, and uses secure environment variables for Firebase and MongoDB credentials. Donor Hive also implements notifications for all CRUD operations, offering a smooth user experience.

### FEATURES

#### Role-based Access:

- Admins, Donors, and Volunteers have distinct dashboards and permissions.
- Admins oversee the platform, Donors manage donation requests, and Volunteers assist with limited permissions.
  User Authentication:

- Simple registration and login system with a default "Donor" role for all users.
  Profile Management:

- Editable profiles where users can update personal information such as blood group, district, and upazila.
  Donation Requests:

- Donors can create, manage, and track their donation requests.
  Options to edit, delete, or mark requests as "done" or "canceled."
  Admin Privileges:

- Admins can manage users (block/unblock, promote roles), track donation requests, and control platform content like blogs.
  Volunteer Role:

- Volunteers assist with managing donation requests but have fewer permissions than Admins.

#### Blog Content Management:

- Admins can add, publish, and delete blogs to share useful content with users.

#### Pagination & Filtering:

- Admins and Donors can filter and paginate through donation requests and user data.

#### Mobile-First Design:

- Fully responsive platform, optimized for mobile, tablet, and desktop devices.

#### Alerts & Notifications:

- Custom alerts (SweetAlert/Toast) for CRUD operations, authentication events, and other user actions for clear feedback.

### NEWLY ADDED FEATURE

- Added file upload system instead of using file link
- Added donation history pages where cancelled or donated request are stored

### INSTALLATION

Install my-project with npm

```bash
  git clone https://github.com/AktherHosen/DonorHive-client
  npm init
  npm install
```

### DEPLOYMENT

To deploy this project in you localhost run

```bash
  npm i
  npm run dev

```

### TECH STACK

**Client:** React, React Router, Tailwind CSS, Firebase, Tanstack Query

**Server:** Node, Express, MongoDB, JWT

### DEMO LINKS

#### Client : https://donor-hive.web.app/

#### Server : https://donor-hive-server.vercel.app/

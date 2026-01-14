# 🎓 Alumni Directory – GEC Bilaspur

A full-stack **Alumni Directory platform** for Government Engineering College, Bilaspur that allows alumni to register, verify their email, manage profiles, and appear in a searchable alumni directory only after verification.

The platform focuses on **authenticity, privacy, and clean UX**, ensuring that only verified alumni are listed publicly.

---

## ✨ Features

### 👤 Authentication & Verification
- Secure user registration and login
- Email OTP verification before appearing in the directory
- Only **verified & email-verified alumni** are visible publicly

### 🧾 Alumni Profiles
- Alumni can manage:
  - Organisation
  - Designation
  - Location
  - Profile picture
- Upload proof documents (Marksheet / TC / Degree) during registration
- Profile picture upload with preview & removal support

### 📚 Alumni Directory
- Public alumni directory
- Pagination (**10 alumni per page**) for better performance
- Search and filter by:
  - Name
  - Graduation year
  - Department
  - Organisation / designation
- Displays:
  - Profile picture
  - Name
  - Graduation year
  - Department
  - Organisation & designation
  - Location

### 🛡️ Security & Validation
- Password hashing using **bcrypt**
- Form validation with **Zod**
- Protected API routes using **NextAuth**
- Server-side authorization checks

---

## 🧑‍💻 Tech Stack

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Hook Form + Zod
- UploadThing (file uploads)

### Backend
- Next.js API Routes
- Prisma ORM
- PostgreSQL
- NextAuth (Credentials Provider)

### Email & Verification
- OTP-based email verification
- Email delivery using **Brevo (Sendinblue)** / SMTP

---

## 🗂️ Database Schema (Core Models)

### User
- Profile information
- Verification status
- Profile & proof documents

### OTP
- Hashed OTP
- Expiry time
- User relation

---

## 🔄 User Flow

1. User registers and uploads proof document  
2. Account created but not visible in directory  
3. OTP sent to registered email  
4. User verifies email using OTP  
5. Verified alumni appear in the directory  
6. Alumni can update profile details

---

## ⚙️ Environment Variables

Create a `.env` file using the following structure:

```env
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=your_secret
MAIL_API_KEY=your_brevo_api_key
UPLOADTHING_SECRET=your_uploadthing_secret
UPLOADTHING_APP_ID=your_uploadthing_app_id
```

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run database migrations
npx prisma migrate dev

# Start development server
npm run dev
```

---

## 📌 Future Enhancements

- Admin dashboard for alumni moderation
- Alumni import & approval workflow
- Event announcements
- Alumni networking features
- Profile visibility controls

---

## 🏫 About the Project

This project was built to **digitize and modernize alumni records** for Government Engineering College, Bilaspur while ensuring **trust and authenticity** through proof-based registration and email verification.

---

## 📄 License

This project is intended for **educational and institutional use**.

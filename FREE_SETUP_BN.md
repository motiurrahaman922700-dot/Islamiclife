# 🆓 ইসলামিক কিতাব ঘর — Free Live Setup

এই version-এর জন্য প্রস্তাবিত free stack:

- Frontend: GitHub Pages
- Database/Auth/Storage: Supabase Free
- Custom domain: শুরুতে দরকার নেই; GitHub-এর free `github.io` address ব্যবহার করা যাবে।

GitHub Pages GitHub repository থেকে static website publish করতে পারে এবং GitHub Free-তে public repository-এর জন্য ব্যবহার করা যায়।
Supabase Free-তে বর্তমানে প্রতি project-এ 500 MB database, 1 GB storage, 5 GB egress এবং 50,000 MAU পর্যন্ত quota আছে; free project inactivity-তে pause হতে পারে।

## 1. GitHub account

একজন অভিভাবকের সহায়তায় একটি GitHub account তৈরি করুন।

## 2. Repository

New repository তৈরি করুন। উদাহরণ:
`islamic-kitab-ghar`

Repository-তে এই ZIP-এর HTML/CSS/JS/assets ফাইলগুলো upload করুন।

## 3. GitHub Pages চালু

Repository → Settings → Pages → Deploy from branch → `main` → `/ (root)` → Save।

কিছুক্ষণ পর GitHub একটি `github.io` website address দেবে।

## 4. Supabase project

Supabase-এ Free project তৈরি করুন।

Dashboard → SQL Editor → `database.sql`-এর SQL paste করে Run করুন।

## 5. Storage

Storage-এ দুটি bucket বানানো যেতে পারে:

- `book-covers`
- `book-pdfs`

PDF bucket public করার আগে copyright এবং access policy ঠিক করুন। Public PDF মানে যে কেউ URL পেলে পড়তে পারবে।

## 6. Authentication

Supabase Auth → Email/Password ব্যবহার করুন।

Admin account তৈরি করার সময় নিজের/অভিভাবকের email ব্যবহার করুন। Password এখানে পাঠাবেন না।

## 7. Supabase config

`supabase-config.example.js` কপি করে `supabase-config.js` করুন।

Supabase Project URL এবং browser-safe publishable/anon key বসান।

কখনো `service_role` key frontend-এ বসাবেন না।

## 8. গুরুত্বপূর্ণ

এই V4 হলো free deployment-এর জন্য প্রস্তুত starter package। V3-এর localStorage Admin-কে Supabase-এর সঙ্গে যুক্ত করার জন্য frontend code-এ database/auth/storage API integration সম্পূর্ণ করতে হবে।

## 9. Copyright

যে PDF-এর copyright আপনার নয়, অনুমতি ছাড়া upload করবেন না। Public domain বা অনুমতিপ্রাপ্ত কিতাব ব্যবহার করুন।

## 10. Free limits

Free services-এর quota পরিবর্তিত হতে পারে। ব্যবহার বাড়লে storage, database, bandwidth বা authentication limits-এর দিকে নজর রাখবেন।

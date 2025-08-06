# Admin Authentication

Simple cookie-based authentication has been added to protect the `/admin` routes.

## How it works

1. **Authentication Cookie**: Uses `admin_auth` HTTP-only cookie
2. **Login**: Visit `/admin/login` with password `admin123`
3. **Auto-redirect**: Visiting `/admin` without auth redirects to login
4. **Logout**: Visit `/admin/logout` or click logout button in admin panel
5. **Session**: Cookie expires after 30 days

## Protected Routes

All routes under `(admin)` group are protected:

- `/admin` - Main admin dashboard
- `/admin/post/*` - Post management (when implemented)
- `/admin/tag/*` - Tag management (when implemented)
- Any future admin routes

## Security Features

- HTTP-only cookies (not accessible via JavaScript)
- Secure flag in production
- SameSite: strict
- Auto-redirect to login with return URL
- Password validation on server-side

## Usage

1. Go to `/admin`
2. You'll be redirected to `/admin/login`
3. Enter password: `admin123`
4. You'll be redirected back to `/admin`
5. Click "Logout" button when done

## Customization

To change the password:

1. Copy `.env.example` to `.env`:

   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and set your password:
   ```bash
   # .env
   ADMIN_PASSWORD=your_secure_password_here
   ```

If no environment variable is set, it falls back to `admin123`.

**Important**: The `.env` file is already in `.gitignore` to keep your password secure.

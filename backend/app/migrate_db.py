import sqlite3
import os

def migrate():
    db_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "cognisys.db")
    if not os.path.exists(db_path):
        print(f"Database file not found at {db_path}, skipping migration.")
        return

    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    cursor.execute("PRAGMA table_info(users)")
    columns = [row[1] for row in cursor.fetchall()]
    print("Existing columns in 'users':", columns)

    # 1. Add google_id
    if "google_id" not in columns:
        print("Adding column 'google_id' to users table...")
        cursor.execute("ALTER TABLE users ADD COLUMN google_id VARCHAR(100)")
        cursor.execute("CREATE UNIQUE INDEX IF NOT EXISTS ix_users_google_id ON users (google_id)")
        print("Added google_id.")

    # 2. Add profile_picture
    if "profile_picture" not in columns:
        print("Adding column 'profile_picture' to users table...")
        cursor.execute("ALTER TABLE users ADD COLUMN profile_picture VARCHAR(500)")
        print("Added profile_picture.")

    # 3. Add last_login
    if "last_login" not in columns:
        print("Adding column 'last_login' to users table...")
        cursor.execute("ALTER TABLE users ADD COLUMN last_login DATETIME")
        print("Added last_login.")

    conn.commit()
    conn.close()
    print("Migration completed successfully.")

if __name__ == "__main__":
    migrate()

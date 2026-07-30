# 🚦 TrafficOps

**TrafficOps** is a full-stack intelligent traffic incident management system designed to assist traffic authorities in efficiently reporting, monitoring, and managing road incidents.

The platform enables administrators to monitor live incidents, allocate resources, assign patrol teams, and visualize patrol routes on an interactive map, while ground officers can report incidents, receive assignments, and navigate to incident locations.

It includes powerful features such as:

- 🚨 Real-time Traffic Incident Reporting
- 🗺️ Interactive Map Visualization using Leaflet
- 🚓 Patrol Team Management
- 👮 Intelligent Resource Allocation (Officers & Barricades)
- 📍 Live Route Visualization
- 🔐 JWT Authentication & Role-Based Authorization
- 📊 Admin Dashboard with Incident Analytics
- ⚡ Modern React + FastAPI Architecture

TrafficOps is designed to improve traffic management by providing a centralized platform for incident response and patrol coordination.

---

### Steps for Running the project on your local machine is given below:

Clone the GitHub repository to your local machine:

```bash
git clone https://github.com/Anonymous-Coder004/TrafficOps.git
```

---

## Environment Configuration

Create the `.env` files inside their respective directories and copy-paste the following using specified format:

### Backend Configuration

Create a file named `.env` inside the **backend/** directory.

```bash
SECRET_KEY=<your_secret_key>
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=45
DATABASE_URL=postgresql+psycopg://<db_user>:<db_password>@<host>:<port>/<db_name>
```

---

### Frontend Configuration

Create a file named `.env` inside the **frontend/** directory.

```bash
VITE_BACKEND_BASEURL=http://127.0.0.1:8000
```

---

# 📦 Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

---

# ⚙️ Backend Setup

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv .venv

# Activate virtual environment

# Windows
.venv\Scripts\activate

# Linux / macOS
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run database migrations
alembic upgrade head

# Start FastAPI server
uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```



# 🌐 Live Demo

You can also access the deployed application here:

🔗 **https://traffic-ops-beige.vercel.app/**

The application is deployed using:

- **Vercel** – Frontend
- **Render** – FastAPI Backend
- **Render PostgreSQL** – Database

---


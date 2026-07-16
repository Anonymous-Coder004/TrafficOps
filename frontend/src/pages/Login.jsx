import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { login,getMe } from "../api/auth";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const navigate=useNavigate();
    const {setUser}=useAuth();

    const [formData,setFormData]=useState({
        email:"",
        password:""
    });

    const [error,setError]=useState("");
    const [loading,setLoading]=useState(false);

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setFormData(prev=>({...prev,[name]:value}));
    };

    const handleSubmit=async(e)=>{
        e.preventDefault();
        setError("");

        try{
            setLoading(true);

            const res=await login(
                formData.email,
                formData.password
            );

            const token=res.data.access_token;

            localStorage.setItem(
                "access_token",
                token
            );

            const me=await getMe(token);

            setUser(me.data);

            navigate("/");
        }
        catch(err){
            setError("Invalid email or password");
        }
        finally{
            setLoading(false);
        }
    };

    return (
    <div className="h-screen bg-slate-100 flex items-center justify-center p-4 overflow-hidden">

        <div className="w-full max-w-6xl h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 grid lg:grid-cols-2">

            {/* HERO SECTION */}

            <div
                className="hidden lg:flex relative h-full bg-cover bg-center"
                style={{
                    backgroundImage:"url('/traffic-hero.jpg')"
                }}
            >

                <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/20" />

                <div className="relative z-10 flex flex-col justify-center p-10 w-full">

                    <div>

                        <div className="flex items-center gap-3 mb-8">

                            <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center text-white text-xl">
                                🚦
                            </div>

                            <div>
                                <h2 className="text-3xl font-bold text-slate-900">
                                    TrafficOps
                                </h2>

                                <p className="text-slate-500">
                                    Manage Traffic. Save Lives.
                                </p>
                            </div>

                        </div>

                        <h1 className="text-4xl font-bold leading-tight text-slate-900">
                            Smart Traffic
                            <br />
                            <span className="text-emerald-600">
                                Operations
                            </span>
                        </h1>

                        <p className="text-slate-600 text-base mt-4 max-w-lg">
                            Monitor incidents, coordinate resources and manage city traffic efficiently.
                        </p>

                        <div className="mt-8 space-y-4">

                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                                    🚦
                                </div>

                                <span className="text-base text-slate-800">
                                    Real-time Incident Tracking
                                </span>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                                    👮
                                </div>

                                <span className="text-base text-slate-800">
                                    Team Coordination
                                </span>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                                    🚧
                                </div>

                                <span className="text-base text-slate-800">
                                    Resource Allocation
                                </span>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                                    🛣️
                                </div>

                                <span className="text-base text-slate-800">
                                    Traffic Diversion Management
                                </span>
                            </div>

                        </div>

                    </div>

                    <div className="mt-auto pb-2">

    <div className="pt-4">

    <div className="inline-flex items-center gap-2 bg-emerald-600 rounded-full px-4 py-2 shadow-md">

        <span className="text-white text-xs font-semibold">
            🛡️ Building safer roads and smarter cities together.
        </span>

    </div>

</div>

</div>

                </div>

            </div>

            {/* LOGIN FORM */}

            <div className="flex items-center justify-center p-8 lg:p-12">

                <div className="w-full max-w-md">

                    {/* MOBILE HEADER */}

                    <div className="lg:hidden text-center mb-8">

                        <div className="w-16 h-16 rounded-2xl bg-emerald-600 flex items-center justify-center text-white text-3xl mx-auto mb-4">
                            🚦
                        </div>

                        <h1 className="text-3xl font-bold text-slate-900">
                            TrafficOps
                        </h1>

                        <p className="text-slate-500 mt-2">
                            Traffic Operations Command Center
                        </p>

                    </div>

                    <form onSubmit={handleSubmit}>

                        <h2 className="text-4xl font-bold text-slate-900">
                            Welcome Back
                        </h2>

                        <p className="text-slate-500 mt-2 mb-8">
                            Sign in to access your TrafficOps account
                        </p>

                        <div className="mb-5">

                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Email Address
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="Enter your email"
                                className="w-full h-14 rounded-xl border border-slate-300 bg-white px-4 text-slate-900 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                            />

                        </div>

                        <div className="mb-4">

                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Password
                            </label>

                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder="Enter password"
                                className="w-full h-14 rounded-xl border border-slate-300 bg-white px-4 text-slate-900 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                            />

                        </div>

                        {error && (
                            <div className="mb-4 text-red-500 text-sm">
                                {error}
                            </div>
                        )}

                        <div className="text-right mb-6">
                            <button
                                type="button"
                                className="text-emerald-600 hover:text-emerald-700 font-medium"
                            >
                                Forgot password?
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-14 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-semibold text-lg transition"
                        >
                            {loading ? "Signing In..." : "Login"}
                        </button>

                        <p className="text-center text-slate-500 mt-8">
                            Don't have an account?
                            <Link
                                to="/signup"
                                className="text-emerald-600 font-semibold ml-2 hover:underline"
                            >
                                Create Account
                            </Link>
                        </p>

                    </form>

                </div>

            </div>

        </div>

    </div>
);
}
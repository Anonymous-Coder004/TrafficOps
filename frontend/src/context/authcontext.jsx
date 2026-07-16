import { createContext,useContext,useEffect,useState } from "react";
import { getMe } from "../api/auth";

const AuthContext=createContext(null);

export const AuthProvider=({ children })=>{
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
        const initializeAuth=async()=>{
            const token=localStorage.getItem("access_token");

            if(!token){
                setLoading(false);
                return;
            }

            try{
                const res=await getMe(token);
                setUser(res.data);
            }
            catch(err){
                localStorage.removeItem("access_token");
                setUser(null);
            }
            finally{
                setLoading(false);
            }
        };

        initializeAuth();
    },[]);

    const logout=()=>{
        localStorage.removeItem("access_token");
        setUser(null);
    };

    const value={
        user,
        setUser,
        loading,
        logout,
        isAuthenticated:!!user
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth=()=>{
    const context=useContext(AuthContext);

    if(!context){
        throw new Error(
            "useAuth must be used inside AuthProvider"
        );
    }

    return context;
};
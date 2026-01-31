import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    if (password.length < 6) {
      alert("Password should be at least 6 characters long");
      return;
    }

    setLoading(true);
    try {
      console.log("Attempting signup with:", email);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Signup successful:", userCredential.user);
      alert("Signup successful! Welcome: " + userCredential.user.email);
      // Clear form after successful signup
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Signup error:", error);
      let errorMessage = "Signup failed. ";
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage += "This email is already registered. Please login instead.";
          break;
        case 'auth/weak-password':
          errorMessage += "Password is too weak. Please use a stronger password.";
          break;
        case 'auth/invalid-email':
          errorMessage += "Invalid email address. Please check and try again.";
          break;
        case 'auth/network-request-failed':
          errorMessage += "Network error. Please check your internet connection.";
          break;
        default:
          errorMessage += error.message;
      }
      
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    setLoading(true);
    try {
      console.log("Attempting login with:", email);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful:", userCredential.user);
      alert("Login successful! Welcome back: " + userCredential.user.email);
      // Clear form after successful login
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Login error:", error);
      let errorMessage = "Login failed. ";
      
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage += "No account found with this email. Please signup first.";
          break;
        case 'auth/wrong-password':
          errorMessage += "Incorrect password. Please try again.";
          break;
        case 'auth/invalid-email':
          errorMessage += "Invalid email address. Please check and try again.";
          break;
        case 'auth/network-request-failed':
          errorMessage += "Network error. Please check your internet connection.";
          break;
        default:
          errorMessage += error.message;
      }
      
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">

        <h2 className="login-title">Login / Signup</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
          disabled={loading}
        />

        <input
          type="password"
          placeholder="Password (min 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
          disabled={loading}
        />

        <div className="btn-group">
          <button 
            onClick={handleLogin} 
            className="login-btn"
            disabled={loading}
          >
            {loading ? "Processing..." : "Login"}
          </button>

          <button 
            onClick={handleSignup} 
            className="signup-btn"
            disabled={loading}
          >
            {loading ? "Processing..." : "Signup"}
          </button>
        </div>

        <div style={{ marginTop: '15px', fontSize: '12px', color: '#888' }}>
          <p>• Password must be at least 6 characters</p>
          <p>• Use a valid email address</p>
        </div>

      </div>
    </div>
  );
}

export default Login;

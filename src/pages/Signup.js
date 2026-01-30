import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    if (password.length < 6) {
      alert("Password should be at least 6 characters long!");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      alert("✅ Signup successful! Welcome: " + userCredential.user.email);
      
      // Clear form
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      
    } catch (error) {
      console.error("Signup error:", error);
      let errorMessage = "Signup failed";
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = "Email already registered! Please login.";
          break;
        case 'auth/weak-password':
          errorMessage = "Password is too weak! Use at least 6 characters.";
          break;
        case 'auth/invalid-email':
          errorMessage = "Invalid email address!";
          break;
        default:
          errorMessage = error.message;
      }
      
      alert("❌ " + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-title">Create Account</h2>
        <p className="signup-subtitle">Join Suraksha Setu for safer communities</p>

        <form onSubmit={handleSignup} className="signup-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="signup-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Create password (min. 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="signup-input"
              required
              minLength="6"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="signup-input"
              required
              minLength="6"
            />
          </div>

          <button 
            type="submit" 
            className="signup-btn"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div className="login-link">
          <p>Already have an account? 
            <Link to="/login" className="link"> Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;

import React from 'react';
import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';
import phone_icon from '../Assets/phone.png';
import address_icon from '../Assets/location.png';
import dob_icon from '../Assets/calendar.png';
import Navbar from '../Navbar.jsx';

const LoginSignup = () => {
  const [isLogin, setIsLogin] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const toggleForm = () => setIsLogin(!isLogin);

  const [formData, setFormData] = React.useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    dob: "",
    preferences: [],
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleCheckboxChange = (label) => {
    setFormData(prev => {
      const isSelected = prev.preferences.includes(label);
      return {
        ...prev,
        preferences: isSelected
          ? prev.preferences.filter(item => item !== label)
          : [...prev.preferences, label]
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      setLoading(false);
      return;
    }

    const payload = isLogin
      ? { username: formData.username, password: formData.password }
      : {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          address: formData.address,
          dob: formData.dob,
          preferences: formData.preferences
        };

    const endpoint = isLogin ? "login" : "signup";

    try {
      const res = await fetch(`http://localhost:3001/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      alert(data.message || "Success");
    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  const checkboxes = [
    "I agree to the Terms and Conditions",
    "I want to receive newsletters",
    "I want to receive promotional offers",
    "I want to receive updates about new features",
    "I want to receive reminders about my upcoming events",
    "I want to receive information about our events and webinars",
    "I want to receive information about our blog and articles",
    "I want to receive information about our community and forums",
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-black to-blue-800">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-100 shadow-lg rounded-2xl p-8 w-full max-w-xl animate-fade-in"
        >
          <div className="text-center text-3xl font-bold text-gray-800 mb-6">
            {isLogin ? "Login" : "Sign Up"}
          </div>

          <div className="space-y-4">
            {!isLogin && (
              <>
                <Input icon={user_icon} name="username" value={formData.username} placeholder="Username" onChange={handleChange} />
                <Input icon={email_icon} name="email" value={formData.email} placeholder="Email Id" type="email" onChange={handleChange} />
                <Input icon={password_icon} name="password" value={formData.password} placeholder="Password" type="password" onChange={handleChange} />
                <Input icon={password_icon} name="confirmPassword" value={formData.confirmPassword} placeholder="Confirm Password" type="password" onChange={handleChange} />
                <Input icon={phone_icon} name="phone" value={formData.phone} placeholder="Phone Number" onChange={handleChange} />
                <Input icon={address_icon} name="address" value={formData.address} placeholder="Address" onChange={handleChange} />
                <Input icon={dob_icon} name="dob" value={formData.dob} placeholder="Date of Birth" type="date" onChange={handleChange} />
              </>
            )}

            {isLogin && (
              <>
                <Input icon={user_icon} name="username" value={formData.username} placeholder="Username" onChange={handleChange} />
                <Input icon={password_icon} name="password" value={formData.password} placeholder="Password" type="password" onChange={handleChange} />
              </>
            )}

            {!isLogin && (
              <div className="h-40 overflow-y-auto pr-2">
                {checkboxes.map((label, idx) => (
                  <label key={idx} className="flex items-start text-sm text-gray-700 mb-1">
                    <input
                      type="checkbox"
                      className="mr-2 mt-1"
                      checked={formData.preferences.includes(label)}
                      onChange={() => handleCheckboxChange(label)}
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
            >
              {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
            </button>

            <p className="text-center text-sm text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button type="button" onClick={toggleForm} className="text-purple-600 font-medium underline">
                {isLogin ? "Sign Up" : "Login"}
              </button>
            </p>

            {isLogin && (
              <p className="text-sm text-center">
                <a href="#" className="text-blue-500 underline">Forgot Password?</a>
              </p>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

const Input = ({ icon, placeholder, name, value, type = "text", onChange }) => (
  <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white">
    <img src={icon} alt="icon" className="w-5 h-5 mr-3" />
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full outline-none text-sm bg-transparent"
    />
  </div>
);

export default LoginSignup;

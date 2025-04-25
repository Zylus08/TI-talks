// src/Components/Navbar.jsx
function Navbar() {
    return (
      <nav className="bg-purple-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold">TI-Talks</h1>
        <div className="space-x-4">
          <a href="/" className="hover:underline">Home</a>
          <a href="/profile" className="hover:underline">Profile</a>
          <a href="/about" className="hover:underline">About</a>
        </div>
      </nav>
    );
  }
  
  export default Navbar;
  
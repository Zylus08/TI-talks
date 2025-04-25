test('renders login/signup toggle', () => {
  render(<LoginSignup />);
  expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
});

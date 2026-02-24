import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CheckoutForm from "@/components/cart/CheckoutForm";
import { CartProvider } from "@/context/CartContext";

const pushMock = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ id: "123" }),
  }),
) as jest.Mock;

test("does not submit empty form", async () => {
  render(
    <CartProvider>
      <CheckoutForm />
    </CartProvider>,
  );

  await userEvent.click(screen.getByText(/place order/i));

  expect(fetch).not.toHaveBeenCalled();
  expect(pushMock).not.toHaveBeenCalled();
});

test("submits form when all fields are filled", async () => {
  render(
    <CartProvider>
      <CheckoutForm />
    </CartProvider>,
  );

  await userEvent.type(screen.getByPlaceholderText(/full name/i), "John Doe");

  await userEvent.type(
    screen.getByPlaceholderText(/delivery address/i),
    "Mumbai",
  );

  await userEvent.type(
    screen.getByPlaceholderText(/phone number/i),
    "9999999999",
  );

  await userEvent.click(screen.getByText(/place order/i));

  expect(fetch).toHaveBeenCalled();
  expect(pushMock).toHaveBeenCalledWith("/order/123");
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MenuItemCard from "@/components/menu/MenuItemCard";
import { CartProvider } from "@/context/CartContext";

const item = {
  id: "1",
  name: "Pizza",
  description: "Cheese",
  price: 200,
  image: "img",
  category: "STARTER",
  isFeatured: false,
};
describe("MenuItemCard", () => {
  test("increments quantity and adds to cart", async () => {
    render(
      <CartProvider>
        <MenuItemCard item={item} />
      </CartProvider>,
    );

    // increase quantity
    await userEvent.click(
      screen.getByRole("button", { name: /increase quantity/i }),
    );

    // verify quantity changed to 2
    expect(screen.getByText("2")).toBeInTheDocument();

    // add to cart
    await userEvent.click(screen.getByText(/add to cart/i));

    // button should change to "Added"
    // expect(screen.getByText(/added/i)).toBeInTheDocument();
    expect(
      await screen.findByRole("button", { name: /added/i }),
    ).toBeInTheDocument();
  });
});

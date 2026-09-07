import { render, screen } from "@testing-library/react"
import Tooltip from "./Tooltip"


describe(Tooltip, () => {
    it("Toggles visibility based on boolean 'visible", () => {
        const { getByTestId , rerender} = render(<Tooltip text = {"Placeholder text"} visible = {false} />)
        const tooltipElement = getByTestId('tooltip');

        expect(tooltipElement).toHaveClass('tooltip__wrapper--closed');

        rerender(<Tooltip text = {"Placeholder text"} visible = {true} />);
        expect(tooltipElement).toHaveClass('tooltip__wrapper--open');
    });

    it("To contain text that was passed with the text parameter", () => {
        const { rerender} = render(<Tooltip text = {"Placeholder text"} visible = {false} />)
        const tooltipText = screen.getByRole('paragraph');

        expect(tooltipText.textContent).toEqual("Placeholder text");

        rerender(<Tooltip text = {"This is a different placeholder text"} visible = {false} />);
        expect(tooltipText.textContent).toEqual("This is a different placeholder text");
    });
});
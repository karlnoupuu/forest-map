import { describe } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import Toolbar from "./Toolbar";
import { TOOLS_CONFIG } from "../../config/toolbar";

describe(Toolbar, () => {
    it("calls setPanelState with correct value on click", async () => {
        const setPanelState = vi.fn();
        render(<Toolbar panelState = {'graphs'} setPanelState={setPanelState}/>)

        const buttons = screen.getAllByRole('button');

        await fireEvent.click(buttons[1]);
        expect(setPanelState).toHaveBeenCalledWith('information');

        await fireEvent.click(buttons[0]);
        expect(setPanelState).toHaveBeenCalledWith('graphs');
    });

    it("Active button has active class", () => {
        render(<Toolbar panelState="graphs" setPanelState={() => {}} />);

        const buttons = screen.getAllByRole('button');

        expect(buttons[0]).toHaveClass('toolbar__button--active');
        expect(buttons[1]).not.toHaveClass('toolbar__button--active');
    });

    it("Clicking button correctly switches active state between them", async () => {
        const setPanelState = vi.fn();
        let panelState    = 'graphs';
        const { rerender } = render(<Toolbar panelState={panelState} setPanelState={setPanelState} />);

        const buttons = screen.getAllByRole('button');
        expect(buttons[0]).toHaveClass('toolbar__button--active');
        expect(buttons[1]).not.toHaveClass('toolbar__button--active');

        await fireEvent.click(buttons[1]);
        expect(setPanelState).toHaveBeenCalledWith('information');
    
        rerender(<Toolbar panelState="information" setPanelState={setPanelState} />);

        expect(buttons[0]).not.toHaveClass('toolbar__button--active');
        expect(buttons[1]).toHaveClass('toolbar__button--active');
    });

    it("Renderes a button for each tool in toolbar", () => {
        render(<Toolbar panelState = "graphs" setPanelState={() => {}}/>);

        const buttons = screen.getAllByRole('button');
        expect(buttons).toHaveLength(TOOLS_CONFIG.length);
    })
});
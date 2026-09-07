import { render, screen } from "@testing-library/react";

import InfoPanel from "./InfoPanel";
import type { InfoBlock } from "../../config/info";

const MOCK_CONFIG : InfoBlock[] = [
    {
        type    : 'heading',
        content : 'Mock heading',
    },
    {
        type    : 'paragraph',
        content : 'This is a mock paragraph to test InfoPanel construction from a config.'
    },
    {
        type    : 'hyperlink',
        content : 'This is a mock hyperlink.',
        link    : 'https://google.com'
    },
]

describe(InfoPanel, () => {
    it("Properly constructs content based on configuration", () => {
        render(<InfoPanel config = {MOCK_CONFIG} />);

        const heading = screen.getByRole('heading');
        expect(heading).toHaveTextContent("Mock heading");

        const paragraph = screen.getByRole('paragraph');
        expect(paragraph).toHaveTextContent("This is a mock paragraph to test InfoPanel construction from a config.");

        const hyperlink = screen.getByRole('link');
        expect(hyperlink).toHaveTextContent("This is a mock hyperlink.");
        expect(hyperlink).toHaveAttribute('href', 'https://google.com');
    });
});
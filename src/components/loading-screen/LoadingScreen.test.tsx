import { render }               from "@testing-library/react"
import { describe, it, expect } from "vitest"

import LoadingScreen from "./LoadingScreen"

describe(LoadingScreen, () => {
    it("Is displayed when isLoaded is false", () => {
        const { getByTestId } = render(<LoadingScreen isLoaded = {false} />)
        expect(getByTestId('loadingScreen')).not.toHaveClass('loading-screen--hidden');
    });

    it("Is not displayed when isLoaded is true", () => {
        const { getByTestId } = render(<LoadingScreen isLoaded = {true} />)
        expect(getByTestId('loadingScreen')).toHaveClass('loading-screen--hidden')
    });

    it("Is displayed initially, and hidden when state isLoaded switches from false to true", () => {
        const { getByTestId, rerender } = render(<LoadingScreen isLoaded = {false} />)
        expect(getByTestId('loadingScreen')).not.toHaveClass('loading-screen--hidden');

        rerender(<LoadingScreen isLoaded = {true} />);

        expect(getByTestId('loadingScreen')).toHaveClass('loading-screen--hidden');
    });
})
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Button from "../components/ButtonForJest";

describe("Button 컴포넌트 테스트", () => {
    test("버튼이 올바른 텍스트를 표시하는지 테스트", () => {
        render(<Button label="클릭하세요" />);
        const buttonElement = screen.getByText("클릭하세요");
        expect(buttonElement).toBeInTheDocument();
    });

    test("버튼 클릭 이벤트가 잘 실행되는지 테스트", () => {
        const handleClick = jest.fn();
        render(<Button label="클릭" onClick={handleClick} />);
        const buttonElement = screen.getByText("클릭");

        fireEvent.click(buttonElement);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});

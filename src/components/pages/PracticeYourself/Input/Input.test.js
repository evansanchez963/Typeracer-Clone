import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Input from "./Input";

describe("Input", () => {
  it("Calls onKeyDown and onChange correct number of times", () => {
    const inputInfoMock = {currInput: "", inputValid: true}
    const gameStatusMock = {isStarted: true, isEnded: false}
    const onKeyDownMock = jest.fn()
    const onChangeMock = jest.fn()

    render(<Input inputInfo={inputInfoMock} gameStatus={gameStatusMock} handleKeyDown={onKeyDownMock} handleChange={onChangeMock}></Input>)
    const input = screen.getByRole("textbox")

    userEvent.type(input, "Hello")

    expect(onKeyDownMock).toHaveBeenCalledTimes(5)
    expect(onChangeMock).toHaveBeenCalledTimes(5)
  })

  it("Does not allow user to type when game has started or has ended", () => {
    const inputInfoMock = {currInput: "", inputValid: true}
    const gameStatusMock = {isStarted: false, isEnded: true}
    const onKeyDownMock = jest.fn()
    const onChangeMock = jest.fn()

    render(<Input inputInfo={inputInfoMock} gameStatus={gameStatusMock} handleKeyDown={onKeyDownMock} handleChange={onChangeMock}></Input>)
    const input = screen.getByRole("textbox")

    userEvent.type(input, "Hello")
    expect(onKeyDownMock).toHaveBeenCalledTimes(0)
    expect(onChangeMock).toHaveBeenCalledTimes(0)
  })
})
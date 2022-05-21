import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Input from "./Input";

describe("Input", () => {
  it("Calls onKeyDown and onChange correct number of times", () => {
    const inputInfoMock = {currInput: "", inputValid: true}
    const gameStatusMock = {isStarted: true, isEnded: false}
    const onKeyDownMock = jest.fn(event => inputInfoMock.currInput = inputInfoMock.currInput + event.key)
    const onChangeMock = jest.fn()

    const {rerender} = render(<Input inputInfo={inputInfoMock} gameStatus={gameStatusMock} handleKeyDown={onKeyDownMock} handleChange={onChangeMock}/>)
    const input = screen.getByRole("textbox")

    userEvent.type(input, "Hello")
    rerender(<Input inputInfo={inputInfoMock} gameStatus={gameStatusMock} handleKeyDown={onKeyDownMock} handleChange={onChangeMock}/>)

    expect(onKeyDownMock).toHaveBeenCalledTimes(5)
    expect(onChangeMock).toHaveBeenCalledTimes(5)
    expect(input).toHaveValue("Hello")
  })

  it("Does not allow user to type when game has started or has ended", () => {
    const inputInfoMock = {currInput: "", inputValid: true}
    const gameStatusMock = {isStarted: false, isEnded: true}
    const onKeyDownMock = jest.fn(event => inputInfoMock.currInput = inputInfoMock.currInput + event.key)
    const onChangeMock = jest.fn()

    const {rerender} = render(<Input inputInfo={inputInfoMock} gameStatus={gameStatusMock} handleKeyDown={onKeyDownMock} handleChange={onChangeMock}/>)
    const input = screen.getByRole("textbox")

    userEvent.type(input, "Hello")
    rerender(<Input inputInfo={inputInfoMock} gameStatus={gameStatusMock} handleKeyDown={onKeyDownMock} handleChange={onChangeMock}/>)

    expect(onKeyDownMock).toHaveBeenCalledTimes(0)
    expect(onChangeMock).toHaveBeenCalledTimes(0)
    expect(input).toHaveValue("")
  })

  it("Only allow user to backspace during typing error", () => {
    const inputInfoMock = {currInput: "Helloe", inputValid: false}
    const gameStatusMock = {isStarted: true, isEnded: false}
    const onKeyDownMock = jest.fn(event => {
      if(event.key === "Backspace") { 
        inputInfoMock.inputValid = true 
        inputInfoMock.currInput = inputInfoMock.currInput.slice(0, -1)
      }
      else if(inputInfoMock.inputValid) { 
        inputInfoMock.currInput = inputInfoMock.currInput + event.key 
      }
    })
    const onChangeMock = jest.fn()

    const {rerender} = render(<Input inputInfo={inputInfoMock} gameStatus={gameStatusMock} handleKeyDown={onKeyDownMock} handleChange={onChangeMock}/>)
    const input = screen.getByRole("textbox")

    userEvent.type(input, "e")
    rerender(<Input inputInfo={inputInfoMock} gameStatus={gameStatusMock} handleKeyDown={onKeyDownMock} handleChange={onChangeMock}/>)
    expect(input).toHaveValue("Helloe")
    expect(onChangeMock).toBeCalledTimes(0)
    
    userEvent.type(input, "{backspace}")
    rerender(<Input inputInfo={inputInfoMock} gameStatus={gameStatusMock} handleKeyDown={onKeyDownMock} handleChange={onChangeMock}/>)
    expect(input).toHaveValue("Hello")
    expect(onChangeMock).toBeCalledTimes(1)
    expect(inputInfoMock.inputValid).toBeTruthy()
  })
})
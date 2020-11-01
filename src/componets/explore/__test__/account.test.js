import React from 'react'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Account from '../account'
import { aHelilbock } from "./builder/heliblockBuilder";

jest.spyOn(window.localStorage.__proto__, 'getItem');
jest.spyOn(window.localStorage.__proto__, 'removeItem');
jest.spyOn(window.localStorage.__proto__, 'setItem');
window.localStorage.__proto__.getItem = jest.fn();
window.localStorage.__proto__.setItem = jest.fn();
window.localStorage.__proto__.removeItem = jest.fn();

const displayName = "Jesús Olazagoitia";
const photoURL = "image.jpg";

const mockFetch = jest.fn().mockResolvedValue({
    displayName,
    photoURL,
    heliblocks: []
});
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: mockFetch
  })
);

const apiURL = "https://us-central1-heliblocks.cloudfunctions.net/api";


describe('Account', () => {
    beforeAll(() => {
        fetch.mockClear();
    })
    it('Should search token in localStorage when the component mounts', () => {
        render(<Account />)
        act(() => {
            expect(localStorage.getItem).toBeCalledWith("heliblocks-token")
        })
    })
    it('should can authentication using valid token', async () => {
        const token = "jj2na12.s392j2";
        const options = { 
            headers: {
                Authorization: 'Bearer ' + token 
              }
        };
 
        render(<Account />)

        userEvent.type(screen.getByRole('textbox'), token)
        userEvent.click(screen.getByRole("button"))
        expect(fetch).toBeCalledWith(apiURL, options)

        expect(await screen.findByRole("alert", "loading")).toBeInTheDocument();
        expect(await screen.findByRole("img",{ src: photoURL })).toBeInTheDocument();
        expect(await screen.findByText(displayName)).toBeInTheDocument();
        expect(screen.queryByRole("textbox")).not.toBeInTheDocument();

    })
    it('should save valid token en localstorage', async() => {
        const token = "jj2naa2j2";

        render(<Account />)

        userEvent.type(screen.getByRole('textbox'), token)
        userEvent.click(screen.getByRole("button"))

        expect(await screen.findByRole("img",{ src: photoURL })).toBeInTheDocument();
        expect(localStorage.setItem).toBeCalledWith("heliblocks-token", token)
    

    })
    it('Should authenticate when have a valid token in the localstorage ', async () => {
        const token = "jj2na12.s392j2";
        const options = { 
            headers: {
                Authorization: 'Bearer ' + token 
              }
        };

        localStorage.getItem.mockImplementation(() => token);
        render(<Account />)

        expect(fetch).toBeCalledWith(apiURL, options)

        expect(await screen.findByRole("alert", "loading")).toBeInTheDocument();
        expect(await screen.findByText(displayName)).toBeInTheDocument();
    })
    it('Should reset token when press logout', async () => {
        localStorage.getItem.mockImplementation(() => "token");
        render(<Account />)

        userEvent.click(await screen.findByRole("button", "logout"))

        expect(localStorage.removeItem).toBeCalledWith("heliblocks-token");
        expect(await screen.findByRole('textbox')).toBeInTheDocument()
    })
    it('Should can choose a heliblock', async () => {
        localStorage.getItem.mockImplementation(() => "token");
        const heliblock1 = aHelilbock(1).withTitle("Heliblock title 1").withScreenshot("folder/screenshot-1.jpg").build()
        mockFetch.mockResolvedValue({
            displayName,
            photoURL,
            heliblocks: [ heliblock1 ]
        });
        const onChoose = jest.fn()
        render(<Account onChoose={onChoose} />)

        
        expect(await screen.findByText('Heliblock title 1')).toBeInTheDocument()

        const images = await screen.findAllByRole("img");
        const routes = images.map(image => image.getAttribute("src"));
        expect(routes).toContain("folder/screenshot-1.jpg")

        userEvent.click(screen.getByText("Heliblock title 1"))
        expect(onChoose).toBeCalledWith(heliblock1.source);
    })
  })
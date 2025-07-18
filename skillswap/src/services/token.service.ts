import { redirect, type ParsedLocation } from "@tanstack/react-router"

export const getAccessToken = () => {
    return localStorage.getItem('accessToken')
}

export const setAccessToken = (accessToken: string) => {
    return localStorage.setItem('accessToken', accessToken)
}

export const removeAccessToken = () => {
    return localStorage.removeItem('accessToken')
}

export const isAuthenticated = () => {
    return !!getAccessToken()
}

export const redirectIfNotAuthenticated = async ({ location }: { location: ParsedLocation }) => {
    if(!isAuthenticated()){
        throw redirect({
            to: '/user/home',
            search: {
                redirect: location.href
            }
        })
    }
}
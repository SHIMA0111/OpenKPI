"use server";

import { cookies } from "next/headers";

export const getCookie = async (name: string) => {
    const cookiesChache = await cookies();
    return cookiesChache.get(name)?.value;
}

export const setCookie = async (name: string, value: string) => {
    const cookiesChache = await cookies();
    cookiesChache.set(name, value);
}

export const deleteCookie = async (name: string) => {
    const cookiesChache = await cookies();
    cookiesChache.delete(name);
}